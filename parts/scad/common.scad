// Shared parameters for the openprint-build printable parts (v2).
//
// These are NOT Open Tools' files (unpublished as of Oct 2026). They are
// original, parametric parts that follow the Openprinter's visible layout,
// measured from Open Tools' own photos, renders and see-through CAD drawing.
// Values marked VERIFY are best estimates: measure your part and edit here.
//
// Frame coordinates (all parts): origin at the inner face of the left end
// wall, the back face of the tray and the desk. X right, Y toward the front,
// Z up. The Openprinter's steel floor sits 12 mm up on feet; ours is the desk,
// so interior heights below are theirs + 12.

$fn = 64;

clr        = 0.3;    // general fit clearance (Prusa CORE One, 0.4 nozzle)

// ---- bought parts (datasheet / measured) -------------------------------------

rod_d       = 8;     // steel rod, h6
lm_d        = 15;    // LM8UU (THK LM 8): 8 x 15 x 24
lm_l        = 24;
lm_fit      = 0.15;  // press fit allowance on the LM8UU bore
b608_d      = 22;    // 608: 8 x 22 x 7
b608_w      = 7;

belt_w      = 6;     // GT2 6 mm
belt_t      = 1.4;
belt_pitch  = 2;
pulley_pr   = 6.37;  // GT2 20T pitch radius (12.73 pitch dia)
pulley_od   = 16;    // GT2 20T, 5 mm bore: 16 OD x 16 long
pulley_l    = 16;
idler_od    = 11.5;  // 2x F623ZZ flanged bearings (3 x 10 x 4, flange 11.5)
idler_wd    = 8;

// NEMA17, Hanpose 17HS3401 datasheet: 42.3 max square, holes 31 +/- 0.1 (M3,
// 4.5 deep), boss 22 x 2, shaft 5 x 24 +/- 0.5 from the face (vendors 21..25).
// The Openprinter uses STEPPERONLINE 17HE12-1204S (read off the label).
nema_w      = 42.3;
nema_l      = 34;    // carriage motor: 34 mm body (sits in front of its plate)
nema_l_max  = 40;    // the feed motor bay takes 34 or 40
nema_holes  = 31;
nema_boss   = 22.5;  // centring boss clearance (boss is 22 x 2)
nema_shaft  = 24;
conn_w      = 16;    // 6-pin JST-PH socket on the rear side of the body:
conn_l      = 10;    //   width, length along the axis,
conn_h      = 8;     //   protrusion incl. the plug
coupler_d   = 19;    // 5 -> 8 mm beam coupler, D19 L25
coupler_l   = 25;

m3          = 3.4;   // M3 clearance
m3_tap      = 2.8;   // M3 self-tap into plastic
m5          = 5.3;
m4          = 4.4;

// HP 63 / 302 / 123 / 803 cartridge; black and tri-colour share the shell.
// Measured from a professional 3D scan of an HP 123 (PrintSpider project,
// hackaday.io/project/176931), confirmed by an SLA holder printed from it.
// Heights are from the nozzle plane; depths from the contact (back) face.
cart_w      = 28.0;  // body width (X): 27.0 at the snout growing to 28.0
cart_ear_w  = 32.1;  // across the side ears
cart_d      = 48.2;  // contact face to front, at the lid flange (max)
cart_h      = 45.7;  // nozzle plane to the top of the lid tabs
cart_ear_z  = 36.0;  // underside of the ears
cart_snout  = 19.8;  // snout depth from the contact face (below cart_step_z)
cart_step_z = 12.0;  // the body steps out to full depth this high
cart_pad_z  = [9.5, 22];   // contact pad field
cart_fit    = 0.5;   // total clearance per dimension

// Teardrop: horizontal hole that prints without supports.
// Axis along X; point faces +Z.
module teardrop_x(d, l) {
    // rotate([0,90,0]) maps 2D -X to 3D +Z, so the point goes at 180°.
    rotate([0, 90, 0])
    linear_extrude(height = l, center = true)
        union() {
            circle(d = d);
            rotate(135) square(d / 2);  // 45° roof
        }
}

// Same, axis along Y.
module teardrop_y(d, l) {
    // rotate([90,0,0]) maps 2D +Y to 3D +Z.
    rotate([90, 0, 0])
    linear_extrude(height = l, center = true)
        union() {
            circle(d = d);
            rotate(45) square(d / 2);
        }
}

// ---- envelope (Open Tools' chassis drawing + dimension renders) --------------
// Chassis 496.5 long, end profile ~102 deep x 106 tall with R12 corners, paper
// 86..383 mm from the left outer edge.

