---
fm_version: "1.0.1"
fm_build: "2026-11-09T15:44:01.471950+00:00"
fm_version_comment: ""

id: "K000001"
guid: "7a0015e3-0873-47b8-b133-e077bc7f032a"

dao: "knife"
title: "K000001 – HomeStore – 3D Printable Custom NAS Storage Bays"
sidebar_label: "HomeStore overview"
sidebar_position: 1
slug: /
description: "Designing and building 3D-printable, tool-less storage bays for a custom home NAS: a fixed cage plus a removable drive caddy, derived from SFF drive standards."

author: "Andrej Vyšný"
authors:
  - "Andrej Vyšný"

category: "hardware"
type: "case-study"
priority: "high"
tags: [knife, case-study, 3d-printing, nas, hardware, cad]

locale: "en"

created: "2026-11-09 16:44"
modified: "2026-11-09 17:30"
status: "in-progress"
privacy: "public"

rights_holder_content: "Andrej Vyšný"
rights_holder_system: "CAA / KNIFE / LetItGrow"
license: "CC-BY-NC-SA-4.0"
disclaimer: "Use at your own risk. Design is a development study; no part is validated for load, endurance or live hot-swap."
copyright: "© 2026 Andrej Vyšný"

origin_repo: "fiit_smvit"
origin_repo_url: "https://github.com/andrejvysny/fiit_smvit"
origin_commit: ""
origin_branch: "main"
origin_system: "STHDF"
origin_author: "Andrej Vyšný"
origin_imported_from: ""
origin_import_date: ""

fm_reserved1: ""
fm_reserved2: ""
---


import useBaseUrl from '@docusaurus/useBaseUrl';
import StepViewer from '@site/src/components/StepViewer';

# HomeStore – 3D Printable Custom NAS Storage Bays

<figure>
  <img src={useBaseUrl('/assets/homestore/images/synology-ds1825plus.png')} alt="" style={{maxHeight: 260, display: 'block', margin: '0 auto'}} />
  <figcaption style={{textAlign: 'center'}}><small>Illustration only: off-the-shelf NAS (Synology DS1825+). Image © Synology Inc.</small></figcaption>
</figure>

HomeStore is a modular NAS tower whose drive storage is built from **3D-printed bays**.
Each bay is a fixed, open cage with a removable caddy. You slide the caddy in from the front,
it guides the drive onto a fixed rear SATA coupler, and a printed latch holds it in place.
The first deliverable is a single functional "seed" bay, **SB35**, for 3.5" drives. The
eight-drive row of the M30 storage module will later be built from it.

## 🎯 What it solves (purpose, goal)

- **Off-the-shelf NAS enclosures are fixed.** Their drive count, spacing, airflow and
  footprint are chosen by the vendor. HomeStore lets the owner shape all of these around
  their own hardware and printer.
- **Drive service without tools or disassembly.** A drive stays screwed to its caddy. To
  replace it, press the front release and pull the caddy straight out. Neighbouring drives
  stay in place and the cables stay on the cage side.
- **Printed parts that behave like a mechanism.** The aim is a caddy that really aligns,
  seats, stops and latches. A tray that only looks like a NAS sled in a render is not enough.

## 🧩 How it solves it (principle)

**Standards first, design second.** Every drive interface dimension comes from the SFF
specifications or the drive manufacturer. Nothing is guessed from a body outline:

| Reference | 3.5" (SFF-8301) | 2.5" (SFF-8201) |
|---|---:|---:|
| Body width | 101.60 ±0.25 mm | 69.85 mm |
| Max body length | 147.00 mm | 100.45 mm |
| Height / thickness | 26.11 mm (IronWolf Pro example) | 5.00 – 19.05 mm (A1 variants) |
| Mounting thread | 6-32 UNC-2B | M3 |
| Side hole from rear datum | 28.50 ±0.50 mm (A8) | – |
| Side hole separation | 101.60 ±0.25 mm (A9) | – |
| Side hole height | 6.35 ±0.25 mm (A10) | – |

**Mechanism concept C1:**

```text
SB35_ASSEMBLY
├── FIXED_CAGE      lower U-guide · upper keeper · front/rear bridges · seat stops · coupler carrier
├── MOVING_CADDY    lower rail + front handle · removable upper strap · printed latch · 4× 6-32 screws
├── REFERENCE_DRIVE (not printed)
└── OWNER_COUPLER   (purchased SATA coupler, not printed)
```

- **The drive stands on edge.** Its connector faces the rear (+Y) and it is inserted along +Y.
  Bays sit at a candidate **36 mm pitch**. That leaves a 9.89 mm gap next to a 26.11 mm drive
  for airflow over the broad faces.
- **Guides align the drive before the connector touches.** A rectangular runner in an open
  U-guide carries the weight and sets the sideways position. A looser upper keeper stops lift
  and roll without becoming a second precision track.
- **Three separate load paths:** the hand pulls through the handle and frame to the drive
  screws. The weight goes through the runners into the cage. Push load ends on structural
  stop shoulders. The SATA connector carries no structural load.
- **The latch is replaceable.** It is a top-front cantilever printed as its own part. Press
  down (−Z) to release it, then pull (−Y). A travel limiter on the rigid caddy keeps the
  flexure from over-bending.
- **Tolerances are budgeted, not hoped for.** The worst-case alignment chain runs from the
  cage through the guides and caddy to the drive's mating frame. That stack must close
  against the carrier and coupler stack before electrical contact.

## 🧪 How to use it (application)

1. **Pick the actual drive.** Read its datasheet. Use the SFF data only as a generic packaging
   reference until the real drive's mounting interface is confirmed.
