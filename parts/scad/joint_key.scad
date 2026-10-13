// Butterfly key for the frame joint (print 1 of each). Push the platen key up
// through the floor and drop the back key into the back joint block from the
// top, then fit the four M3 x 16 screws + nuts across the seam.
//
//   -D 'which="platen"' or -D 'which="back"'
//
// Print standing on one flat end face (as modelled), no supports: the flared
// sides lean only ~17 degrees from vertical.

include <common.scad>

which = "platen";
h = which == "platen" ? paper_z : back_key_h;

// key length (across the seam) becomes Z, key height becomes X
translate([0, 0, key_l / 2]) rotate([0, -90, 0]) linear_extrude(h, center = true) key_profile(0);
