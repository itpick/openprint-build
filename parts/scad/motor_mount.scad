// Motor mount (print 1), the Openprinter's black right-hand bracket: the
// carriage motor's face plate with a gusset, and the upright that holds the
// right ends of both rods. It also carries the display pod's deck on top.
//
//   - carriage motor (NEMA17, body in front, shaft toward -Y) bolts to the
//     front of the plate; the GT2 pulley sits behind it in the belt plane.
//     Slide the pulley into the gap, then push the motor shaft through the
//     plate into it from the front
//   - both rods slide in through the left end wall and bottom out in blind
//     sockets here; the belt passes through a window above them
//   - 4x M3 x 12 button heads up through the frame floor into the foot
//
// Print upright (as output), no supports.

include <common.scad>

px0 = pulley_x - nema_w / 2 - 0.5;   // plate left edge
x1  = L - 0.3;                         // clear of the end wall
z0  = base_t;                          // stands on the frame floor

module motor_mount() {
    difference() {
        union() {
            // foot under the plate, behind it
            translate([px0, rod_y - 9.5, z0]) cube([x1 - px0, mplate_y + mplate_t - rod_y + 9.5, mm_foot_t]);
            // rod upright, from the bracket's left face to the plate
            translate([rbr_x, rod_y - 9.5, z0]) cube([px0 - rbr_x + 0.01, 18.5, height - z0]);
            // motor plate
            translate([px0, mplate_y, z0]) cube([x1 - px0, mplate_t, height - z0]);
            // gusset behind the plate, clear of the pulley
            translate([x1 - 6, mplate_y + 0.01, z0]) rotate([90, 0, 90]) linear_extrude(4)
                polygon([[0, 0], [-(mplate_y - rod_y + 9.5), 0], [0, 45]]);
        }
        // rod sockets
        for (z = rod_z)
            translate([rbr_x + rod_sock / 2 - 0.5, rod_y, z]) teardrop_x(rod_d + 0.15, rod_sock + 1);
        // belt window
        translate([rbr_x - 1, belt_y - belt_w / 2 - 1.5, belt_zf - pulley_pr - 4])
            cube([px0 - rbr_x + 2, belt_w + 3, 2 * pulley_pr + 8]);
        // motor: boss + 4 screws
        translate([pulley_x, mplate_y + mplate_t / 2, belt_zf]) teardrop_y(nema_boss, mplate_t + 2);
        for (dx = [-1, 1], dz = [-1, 1])
            translate([pulley_x + dx * nema_holes / 2, mplate_y + mplate_t / 2, belt_zf + dz * nema_holes / 2])
                teardrop_y(m3, mplate_t + 2);
        // cable pass
        translate([px0 + 8, mplate_y - 1, z0 + mm_foot_t]) cube([14, mplate_t + 2, 10]);
        // floor bolts (self-tap) and display pod deck screws
        for (p = mm_bolts) translate([p[0], p[1], z0 - 1]) cylinder(d = m3_tap, h = 13);
        for (x = [rbr_x + 5, pulley_x - nema_w / 2 - 6])
            translate([x, rod_y - 3, height - 12]) cylinder(d = m3_tap, h = 13);
    }
}

// print orientation: foot on the bed
translate([0, 0, -z0]) motor_mount();
