import { FeatureShowcase, type TabMedia } from "@/components/ui/feature-showcase";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function DemoPage() {
  const tabs: TabMedia[] = [
    {
      value: "pos",
      label: "POS System",
      // Video: Contactless payment on a POS terminal
      src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      alt: "POS System and Payment Demo",
      type: "video"
    },
    {
      value: "builder",
      label: "Website Builder",
      // Video: Close up of working on a laptop/designing
      src: "https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4",
      alt: "Website Template Builder Demo",
      type: "video"
    },
    {
      value: "dashboard",
      label: "Unified Dashboard",
      // Video: Analytics and charts on a screen
      src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      alt: "Unified Analytics Dashboard Demo",
      type: "video"
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex-1 pt-24 sm:pt-28 md:pt-32">
        <FeatureShowcase
          eyebrow="Live Demo"
          title={
            <>
              <span className="bg-gradient-to-b from-[#1C244B] via-[#2a3c7a] to-[#4a6fa5] bg-clip-text text-transparent pb-1 block">
                Unified Retail
              </span>
              <span className="bg-gradient-to-b from-[#D87027] via-[#f08a4b] to-[#fac282] bg-clip-text text-transparent pb-1 block">
                Management: POS & Website Builder
              </span>
            </>
          }
          description="Experience how SellSync bridges the gap between your physical store and online presence. Manage inventory, sales, and your website all from one platform."
          stats={["Real-time Sync", "Drag & Drop Builder", "Instant Setup"]}
          steps={[
            {
              id: "step-1",
              title: "Fast, Intuitive POS",
              text: "Process transactions in seconds with our touch-friendly interface. Handle cash, cards, and mobile payments effortlessly while syncing inventory in real-time.",
            },
            {
              id: "step-2",
              title: "No-Code Website Builder",
              text: "Create a stunning online store in minutes. Drag and drop components, customize colors to match your brand, and publish with one click. No coding required.",
            },
            {
              id: "step-3",
              title: "Centralized Management",
              text: "Track sales from both your physical store and website in one dashboard. Get real-time insights into best-selling products, staff performance, and revenue trends.",
            },
          ]}
          tabs={tabs}
          defaultTab="pos"
          panelMinHeight={600}
        />
      </div>
      <Footer />
    </div>
  );
}