import Link from "next/link";
import { Smile, MapPin, Phone, Mail, Camera, Users, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { SiteSettings } from "@/lib/types";

const EXPLORE_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/business-opportunity", label: "Business Opportunity" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/social-media-marketing", label: "Social Media Marketing" },
];

const SUPPORT_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
  { href: "/admin/login", label: "Admin Login" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const socialLinks = [
    { href: settings.social.instagram, icon: Camera, label: "Instagram" },
    { href: settings.social.facebook, icon: Users, label: "Facebook" },
    { href: settings.social.youtube, icon: Play, label: "YouTube" },
  ].filter((link) => link.href);

  return (
    <footer className="mt-auto bg-brand-950 text-white">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <Smile size={18} />
              </span>
              <span className="text-lg font-bold">Smile Mart India</span>
            </Link>
            <p className="mt-3 text-sm text-white/60">Happiness in Every Home</p>
            {socialLinks.length > 0 ? (
              <div className="mt-5 flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20"
                  >
                    <link.icon size={16} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-400">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-400">Support</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-400">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-white/50" />
                <span>{settings.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-white/50" />
                <span>{settings.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-white/50" />
                <span>{settings.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/50">
          <p>{settings.legalDisclaimer}</p>
          <p className="mt-4">© {new Date().getFullYear()} Smile Mart India. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
