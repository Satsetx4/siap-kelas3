import sys, pathlib, zipfile, fitz, docx

src = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
teks = []
if src.suffix.lower() == ".pdf":
    for i, page in enumerate(fitz.open(src), start=1):
        teks.append(f"\n\n===== HALAMAN {i} =====\n" + page.get_text())
elif src.suffix.lower() == ".docx":
    d = docx.Document(src)
    teks = [p.text for p in d.paragraphs]
    for t in d.tables:
        for r in t.rows:
            teks.append(" | ".join(c.text for c in r.cells))
    with zipfile.ZipFile(src) as z:
        for n in z.namelist():
            if n.startswith("word/media/"):
                (out / f"{src.stem}-{pathlib.Path(n).name}").write_bytes(z.read(n))
(out / f"{src.stem}.txt").write_text("\n".join(teks), encoding="utf-8")
print("selesai:", out / f"{src.stem}.txt")
