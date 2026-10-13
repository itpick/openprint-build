// Shared parameters for the openprint-build printable parts.
//
// These are NOT Open Tools' files (unpublished as of Oct 2026). They are
// original, parametric parts built around standard off-the-shelf components.
// Values marked VERIFY are best estimates: measure your part and edit here.
//
// Coordinate frame used by the axis parts:
//   X = carriage travel (along the guide rods)
//   Y = front (+) / back (-)
//   Z = up
// Lower rod axis at y=0,z=0; upper rod at y=0,z=rod_spacing.

$fn = 64;

clr        = 0.3;    // general fit clearance (Prusa CORE One, 0.4 nozzle)

// Guide rods + linear bearings
rod_d       = 8;     // steel guide rod
rod_spacing = 30;    // vertical distance between the two rods
lm_d        = 15;    // LM8UU outer diameter
lm_l        = 24;    // LM8UU length
lm_fit      = 0.15;  // press fit allowance on LM8UU bore

// GT2 belt drive
belt_w      = 6;     // GT2 6 mm belt
belt_t      = 1.4;   // belt thickness incl. teeth
belt_pitch  = 2;
pulley_pr   = 6.37;  // pitch radius of a GT2 20T pulley / idler
belt_y      = -18;   // belt centre plane (behind the rods)
belt_z      = rod_spacing / 2;   // pulley axis height

// NEMA17
nema_w      = 42.3;
nema_holes  = 31;    // hole spacing
nema_boss   = 22.5;  // centring boss clearance
m3          = 3.4;   // M3 clearance
m3_tap      = 2.8;   // M3 self-tap into plastic
m5          = 5.3;
m5_tap      = 4.3;
m4          = 4.4;

// HP 63 / 302 / 803 cartridge body (same shell for black + tri-colour)
// VERIFY: measure with calipers, or print cart_fit_gauge.stl first.
cart_w      = 19.0;  // along X (thin side)
cart_d      = 36.5;  // along Y (front-back, contact pad on the back face)
cart_fit    = 0.6;   // total clearance per dimension

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

// ---------------------------------------------------------------------------
// Machine layout (frame coordinates). Origin: inner face of the left end wall,
// back face of the tray, bottom of the base. X right, Y toward the front, Z up.
// The axis parts above are modelled around their own rod; place them with
// rod_y / rod_z below.

L        = 525;      // inner length between end walls (outer = L + 2*wall)
wall     = 6;        // end wall / tray wall thickness
base_t   = 4;        // tray floor
depth    = 130;      // tray depth (Y)
height   = 105;      // tray height (Z), excluding roll arms

rod_y    = 70;       // both rods in one vertical plane
rod_z    = 50;       // lower rod; upper rod at rod_z + rod_spacing
paper_z  = 37;       // paper plane (top of platen ribs, the nip)
paper_x0 = 94;       // paper zone, 297 mm (A4 width / A3 roll)
paper_x1 = paper_x0 + 297;

pulley_x = 25;       // carriage motor pulley (left)
idler_x  = 445;      // belt idler (right)

feed_y   = 38;       // feed roller shaft (driven, top of the nip)
feed_r   = 12.3;     // TPU sleeve radius, 0.3 interference on the pinch
feed_z   = paper_z + 12;
pinch_z  = paper_z - 11;    // 608 bearings (r = 11) roll on the pinch shaft

pillar_x = [47, 425];       // inboard shaft supports (left edge of each, 8 wide)

roll_y   = 50;       // roll spindle axis
roll_z   = 155;
b608_d   = 22;
b608_w   = 7;

split_x  = [175, 350];      // tray section joints
