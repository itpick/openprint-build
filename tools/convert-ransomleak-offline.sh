#!/usr/bin/env bash
# Convert RansomLeak remote-iframe SCORM packages into fully offline packages.
#
# The shipped packages are thin shells: scormdriver/indexAPI.html loads a
# player from free-content-distribution.ransomleak.com in an iframe and
# fetches exercise content via POST /scorm/launch at runtime. "Offline" they
# are not.
#
# This script, per package:
#   1. extracts the PACKAGE_ID from the zip's indexAPI.html
#   2. calls the launch endpoint and decodes the exercises payload
#      (base64 -> URI-escaped JSON)
#   3. writes a flat, iframe-free index.html that sets the same globals the
#      player expects, loads exercises from a local JSON file, and imports a
#      LOCAL copy of the player bundle
#
# The player bundle (~13 MB: index.js/css, lazy chunks, glTF/KTX2 room
# assets, sounds) is shared by every course and mirrored once into
# output/public/player/assets.
#
# Usage: ./convert-ransomleak-offline.sh <zip>... (output at OUTPUT_DIR)
set -euo pipefail

REPO=${REPO:-/tmp/opencode/training-security-awareness}
OUT=${OUTPUT_DIR:-/tmp/opencode/offline-courses}
CDN="https://free-content-distribution.ransomleak.com"
PLAYER="$OUT/public/player/assets"
FONTS="$OUT/public/player/fonts"

mkdir -p "$PLAYER" "$FONTS" "$OUT/public/scorm"

# ── Mirror the shared player bundle once ─────────────────────────────────
mirror_player() {
  local manifest=/tmp/opencode/offline-player/urls.txt
  if [ ! -f "$manifest" ]; then
    echo "Building player asset manifest..."
    cat >"$manifest" <<EOF
$CDN/public/player/assets/index.js
$CDN/public/player/assets/index.css
EOF
    # Lazy chunks referenced by index.js
    for c in Room Room2 Room3 OfficeRoom AliceRoom de fr it nl uk \
             tutorial.de tutorial.fr tutorial.it tutorial.nl tutorial.uk \
             TutorialTour ExerciseListModal FinishExerciseModal \
             MarketingLeadCapture MobileTutorialTour useGLTFWithKTX2 \
             useTourCompletionLead useWidgetFocus useWindowSize \
             useDraggable3D usePersonStage SkipTimeEffect; do
      echo "$CDN/public/player/assets/$c.js" >>"$manifest"
    done
    # Room model assets (discovered via new URL(...) in the chunk sources)
    for m in base.glb base.ktx2 chair.ktx2 flash_drive.glb furniture.glb \
             furniture.ktx2 headphones.glb laptop2.glb pc.ktx2 perlin.png \
             phone_with_button.glb plants.glb plants.ktx2 props.glb \
             props.ktx2 router_compressed.glb ssd2.glb \
             unbaked_props_compressed.glb dvses.ktx2 m_h_s_f.ktx2 \
             Monitor_Coworker.glb Monitor_Left.glb Monitor_Right.glb PC.glb \
             Phone.glb phones_cam.ktx2 plant.ktx2 plant_2.ktx2 plwd.ktx2 \
             props2.ktx2 Room.glb room.ktx2 Shredder.glb shredder.ktx2 \
             SSD.glb Trash.glb Water_Cooler.glb Whiteboard.glb WiFi.glb \
             Cafe.glb chairs.ktx2 cups.ktx2 Laptop.glb nout.ktx2 Phone2.glb \
             room2.ktx2 Router.glb wood.ktx2; do
      echo "$CDN/public/player/assets/$m" >>"$manifest"
    done
    # Sounds + previews (relative to index.js, same assets dir)
    for a in intercom-deny.mp3 intercom-end.mp3 intercom-press.mp3 \
             intercom-release.mp3 intercom-ring.mp3 pc-turned-off.mp3 \
             pc-turned-on.mp3 phone-call.mp3 printer-print.mp3 \
             receive-email.mp3 receive-sms.mp3 receive-voicemail.mp3 \
             shredder.mp3 desktop-error.mp3 room-preview.webp; do
      echo "$CDN/public/player/assets/$a" >>"$manifest"
    done
  fi
  if [ ! -f "$PLAYER/index.js" ]; then
    echo "Mirroring player bundle (13 MB, one time)..."
    while read -r u; do
      curl -s --max-time 60 "$u" -o "$PLAYER/$(basename "$u")"
    done <"$manifest"
  fi
  # Fonts referenced by index.css (url(../fonts/...))
  if [ ! -f "$FONTS/hanken-grotesk-latin.woff2" ]; then
    echo "Mirroring fonts..."
    for f in hanken-grotesk-latin-ext.woff2 hanken-grotesk-latin.woff2 \
             onest-cyrillic.woff2; do
      curl -s --max-time 30 "$CDN/public/player/fonts/$f" -o "$FONTS/$f"
    done
  fi
  # Draco decoder: with IS_SCORM_REMOTE=false the player requests it from the
  # same origin (/public/draco/...) instead of gstatic
  if [ ! -f "$OUT/public/draco/draco_decoder.wasm" ]; then
    echo "Mirroring draco decoder..."
    mkdir -p "$OUT/public/draco"
    for f in draco_wasm_wrapper.js draco_decoder.wasm; do
      curl -s --max-time 30 "$CDN/public/draco/$f" -o "$OUT/public/draco/$f"
    done
  fi
  # Basis transcoder for KTX2 textures, same-origin path
  if [ ! -f "$OUT/public/basis/basis_transcoder.wasm" ]; then
    echo "Mirroring basis transcoder..."
    mkdir -p "$OUT/public/basis"
    for f in basis_transcoder.js basis_transcoder.wasm; do
      curl -s --max-time 30 "$CDN/public/basis/$f" -o "$OUT/public/basis/$f"
    done
  fi
  # Simulated in-scenario OS shells (/os/desktop, /os/mobile): separate SPA
  # bundles with their own lazy chunks, discovered by grepping import maps.
  if [ ! -f "$OUT/public/os/desktop/assets/index.js" ]; then
    echo "Mirroring simulated OS bundles..."
    for kind in desktop mobile; do
      mkdir -p "$OUT/os/$kind" "$OUT/public/os/$kind/assets"
      curl -s --max-time 30 "$CDN/os/$kind" -o "$OUT/os/$kind/index.html"
      curl -s --max-time 30 "$CDN/public/os/$kind/assets/index.css" \
        -o "$OUT/public/os/$kind/assets/index.css"
      curl -s --max-time 30 "$CDN/public/os/$kind/assets/index.js" \
        -o "$OUT/public/os/$kind/assets/index.js"
      # two passes: chunks importing chunks
      for _ in 1 2 3; do
        for c in $(grep -ohE '"\./[a-zA-Z0-9_.-]+\.js"' \
            "$OUT/public/os/$kind/assets/"*.js 2>/dev/null |
            tr -d '"' | sed 's|^\./||' | sort -u); do
          [ -f "$OUT/public/os/$kind/assets/$c" ] && continue
          code=$(curl -s -o "$OUT/public/os/$kind/assets/$c" -w '%{http_code}' \
            --max-time 30 "$CDN/public/os/$kind/assets/$c")
          [ "$code" != "200" ] && rm -f "$OUT/public/os/$kind/assets/$c"
        done
      done
      echo "  os/$kind: $(ls "$OUT/public/os/$kind/assets" | wc -l) files"
    done
  fi
}