wall     = 6;        // end wall thickness
back_t   = 4;        // back wall thickness
L        = 496.5 - 2 * wall;   // 484.5 inner length between end walls
base_t   = 4;        // tray floor
depth    = 102;      // tray depth (Y), outer
height   = 106;      // tray height (Z)
corner_r = 12;       // end wall front corners

paper_x0 = 86 - wall;          // 80: paper zone, 297 mm (A4 width / A3 roll)
paper_x1 = paper_x0 + 297;     // 377

// ---- paper path ----------------------------------------------------------------
// Paper drops from the roll down the back wall, turns forward on a curved
// lead-in, runs flat under the carriage and is pulled out the front by two
// rollers on the feed shaft. The feed shaft sits low and forward (the rod with
// the two white rollers in Open Tools' photos), under the cartridges' front
// half, coaxial with the feed motor at the right end.

feed_y    = 80;      // feed shaft
feed_z    = 27;      // their feed motor centre, 15 above their floor
roller_r  = 6;       // TPU roller on the feed shaft (white on theirs)
paper_z   = feed_z - roller_r;      // 21: top of the platen ribs
roller_x  = [paper_x0 + 297 * 0.25, paper_x0 + 297 * 0.75];
roller_l  = 12;
lead_r    = 15;      // curved lead-in radius at the back of the platen

// ---- carriage + rods -----------------------------------------------------------
// Cartridges hang by their ears in front of a vertical contact plate; two rods
// and the belt run behind the plate, belt on top (Open Tools' cover-off photos).

nozzle_z  = paper_z + 1.5;                // nozzle plane, 1.5 above the paper
cart_y0   = depth - 2.5 - cart_d - 0.5;   // contact face = plate front (50.8)
plate_t   = 7;                            // contact plate thickness
rod_y     = cart_y0 - plate_t - 9.5;      // both rods, one vertical plane (34.3)
rod_z     = [nozzle_z + 11.5, nozzle_z + 29.5];   // lower (LM8UU), upper (slot)
carr_bw   = 25;                           // carriage body half-width (behind the plate)
belt_y    = rod_y;                        // belt in the rod plane, above the rods
belt_zf   = 59 + 12;                      // pulley axis = their carriage motor centre
pocket_x  = (cart_ear_w + cart_fit) / 2 + 1.2;   // pocket centres at +/- this
carr_hw   = pocket_x + (cart_ear_w + cart_fit) / 2 + 2.4;  // half-width over the holder

lbr_w     = 13;                           // left rod/idler bracket width
c_min     = lbr_w + 1 + carr_bw;          // park, over the spit pad (39)
c_max     = paper_x1 - 10;                // colour nozzles past the paper's right edge

// ---- right end: both motors ----------------------------------------------------
// See-through CAD: carriage motor flush right, centre 23.2 from the outer face
// and 59 above their floor, shaft along Y; feed motor under it, axis X.

mplate_t  = 4;                               // carriage motor plate
mplate_y  = belt_y + 4.5;                    // plate back face (pulley teeth next to it)
mface_y   = mplate_y + mplate_t;             // motor face; body toward +Y
pulley_x  = L - 0.5 - nema_w / 2;            // 462.85 (ours: 4.5 further in, thicker wall)
feed_mx   = L - 0.5 - nema_l_max;            // feed motor face (444)
coupler_x = feed_mx - nema_shaft + 11 - coupler_l;   // 11 mm of each shaft inside
rbr_x     = c_max + carr_bw + 2;             // right rod bracket, left face
rod_sock  = 12;
rod_len   = rbr_x + rod_sock + wall;         // rods slide in through the left wall
feed_len  = coupler_x + 11 + wall;           // feed shaft: left wall to coupler
idler_x   = 7;                               // idler in the left bracket

// ---- roll ------------------------------------------------------------------------
roll_y   = 40;       // roll axis, from the back face
roll_z   = 190;
roll_od  = 95;
arm_t    = 5;
arm_x    = [paper_x0 - 7 - arm_t, paper_x1 + 7];

split_x  = L / 2;    // one joint: two 248.25 mm halves (CORE One bed is 250)

// Frame joint (frame.scad + joint_key.scad): butterfly keys across the seam.
key_neck   = 6;
key_end    = 11;
key_l      = 16;
bj_y       = [-10, 0];            // back joint block, outside the back wall
bj_yc      = (bj_y[0] + back_t) / 2;
bj_z       = [0, height - 8];
back_key_h = bj_z[1] - bj_z[0] - 32;

module key_profile(c = 0) {
    polygon([[-key_l / 2 - c, -key_end / 2 - c], [0, -key_neck / 2 - c],
             [key_l / 2 + c, -key_end / 2 - c], [key_l / 2 + c, key_end / 2 + c],
             [0, key_neck / 2 + c], [-key_l / 2 - c, key_end / 2 + c]]);
}
