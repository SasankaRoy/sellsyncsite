import { Check, MoveRight, PhoneCall, Loader2, CircleCheckBig, CirclePlus, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SignupModal } from "@/components/ui/signup-modal";
import { fetchPlanList, fetchAddonList } from "@/lib/services/planList";
import type { PlanItem, AddonListItem } from "@/lib/services/planList";
import {
  fetchHardwareKitList,
  getHardwareKitDisplayName,
} from "@/lib/services/hardwareKit";

const featureDescriptions: Record<string, string> = {
  "Fast Checkout": "Quick and efficient transaction processing.",
  "Basic Inventory": "Simple inventory management tools.",
  "Email Support": "Get help via email when needed.",
  "Phone Support": "Direct phone assistance available.",
  "Basic User Management": "Manage your team with basic controls.",
  "All Starter Features": "Includes everything from the Starter plan.",
  "Multi-Store": "Manage multiple locations seamlessly.",
  "Advanced Reporting": "Detailed analytics and insights.",
  "Everything in Pro": "All Pro features included.",
  "All Professional Features": "Everything in Professional plus more.",
  "Dedicated Manager": "Personal account management.",
  "On-Site Setup": "Professional installation services.",
  "API Access": "Integrate with your systems.",
};

function getFeatureDescription(feature: string): string {
  return featureDescriptions[feature] || `Includes ${feature.toLowerCase()} support.`;
}

function isHardwareAddon(addon: AddonListItem): boolean {
  return /hardware/i.test(addon.name);
}

function getEnrichedAddonIds(plan: PlanItem): Set<string> {
  const added = new Set<string>();
  if (plan.add_ons && plan.add_ons.length > 0) {
    for (const pa of plan.add_ons) {
      if (pa.add_on_id && pa.add_on_id._id) {
        added.add(pa.add_on_id._id);
      }
    }
  }
  return added;
}

function buildPricingCards(plans: PlanItem[]) {
  const cards = plans.map((plan, index) => {
    const isEnterprise =
      plan.plan_name.toLowerCase() === "enterprise";
    const isPro = plan.plan_name.toLowerCase() === "pro" || plan.plan_name.toLowerCase() === "professional";
    const isCenter = index === 1;

    return {
      title: plan.plan_name,
      description: isEnterprise
        ? "Multi-Store, Custom Solutions"
        : `${plan.number_of_locations} Store${plan.number_of_locations > 1 ? "s" : ""}, Full Features`,
      monthlyPrice: plan.monthly_price,
      yearlyPrice: plan.yearly_price,
      isEnterprise,
      features: plan.features.map((f: string) => ({
        title: f,
        description: getFeatureDescription(f),
      })),
      planAddonIds: getEnrichedAddonIds(plan),
      buttonText: isEnterprise ? "Book a meeting" : "Sign up today",
      buttonVariant: (isPro || isCenter ? "default" : "outline") as "default" | "outline",
      buttonIcon: isEnterprise ? <PhoneCall className="w-4 h-4" /> : <MoveRight className="w-4 h-4" />,
      cardClassName: isPro || isCenter
        ? "w-full shadow-2xl rounded-md bg-gradient-to-br from-amber-50 to-orange-100 border-amber-300"
        : "w-full rounded-md",
      buttonClassName: isPro || isCenter
        ? "gap-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold"
        : "gap-4",
    };
  });

  return cards;
}

type PricingCard = ReturnType<typeof buildPricingCards>[number];

interface SelectedPlanInfo {
  title: string;
  planId: string;
  cardIndex: number;
}

