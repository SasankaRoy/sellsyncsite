import { FeaturesSectionWithHoverEffects } from "./feature-section-with-hover-effects";

export function Demo() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            Why Retailers Across the USA Choose SellSync
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Discover the features that make SellSync the preferred choice for retailers nationwide.
          </p>
        </div>
        <FeaturesSectionWithHoverEffects />
      </div>
    </div>
  );
}