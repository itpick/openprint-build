// Print carriage: rides two 8 mm rods, holds two HP 63/302 cartridges.
//
// Lower rod: two LM8UU pressed in from each end (rod constrains Y and Z).
// Upper rod: a vertical slot (constrains Y only) so the two rods never fight.
// Belt: both ends of a GT2 belt clamp into the toothed slots at the back.
// Cartridges: drop in from the top; nozzles poke through the bottom. The
// contact pad on the back face of each cartridge meets a recess for a
// harvested HP carriage flex (cable exits upward). An M3 screw through the
// front wall pushes each cartridge back onto its contacts.
//
// Print: as modelled, flat bottom down, no supports. PETG/ASA, 4 perimeters.

include <common.scad>

W      = 60;                         // along X
body_y = 10.5;                       // body spans y = ±body_y
z_bot  = -11;
z_top  = rod_spacing + 11;

pocket_w = cart_w + cart_fit;
pocket_d = cart_d + cart_fit;
pocket_y0 = body_y + 2;              // pocket back face
front_t   = 3;
pocket_top = 14;
wall_x    = (W - 2 * pocket_w) / 3;
pocket_x  = pocket_w / 2 + wall_x / 2;   // pocket centres at ±pocket_x

clamp_x   = 12;                      // belt clamp length along X
clamp_y0  = -24;
belt_top  = belt_z + pulley_pr;      // upper belt run (the one we clamp)
slot_h    = belt_t + 0.2;

module body() {
    difference() {
        translate([-W / 2, -body_y, z_bot])
            cube([W, 2 * body_y, z_top - z_bot]);

        // Lower rod: LM8UU bores from both ends, narrower stop in the middle.
        for (s = [-1, 1])
            translate([s * (W / 2 - lm_l / 2 + 0.5), 0, 0])
                teardrop_x(lm_d + lm_fit, lm_l + 1);
        teardrop_x(12, W + 2);

        // Upper rod: slot, tight in Y, free in Z.
        translate([-W / 2 - 1, -(rod_d + 0.6) / 2, rod_spacing - 7])
            cube([W + 2, rod_d + 0.6, 14]);
    }
}

module pockets() {
    difference() {
        translate([-W / 2, body_y - 0.01, z_bot])
            cube([W, pocket_y0 - body_y + pocket_d + front_t, pocket_top - z_bot]);

        for (s = [-1, 1]) translate([s * pocket_x, 0, 0]) {
            // Main pocket, open at the top.
            translate([-pocket_w / 2, pocket_y0, z_bot + 1.5])
                cube([pocket_w, pocket_d, 100]);
            // Nozzle opening: narrower, leaves a 1.5 mm ledge each side.
            translate([-pocket_w / 2 + 1.5, pocket_y0 + 1.5, z_bot - 1])
                cube([pocket_w - 3, pocket_d - 3, 10]);
            // Flex/contact recess in the back wall, open to the top.
            translate([-(pocket_w - 2) / 2, pocket_y0 - 1.2, z_bot + 4])
                cube([pocket_w - 2, 1.3, 100]);
            // M3 retaining screw through the front wall.
            translate([0, pocket_y0 + pocket_d + front_t / 2, 2])
                teardrop_y(m3_tap, front_t + 2);
        }
    }
}

module belt_clamps() {
    for (s = [-1, 1])
        translate([s * (W / 2 - clamp_x / 2), 0, 0])
        difference() {
            translate([-clamp_x / 2, clamp_y0, belt_top - 4.5])
                cube([clamp_x, -body_y - clamp_y0 + 0.01, 10]);
            // Belt slot, open to the back so the belt slides in.
            translate([-clamp_x / 2 - 1, clamp_y0 - 1, belt_top - slot_h / 2])
                cube([clamp_x + 2, -clamp_y0 - 14.5 + 1, slot_h]);
            // Zip-tie channel around the clamp.
            translate([0, clamp_y0 + 4, belt_top])
                difference() {
                    cube([3.5, 12, 14], center = true);
                    cube([3.5 + 1, 8, 10], center = true);
                }
        }
    // Teeth: ridges on the slot floor that mesh with the GT2 belt teeth.
    for (s = [-1, 1])
        for (i = [0 : clamp_x / belt_pitch - 1])
            translate([s * (W / 2 - clamp_x / 2) - clamp_x / 2 + i * belt_pitch + 0.5,
                       clamp_y0, belt_top - slot_h / 2 - 0.01])
                cube([1, -clamp_y0 - 14.5, 0.75]);
}

module carriage_body_all() {
    body();
    pockets();
    belt_clamps();
}

carriage_body_all();
