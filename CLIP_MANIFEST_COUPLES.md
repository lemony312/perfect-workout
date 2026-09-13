# Couples clip manifest

Generated from `scripts/clip_salsa_couples.py`. **This is the authoritative list of
clip `src` paths and windows.** Do not derive a filename from a move id.

`src` is always `/clips/salsa/couples/<file>` (the page prefixes basePath itself).

All 60 files are cut and present. Classes 17–21 were blocked for a
while by a download failure that has since been root-caused (a stale yt-dlp plus a
missing JS-challenge solver, not a rate limit — see `scripts/download_salsa_videos.py`).
Nothing in this manifest is missing any more, so **no `ClipPair` side needs to be
`null` for want of a file.**

| class | move | grain | src file | on disk | start | end | aspect | trust | shared |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `abajo` | slow | `arriba-abajo-slow.mp4` | yes | 479.4 | 500.28 | `16/9` | V | `arriba-abajo-slow.mp4` |
| 1 | `al-centro` | slow | `al-centro-slow.mp4` | yes | 299.54 | 327.32 | `16/9` | A |  |
| 1 | `arriba` | slow | `arriba-abajo-slow.mp4` | yes | 479.4 | 500.28 | `16/9` | V |  |
| 1 | `abajo` | fast | `arriba-abajo-fast.mp4` | yes | 667.9 | 691.34 | `16/9` | V | `arriba-abajo-fast.mp4` |
| 1 | `al-centro` | fast | `al-centro-fast.mp4` | yes | 581.24 | 612.0 | `16/9` | V |  |
| 1 | `arriba` | fast | `arriba-abajo-fast.mp4` | yes | 667.9 | 691.34 | `16/9` | V |  |
| 2 | `el-chico` | slow | `el-chico-slow.mp4` | yes | 350.54 | 367.34 | `16/9` | V |  |
| 2 | `la-chica` | slow | `la-chica-slow.mp4` | yes | 199.02 | 233.86 | `16/9` | V |  |
| 2 | `los-dos` | slow | `los-dos-slow.mp4` | yes | 583.4 | 606.64 | `16/9` | A |  |
| 2 | `el-chico` | fast | `el-chico-fast.mp4` | yes | 746.48 | 759.76 | `16/9` | V |  |
| 2 | `la-chica` | fast | `la-chica-fast.mp4` | yes | 781.46 | 794.3 | `16/9` | V |  |
| 2 | `los-dos` | fast | `los-dos-fast.mp4` | yes | 814.12 | 827.98 | `16/9` | V |  |
| 3 | `dile-que-no` | slow | `dile-que-no-slow.mp4` | yes | 653.04 | 675.8 | `16/9` | A |  |
| 3 | `guapea` | slow | `guapea-slow.mp4` | yes | 368.16 | 410.98 | `16/9` | A |  |
| 3 | `dile-que-no` | fast | `dile-que-no-fast.mp4` | yes | 814.38 | 842.3 | `16/9` | V |  |
| 3 | `guapea` | fast | `guapea-fast.mp4` | yes | 873.42 | 895.1 | `16/9` | V |  |
| 4 | `enchufla` | slow | `enchufla-slow.mp4` | yes | 189.24 | 220.18 | `16/9` | V |  |
| 4 | `enchufla-al-centro` | slow | `enchufla-al-centro-slow.mp4` | yes | 309.26 | 331.78 | `16/9` | V |  |
| 4 | `enchufla` | fast | `enchufla-fast.mp4` | yes | 569.28 | 589.8 | `16/9` | V |  |
| 4 | `enchufla-al-centro` | fast | `enchufla-al-centro-fast.mp4` | yes | 699.5 | 728.3 | `16/9` | V |  |
| 5 | `el-uno` | slow | `el-uno-slow.mp4` | yes | 440.16 | 471.1 | `16/9` | A |  |
| 5 | `el-uno` | fast | `el-uno-fast.mp4` | yes | 0.0 | 31.414 | `9/16` | V |  |
| 6 | `kentucky` | slow | `kentucky-slow.mp4` | yes | 209.92 | 241.4 | `16/9` | A |  |
| 6 | `la-chica` | slow | `la-chica-open-slow.mp4` | yes | 557.88 | 575.62 | `16/9` | V |  |
| 6 | `kentucky` | fast | `kentucky-fast.mp4` | yes | 0.0 | 40.534 | `9/16` | V |  |
| 7 | `vacilala-por-la-mano` | slow | `vacilala-por-la-mano-slow.mp4` | yes | 305.54 | 331.18 | `16/9` | A |  |
| 7 | `vacilala-por-la-mano` | fast | `vacilala-por-la-mano-fast.mp4` | yes | 0.0 | 32.174 | `9/16` | V |  |
| 8 | `adios-con-la-hermana` | slow | `adios-con-la-hermana-slow.mp4` | yes | 273.26 | 313.08 | `16/9` | A |  |
| 8 | `enchufla-mix` | slow | `enchufla-mix-slow.mp4` | yes | 208.68 | 230.62 | `16/9` | V |  |
| 8 | `adios-con-la-hermana` | fast | `adios-con-la-hermana-fast.mp4` | yes | 0 | 37.594 | `9/16` | D |  |
| 8 | `enchufla-mix` | fast | `adios-con-la-hermana-fast.mp4` | yes | 0 | 37.594 | `9/16` | D | `adios-con-la-hermana-fast.mp4` |
| 9 | `sombrero` | slow | `sombrero-slow.mp4` | yes | 234.94 | 264.36 | `16/9` | A |  |
| 9 | `sombrero` | fast | `sombrero-fast.mp4` | yes | 0 | 33.474 | `9/16` | D |  |
| 10 | `enchufla-doble-alarde` | slow | `enchufla-doble-alarde-slow.mp4` | yes | 174.02 | 193.98 | `16/9` | A |  |
| 10 | `enchufla-doble-alarde-exhibela` | slow | `enchufla-doble-alarde-exhibela-slow.mp4` | yes | 416.1 | 436.52 | `16/9` | A |  |
| 10 | `exhibela-crossing` | slow | `exhibela-crossing-slow.mp4` | yes | 353.12 | 373.36 | `16/9` | A |  |
| 10 | `enchufla-doble-alarde` | fast | `enchufla-doble-alarde-exhibela-fast.mp4` | yes | 0 | 45.734 | `9/16` | D | `enchufla-doble-alarde-exhibela-fast.mp4` |
| 10 | `enchufla-doble-alarde-exhibela` | fast | `enchufla-doble-alarde-exhibela-fast.mp4` | yes | 0 | 45.734 | `9/16` | D |  |
| 10 | `exhibela-crossing` | fast | `enchufla-doble-alarde-exhibela-fast.mp4` | yes | 0 | 45.734 | `9/16` | D | `enchufla-doble-alarde-exhibela-fast.mp4` |
| 11 | `setenta` | slow | `setenta-slow.mp4` | yes | 177.66 | 221.12 | `16/9` | V |  |
| 11 | `setenta` | fast | `setenta-fast.mp4` | yes | 0 | 44.574 | `9/16` | D |  |
| 12 | `paseala` | slow | `paseala-slow.mp4` | yes | 291.88 | 310.02 | `16/9` | A |  |
| 12 | `paseala` | fast | `paseala-fast.mp4` | yes | 0 | 30.954 | `9/16` | D |  |
| 13 | `cocacola` | slow | `cocacola-slow.mp4` | yes | 360.7 | 391.58 | `16/9` | A |  |
| 13 | `cocacola` | fast | `cocacola-fast.mp4` | yes | 0 | 23.794 | `9/16` | D |  |
| 14 | `vacilala` | slow | `vacilala-slow.mp4` | yes | 299.2 | 319.22 | `16/9` | A |  |
| 14 | `vacilala-los-dos` | slow | `vacilala-los-dos-slow.mp4` | yes | 374.18 | 385.72 | `16/9` | A |  |
| 14 | `vacilala` | fast | `vacilala-fast.mp4` | yes | 0 | 22.634 | `9/16` | D |  |
| 14 | `vacilala-los-dos` | fast | `vacilala-fast.mp4` | yes | 0 | 22.634 | `9/16` | D | `vacilala-fast.mp4` |
| 15 | `tiramisu` | slow | `tiramisu-slow.mp4` | yes | 267.48 | 306.6 | `16/9` | A |  |
| 15 | `tiramisu` | fast | `tiramisu-fast.mp4` | yes | 0.0 | 42.494 | `9/16` | V |  |
| 16 | `sombrero-complicado-doble` | slow | `sombrero-complicado-doble-slow.mp4` | yes | 298.12 | 318.6 | `16/9` | A |  |
| 16 | `sombrero-complicado-doble` | fast | `sombrero-complicado-doble-fast.mp4` | yes | 0.0 | 37.474 | `9/16` | V |  |
| 17 | `el-uno-semi-complicado` | slow | `el-uno-semi-complicado-slow.mp4` | yes | 366.16 | 383.0 | `16/9` | D |  |
| 17 | `juana-la-cubana` | slow | `juana-la-cubana-slow.mp4` | yes | 195.2 | 236.76 | `16/9` | A |  |
| 17 | `el-uno-semi-complicado` | fast | `el-uno-semi-complicado-fast.mp4` | yes | 594.3 | 609.5 | `16/9` | D |  |
| 17 | `juana-la-cubana` | fast | `juana-la-cubana-fast.mp4` | yes | 0.0 | 47.274 | `9/16` | V |  |
| 18 | `dedo` | slow | `dedo-slow.mp4` | yes | 227.9 | 265.9 | `16/9` | A |  |
| 18 | `dedo` | fast | `dedo-fast.mp4` | yes | 0.0 | 37.694 | `9/16` | V |  |
| 19 | `santiago` | slow | `santiago-slow.mp4` | yes | 403.7 | 433.0 | `16/9` | A |  |
| 19 | `santiago` | fast | `santiago-fast.mp4` | yes | 0.0 | 45.954 | `9/16` | V |  |
| 20 | `release-and-return` | slow | `solo-sequence-one-slow.mp4` | yes | 260.1 | 302.3 | `16/9` | A | `solo-sequence-one-slow.mp4` |
| 20 | `solo-sequence-one` | slow | `solo-sequence-one-slow.mp4` | yes | 260.1 | 302.3 | `16/9` | A |  |
| 20 | `solo-sequence-two` | slow | `solo-sequence-two-slow.mp4` | yes | 481.05 | 523.6 | `16/9` | A |  |
| 20 | `release-and-return` | fast | `solo-sequence-one-fast.mp4` | yes | 753.3 | 787.4 | `16/9` | A | `solo-sequence-one-fast.mp4` |
| 20 | `solo-sequence-one` | fast | `solo-sequence-one-fast.mp4` | yes | 753.3 | 787.4 | `16/9` | A |  |
| 20 | `solo-sequence-two` | fast | `solo-sequence-two-fast.mp4` | yes | 787.5 | 828.6 | `16/9` | A |  |
| 21 | `(class clip)` | fast | `class-21-demo.mp4` | yes | 269.3 | 306.6 | `16/9` | A |  |

## Not cut (0)

None. Every window above is encoded and in `frontend/public/clips/salsa/couples/`.

One clip pair is still one-sided, but for an editorial reason rather than a missing
file: **Class 21 has no slow side.** The class has no count chapter at all — it is one
continuous full-tempo song — so there is nothing to cut and none should be
synthesised. That is the only legitimate `missingReason` in the couples course.

## Alternates (37)

Review-only: they are rendered side by side with the published clip in
`data/review/salsa-couples/index.html` and are **not** encoded into `public/`.

Do not put them in `ClipPair.alternates`. `SalsaClip.src` is required, and any value
would point at a file that does not exist — an empty string resolves against
`basePath` to the page URL, so the UI would offer a player for nothing. Record each
alternate as a `notes` entry on the move instead, carrying the video id, the exact
window and why it was held back.
