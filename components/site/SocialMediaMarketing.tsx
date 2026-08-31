import { MessageCircle, Camera, Users, Play, Store } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconTile } from "@/components/ui/IconTile";
import { Button } from "@/components/ui/Button";

const CHANNELS = [
  { icon: MessageCircle, name: "WhatsApp" },
  { icon: Camera, name: "Instagram" },
  { icon: Users, name: "Facebook" },
  { icon: Play, name: "YouTube" },
  { icon: Store, name: "Online Marketplaces" },
];

export function SocialMediaMarketing() {
  return (
    <section className="bg-brand-50/50 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Social Media Marketing"
          title="Sell beyond your counter, with digital-selling guidance"
          description="Smile Mart guides partners on promoting and selling products through the channels shoppers already use."
        />
        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {CHANNELS.map((channel) => (
            <div key={channel.name} className="flex w-28 flex-col items-center gap-3">
              <IconTile icon={channel.icon} />
              <span className="text-center text-sm font-medium text-slate-700">{channel.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button href="/social-media-marketing" variant="secondary">
            Learn About Digital Selling
          </Button>
        </div>
      </Container>
    </section>
  );
}
