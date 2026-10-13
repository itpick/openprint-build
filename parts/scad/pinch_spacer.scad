// Spacers that hold the four 608 pinch bearings under the feed sleeves on the
// fixed 8 mm pinch shaft (pillars at x = 55 and 425). Print one of each
// length, upright. Lengths follow from the sleeve centres in feed_sleeve.scad.

include <common.scad>

centres = [115, 190, 278, 352];
lens = [
    centres[0] - b608_w / 2 - (pillar_x[0] + 8),
    centres[1] - centres[0] - b608_w,
    centres[2] - centres[1] - b608_w,
    centres[3] - centres[2] - b608_w,
    pillar_x[1] - (centres[3] + b608_w / 2),
];
echo(spacer_lengths = lens);

i = 0;   // -D i=0..4

difference() {
    cylinder(d = 12, h = lens[i] - 0.3);
    translate([0, 0, -1]) cylinder(d = rod_d + 0.3, h = 200);
}
