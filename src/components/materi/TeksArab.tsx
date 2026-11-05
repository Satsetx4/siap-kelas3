export default function TeksArab({ arab, latin, arti }: { arab: string; latin?: string; arti?: string }) {
  return (
    <figure className="my-3 rounded-2xl bg-krem-100 p-4 dark:bg-malam-800">
      <p dir="rtl" lang="ar" className="font-arab text-[1.875rem] leading-[2.2] text-tinta-900 dark:text-[#F5EFE6]">
        {arab}
      </p>
      {latin ? <figcaption className="mt-2 text-base italic text-tinta-500 dark:text-[#B8AEA3]">{latin}</figcaption> : null}
      {arti ? <p className="mt-1 text-lg text-tinta-700 dark:text-[#F5EFE6]">{arti}</p> : null}
    </figure>
  );
}