function Pricing() {
  const [isMobile, setIsMobile] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanInfo | undefined>(undefined);
  const [toggledAddons, setToggledAddons] = useState<Record<number, Set<string>>>({});
  const [selectedHardwareKit, setSelectedHardwareKit] = useState<Record<number, string>>({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { data: planListData, isLoading, isError } = useQuery({
    queryKey: ["public-plan-list", 1, 10],
    queryFn: () => fetchPlanList({ page: 1, limit: 10 }),
  });

  const { data: addonListData } = useQuery({
    queryKey: ["public-addon-list", 1, 50],
    queryFn: () => fetchAddonList({ page: 1, limit: 50 }),
  });

  const allAddons = addonListData?.results ?? [];
  const hardwareAddonIds = new Set(
    allAddons.filter(isHardwareAddon).map((addon) => addon._id),
  );

  const pricingCards: PricingCard[] = planListData?.results
    ? buildPricingCards(planListData.results)
    : [];

  const isAddonIncluded = (card: PricingCard, addonId: string): boolean => {
    return card.planAddonIds.has(addonId);
  };

  const isAddonToggled = (cardIndex: number, addonId: string): boolean => {
    return toggledAddons[cardIndex]?.has(addonId) ?? false;
  };

  const isHardwareActiveForCard = (cardIndex: number): boolean => {
    const card = pricingCards[cardIndex];
    if (!card) return false;
    return Array.from(hardwareAddonIds).some(
      (id) => isAddonIncluded(card, id) || isAddonToggled(cardIndex, id),
    );
  };

  const anyHardwareAddonActive = pricingCards.some((_, cardIndex) =>
    isHardwareActiveForCard(cardIndex),
  );

  const { data: hardwareKitListData, isLoading: isHardwareKitListLoading } = useQuery({
    queryKey: ["public-hardware-kit-list", 1, 20],
    queryFn: () => fetchHardwareKitList({ page: 1, limit: 20 }),
    enabled: anyHardwareAddonActive,
  });

  const hardwareKits = hardwareKitListData?.results ?? [];

  const handleToggleAddon = (cardIndex: number, addonId: string) => {
    setToggledAddons((prev) => {
      const current = prev[cardIndex] ? new Set(prev[cardIndex]) : new Set<string>();
      if (current.has(addonId)) {
        current.delete(addonId);
      } else {
        current.add(addonId);
      }
      return { ...prev, [cardIndex]: current };
    });

    if (hardwareAddonIds.has(addonId)) {
      const wasToggled = toggledAddons[cardIndex]?.has(addonId) ?? false;
      if (wasToggled) {
        setSelectedHardwareKit((prev) => {
          const next = { ...prev };
          delete next[cardIndex];
          return next;
        });
      }
    }
  };

  const handleSelectHardwareKit = (cardIndex: number, kitId: string) => {
    setSelectedHardwareKit((prev) => ({ ...prev, [cardIndex]: kitId }));
  };

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{
            type: "tween",
            ease: [0.25, 0.1, 0.25, 1.0],
            duration: 0.8,
          }}
          className="flex text-center justify-center items-center gap-4 flex-col"
        >
          <Badge className="bg-gradient-to-r from-[#D87027] to-[#D87027] text-white border-[#D87027] shadow-lg shadow-[#D87027]/30 px-4 py-2 text-sm font-medium">Pricing</Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
              Affordable Plans for Every Retail Store
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              Choose a plan that fits your business size—software + hardware bundles available.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center gap-3 bg-muted/60 rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                !isYearly
                  ? "bg-white dark:bg-foreground/10 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                isYearly
                  ? "bg-white dark:bg-foreground/10 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
            </button>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            className="grid pt-10 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8"
          >
            {isLoading ? (
              <div className="col-span-full flex items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mr-3" />
                Loading plans...
              </div>
            ) : isError ? (
              <div className="col-span-full text-center py-20 text-destructive">
                Failed to load pricing plans. Please try again later.
              </div>
            ) : pricingCards.length === 0 ? (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                No pricing plans available at this time.
              </div>
            ) : (
              pricingCards.map((card, cardIndex) => {
                const displayPrice = isYearly
                  ? `$${card.yearlyPrice}`
                  : `$${card.monthlyPrice}`;
                const displayPeriod = isYearly
                  ? "/ year"
                  : "/ month";

                return (
                  <motion.div
                    key={cardIndex}
                    custom={{ index: cardIndex, isMobile }}
                    variants={{
                      hidden: ({ index, isMobile }: { index: number; isMobile: boolean }) => {
                        if (isMobile) return { opacity: 0, y: 20 };

                        switch (index) {
                          case 0:
                            return { opacity: 0, x: -100, y: 0 };
                          case 1:
                            return { opacity: 0, y: -50, x: 0 };
                          case 2:
                            return { opacity: 0, x: 100, y: 0 };
                          default:
                            return { opacity: 0, y: 20 };
                        }
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        transition: {
                          type: "tween",
                          ease: [0.25, 0.1, 0.25, 1.0],
                          duration: 1.0,
                          opacity: {
                            duration: 0.8,
                            ease: "easeOut",
                          },
                        },
                      },
                    }}
                  >
                    <Card className={card.cardClassName}>
                      <CardHeader>
                        <CardTitle>
                          <span className="flex flex-row gap-4 items-center font-normal">
                            {card.title}
                          </span>
                        </CardTitle>
                        <CardDescription>
                          {card.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-8 justify-start">
                          <p className="flex flex-row items-center gap-2 text-xl">
                            <span className="text-4xl">{displayPrice}</span>
                            <span className="text-sm text-muted-foreground">
                              {" "}
                              {displayPeriod}
                            </span>
                          </p>
                          <div className="flex flex-col gap-4 justify-start">
                            {card.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex flex-row gap-4">
                                <Check className="w-4 h-4 mt-2 text-primary" />
                                <div className="flex flex-col">
                                  <p>{feature.title}</p>
                                  <p className="text-muted-foreground text-sm">
                                    {feature.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Add-ons Section */}
                          {allAddons.length > 0 && (
                            <div className="border-t border-border pt-6">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="h-px flex-1 bg-border/50" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2">
                                  Add-ons
                                </span>
                                <div className="h-px flex-1 bg-border/50" />
                              </div>
                              <div className="space-y-2.5">
                                {allAddons.map((addon) => {
                                  const included = isAddonIncluded(card, addon._id);
                                  const toggled = isAddonToggled(cardIndex, addon._id);
                                  const active = included || toggled;
                                  const isHardware = isHardwareAddon(addon);

                                  const addonPrice = isYearly
                                    ? `+$${addon.yearly_price}/yr`
                                    : `+$${addon.monthly_price}/mo`;

                                  return (
                                    <div key={addon._id}>
                                    <div
                                      className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                                        active
                                          ? "border-emerald-300 dark:border-emerald-700 bg-emerald-50/40 dark:bg-emerald-950/20"
                                          : "border-border bg-transparent"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        {included ? (
                                          <CircleCheckBig className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                        ) : active ? (
                                          <CircleCheckBig className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                                        ) : (
                                          <CirclePlus className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        )}
                                        <span className="truncate">{addon.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2.5 shrink-0 ml-2">
                                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                                          {addonPrice}
                                        </span>
                                        {included ? (
                                          <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded">
                                            Included
                                          </span>
                                        ) : (
                                          <button
                                            onClick={() => handleToggleAddon(cardIndex, addon._id)}
                                            className={`inline-flex items-center justify-center rounded-full w-5 h-5 transition-colors ${
                                              toggled
                                                ? "bg-amber-500 text-white"
                                                : "bg-muted text-muted-foreground hover:bg-accent"
                                            }`}
                                          >
                                            {toggled ? (
                                              <X className="h-3 w-3" />
                                            ) : (
                                              <Plus className="h-3 w-3" />
                                            )}
                                          </button>
                                        )}
                                      </div>
                                    </div>

                                    {isHardware && active && (
                                      <div className="mt-2 ml-1 rounded-lg border border-border bg-muted/30 p-3">
                                        <p className="text-xs font-medium text-muted-foreground mb-2">
                                          Select a hardware kit
                                        </p>
                                        {isHardwareKitListLoading ? (
                                          <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            Loading hardware kits...
                                          </div>
                                        ) : hardwareKits.length === 0 ? (
                                          <p className="text-xs text-muted-foreground py-1">
                                            No hardware kits available.
                                          </p>
                                        ) : (
                                          <div className="space-y-1.5">
                                            {hardwareKits.map((kit) => {
                                              const isSelected =
                                                selectedHardwareKit[cardIndex] === kit.id;
                                              return (
                                                <button
                                                  type="button"
                                                  key={kit.id}
                                                  onClick={() =>
                                                    handleSelectHardwareKit(cardIndex, kit.id)
                                                  }
                                                  className={`flex w-full items-center justify-between rounded-md border px-2.5 py-1.5 text-xs text-left transition-colors ${
                                                    isSelected
                                                      ? "border-amber-400 bg-amber-100/60 dark:bg-amber-900/20"
                                                      : "border-border bg-background hover:bg-accent"
                                                  }`}
                                                >
                                                  <span className="truncate">
                                                    {getHardwareKitDisplayName(kit)}
                                                  </span>
                                                  {isSelected && (
                                                    <CircleCheckBig className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400 ml-2" />
                                                  )}
                                                </button>
                                              );
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          <Button
                            variant={card.buttonVariant}
                            className={card.buttonClassName || "gap-4"}
                            onClick={() => {
                              if (card.buttonText === "Sign up today") {
                                const planItem = planListData?.results[cardIndex];
                                if (planItem) {
                                  setSelectedPlan({
                                    title: card.title,
                                    planId: planItem._id,
                                    cardIndex,
                                  });
                                  setSignupModalOpen(true);
                                }
                              }
                            }}
                          >
                            {card.buttonText} {card.buttonIcon}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </motion.div>
      </div>
      <SignupModal
        open={signupModalOpen}
        onOpenChange={(v: boolean) => {
          if (!v) setSelectedPlan(undefined);
          setSignupModalOpen(v);
        }}
        planInfo={selectedPlan}
        isYearly={isYearly}
        allAddons={allAddons}
        toggledAddons={selectedPlan ? toggledAddons[selectedPlan.cardIndex] : undefined}
      />
    </div>
  );
}

export { Pricing };