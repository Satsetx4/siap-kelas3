export function bisaBicara(): boolean { return typeof window !== 'undefined' && 'speechSynthesis' in window; }

export function bicara(teks: string, lang: 'id-ID' | 'en-US', kecepatan = 1): void {
  if (!bisaBicara()) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(teks.replace(/[\u0600-\u06FF]+/g, ' '));
    u.lang = lang; u.rate = kecepatan;
    const suara = window.speechSynthesis.getVoices().find((v) => v.lang.replace('_', '-').startsWith(lang.slice(0, 2)));
    if (suara) u.voice = suara;
    window.speechSynthesis.speak(u);
  } catch { /* abaikan */ }
}

export function diam(): void { try { window.speechSynthesis?.cancel(); } catch { /* abaikan */ } }
