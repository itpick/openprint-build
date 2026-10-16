import{j as e,d3 as Ie,d4 as fe,aj as w,a4 as Re,aC as R,d5 as _e,d6 as Se,am as B,a as l,r as O,d7 as q,d8 as we,bj as Ne,d9 as $,da as F,a5 as g,a6 as c,db as ee,dc as G,ah as ge,bh as be,bo as Ce,dd as je,de as oe,df as b,dg as xe,a8 as C,dh as v,di as I,dj as te,dk as Le,dl as se,dm as Pe,as as ye,dn as ve,dp as Ue,dq as U,dr as Me,ds as Be,aS as He,a7 as Fe,a3 as Ge,dt as ke,du as We,dv as De,dw as Ye,dx as Ve,dy as Xe,dz as Ze,dA as ze,dB as Je,dC as Qe,dD as Ke,cd as qe,dE as $e,dF as eo,dG as oo,dH as to,dI as so,dJ as no,dK as ao,dL as io,dM as ro,dN as co,dO as lo,dP as uo,dQ as Ao,dR as mo,dS as To,dT as ho,dU as Eo,dV as po,dW as Oo,dX as Io,dY as fo,dZ as Ro,d_ as L,d$ as ne,e0 as ae,e1 as ie,S as k,e2 as _o,e3 as So,e4 as wo,e5 as No,e6 as go,e7 as bo,e8 as z,e9 as Co,ea as jo,eb as xo,ec as Lo,ed as Po,ee as yo,ef as vo,eg as Uo,eh as Mo,ei as Bo,ej as Ho,ek as Fo}from"./index.js";import{d as Go,u as _,b as M,S as W,c as ko}from"./useWidgetFocus.js";import{S as Wo}from"./SkipTimeEffect.js";import{u as Do,a as Yo,b as D,S as Vo,C as re,c as Xo,d as Zo,g as zo,B as Jo,e as Qo}from"./usePersonStage.js";(function(){try{var o=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new o.Error().stack;t&&(o._sentryDebugIds=o._sentryDebugIds||{},o._sentryDebugIds[t]="b59a6d97-aabc-4bb8-9b18-42e077127bb3",o._sentryDebugIdIdentifier="sentry-dbid-b59a6d97-aabc-4bb8-9b18-42e077127bb3")}catch{}})();const Ko=`varying vec2 vUv;
varying vec3 vViewLocal;

void main() {
    vUv = uv;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);

    // The way to the camera in the pane's own axes (x across, y up, z out of
    // the glass): a vector times a rotation is that rotation undone.
    vViewLocal = (cameraPosition - worldPosition.xyz) * mat3(modelMatrix);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,qo=`uniform vec3 uSkyTop;
uniform vec3 uSkyBottom;
uniform vec3 uSheenColor;
uniform vec2 uSplitsU;
uniform vec2 uSplitsV;

varying vec2 vUv;
varying vec3 vViewLocal;

// Seen from outside the wall, over the lit room: how much the glass tints
// it, and how much brighter a streak must be to show at all.
const float OUTSIDE_TINT = 0.3;
const float OUTSIDE_STREAK_GAIN = 2.5;

// A soft-edged stripe: 1 at \`centre\`, fading to 0 \`width\` either side.
float band(float t, float centre, float width) {
    return smoothstep(width, 0.0, abs(t - centre));
}

