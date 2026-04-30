# Product Images

3 images per device (front, angle, side) — ready for Claude Code to use directly.

## Folder Structure

```
product-images/
├── dell-5300-2in1/          # DELL 5300 2-in-1 Laptop
├── dell-e3400/              # DELL E3400 Laptop
├── dell-e5400/              # DELL E5400 Laptop
├── dell-e7390-2in1/         # DELL E7390 2-in-1 Laptop
├── dell-optiplex-3050/      # Dell OptiPlex 3050 USFF Desktop
├── dell-xps/                # DELL XPS Laptop
├── hp-430-g5/               # HP ProBook 430 G5 Laptop
├── hp-800-g4-sff/           # HP EliteDesk 800 G4 SFF Desktop
├── hp-830-g6/               # HP EliteBook 830 G6 Laptop
├── hp-445r/                 # HP ProBook 445R Laptop
├── hp-probook-650-g2/       # HP ProBook 650 G2 Laptop
├── hp-probook-650-g4/       # HP ProBook 650 G4 Laptop
├── lenovo-m81-desktop/      # Lenovo ThinkCentre M81 Desktop
├── lenovo-m91-desktop/      # Lenovo ThinkCentre M91 Desktop
├── lenovo-t470s/            # Lenovo ThinkPad T470S Notebook
├── lenovo-thinkcentre-m700/ # Lenovo ThinkCentre M700 Desktop
├── lenovo-thinkpad-l440/    # Lenovo ThinkPad L440 Notebook
└── lenovo-thinkpad-l470/    # Lenovo ThinkPad L470 Notebook
```

## Each folder contains:
- `front.jpg` — front/main product view
- `angle.jpg` — angled/three-quarter view
- `side.jpg` — side or alternate view

## Device Index

| # | Device Name | Folder |
|---|-------------|--------|
| 1 | DELL 5300 2-in-1 Laptop | `dell-5300-2in1/` |
| 2 | DELL E3400 Laptop | `dell-e3400/` |
| 3 | DELL E5400 Laptop | `dell-e5400/` |
| 4 | DELL E7390 2-in-1 Laptop | `dell-e7390-2in1/` |
| 5 | Dell OptiPlex 3050 USFF Desktop | `dell-optiplex-3050/` |
| 6 | DELL XPS Laptop | `dell-xps/` |
| 7 | HP ProBook 430 G5 Laptop | `hp-430-g5/` |
| 8 | HP EliteDesk 800 G4 SFF Desktop | `hp-800-g4-sff/` |
| 9 | HP EliteBook 830 G6 Laptop | `hp-830-g6/` |
| 10 | HP ProBook 445R Laptop | `hp-445r/` |
| 11 | HP ProBook 650 G2 Laptop | `hp-probook-650-g2/` |
| 12 | HP ProBook 650 G4 Laptop | `hp-probook-650-g4/` |
| 13 | Lenovo ThinkCentre M81 Desktop | `lenovo-m81-desktop/` |
| 14 | Lenovo ThinkCentre M91 Desktop | `lenovo-m91-desktop/` |
| 15 | Lenovo ThinkPad T470S Notebook | `lenovo-t470s/` |
| 16 | Lenovo ThinkCentre M700 Desktop | `lenovo-thinkcentre-m700/` |
| 17 | Lenovo ThinkPad L440 Notebook | `lenovo-thinkpad-l440/` |
| 18 | Lenovo ThinkPad L470 Notebook | `lenovo-thinkpad-l470/` |

## Usage in Claude Code

```python
import os
from pathlib import Path

IMAGES_DIR = Path("product-images")

# Get all images for a device
device_images = list((IMAGES_DIR / "dell-5300-2in1").glob("*.jpg"))

# Get all devices
all_devices = [d for d in IMAGES_DIR.iterdir() if d.is_dir()]
```
