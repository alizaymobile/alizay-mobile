---
name: Kinetic Glass
colors:
  surface: '#0c1322'
  surface-dim: '#0c1322'
  surface-bright: '#323949'
  surface-container-lowest: '#070e1d'
  surface-container-low: '#141b2b'
  surface-container: '#191f2f'
  surface-container-high: '#232a3a'
  surface-container-highest: '#2e3545'
  on-surface: '#dce2f7'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#dce2f7'
  inverse-on-surface: '#293040'
  outline: '#869397'
  outline-variant: '#3d494c'
  surface-tint: '#4cd7f6'
  primary: '#4cd7f6'
  on-primary: '#003640'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#00687a'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#e79400'
  on-tertiary-container: '#563400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0c1322'
  on-background: '#dce2f7'
  surface-variant: '#2e3545'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-numeric:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system projects performance, precision engineering, and hyper-modern durability. Built to bridge a customer-facing e-commerce showcase with an operational admin console, the visual tone balances the tactile allure of premium consumer tech hardware with the rigorous utility needed for high-velocity inventory and order management.

The aesthetic fuses **refined glassmorphism** with **high-contrast dark mode minimalism**. Surfaces mimic aerospace-grade dark glass and brushed composites: deep obsidian backdrops, ultra-fine luminescence on outer perimeters, and controlled neon energy conduits that direct visual focus directly to conversion drivers and status critical paths. The emotional response is immediate confidence, high technical capability, and premium craftsmanship.

## Colors

The palette operates in strict chromatic tiers designed for OLED display efficiency and focused visual hierarchy:

- **Base Canvas (`#090D16`):** Deep cosmic slate canvas providing foundational contrast.
- **Surface Elevation 1 (`#111827`):** Primary card backdrop, structured panels, and baseline data containers.
- **Surface Elevation 2 (`#1F2937`):** Interactive hover states, elevated modals, and input fields.
- **Primary Energy (`#06B6D4` - Electric Cyan):** Applied to primary actions, active checkout triggers, critical product specs, and key metric indicators.
- **Secondary Thrust (`#3B82F6` - Tech Blue):** Used for navigation highlights, bulk actions, secondary system badges, and linking data structures.
- **Tertiary Alert (`#F59E0B` - Amber Flare):** Reserved for low-stock triggers, processing statuses, express delivery indicators, and highlight stars.
- **Semantic Status Signals:** Success uses Emerald (`#10B981`), critical errors and cancellations use Crimson (`#EF4444`).
- **Text & Borders:** Text hierarchy relies on pure white (`#FFFFFF`) for primary headers, `#94A3B8` for secondary labels and metadata, with micro-borders maintained at 12â€“18% opacity white (`rgba(255, 255, 255, 0.12)`).

## Typography

The typographic hierarchy couples the structural, geometric presence of **Plus Jakarta Sans** for high-impact merchandising and executive dashboard metrics with the clinical clarity of **Inter** for descriptions, specifications, tabular data, and transactional flows.

A third typeface, **JetBrains Mono**, is deliberately introduced for pricing tiers, SKU codes, parcel tracking IDs, order timestamps, and inventory units. This ensures clear character distinction, preventing visual ambiguity in critical operational workflows. Monospace numbers enforce tabular alignment during rapid data scanning in admin views.

## Layout & Spacing

This design system uses a strict 8pt base grid with a fluid 12-column configuration on desktop (`1280px` max content container) and a responsive 4-column layout on mobile devices (`360px` to `480px`).

