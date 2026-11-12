import Image from 'next/image';

const disciplines = ['STRATEGY', 'PRODUCTION', 'DIGITAL', 'VISUALS'];

export function ContactHero() {
  return (
    <section className="relative isolate min-h-[clamp(430px,48vw,720px)] overflow-hidden bg-[#eee1e0] px-5 !pb-12 !pt-[calc(var(--nav-height,72px)+3rem)] text-[#180305] sm:px-10 lg:px-16" data-contact-hero aria-labelledby="contact-hero-heading">
      <div className="absolute inset-0 -z-10 bg-[#eee1e0]" aria-hidden="true" />
      <Image className="pointer-events-none absolute inset-[-5%] -z-[5] h-[110%] w-full object-cover opacity-35 mix-blend-multiply" src="/assets/images/Group%20109.webp" alt="" width={3704} height={4994} aria-hidden="true" />
      <div className="absolute inset-0 -z-[4] bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.82),transparent_62%)]" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[clamp(360px,40vw,600px)] max-w-[1180px] flex-col items-center justify-center text-center">
        <Image className="mb-5 h-auto w-[clamp(72px,9vw,132px)] object-contain" src="/assets/images/tixx.webp" alt="TIX" width={512} height={512} priority />
        <h1 id="contact-hero-heading" className="max-w-[13ch] font-display text-[clamp(2.5rem,7.8vw,8.4rem)] font-black uppercase leading-[0.82] tracking-[-0.065em]">
          What do you<br />want the world<br />to <span className="font-editorial font-bold lowercase italic text-[#a50b16]">feel</span>?
        </h1>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#710a12]/35 bg-[#710a12] px-3 py-1.5 font-display text-[0.58rem] font-bold tracking-[0.08em] text-white sm:text-[0.68rem]">
          {disciplines.map((discipline) => <span key={discipline}>{discipline}{discipline !== 'VISUALS' ? ' /' : ''}</span>)}
        </div>
        <p className="mt-4 max-w-[58ch] font-display text-[0.62rem] font-semibold uppercase leading-[1.45] tracking-[0.08em] text-[#5f3034] sm:text-[0.75rem]">Tell us what you&apos;re building, what you&apos;re imagining, or what your brand is missing.</p>
      </div>
    </section>
  );
}
