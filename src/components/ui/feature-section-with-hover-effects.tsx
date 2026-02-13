import { cn } from "@/lib/utils";
import {
  IconCloud,
  IconRocket,
  IconLock,
  IconBolt,
  IconTrendingUp,
  IconRefresh,
  IconPhone,
  IconShieldCheckFilled,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "SaaS Model",
      description:
        "Simple monthly pricing structure designed for your budget.",
      icon: <IconCloud />,
    },
    {
      title: "Easy Onboarding",
      description:
        "Hands-on support to get your team up to speed quickly.",
      icon: <IconRocket />,
    },
    {
      title: "Secure & Reliable",
      description: "99.9% uptime with secure cloud hosting for peace of mind.",
      icon: <IconLock />,
    },
    {
      title: "Fast Installation",
      description:
        "Get started immediately with minimal technical setup required.",
      icon: <IconBolt />,
    },
    {
      title: "Scalable Growth",
      description: "Built to grow with you, for single or multi-store businesses.",
      icon: <IconTrendingUp />,
    },
    {
      title: "Always Improving",
      description:
        "Regular updates and new feature releases included automatically.",
      icon: <IconRefresh />,
    },
    {
      title: "24/7 Support",
      description:
        "We are available 100% of the time with dedicated support.",
      icon: <IconPhone />,
    },
    {
      title: "Money Back Guarantee",
      description:
        "If you don't like SellSync, we will convince you to love it.",
      icon: <IconShieldCheckFilled />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-6 sm:py-10 max-w-7xl mx-auto px-3 sm:px-4">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-6 sm:py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-3 sm:mb-4 relative z-10 px-6 sm:px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-base sm:text-lg font-bold mb-2 relative z-10 px-6 sm:px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-6 sm:px-10">
        {description}
      </p>
    </div>
  );
};