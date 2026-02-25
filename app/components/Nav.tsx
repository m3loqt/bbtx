import Image from "next/image";
import { ArrowUpRight } from "./ArrowIcon";
import { ChevronDown } from "./ArrowIcon";

const navLinks = [
  { label: "Services", hasDropdown: true, href: "#" },
  { label: "Expertise", hasDropdown: true, href: "#" },
  { label: "Cases", hasDropdown: false, href: "#" },
  { label: "Resources", hasDropdown: true, href: "#" },
  { label: "About", hasDropdown: false, href: "/about" },
  { label: "Community", hasDropdown: false, href: "#" },
];

export function Nav() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-[960px] items-center justify-between gap-6 rounded-lg border border-black/[0.06] bg-white px-3 py-3.5 shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:px-4 lg:gap-8 lg:px-5">
        <a href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/node.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="text-lg font-bold tracking-tight text-[#222222]">
            BBTx Consulting
          </span>
        </a>

        <div className="hidden items-center gap-4 lg:flex lg:gap-5">
          {navLinks.map(({ label, hasDropdown, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-1 text-[15px] font-normal text-[#222222] transition-colors hover:text-[#555]"
            >
              {label}
              {hasDropdown && (
                <span className="text-[#222222]">
                  <ChevronDown />
                </span>
              )}
            </a>
          ))}
        </div>

        <a
          href="#"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-[#ca3726] px-4 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
        >
          Talk to us
          <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
        </a>
      </header>
    </div>
  );
}
