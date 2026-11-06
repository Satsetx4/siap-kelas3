import sys, pathlib
from PIL import Image

# python tools/crop.py <gambar_sumber> <x1> <y1> <x2> <y2> <tujuan.webp>
src, x1, y1, x2, y2, dst = sys.argv[1], *map(int, sys.argv[2:6]), sys.argv[6]
img = Image.open(src).convert("RGB").crop((x1, y1, x2, y2))
if img.width > 800:
    img = img.resize((800, round(img.height * 800 / img.width)), Image.LANCZOS)
pathlib.Path(dst).parent.mkdir(parents=True, exist_ok=True)
img.save(dst, "WEBP", quality=85)
print(dst, img.size)