void main() {
    vec3 view = normalize(vViewLocal);

    // === REFLECTION ===

    // Glass mirrors more the flatter it is looked along. abs(): the pane is
    // seen from both sides.
    float fresnel = pow(1.0 - abs(view.z), 4.0);

    // Which of the 3 x 3 panes this is. Each is its own sheet, set a touch
    // off true, so its streak lands a little off its neighbours'.
    vec2 pane = vec2(
        step(uSplitsU.x, vUv.x) + step(uSplitsU.y, vUv.x),
        step(uSplitsV.x, vUv.y) + step(uSplitsV.y, vUv.y)
    );
    float paneShift = fract(sin(dot(pane, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;

    // Diagonal streaks that slide across the glass as the camera moves round
    // it: a wide soft one and a thin one beside it, both fading down the pane.
    float diagonal = vUv.x - vUv.y * 0.55;
    float slide = view.x * 0.9 + view.y * 0.5;
    float t = fract(diagonal * 0.9 + slide * 0.8 + paneShift * 0.07);
    float streaks = band(t, 0.36, 0.14) * 0.11 + band(t, 0.6, 0.045) * 0.13;
    streaks *= mix(0.4, 1.0, vUv.y);

    float sheen = streaks * (gl_FrontFacing ? 1.0 : OUTSIDE_STREAK_GAIN) + fresnel * 0.2;

    // === WHAT IS BEHIND THE GLASS ===

    // From the room, the evening outside: opaque, so the void round the room
    // never shows through. From outside, a faint tint over the lit room.
    vec3 sky = mix(uSkyBottom, uSkyTop, smoothstep(0.0, 1.0, vUv.y));
    float tint = gl_FrontFacing ? 1.0 : OUTSIDE_TINT;

    // The tint layer with the reflection added on top of it.
    float alpha = clamp(tint + sheen, 0.0, 1.0);
    vec3 color = (sky * tint + uSheenColor * sheen) / alpha;

    gl_FragColor = vec4(color, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`,$o="#344d68",et="#0e1825",ot="#fff1dc",tt={uSkyTop:new w(new B($o)),uSkyBottom:new w(new B(et)),uSheenColor:new w(new B(ot)),uSplitsU:new w(new R(...Se)),uSplitsV:new w(new R(..._e))},st=()=>{};function nt(){return e.jsxs("mesh",{position:Ie,raycast:st,children:[e.jsx("planeGeometry",{args:fe}),e.jsx("shaderMaterial",{transparent:!0,forceSinglePass:!0,depthWrite:!1,side:Re,vertexShader:Ko,fragmentShader:qo,uniforms:tt})]})}const at=600;function it(o){return q(o.slot)?G[o.slot]:null}const J=new WeakMap;function rt(o){let t=J.get(o);return t||(t=new C(...v(o)),J.set(o,t)),t}function ct({person:o,slot:t,leaving:s,onGone:a,onClick:r}){const u=l(f=>f.settledPeople.includes(o.id)),d=O.useRef(s||u?1:0),E=O.useRef(!1),A=l(f=>f.spokenLine);ge((f,Oe)=>{if(E.current||d.current===1&&!s)return;const Z=Oe*1e3/at;s?(d.current=Math.max(0,d.current-Z),d.current===0&&(E.current=!0,a())):d.current=Math.min(1,d.current+Z)});const n=be(o),T=Ce(n.pose,t.seat),m=rt(je(t,o)),i=t.seat!==void 0;return e.jsxs("group",{position:t.position,"rotation-y":xe(t,o),raycast:r?oe:b,children:[e.jsx(D,{person:o,pose:T,seat:t.seat??null,lookAt:m,lookBoost:i?Vo:1,opacityRef:d,onClick:r}),e.jsx(re,{opacityRef:d}),(A==null?void 0:A.personId)===o.id&&!s&&e.jsx(Xo,{speaker:A.speaker,text:A.text,height:ee(t)+.16})]})}function lt(){const o=l(n=>n.people),t=O.useMemo(()=>o.filter(n=>q(n.slot)),[o]),s=Do(t,it,G["cafe-next-table"]),{clickable:a,clickableSlot:r,framed:u,isTalkStep:d}=s,E=O.useMemo(()=>{const n=u.position.clone().setY(we+Ne(u)+(d?.22:0));return $(F,n,u.cameraOffset)},[u,d]),A=Yo(s,E,"focusCafePerson");return e.jsxs(e.Fragment,{children:[s.cast.map(({person:n,slot:T,leaving:m})=>e.jsx(ct,{person:n,slot:T,leaving:m,onGone:()=>s.dismiss(n.id),onClick:!m&&r&&n.id===(a==null?void 0:a.id)?A:void 0},m?`leaving-${n.id}`:n.id)),e.jsx("group",{position:u.position,children:e.jsx(g,{widget:c.PERSON,positionY:ee(u)+.06,anchor:"bottom",active:s.beaconActive,onClick:A,focusOnClick:!s.startsListen})})]})}const[ce,p,P]=Pe,h=.014,Y=ce*.9,N=p*.46,y=.006,le=Y+.01,dt="#7a4a2e",de="#653b24",ue="#3a2a1f",ut="#c9a45c",At=Be.clone().applyQuaternion(new He().setFromEuler(new Fe(se,te,0,"YXZ")).invert()),S=(o,t)=>Ue(o,t,At),mt=I(()=>{const o=ce/2-h,t=Y/2-h,s=new ye([new R(-o,h),new R(o,h),new R(t,p-h),new R(-t,p-h)]),a=P-2*h,r=new ve(s,{depth:a,bevelEnabled:!0,bevelThickness:h,bevelSize:h,bevelSegments:2});return r.translate(0,0,-a/2),r.computeVertexNormals(),S(r,dt)}),Tt=I(()=>S(new U(le,y,P+.004),de)),ht=I(()=>S(new U(le,N,y),de)),Et=I(()=>S(new U(.034,N*.8,.004),ue)),pt=I(()=>S(new U(.04,.026,.006),ut)),Ot=I(()=>S(new Me(Y/2-.02,.009,8,40,Math.PI),ue)),It=I(()=>new Ge({vertexColors:!0}));function ft(){const o=It(),t=P/2+y/2;return e.jsx("group",{position:Le,"rotation-y":te,raycast:b,children:e.jsxs("group",{"rotation-x":se,children:[e.jsx("mesh",{geometry:mt(),material:o}),e.jsx("mesh",{geometry:Tt(),material:o,position:[0,p+y/2,0]}),e.jsx("mesh",{geometry:ht(),material:o,position:[0,p-N/2,t]}),e.jsx("mesh",{geometry:Et(),material:o,position:[0,p-N*.5,t+.004]}),e.jsx("mesh",{geometry:pt(),material:o,position:[0,p-N*.82,t+.006]}),e.jsx("mesh",{geometry:Ot(),material:o,position:[0,p,-P*.1],"rotation-x":-1.15})]})})}const Ae=""+new URL("Cafe.glb",import.meta.url).href,me=""+new URL("Router.glb",import.meta.url).href,V=""+new URL("Laptop.glb",import.meta.url).href,Te=""+new URL("Phone2.glb",import.meta.url).href,he="data:model/gltf-binary;base64,Z2xURgIAAAAgBgAA3AQAAEpTT057ImFzc2V0Ijp7ImdlbmVyYXRvciI6ImdsVEYtVHJhbnNmb3JtIHY0LjQuMiIsInZlcnNpb24iOiIyLjAifSwiYWNjZXNzb3JzIjpbeyJ0eXBlIjoiU0NBTEFSIiwiY29tcG9uZW50VHlwZSI6NTEyMywiY291bnQiOjQ4fSx7InR5cGUiOiJWRUMzIiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjI4LCJtYXgiOlswLjM0MjU1NzY2ODY4NTkxMzEsLTAuMDAwMDIzNTIzNTc4NDIwMjgxNDEsMC4yOTUwODUwNzI1MTczOTVdLCJtaW4iOlswLjE0MDE3MTc2NjI4MTEyNzkzLC0wLjAwNTUxMzk4NjU3MjYyMzI1MywwLjExNzU3ODE1NjI5MjQzODUxXX0seyJ0eXBlIjoiVkVDMyIsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoyOH0seyJ0eXBlIjoiVkVDMiIsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoyOH1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjowLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjoyOTR9XSwiYnVmZmVycyI6W3siYnl0ZUxlbmd0aCI6Mjk0fV0sIm1hdGVyaWFscyI6W3sibmFtZSI6Ik5vdXQiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMCwwLDAsMV0sInJvdWdobmVzc0ZhY3RvciI6MC41LCJtZXRhbGxpY0ZhY3RvciI6MH0sImVtaXNzaXZlRmFjdG9yIjpbMSwxLDFdfV0sIm1lc2hlcyI6W3sibmFtZSI6IkN1YmUuMDE5IiwicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MSwiTk9STUFMIjoyLCJURVhDT09SRF8wIjozfSwibW9kZSI6NCwibWF0ZXJpYWwiOjAsImluZGljZXMiOjAsImV4dGVuc2lvbnMiOnsiS0hSX2RyYWNvX21lc2hfY29tcHJlc3Npb24iOnsiYnVmZmVyVmlldyI6MCwiYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfX19fV19XSwibm9kZXMiOlt7Im5hbWUiOiJOb3RlYm9vay4wMDEiLCJ0cmFuc2xhdGlvbiI6WzIuNzc0NjU3NDg3ODY5MjYyNywxLjAwNzQ2NDc2NjUwMjM4MDQsLTIuNjMyNzc5ODM2NjU0NjYzXSwicm90YXRpb24iOlswLC0wLjg3NDA2OTE1NDI2MjU0MjcsMCwwLjQ4NTgwMTUxNzk2MzQwOTRdLCJtZXNoIjowfV0sInNjZW5lcyI6W3sibmFtZSI6IlNjZW5lIiwibm9kZXMiOlswXX1dLCJzY2VuZSI6MCwiZXh0ZW5zaW9uc1VzZWQiOlsiS0hSX2RyYWNvX21lc2hfY29tcHJlc3Npb24iXSwiZXh0ZW5zaW9uc1JlcXVpcmVkIjpbIktIUl9kcmFjb19tZXNoX2NvbXByZXNzaW9uIl19ICgBAABCSU4ARFJBQ08CAgEBAAAADBACEAEABf/SqqoC/wERhgWIIILlgZ4FbCLtCIED/wAAAAEAAQEAAQAJAwAAAgEBCQMAAQMBAwkCAAICAQEBAA8DARAnVQWtCgEgBQCbYceGbB9v9L6QCwCgyZMQAMhHCbkb7NIAGACILMH23Q0X/dq/G7sv5AIAaHIEwABAZAkAAAAA/z8AADCJDz6srrS70czwPUA+Tz4OAAMBAAsDsTMb7QRlBwVu3Gj9pP8BAPDfqABwzRXwHwAAXHMFAP8DAAD/AQAACgEBAQANAzEaG70I0QUDRRcHuxlEtd6rlxxTtPxBtPsB6ATR4o5zPJceDAAdDOtjjSsBsHwHAGQkALgJAGsCAAAAAP8PAAAE+rE8uI+zPbmRNT8MAAA=",Rt=""+new URL("room2.ktx2",import.meta.url).href,_t=""+new URL("chairs.ktx2",import.meta.url).href,St=""+new URL("wood.ktx2",import.meta.url).href,wt=""+new URL("cups.ktx2",import.meta.url).href,Nt=""+new URL("nout.ktx2",import.meta.url).href,Ee={room:{map:Rt},chairs:{map:_t},wood:{map:St},cups:{map:wt},Nout:{map:Nt}},Q=Qo(Ee),gt=new C(0,0,0);function X(o){return{visible:o,raycast:o?oe:b}}function j(o,t=!1){const s=Go(Q),{scene:a}=_(o);return O.useMemo(()=>(Zo(a,zo(Q,s),Ee,{interactive:t}),a),[a,s,t])}function x({body:o,widget:t,anchor:s,focusPoint:a=s,offset:r,highlightY:u,highlightAnchor:d,children:E,always:A,present:n=!0}){const T=l(f=>f.focusedWidget===t),m=O.useMemo(()=>$(F,a,r),[a,r]),i=M({widgetName:t,cameraPosition:m.position,cameraTarget:m.target,debugName:`focusCafe${t}`});return ko(T),e.jsxs("group",{onClick:i,...X(n),children:[o,n&&e.jsx("group",{position:s,children:e.jsx(g,{widget:t,positionY:u,anchor:d,onClick:i})}),n&&A,T&&E]})}function K({url:o,...t}){const s=j(o,!0);return e.jsx(x,{...t,body:e.jsx("primitive",{object:s})})}function bt({present:o}){const t=j(V,!0),s=l(r=>r.isLaptopTurnedOn),a=M({widgetName:c.LAPTOP,debugName:"focusCafeLaptop"});return e.jsxs("group",{onClick:a,...X(o),children:[e.jsx("primitive",{object:t}),o&&e.jsx("group",{position:L,children:e.jsx(g,{widget:c.LAPTOP,positionY:ne,anchor:"bottom"})}),e.jsx(W,{isHidden:!s||!o,name:k.LAPTOP,scale:ie,position:L,rotation:ae})]})}function pe({look:o,position:t,yaw:s=0,seat:a,lookAt:r,visible:u}){return e.jsx("group",{position:t,rotation:[0,s,0],visible:u,raycast:b,children:e.jsx(D,{person:o,seat:a,lookAt:r,htmlBadge:!1})})}const Ct={variant:"patron",pose:"sit",carrying:null},jt=new C(...v(Ho));function xt(){const o=j(V,!0),t=O.useMemo(()=>o.clone(),[o]),s=M({widgetName:c.ATTACKER_LAPTOP,debugName:"focusCafeAttackerLaptop"}),a=l(r=>r.focusedWidget===c.ATTACKER_LAPTOP);return e.jsxs(e.Fragment,{children:[e.jsx(pe,{look:Ct,position:So,seat:_o,lookAt:jt,visible:!a}),e.jsx("group",{position:No,rotation:[0,wo,0],onClick:s,children:e.jsxs("group",{position:go,children:[e.jsx("primitive",{object:t}),e.jsx("group",{position:L,children:e.jsx(g,{widget:c.ATTACKER_LAPTOP,positionY:ne,anchor:"bottom"})}),e.jsx(W,{name:k.ATTACKER_LAPTOP,scale:ie,position:L,rotation:ae})]})})]})}const Lt={variant:"alice",pose:"sit",carrying:null},Pt=new C(...v(Fo)),yt=new Set([c.LAPTOP,c.PHONE,c.NOTEBOOK,c.TABLE_TENT,c.RECEIPT,c.CHARGER]);function vt(){const o=l(t=>t.focusedWidget!==null&&yt.has(t.focusedWidget));return e.jsx(pe,{look:Lt,position:Ro,yaw:fo,seat:Io,lookAt:Pt,visible:!o})}const Ut={variant:"alice",pose:"stand",carrying:null},H=G["cafe-counter"],Mt=new C(...v(H.gaze));function Bt(){return e.jsxs("group",{position:H.position,"rotation-y":H.yaw,raycast:b,children:[e.jsx(D,{person:Ut,lookAt:Mt,htmlBadge:!1}),e.jsx(re,{})]})}function Ht({present:o}){const t=j(Te,!0),s=M({widgetName:c.PHONE,debugName:"focusCafePhone"});return e.jsxs("group",{onClick:s,...X(o),children:[e.jsx("primitive",{object:t}),o&&e.jsx("group",{position:bo,children:e.jsx(g,{widget:c.PHONE,positionY:0,anchor:"bottom"})}),e.jsx("group",{position:Co,rotation:z,children:e.jsx(W,{isMobile:!0,isHidden:!o,name:k.PHONE,scale:yo,position:gt,frameExtraBottom:Po,cornerRadiusPx:Lo,cornerFill:xo,heightPx:jo})}),o&&e.jsx(Jo,{name:"cafe-phone-home-button",anchor:Bo,rotation:z,size:Mo,innerRadius:Uo,outerRadius:vo})]})}function Dt(){const o=l(i=>i.setNextAction),t=l(i=>ke(i.exercise)),s=l(i=>We(i.exercise)),a=l(i=>De(i.exercise)),r=l(i=>Ye(i.exercise)),u=l(i=>i.exercise),d=l(i=>i.aliceArrived),E=l(i=>i.aliceAway),A=l(i=>i.belongingsTaken),n=Ve(u,{aliceArrived:d,aliceAway:E,belongingsTaken:A}),T=n.aliceSeated||n.aliceAtCounter,m=j(Ae);return e.jsxs("group",{position:F,children:[e.jsx("primitive",{object:m}),e.jsx(nt,{}),n.aliceSeated&&e.jsx(vt,{}),n.aliceAtCounter&&e.jsx(Bt,{}),e.jsx(bt,{present:n.laptop}),n.bag&&e.jsx(ft,{}),t&&e.jsx(xt,{}),e.jsx(lt,{}),e.jsx(Ht,{present:n.phone}),e.jsx(K,{url:he,widget:c.NOTEBOOK,anchor:Ze,offset:Xe,highlightY:0,highlightAnchor:"bottom",always:e.jsx(ze,{}),present:T}),e.jsx(K,{url:me,widget:c.ROUTER,anchor:Ke,offset:Qe,highlightY:Je,children:e.jsx(qe,{position:oo,rotation:eo,scale:$e})}),s&&e.jsx(x,{body:e.jsx(ro,{}),widget:c.TABLE_TENT,anchor:ao,focusPoint:no,offset:so,highlightY:to,highlightAnchor:"bottom",always:e.jsx(io,{})}),a&&e.jsx(x,{body:e.jsx(Ao,{}),widget:c.RECEIPT,anchor:lo,offset:co,highlightY:0,highlightAnchor:"bottom",always:e.jsx(uo,{}),present:T}),r&&e.jsx(x,{body:e.jsx(Oo,{}),widget:c.CHARGER,anchor:Eo,focusPoint:ho,offset:To,highlightY:mo,highlightAnchor:"bottom",always:e.jsx(po,{})}),e.jsx(Wo,{onComplete:o})]})}_.preload(Ae);_.preload(me);_.preload(V);_.preload(Te);_.preload(he);export{Dt as default};
