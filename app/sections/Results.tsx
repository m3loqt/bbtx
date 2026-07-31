import Image from "next/image";

export const COMPANY_LOGOS = [
  "cha.png",
  "alz.png",
  "cvi.png",
  "shri.png",
  "rob.png",
  "inb.png",
  "flo.png",
  "ber.png",
  "con.png",
  "chg.png",
  "wes.png",
  "bra.png",
  "cho.png",
  "lum.png",
  "csp.png",
  "dou.png",
  "RIV.png",
  "bri.png",
  "bar.png",
].map((file) => `/companies-nobg/${file}`);

const ROW_ONE = COMPANY_LOGOS.slice(0, 10);
const ROW_TWO = COMPANY_LOGOS.slice(10);

function LogoRow({ logos, direction }: { logos: string[]; direction: "normal" | "reverse" }) {
  return (
    <div
      className="flex w-max items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:gap-10 lg:px-8"
      style={{
        animation: "logo-scroll 60s linear infinite",
        animationDirection: direction,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      {[...logos, ...logos].map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative flex h-28 shrink-0 items-center justify-center px-2 sm:h-36 sm:px-3 lg:h-40 lg:px-4"
        >
          <Image
            src={src}
            alt=""
            width={400}
            height={160}
            className="h-full w-auto max-w-[240px] object-contain opacity-70 grayscale sm:max-w-[320px] lg:max-w-[360px]"
          />
        </div>
      ))}
    </div>
  );
}

export function Results() {
  return (
    <section className="relative z-[1] bg-white py-14 sm:py-16 lg:py-20">
      <p className="px-4 text-center text-lg font-medium tracking-normal text-[#222222] sm:text-xl">
        Trusted by <span className="text-[#ca3726]">100+</span> companies across industries
      </p>

      {/* Logo carousel — full viewport width so left/right aren't clipped by section padding */}
      <div
        className="relative left-1/2 z-0 mt-8 w-screen max-w-[100vw] -translate-x-1/2 space-y-2 overflow-hidden sm:mt-10 sm:space-y-3"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <LogoRow logos={ROW_ONE} direction="normal" />
        <LogoRow logos={ROW_TWO} direction="reverse" />
      </div>
    </section>
  );
}
