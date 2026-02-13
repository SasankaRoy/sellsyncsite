"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { LoginSidebar } from "@/components/ui/login-sidebar";
import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";

// Sub-component for Video with Fullscreen
const ShowcaseVideo = ({ src }: { src: string }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }

      videoRef.current.muted = false;
      videoRef.current.controls = true;
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.controls = false;
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="relative h-full w-full group">
      <video
        ref={videoRef}
        src={src}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <Button
        size="icon"
        variant="secondary"
        className="absolute bottom-16 right-4 h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white border-0 z-20"
        onClick={handleFullScreen}
        title="Full Screen with Sound"
      >
        <Maximize2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export type TabMedia = {
  value: string; // unique value for Tabs
  label: string; // button label
  src: string;   // image url or video source
  alt?: string;
  type?: "image" | "video"; // media type
};

export type ShowcaseStep = {
  id: string;
  title: string;
  text: string;
};

export type FeatureShowcaseProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  /** small chips under the description */
  stats?: string[];
  /** accordion steps on the left */
  steps?: ShowcaseStep[];
  /** right-side tabs (image per tab) */
  tabs: TabMedia[];
  /** which tab is active initially */
  defaultTab?: string;
  /** fixed panel height in px (also applied as min-height) */
  panelMinHeight?: number;
  className?: string;
};

export function FeatureShowcase({
  eyebrow = "Discover",
  title,
  description,
  stats = ["1 reference", "30s setup", "Share‑ready"],
  steps = [
    {
      id: "step-1",
      title: "Drop a reference",
      text:
        "Upload a single image. We read it like a brief and extract palette, texture and cues.",
    },
    {
      id: "step-2",
      title: "Pick the vibe",
      text:
        "Switch between mockup, screen, or abstract views and tune the mood instantly.",
    },
    {
      id: "step-3",
      title: "Export & share",
      text:
        "Get a moodboard ready for your team with consistent visuals and notes.",
    },
  ],
  tabs,
  defaultTab,
  panelMinHeight = 720,
  className,
}: FeatureShowcaseProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab ?? (tabs[0]?.value ?? "tab-0"));

  // Sync internal state if defaultTab changes
  React.useEffect(() => {
    if (defaultTab) setActiveTab(defaultTab);
  }, [defaultTab]);

  // Handle accordion change to sync with tabs
  const handleAccordionChange = (value: string) => {
    if (!value) return; // Prevent closing all
    const stepIndex = steps.findIndex((s) => s.id === value);
    if (stepIndex !== -1 && tabs[stepIndex]) {
      setActiveTab(tabs[stepIndex].value);
    }
  };

  // Handle tab change to sync with accordion
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Determine active accordion item based on active tab
  const activeStepIndex = tabs.findIndex((t) => t.value === activeTab);
  const activeStepId = steps[activeStepIndex]?.id ?? steps[0]?.id;

  return (
    <section className={cn("w-full bg-background text-foreground", className)}>
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:py-20 lg:gap-14">
        {/* Left column */}
        <div className="md:col-span-6">
          <Badge variant="outline" className="mb-6">
            {eyebrow}
          </Badge>

          <h2 className="text-balance text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl pb-1">
            {title}
          </h2>

          {description ? (
            <p className="mt-6 max-w-xl text-muted-foreground">{description}</p>
          ) : null}

          {/* Stats chips */}
          {stats.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {stats.map((s, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-muted text-foreground"
                >
                  {s}
                </Badge>
              ))}
            </div>
          )}

          {/* Steps (Accordion) */}
          <div className="mt-10 max-w-xl">
            <Accordion
              type="single"
              collapsible={false}
              className="w-full"
              value={activeStepId}
              onValueChange={handleAccordionChange}
            >
              {steps.map((step) => (
                <AccordionItem key={step.id} value={step.id}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {step.text}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <LoginSidebar
                className="bg-gradient-to-r from-[#D87027] to-[#f08a4b] hover:from-[#c5621f] hover:to-[#db7b40] text-white border-none h-11 px-8 rounded-md text-base"
                variant="ghost"
                triggerText="Get started"
              />
            </div>
          </div>
        </div>

        {/* Right column (unchanged) */}
        <div className="md:col-span-6">
          <Card
            className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-0 shadow-sm"
            style={{ height: panelMinHeight, minHeight: panelMinHeight }}
          >
            <Tabs value={activeTab} onValueChange={handleTabChange} className="relative h-full w-full">
              {/* Absolute-fill media container */}
              <div className="relative h-full w-full">
                {tabs.map((t, idx) => (
                  <TabsContent
                    key={t.value}
                    value={t.value}
                    className="absolute inset-0 m-0 mt-0 h-full w-full p-0"
                  >
                    {t.type === "video" ? (
                      <ShowcaseVideo src={t.src} />
                    ) : (
                      <img
                        src={t.src}
                        alt={t.alt ?? t.label}
                        className="h-full w-full object-cover"
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                    )}
                  </TabsContent>
                ))}
              </div>

              {/* Tab controls (pill) */}
              <div className="pointer-events-auto absolute inset-x-0 bottom-4 z-10 flex w-full justify-center">
                <TabsList className="flex gap-2 rounded-xl border border-border bg-background/80 p-1 backdrop-blur supports-[backdrop-filter]:bg-background/70">
                  {tabs.map((t) => (
                    <TabsTrigger
                      key={t.value}
                      value={t.value}
                      className="rounded-lg px-4 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
                    >
                      {t.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
}