fetch_exercises() {
  # fetch_exercises <package-id> -> decoded JSON on stdout
  curl -s -X POST "$CDN/scorm/launch" \
    -H "Content-Type: application/json" \
    --max-time 60 \
    -d "$(jq -cn --arg id "$1" '{
      packageId: $id, studentRef: "offline", studentName: "Offline Student",
      origin: "https://offline.invalid", locale: "en", ancestorOrigins: []
    }')" | python3 -c '
import json, sys, base64, urllib.parse
d = json.load(sys.stdin)
if d.get("status") != "ok":
    sys.exit("launch failed: " + d.get("status", "?"))
print(urllib.parse.unquote(base64.b64decode(d["exercises"] + "===").decode()))
'
}

convert_zip() {
  local zip=$1
  local slug=$(basename "$zip" .zip | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
  local dir="$OUT/courses/$slug"
  local pid=$(unzip -p "$zip" scormdriver/indexAPI.html 2>/dev/null |
    grep -oE "PACKAGE_ID = '[^']*'" | cut -d"'" -f2)
  if [ -z "$pid" ]; then
    echo "SKIP $zip (no PACKAGE_ID)"
    return
  fi

  echo "Converting $(basename "$zip") [$pid]"
  mkdir -p "$dir"
  # Keep the decoded JSON for humans/diffs, and emit the wire format the
  # player's Az() parser expects: base64(encodeURIComponent(JSON)).
  fetch_exercises "$pid" >"$dir/exercises.decoded.json"
  python3 -c '
import base64, sys, urllib.parse
raw = open(sys.argv[1], "rb").read()
sys.stdout.write(base64.b64encode(urllib.parse.quote(raw, safe="").encode()).decode())
' "$dir/exercises.decoded.json" >"$dir/exercises.json"
  local n=$(jq 'length' "$dir/exercises.decoded.json")

  cat >"$dir/index.html" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${slug}</title>
  <link rel="stylesheet" href="../../public/player/assets/index.css">
</head>
<body>
<div id="root"></div>
<script>
// ── Network lock ──────────────────────────────────────────────────────────
// The player bundle carries a Sentry DSN and a marketing lead-capture chunk
// that phones api.web3forms.com. The exercises' fictional intranet URLs
// (edr.stormveildata.com etc.) only render in the simulated browser, but the
// lock guarantees nothing leaves the page regardless: cross-origin fetch/XHR/
// WebSocket/beacon are rejected BEFORE the player bundle is even imported.
// Same-origin requests (exercises.json, player chunks, models, audio) and
// data:/blob: URLs still work.
(function () {
  'use strict';
  var origin = window.location.origin;
  function isLocal(url) {
    if (!url) return true;
    if (url.startsWith('data:') || url.startsWith('blob:')) return true;
    if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) return true;
    try { return new URL(url, origin).origin === origin; } catch (e) { return false; }
  }
  var _fetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    if (!isLocal(url)) {
      console.warn('[offline] blocked fetch to', url);
      return Promise.reject(new Error('offline: external fetch blocked (' + url + ')'));
    }
    return _fetch(input, init);
  };
  var _open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    if (!isLocal(url)) {
      console.warn('[offline] blocked XHR to', url);
      url = 'data:,';
    }
    return _open.apply(this, [method, url].concat([].slice.call(arguments, 2)));
  };
  var _WS = window.WebSocket;
  window.WebSocket = function (url) {
    if (!isLocal(url)) throw new Error('offline: WebSocket blocked (' + url + ')');
    return new _WS(url);
  };
  window.WebSocket.prototype = _WS.prototype;
  if (navigator.sendBeacon) {
    navigator.sendBeacon = function (url) {
      console.warn('[offline] blocked beacon to', url);
      return true;
    };
  }
  // Sentry reads __SENTRY__ global state; an empty release + no DSN override
  // is not enough, so fail its transport fast: it only sends on errors, and
  // the fetch/XHR hooks above already reject its ingest endpoint.
})();
</script>
<script>
// ── Local SCORM driver ────────────────────────────────────────────────────
// The player resolves driver methods from window.parent (window here, since
// there is no iframe). Without these wired, boot logs "[SCORM] driver
// methods not wired" and student name/id reads crash the text templater
// (undefined.replace). When embedded in an LMS that DOES expose a SCORM API
// (e.g. Moodle), this same driver could forward to it — for now, local
// no-ops keep the session self-contained: progress lives in localStorage.
(function () {
  'use strict';
  var KEY = 'offline-scorm-$pid';
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { state = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  window.GetStudentID = function () { return 'offline-student'; };
  window.GetStudentName = function () { return 'Offline Student'; };
  window.IsLoaded = function () { return true; };
  window.CommitData = function () { save(); return true; };
  window.GetBookmark = function () { return state.bookmark || ''; };
  window.SetBookmark = function (v) { state.bookmark = String(v); save(); return true; };
  window.GetDataChunk = function () { return state.suspend || ''; };
  window.SetDataChunk = function (v) { state.suspend = String(v); save(); return true; };
  window.GetStatus = function () { return state.status || 'not attempted'; };
  window.ResetStatus = function () { state.status = 'incomplete'; save(); return true; };
  window.SetReachedEnd = function () { state.ended = true; save(); return true; };
  window.SetPassed = function () { state.status = 'passed'; save(); return true; };
  window.SetFailed = function () { state.status = 'failed'; save(); return true; };
  window.SetScore = function (v) { state.score = Number(v); save(); return true; };
  window.SetProgressMeasure = function (v) { state.progress = Number(v); save(); return true; };
  window.ConcedeControl = function () { return true; };
  window.RecordInteraction = function () { return true; };
  window.RecordObjective = function () { return true; };
  window.SetNavigationRequest = function () { return true; };
})();
</script>
<script>
// Offline conversion of a RansomLeak remote-iframe SCORM package.
// Same globals the hosted shell sets; content is local; player is local;
// the local SCORM driver above keeps progress in localStorage.
window.IS_SCORM = true;
window.IS_SCORM_REMOTE = false;
window.IS_SCORM_REAL_PACKAGE = true;
window.SCORM_VERSION = '2004';
window.SCORM_RESUME_MODE = 'normal';
window.SCORM_QUIZ_THRESHOLD = 100;
window.PROGRAMMING_LANGUAGE = 'typescript';
window.DEFAULT_ROOM_TYPE = 'home';
window.TENANT = 'free-content-distribution';
window.API_BASE_URL = '';
window.PACKAGE_ID = '$pid';
window.PACKAGE_NAME = '${slug}';
window.OFFLINE_MODE = true;
window.ORIGIN = window.location.origin;
window.SCORM_STUDENT_REF = 'offline-student';
window.SCORM_STUDENT_NAME = 'Offline Student';
window.LOCALE = 'en';
window.LUMITY_ASSET_BASE = '';
</script>
<script>
// The player's Az() parser expects exercises in the wire format:
// base64(encodeURIComponent(JSON)). Decode then hand to the player.
fetch('./exercises.json')
  .then(function (r) { return r.text(); })
  .then(function (encoded) {
    window.EXERCISES = encoded;
    return import('../../public/player/assets/index.js');
  })
  .catch(function (e) { console.error('offline player failed', e); });
</script>
</body>
</html>
EOF
  echo "  -> $dir ($n exercises)"
}

mirror_player
cd "$REPO"

total=0
# Course packages at repo root
for zip in *.zip; do
  convert_zip "$zip"
  total=$((total + 1))
done

# Individual exercises, preserving category
while IFS= read -r zip; do
  convert_zip "$zip"
  total=$((total + 1))
done < <(find "Individual Exercises" -name "*.zip")

echo
echo "Done: $total packages converted to $OUT"
