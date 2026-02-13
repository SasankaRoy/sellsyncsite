import { Check, MoveRight, PhoneCall } from "lucide-react";
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

function Pricing() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pricingCards = [
    {
      title: "Starter",
      description: "1 Store, Basic Features",
      price: "$75",
      period: "/ month",
      features: [
        {
          title: "Fast Checkout",
          description: "Quick and efficient transaction processing.",
        },
        {
          title: "Basic Inventory",
          description: "Simple inventory management tools.",
        },
        {
          title: "Email Support",
          description: "Get help via email when needed.",
        },
      ],
      buttonText: "Sign up today",
      buttonVariant: "outline" as const,
      buttonIcon: <MoveRight className="w-4 h-4" />,
      cardClassName: "w-full rounded-md",
    },
    {
      title: "Professional",
      description: "Growing Stores, Full Features",
      price: "$149",
      period: "/ month",
      features: [
        {
          title: "All Starter Features",
          description: "Includes everything from the Starter plan.",
        },
        {
          title: "Multi-Store",
          description: "Manage multiple locations seamlessly.",
        },
        {
          title: "Advanced Reporting",
          description: "Detailed analytics and insights.",
        },
        {
          title: "Phone Support",
          description: "Direct phone assistance available.",
        },
      ],
      buttonText: "Sign up today",
      buttonVariant: "default" as const,
      buttonIcon: <MoveRight className="w-4 h-4" />,
      cardClassName: "w-full shadow-2xl rounded-md bg-gradient-to-br from-amber-50 to-orange-100 border-amber-300",
      buttonClassName: "gap-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold",
    },
    {
      title: "Enterprise",
      description: "Multi-Store, Custom Solutions",
      price: "Custom",
      period: "pricing",
      features: [
        {
          title: "All Professional Features",
          description: "Everything in Professional plus more.",
        },
        {
          title: "API Access",
          description: "Integrate with your systems.",
        },
        {
          title: "Dedicated Manager",
          description: "Personal account management.",
        },
        {
          title: "On-Site Setup",
          description: "Professional installation services.",
        },
      ],
      buttonText: "Book a meeting",
      buttonVariant: "outline" as const,
      buttonIcon: <PhoneCall className="w-4 h-4" />,
      cardClassName: "w-full rounded-md",
    },
  ];

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
            className="grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8"
          >
            {pricingCards.map((card, index) => (
              <motion.div
                key={index}
                custom={{ index, isMobile }}
                variants={{
                  hidden: ({ index, isMobile }: { index: number; isMobile: boolean }) => {
                    if (isMobile) return { opacity: 0, y: 20 };

                    // Left, Center (up), Right pattern
                    switch (index) {
                      case 0:
                        return { opacity: 0, x: -100, y: 0 }; // Left
                      case 1:
                        return { opacity: 0, y: -50, x: 0 }; // Center slides from top
                      case 2:
                        return { opacity: 0, x: 100, y: 0 }; // Right
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
                      <p className="flex flex-row  items-center gap-2 text-xl">
                        <span className="text-4xl">{card.price}</span>
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          {card.period}
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
                      <Button variant={card.buttonVariant} className={card.buttonClassName || "gap-4"}>
                        {card.buttonText} {card.buttonIcon}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export { Pricing };