### Breakpoints & Reflow
- **Mobile (< 768px):** 4 columns, `16px` outer margin, `16px` gutter. Action bars lock to the viewport bottom with safe-area hardware insets. Modals render as bottom sheets with drag handles.
- **Tablet (768px â€“ 1024px):** 8 columns, `24px` margin, `20px` gutter. Admin tables activate horizontal scroll indicators; e-commerce product grids transition from single column to balanced 2-column or 3-column views.
- **Desktop (L
NŠŠˆLˆÛÛ[[œËX\™Ú[‹Ý]\‹ˆYZ[ˆX[˜YÙ[Y[ÙÙÛ\È[ÈHš^YŒY˜Z[Ú]›ZY[˜[]XØ[]HØ[˜\Ë‚‚•ÝXÚ\™Ù]ÈÛˆ[™\ÜÛœÚ]™H[\™˜XÙ\È[™›Ü˜ÙHHÝšXÝZ[š[][H›Ý[™[™È›Þ[œÝ\š[™È™\›È[œ]Z\ÜÙ\ÈXÜ›ÜÜÈ[™Z[[Øš[HÚXÚÛÝ]ØÙ[˜\š[ÜË‚‚ˆÈÈ[]˜][Ûˆ	ˆ\‚•š\ÝX[\\ÈXÚY]™Y›ÝYÚ
Š™Û\ÜÛ[ÜœXÈÝ˜]YšXØ][ÛŠŠˆZ\™YÚ]
Š›ZXÜ›ËX›Ü™\ˆ[[Z[˜][ÛŠŠˆ˜]\ˆ[ˆ˜Y][Û˜[›XÚÈ›ÜÚYÝÜËÚXÚ™XÛÛYH[\\˜Ù\X›HÛˆ\šÈØ[˜\Ù\Î‚‚‹H
Š“]™[
˜\ÙHØ[˜\ÊNŠŠˆ˜]ÈÌLM˜X]Hš[š\Ú‚‹H
Š“]™[H
Y˜][ÛÛZ[™\œÈ	ˆYZ[ˆØ\™ÊNŠŠˆ˜XÚÙÜ›Ý[™™Ø˜JMËÎKÍJXÚ]˜XÚÙ›ÜYš[\Žˆ›\ŠMœ
X[™H\ÛÛ[[Ý\È›Ü™\ˆÛÛ\ÜÙYÙˆ™Ø˜JMKMKMKŒ
X‚‹H
Š“]™[ˆ
Ý™\ˆÝ]\È	ˆXÝ]™H›ÜÝÛœÊNŠŠˆ˜XÚÙÜ›Ý[™™Ø˜JÌKKMKŽJXÚ]˜XÚÙ›ÜYš[\Žˆ›\Š
X›Ü™\™YžH™Ø˜J‹N‹ŒL‹ŒÊX[™[ˆ[XšY[ÝËYY™\Ú[ÛˆÛÝÎˆÌœ™Ø˜J‹N‹ŒL‹ŒLŠX‚‹H
Š“]™[È
ÝXÚÞH˜]‹›Ø][™ÈÚXÚÛÝ]Ë˜]Ù\œÊNŠŠˆ˜XÚÙÜ›Ý[™™Ø˜JKLËŒ‹Ž
XÚ]˜XÚÙ›ÜYš[\Žˆ›\ŠŒ
X[™[ˆ\\ˆÜXÝ[\ˆYÚYÚ›Ü™\‹]ˆ\ÛÛY™Ø˜JMKMKMKŒMŠX‚‚ˆÈÈÚ\\Â‚•HÚ\HÞ\Ý[H]™\˜YÙ\È˜[[˜ÙY\™ÛÛ›ÛZXÈ˜YZH
\™[H˜\ÙJH]š\ÝX[H™Y›XÝ[Ù\›ˆÛÛœÝ[Y\ˆ[XÝ›ÛšXÈ\ÚYÛ¸ %™XÚ\Ú[Û‹[Z[YY][œ˜[Y\È[™Ý\™Y]šXÙHYÙ\Ëˆ‚‹H
Š’[\˜XÝ]™H›Ù\È
]ÛœË[œ]ËÙ[XÝÜœÊNŠŠˆ\™[X
›Ý[™Y[Y
K‚‹H
Š”›ÙXÝ[\È	ˆ[˜[]XØ[[Ù[\ÎŠŠˆ\™[X
›Ý[™Y[Ø
K‚‹H
Š”ÝXÚÞH\[Ù[È	ˆ›ÝÛHÚY]ÎŠŠˆK\™[X
›Ý[™Y^›ÜˆÜYÙ\ÊK‚‹H
Š”Ý]\È[ËYÜË	ˆØ\[™XØ]ÜœÎŠŠˆÛÛ\][HÚ\˜Ý[\‹Ü[›Ü™\œÈ
NNN\
K‚‚ˆÈÈÛÛ\Û™[Â‚ˆÈÈÈ]ÛœÂ‹H
Š”š[X\žHXÝ[Ûˆ
[œÝ[^KÛÛ™š\›H\Ü]Ú
NŠŠˆÛÛY[XÝšXÈÞX[ˆ
Ì‘
H˜XÚÙÜ›Ý[™Ú]›XÚÈ^
ÌLM˜
KÙZYÚÌˆ™X]\™\ÈHÝXH[›™\ˆÜXÝ[\ˆYÚYÚ[Û™ÈHÜ›Ü™\ˆ[™H˜YX[Ý]\ˆÞX[ˆÛÝÈÛˆ™\ÜË‚‹H
Š”ÙXÛÛ™\žHXÝ[Ûˆ
YÈØ\š[\‹^Ü]JNŠŠˆ˜[œÛXÙ[š[™Ø˜J‹N‹ŒL‹ŒJXÚ]H\›Ü™\ˆÙˆ™Ø˜J‹N‹ŒL‹
X[™ÞX[ˆ^‚‹H
Š‘ÚÜÝÕ\X\žH
Ø[˜Ù[Y]\ÛZ\ÜÊNŠŠˆ˜XÚÙÜ›Ý[™˜[œÜ\™[™]]˜[Û]H^
ÎMLÐŽ
K˜[œÚ][Ûš[™ÈÈ™Ø˜JMKMKMKŒŠX˜XÚÙÜ›Ý[™ÛˆÝ™\‹‚‚ˆÈÈÈ›ÙXÝ	ˆÜ™\ˆØ\™Â‹H
Š”›ÙXÝÛÛ[Y\˜ÙHØ\™ŠŠˆ]™[HÛ\ÜÈ˜\ÙHÚ][ˆ[YÜ˜]Y[XYÙHÛÛZ[™\ˆÝ\Ú[™È›ÙXÝ™[™\œÈÝ™\ˆHÝXH˜YX[Ü˜YY[ˆH›ÛÝ\ˆÙXÝ[Ûˆ\Ü^\ÈH™]œ˜Z[œÈ[Û›ÈšXÙHÚ[Ú][ˆ[›[™HÚ[™ÛK]\^H]Û‹‚‹H
Š“Ü™\ˆ\[[™HØ\™ŠŠˆ[œÙH\Ý^[Ý]™X]\š[™ÈÜ™\ˆ[X™\œÈ[ˆ[Û›È›ÛÝ\ÝÛY\ˆÝ[[X\žK[Y\Ý[\[™HÝ]\È[[˜ÚÜ™YÈHÜ\šYÚÛÜ›™\‹‚‚ˆÈÈÈ›Ü›H[œ]È	ˆÙ[XÝÜœÂ‹H
Š‘šY[ÎŠŠˆZYÚˆX]HÛ]Hš[
™Ø˜JÌKKMKŠX
HÚ]\›Ü™\ˆ
™Ø˜JMKMKMKŒJX
KˆÛˆ›ØÝ\Ë›Ü™\ˆÛ˜\ÈÈÌ‘Ú][ˆ[[YYX]HÜ™Ø˜J‹N‹ŒL‹ŒŠXÚYÝÈš[™ËˆXÙZÛ\ˆ^\Ù\ÈÍÍ˜‚‹H
Š”]X[]HÙ[XÝÜŽŠŠˆÛÛ\XÝÙYÛY[Y[ÛÛZ[™\ˆÛ[™ÈXÜ™[Y[ÛÝ[\ˆ
[Û›ÜÜXÙY
K[™[˜Ü™[Y[ÝXÚÚ[Ë‚‚ˆÈÈÈÝ]\È˜YÙ\È	ˆ[Â‹HZ[Ú]HÝXHL	X˜[œÛXÙ[˜XÚÙÜ›Ý[™[[™[[ÜXÚ]H^‚ˆH
”ZYÈ[ˆ˜[œÚ]ÈÛÛ\]NŠˆÌLŽNX[Ú]X]Ú[™È›Ü™\ˆ[™XØ]ÜˆÝ‚ˆH
”›ØÙ\ÜÚ[™ÈÈ[™[™È™\ÝØÚÎŠˆÑNQL˜[‚ˆH
Ø[˜Ù[YÈ™Y[™YŠˆÑQ[‚ˆH
YZ[ˆš[Üš]HÈYÚ˜[YNŠˆÌÐŽ‘˜[‚‚ˆÈÈÈ]HX›\È	ˆ\ÝÈ
YZ[ŠB‹H[\›˜][™È›ÝÜÈ]›ÚY[\ÛÛYÝš\\ÎÈ[œÝXY›ÝÜÈÙ\\˜]HšXH\ÛÛY™Ø˜JMKMKMKŒJX‚‹H›ÝÈÝ™\ˆXÝ]˜]\È[ˆYÙK]ËYYÙHÝXHÞX[ˆØ\Ú
™Ø˜J‹N‹ŒL‹Œ
X
K‚‹HÝXÚÞHÛÛ[[ˆXY\œÈ™X]\™H]™[Èœ›ÜÝYÛ\ÜÈÈ™\Ù\™HÜ]X[ÛÛ^\š[™ÈÛÛ[[Ý\È™\XØ[ØÜ›Û[™Ë