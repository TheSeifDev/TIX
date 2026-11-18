
import Image from "next/image";

const disciplines = [
  "STRATEGY",
  "PRODUCTION",
  "DIGITAL",
  "VISUALS",
];

export function ContactHero() {
  return (
    <section
      data-contact-hero
      aria-label="Contact introduction"
      className="
        relative z-20 isolate
        min-h-[clamp(380px,35vw,540px)]
        overflow-visible
        bg-[#eee1e0]
        px-5
        pt-[calc(var(--nav-height,72px)+3rem)]
        pb-16
        text-[#180305]
        sm:px-10
        lg:px-16
      "
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <Image
          src="/assets/images/Group%20109.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            opacity-35
            mix-blend-multiply
          "
        />

        <div
          className="
            absolute inset-0
            bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85),transparent_70%)]
          "
        />
      </div>

      {/* Main composition */}
      <div
        className="
          relative mx-auto
          grid w-full max-w-[1440px]
          grid-cols-1
          items-center
          gap-8
          text-center
          sm:grid-cols-[1fr_auto_1fr]
          sm:gap-6
          lg:gap-12
        "
      >
        {/* Left: Disciplines */}
        <div className="flex justify-center sm:justify-start">
          <div
            className="
              flex max-w-[360px]
              flex-wrap items-center justify-center
              gap-x-2 gap-y-1
              rounded-full
              bg-[#710a12]
              px-6 py-3
              font-display
              text-xs font-bold
              uppercase tracking-wide
              text-white
              sm:text-sm
              lg:px-8 lg:py-4
            "
          >
            {disciplines.map((discipline, index) => (
              <span key={discipline}>
                {discipline}
                {index !== disciplines.length - 1 && (
                  <span className="ml-2 text-white/80">/</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center justify-center">
          <Image
            src="/assets/images/tixx.webp"
            alt="TIX"
            width={512}
            height={512}
            priority
            className="
              h-auto
              w-[clamp(100px,12vw,180px)]
              object-contain
            "
          />
        </div>

        {/* Right: Description */}
        <p
          className="
            mx-auto
            max-w-[340px]
            font-display
            text-sm font-semibold
            uppercase leading-relaxed
            tracking-[0.08em]
            text-[#713d40]
            sm:ml-auto sm:text-left
            lg:text-base
          "
        >
          Tell us what you&apos;re building, what you&apos;re imagining,
          or what your brand is missing.
        </p>
      </div>

      {/* Glass heading — overlaps the contact form top edge */}
      <div
        className="
          absolute
          bottom-0 left-1/2
          z-30
          w-max max-w-[calc(100%-2rem)]
          -translate-x-1/2
          translate-y-1/2
        "
      >
        <div
          className="
            rounded-full
            border border-white/50
            bg-white/25
            px-7 py-3
            text-center
            shadow-[0_8px_32px_rgba(30,0,0,0.18)]
            backdrop-blur-xl
            backdrop-saturate-150
            sm:px-12 sm:py-4
            lg:px-14 lg:py-4
          "
        >
          <h2
            className="
              whitespace-nowrap
              font-display
              text-[clamp(1.2rem,4vw,3rem)]
              font-black
              uppercase
              leading-none
              tracking-tight
              text-[#790b12]
              [text-shadow:0_1px_0_rgba(255,255,255,0.9)]
            "
          >
            Let&apos;s Get in Touch
          </h2>
        </div>
      </div>
    </section>
  );
}
