import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { StickyCTA } from "@/components/site/StickyCTA";
import { getSettings } from "@/lib/data/settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <>
      <Header settings={settings} />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton whatsappNumber={settings.contact.whatsappNumber} whatsappMessage={settings.whatsappMessage} />
      <StickyCTA
        phone={settings.contact.phone}
        whatsappNumber={settings.contact.whatsappNumber}
        whatsappMessage={settings.whatsappMessage}
      />
    </>
  );
}
