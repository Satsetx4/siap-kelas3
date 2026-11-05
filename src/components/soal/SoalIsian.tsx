interface Props {
  teks: string;
  sudahDicek: boolean;
  onUbah: (teks: string) => void;
  onEnter?: () => void;
}

export default function SoalIsian({ teks, sudahDicek, onUbah, onEnter }: Props) {
  return (
    <label className="block">
      <span className="mb-2 block text-base text-tinta-500 dark:text-[#B8AEA3]">Tulis jawabanmu</span>
      <input
        type="text"
        value={teks}
        disabled={sudahDicek}
        inputMode="text"
        autoComplete="off"
        autoCapitalize="none"
        onChange={(e) => onUbah(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && onEnter) { e.preventDefault(); onEnter(); } }}
        className="h-14 w-full rounded-2xl border border-krem-200 bg-white px-4 text-lg text-tinta-900 disabled:opacity-70 dark:border-malam-700 dark:bg-malam-900 dark:text-[#F5EFE6] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
      />
    </label>
  );
}
