import Image from 'next/image';

const disciplines = ['STRATEGY', 'PRODUCTION', 'DIGITAL', 'VISUALS'];

export function ContactHero() {
  return (
    <section className="relative isolate min-h-[clamp(240px,24vw,360px)] overflow-hidden bg-[#eee1e0] px-5 !pb-10 !pt-[calc(var(--nav-height,72px)+2rem)] text-[#180305] max-[640px]:!h-[232px] max-[640px]:!min-h-0 max-[640px]:!px-3 max-[640px]:!pb-0 max-[640px]:!pt-0 sm:px-10 lg:px-16" data-contact-hero aria-label="Contact introduction">
      <div className="absolute inset-0 -z-10 bg-[#eee1e0]" aria-hidden="true" />
      <Image className="pointer-events-none absolute inset-[-5%] -z-[5] h-[110%] w-full object-cover opacity-35 mix-blend-multiply" src="/assets/images/Group%20109.webp" alt="" width={3704} height={4994} aria-hidden="true" />
      <div className="absolute inset-0 -z-[4] bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.82),transparent_62%)]" aria-hidden="true" />
      <div className="relative !mx-auto flex min-h-[clamp(200px,20vw,300px)] max-w-[1180px] flex-col items-center justify-center text-center max-[640px]:!block max-[640px]:!min-h-0">
        <Image className="mb-5 h-auto w-[clamp(72px,9vw,132px)] object-contain max-[640px]:absolute max-[640px]:left-1/2 max-[640px]:top-[163px] max-[640px]:z-10 max-[640px]:mb-0 max-[640px]:w-[76px] max-[640px]:-translate-x-1/2" src="/assets/images/tixx.webp" alt="TIX" width={512} height={512} priority />
        <div className="mt-7 grid w-fit grid-cols-2 items-center justify-items-start gap-x-3 gap-y-1 rounded-full border border-[#710a12]/35 bg-[#710a12] px-3 py-1.5 text-left font-display text-[0.58rem] font-bold tracking-[0.08em] text-white sm:text-[0.68rem] lg:!self-start lg:!ml-28 max-[640px]:absolute max-[640px]:left-3 max-[640px]:top-[135px] max-[640px]:z-10 max-[640px]:mt-0 max-[640px]:w-[40%] max-[640px]:gap-x-1 max-[640px]:gap-y-0 max-[640px]:rounded-md max-[640px]:px-2 max-[640px]:py-0.5 max-[640px]:text-[0.38rem]">
          {disciplines.map((discipline) => <span key={discipline}>{discipline}{discipline !== 'VISUALS' ? ' /' : ''}</span>)}
        </div>
        <p className="mt-4 max-w-[58ch] text-left font-display text-[0.62rem] font-semibold uppercase leading-[1.45] tracking-[0.08em] text-[#5f3034] sm:text-[0.75rem] lg:!self-end lg:!mr-24 lg:max-w-[30ch] max-[640px]:absolute max-[640px]:right-3 max-[640px]:top-[134px] max-[640px]:z-10 max-[640px]:mt-0 max-[640px]:w-[54%] max-[640px]:text-[0.32rem] max-[640px]:leading-[1.05] max-[640px]:tracking-[0.06em]">
          Tell us what you&apos;re building, what you&apos;re imagining, or what your brand is missing.
        </p>
      </div>
    </section>
  );
}
