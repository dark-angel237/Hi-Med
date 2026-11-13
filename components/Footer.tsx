import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/ui/social-icons";
import { CENTERS, PROGRAMS, SITE } from "@/lib/data";

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "YouTube", href: "https://youtube.com", Icon: YoutubeIcon },
  { label: "TikTok", href: "https://tiktok.com", Icon: TiktokIcon },
  { label: "WhatsApp", href: SITE.whatsappHref, Icon: WhatsappIcon },
];

export function Footer() {
  const cities = Array.from(new Set(CENTERS.map((c) => c.city)));

  return (
    <footer id="contact" className="relative bg-navy text-navy-100">
      <div className="h-1 bg-gradient-to-r from-brand via-brand-400 to-accent" />
      {/* Phone: brand → Programs|Centers side by side → contact.
          Tablet: brand on top, then 3 columns. Desktop: 4 columns. */}
      <div className="container grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:py-16 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-10">
        {/* Column 1 */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Cameroon&apos;s national center for career orientation and competitive entrance exam preparation.
            Helping students reach Medicine, Engineering, Nursing and Teaching schools since {SITE.since}.
          </p>
          <ul className="mt-6 flex gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:bg-brand hover:ring-brand"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 — Quick links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Programs</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {PROGRAMS.map((p) => (
              <li key={p.id}>
                <a href="#programs" className="transition-colors hover:text-white">
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Centers</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {cities.map((city) => (
              <li key={city}>
                <a href="#centers" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <MapPin className="h-3.5 w-3.5 text-brand-300" /> {city}
                </a>
              </li>
            ))}
            <li>
              <a href="#centers" className="font-semibold text-brand-300 hover:text-white">
                Online classes
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact Us</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={SITE.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-brand-300">
                  <Phone className="h-4 w-4" />
                </span>
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#25D366]/15 text-[#25D366]">
                  <WhatsappIcon className="h-4 w-4" />
                </span>
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-white">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-300">
                  <Mail className="h-4 w-4" />
                </span>
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-brand-300">
                <Clock className="h-4 w-4" />
              </span>
              {SITE.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>© 2024 Hi-Med Prepas. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Since {SITE.since}
          </p>
        </div>
      </div>
    </footer>
  );
}
