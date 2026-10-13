// Roll axle (print 2). Fixed: the 12 mm journal sits in the roll arm's hook,
// the knob stays outside and the collar inside, and the 8 mm pin presses into
// the 608 bearing in the roll hub, so the roll turns on the bearings.
//
// Print standing on the knob, no supports.

include <common.scad>

knob_d = 20; knob_h = 8;
journal_d = 12;
collar_d = 16;
gap = paper_x0 - 3 - (arm_x[0] + arm_t);   // arm inner face to hub flange
pin_d = rod_d + 0.05;                       // light press into the 608 race

difference() {
    union() {
        cylinder(d = knob_d, h = knob_h, $fn = 96);
        cylinder(d = journal_d, h = knob_h + arm_t + 0.5);
        translate([0, 0, knob_h + arm_t + 0.5]) cylinder(d = collar_d, h = gap - 0.5);
        cylinder(d = pin_d, h = knob_h + arm_t + gap + b608_w);
    }
    // grip flutes on the knob
    for (a = [0 : 20 : 359]) rotate(a) translate([knob_d / 2 + 0.3, 0, -1]) cylinder(d = 2.4, h = knob_h + 1);
}
