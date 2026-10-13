// Print this FIRST (10 min). One pocket of the carriage holder, short: the
// cartridge's ears should rest on the two ledges with the body hanging free
// and the contact face against the back wall. If it doesn't fit, change the
// cart_* values in common.scad (they come from a 3D scan, not HP) and
// re-render everything.

include <common.scad>

pw = cart_ear_w + cart_fit;     // across the ears
bw = cart_w + cart_fit;         // body below the ears
d  = cart_d + cart_fit;
t  = 2.4;

difference() {
    translate([-pw / 2 - t, -t, 0]) cube([pw + 2 * t, d + 2 * t, 10]);
    // body opening, all the way through
    translate([-bw / 2, 0, -1]) cube([bw, d, 12]);
    // ear pocket above the 2.5 mm ledges
    translate([-pw / 2, 0, 2.5]) cube([pw, d, 10]);
    // which-way-round notch on the contact (back) side
    translate([-3, -t - 1, 6]) cube([6, t + 2, 5]);
}
