// Pinch pad (print 2, TPU 95A). Drops into the pocket in the platen under each
// feed roller; its top stands 0.3 mm above the paper plane, so the roller
// squeezes the paper against it.

include <common.scad>

pad_w = roller_l + 4;
pad_d = 20;

difference() {
    cube([pad_w, pad_d, paper_z + 0.3 - base_t]);
    // relief slots so the top flexes rather than the whole block
    for (y = [4, pad_d - 6]) translate([-1, y, 2]) cube([pad_w + 2, 2, paper_z - base_t - 5]);
}
