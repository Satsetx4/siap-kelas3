import sys, pathlib, fitz  # pymupdf

src = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
doc = fitz.open(src)
for i, page in enumerate(doc, start=1):
    page.get_pixmap(dpi=150).save(out / f"{src.stem}-hal{i:03d}.png")
print(f"{len(doc)} halaman -> {out}")
