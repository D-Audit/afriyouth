import { cacheLife } from "next/cache";
import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "@/components/ui/Container";
import { Pattern } from "@/components/ui/Pattern";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { contactDetails } from "@/content/contact";
import { footer, footerNav, legalNav } from "@/content/navigation";
import { site, ui } from "@/content/site";
import { FooterReveal } from "./FooterReveal";
import { GiantWordmark } from "./GiantWordmark";

async function getBuildYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getBuildYear();
  const linkClass =
    "inline-flex min-h-11 items-center text-on-night-muted transition-colors hover:text-on-night sm:min-h-9";

  return (
    <footer data-surface="dark" className="grain relative overflow-hidden bg-night text-on-night">
      <FooterReveal>
        <Pattern className="text-on-night/[0.04]" />
        <Container className="relative pb-10 pt-16 sm:pt-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block rounded-lg">
                <Wordmark tone="dark" />
              </Link>
              <p className="mt-5 font-display text-[1.0625rem] text-on-night">{site.tagline}</p>
              <p className="mt-2 max-w-sm text-on-night-muted">{site.positioning}</p>
              <ul className="-ml-3 mt-4 flex gap-1">
                {site.social.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} ${ui.externalLinkSuffix}`}
                      className="inline-flex size-11 items-center justify-center text-on-night-muted transition-colors hover:text-on-night"
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label={ui.footerNavLabel} className="grid grid-cols-2 gap-8 lg:col-span-5">
              {footerNav.map((group) => (
                <div key={group.heading}>
                  <h2 className="label-caps text-on-night-muted">{group.heading}</h2>
                  <ul className="mt-4 space-y-1">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="lg:col-span-3">
              <div>
                <h2 className="label-caps text-on-night-muted">{footer.contactHeading}</h2>
                <address className="mt-4 flex flex-col items-start not-italic">
                  <a href={contactDetails.email.href} className={linkClass}>
                    {contactDetails.email.display}
                  </a>
                  <a href={contactDetails.phone.href} className={linkClass}>
                    {contactDetails.phone.display}
                  </a>
                  <p className="mt-1 text-on-night-muted">{contactDetails.address.display}</p>
                </address>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-night-line pt-6 text-sm text-on-night-muted sm:flex-row sm:items-center sm:justify-between">
            <p>{footer.copyright(year)}</p>
            <ul className="flex gap-6">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
        <div className="relative pb-8 sm:pb-10">
          <GiantWordmark text={site.shortName} />
        </div>
      </FooterReveal>
    </footer>
  );
}
