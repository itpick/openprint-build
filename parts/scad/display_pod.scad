// Display pod (print 1): the Openprinter's black wedge on top of the right end
// that holds the 1.47" LCD, plus the deck it stands on, which also carries the
// EC11 jog encoder for the knob beside it.
//
// Measured from Open Tools' see-through CAD front view and top/side renders:
// pod 48 wide at 406..454 mm from the left outer edge, ~25 tall above the body,
// a wedge in side view with the screen on its sloped front face; knob centre
// 25 mm in from the right outer edge.
//
// Display: Waveshare 1.47" LCD module (ST7789, 172 x 320): board 22 x 38.5,
// glass 19.39 x 36.28 x 1.46, active area 17.39 x 32.35, 4 holes on 31.5 x
// 15.05 (from its STEP model, under the glass, so not usable from the front).
// The glass sits in a recess behind the window; hold the board against it
// with foam tape or a dab of hot glue. The cable goes down through the deck.
// Encoder: EC11, M7 x 0.75 bushing through the deck, nut on top.
//
// The deck sits on the top of the right end wall and the right rod bracket;
// 2x M3 x 12 self-tap into each. Print as output (deck on the bed), no
// supports: the wedge faces lean ~35 degrees from vertical.

include <common.scad>

deck_t   = 3;
deck_x   = [406 - wall - 6, L + wall];                // over the right bay to the outer face
deck_y   = [rod_y - 9.5, 68];
pod_x    = [406 - wall, 454 - wall];                   // measured, in frame X
pod_y    = [30, 62];                                   // footprint front-to-back
pod_h    = 22;                                         // above the deck
apex_y   = 46;
pod_r    = 6;                                          // front-view corner radius
skin     = 2;
knob_x   = L + wall - 25;
knob_y   = 46;

// display module
lcd_glass  = [36.28, 19.39, 1.46];   // along X, along the face, thickness
lcd_active = [32.35, 17.39];
lcd_holes  = [31.5, 15.05];

z0 = height;                          // deck underside = top of the frame

// face geometry: front face from (pod_y[1], deck top) up to the apex
face_run = pod_y[1] - apex_y;
face_ang = atan2(pod_h, face_run);    // from horizontal
face_mid = [(pod_y[1] + apex_y) / 2, z0 + deck_t + pod_h / 2];

module wedge(inset = 0) {
    // side profile (Y, Z) extruded along X ...
    intersection() {
        translate([pod_x[0] + inset, 0, 0]) rotate([90, 0, 90])
            linear_extrude(pod_x[1] - pod_x[0] - 2 * inset)
            offset(delta = -inset) polygon([[pod_y[0], z0 + deck_t - 0.01], [pod_y[1], z0 + deck_t - 0.01],
                                            [apex_y, z0 + deck_t + pod_h]]);
        // ... intersected with the rounded front-view outline
        translate([0, pod_y[0] - 1, 0]) rotate([90, 0, 0]) mirror([0, 0, 1])
            linear_extrude(pod_y[1] - pod_y[0] + 2)
            offset(r = pod_r - inset) offset(delta = -pod_r)
            translate([pod_x[0], z0 + deck_t - 20]) square([pod_x[1] - pod_x[0], pod_h + 20]);
    }
}

// transform into the front face's plane: local X along X, local Y up the
// face, local Z out of the face
module on_face() {
    translate([(pod_x[0] + pod_x[1]) / 2, face_mid[0], face_mid[1]])
        rotate([-face_ang, 0, 0]) children();
}

module display_pod() {
    difference() {
        union() {
            // deck
            translate([deck_x[0], deck_y[0], z0]) cube([deck_x[1] - deck_x[0], deck_y[1] - deck_y[0], deck_t]);
            wedge();
        }
        // hollow wedge, open through the deck for the board and cable
        difference() {
            wedge(skin);
            translate([0, 0, -50]) cube([1000, 1000, z0 + deck_t + 50]);
        }
        translate([pod_x[0] + skin, pod_y[0] + skin, z0 - 1])
            cube([pod_x[1] - pod_x[0] - 2 * skin, pod_y[1] - pod_y[0] - 2 * skin - 4, deck_t + 2]);
        // screen window + glass recess from the inside
        on_face() {
            translate([-lcd_active[0] / 2 - 0.3, -lcd_active[1] / 2 - 0.3, -5]) cube([lcd_active[0] + 0.6, lcd_active[1] + 0.6, 10]);
            translate([-lcd_glass[0] / 2 - 0.2, -lcd_glass[1] / 2 - 0.2, -skin - 5]) cube([lcd_glass[0] + 0.4, lcd_glass[1] + 0.4, 5 + skin - 0.8]);
        }
        // encoder: M7 bushing
        translate([knob_x, knob_y, z0 - 1]) cylinder(d = 7.3, h = deck_t + 2);
        // deck screws: two into the end wall top, two into the rod bracket top
        for (y = [deck_y[0] + 5, deck_y[1] - 5])
            translate([L + wall / 2, y, z0 - 1]) cylinder(d = m3, h = deck_t + 2);
        for (x = [rbr_x + 5, pulley_x - nema_w / 2 - 6])
            translate([x, rod_y - 3, z0 - 1]) cylinder(d = m3, h = deck_t + 2);
    }
}

// print orientation: deck on the bed
translate([0, 0, -z0]) display_pod();