2. **Print fit coupons before the full bay.** Print guide runners with 0.20 / 0.30 / 0.40 mm
   clearance per side. Print the latch at 28 × 6 × 1.2 mm with a 1.2 mm root radius. Use the
   real material, orientation and printer profile (Bambu P1S).
3. **Model the cage and caddy parametrically.** Use datums tied to the drive's rear and bottom
   reference planes, and keep critical geometry revision-linked.
4. **Check against neighbours.** Model analysis-only neighbour bays at ±36 mm. Check finger
   reach, screwdriver access, motion envelopes and airflow channel intrusion.
5. **Close the coupler interface last.** Seating depth, stop and latch retention can only be
   released once the real SATA coupler model and its engagement range are known.

---

## ⚡ Quick guide (top)

- 3.5" drive: **101.60 mm** wide, **147 mm** long, **6-32 UNC** side screws.
  Not M3, and not tapped into plastic.
- Two side holes per narrow edge, at **28.50 mm** and **130.10 mm** from the rear datum and
  **6.35 mm** from the bottom datum. The optional middle hole is not used.
- Guide runner coupon: **8.00 × 3.00 mm**. At 0.30 mm per side it needs an **8.60 mm** groove.
- Lead-in: **5 mm** taper, **+1 mm** per side. Keep the entrance chamfer separate from the
  running guide.
- Material is **not selected yet**. Don't default to PLA for a continuously warm, loaded bay.
  Record the exact filament and process for every test.
- Test de-energised first. Mechanical mating does **not** prove live hot-swap.

## 🧊 3D preview

NAS tower storage rows: M30 = 8× 3.5" bays at 36 mm pitch, M40 = 12× 2.5" bays stacked above.
Drag to rotate, scroll to zoom, right-drag to pan. Download:
[NAS_TOWER_STORAGE_ROWS.step](/assets/homestore/models/NAS_TOWER_STORAGE_ROWS.step).

<StepViewer src="/assets/homestore/models/NAS_TOWER_STORAGE_ROWS.step" />

## 📜 Detailed article

The full engineering specification of the seed bay is published as
[SB35 – Single 3.5" Bay Specification](./sb35-specification.md). It covers:

- requirements SB35-01 to SB35-20
- coordinate frames and datums
- the cage, caddy, guide, handle and latch design
- the mechanical stop and the retention state machine
- the tolerance and engagement formulas
- the pitch and airflow integration boundary
- the screw stack and assembly order
- manufacturing rules and staged blockers

### Status

| Stage | State |
|---|---|
| Source datums and reference drive body | ✅ can proceed |
| Cage/caddy layout and 36 mm pitch study | 🟡 C1 proposal |
| Guide and latch fit coupons | 🟡 can proceed, C1 candidates |
| Rear coupler carrier architecture | 🟡 interface pending owner model |
| Connector engagement / seated-stop release | ⛔ blocked on coupler data |
| Real drive fit, load and endurance | ⛔ requires physical tests |
| Eight-bay M30 integration | ⏭ later stage |

### Files

**Standards (SNIA SFF TA TWG)**

- [SFF-8301 – 3.5" Form Factor Drive Dimensions](/assets/homestore/standards/SFF-8301.pdf)
- [SFF-8323 – 3.5" Form Factor Drive with Serial Attached Connector](/assets/homestore/standards/SFF-8323.pdf)
- [SFF-8201 – 2.5" Form Factor Drive Dimensions](/assets/homestore/standards/SFF-8201.pdf)
- [SFF-8223 – 2.5" Form Factor Drive with Serial Attached Connector](/assets/homestore/standards/SFF-8223.pdf)
- [SFF-8146 – Serial ATA Connector Position in the 54×71 mm Form Factor](/assets/homestore/standards/SFF-8146.pdf)
- [SFF-TA-1008 – Enterprise and Datacenter Standard Form Factor (E3)](/assets/homestore/standards/SFF-TA-1008.pdf)

**3D models (.3mf, .step)**

- [NAS_TOWER_STORAGE_ROWS.step](/assets/homestore/models/NAS_TOWER_STORAGE_ROWS.step) – full tower storage rows (M30 + M40), previewed above
- [M30_BAY35_UNIT.3mf](/assets/homestore/models/M30_BAY35_UNIT.3mf) – M30 storage module 3.5" bay unit study
- [HDD_Cages-All_Sizes_PETG.3mf](/assets/homestore/models/HDD_Cages-All_Sizes_PETG.3mf) – reference design
  "HDD Cage | 1 – 6 Bays" by **Moonyx**, licensed **CC BY-NC-SA**. It is redistributed unmodified
  as a comparison reference.

## 💡 Tips and notes

- **An unknown value is unknown.** It is not zero, and it is not a licence to invent a default.
  Label every number as reference, candidate, derived or tested.
- **Never mirror or scale keyed hardware** (drives, SATA connectors) to make CAD fit.
- **Keep three events apart:** full electrical engagement, contact with the structural stop
  and latch retention. A tray that clicks while only partly mated is a failure.
- **Leave the broad drive faces open.** A continuous plastic wall is not an airflow path.
- **Don't fix fits by sanding unless you write it down.** Unrecorded sanding proves nothing
  about the CAD tolerance.
- **Snap-fit tables are for moulded resin.** Their limits do not transfer directly to
  FDM-printed beams.

## ✅ Value / summary

HomeStore turns a home NAS into a repairable, printable system. Drive bays come from published
standards, are checked with cheap print coupons and are released one verified stage at a
time. The SB35 seed bay is the reusable unit: once its guides, stop and latch are proven, the
M30 eight-bay row is a matter of repeating it at a validated pitch.
