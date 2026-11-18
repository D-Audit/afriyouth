import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { contactDetails, contactPage } from "@/content/contact";
import { site, ui } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(contactPage.meta, "/contact");

export default function ContactPage() {
  const { hero, detailsHeading } = contactPage;
  const channels = [
    {
      icon: Mail,
      label: contactDetails.email.label,
      value: contactDetails.email.display,
      href: contactDetails.email.href,
    },
    {
      icon: Phone,
      label: contactDetails.phone.label,
      value: contactDetails.phone.display,
      href: contactDetails.phone.href,
    },
    { icon: MapPin, label: contactDetails.address.label, value: contactDetails.address.display },
  ].filter((channel) => channel.value);

  return (
    <>
      <PageHero label={hero.label} heading={hero.heading} intro={hero.intro} />
      <Section className="pt-12 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="rounded-card-lg border border-line bg-white p-6 shadow-soft sm:p-10 lg:col-span-7">
            <ContactForm fallbackEmail={contactDetails.email} />
          </div>
          <aside
            data-surface="dark"
            className="self-start rounded-card-lg bg-night p-6 text-on-night sm:p-10 lg:col-span-5"
          >
            <h2 className="font-display text-h3">{detailsHeading}</h2>
            {channels.length === 0 && site.social.length === 0 && <p className="mt-4 text-on-night-muted">{contactPage.noOtherChannels}</p>}
            {channels.length > 0 && <ul className="mt-8 space-y-6">
              {channels.map((channel) => (
                <li key={channel.label} className="flex gap-4">
                  <span className="inline-flex shrink-0 pt-0.5 text-accent-soft">
                    <channel.icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
                  </span>
                  <div>
                    <p className="label-caps text-on-night-muted">{channel.label}</p>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="inline-flex min-h-11 items-center font-medium underline-offset-4 hover:underline"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium">{channel.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>}
            {site.social.length > 0 && <h3 className="label-caps mt-10 text-on-night-muted">{contactDetails.socialLabel}</h3>}
            {site.social.length > 0 && <ul className="mt-4 flex flex-wrap gap-2">
              {site.social.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-night-line px-4 text-sm text-on-night-muted transition-colors hover:border-on-night-muted hover:text-on-night"
                  >
                    <SocialIcon platform={social.platform} className="size-4" />
                    {social.label}
                    <span className="sr-only">{ui.externalLinkSuffix}</span>
                  </a>
                </li>
              ))}
            </ul>}
          </aside>
        </div>
      </Section>
    </>
  );
}
