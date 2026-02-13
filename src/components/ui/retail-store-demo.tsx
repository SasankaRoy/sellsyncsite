import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-gallery"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ShoppingCart,
  Store,
  Shirt,
  Zap,
  Wine,
  Sparkles,
  PawPrint,
  Scissors,
  Pill,
  Hammer,
  Utensils,
  BookOpen,
  Dumbbell,
  Gem,
  Sofa,
  Wrench,
  Gamepad2,
  Gift,
  Coffee,
  Cake,
  Music,
  Bike,
  Palette,
} from "lucide-react"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"

// Industry images - POS system and store related
const INDUSTRY_IMAGES = [
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&h=400&fit=crop", // Clothing & Fashion
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop", // Grocery
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop", // Retail Store
  "https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmV0YWlsJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D", // POS System (Hero)
]

const CATEGORIES = [
  { name: "Grocery Stores", icon: ShoppingCart },
  { name: "Convenience Stores", icon: Store },
  { name: "Clothing Stores", icon: Shirt },
  { name: "Electronics Stores", icon: Zap },
  { name: "Liquor Stores", icon: Wine },
  { name: "Beauty Salons", icon: Sparkles },
  { name: "Nail Salons", icon: Scissors },
  { name: "Barber Shops", icon: Scissors },
  { name: "Pet Stores", icon: PawPrint },
  { name: "Pharmacies", icon: Pill },
  { name: "Hardware Stores", icon: Hammer },
  { name: "Restaurants", icon: Utensils },
  { name: "Bookstores", icon: BookOpen },
  { name: "Sporting Goods", icon: Dumbbell },
  { name: "Jewelry Stores", icon: Gem },
  { name: "Furniture Stores", icon: Sofa },
  { name: "Auto Parts", icon: Wrench },
  { name: "Toy Stores", icon: Gamepad2 },
  { name: "Gift Shops", icon: Gift },
  { name: "Coffee Shops", icon: Coffee },
  { name: "Bakeries", icon: Cake },
  { name: "Music Stores", icon: Music },
  { name: "Bike Shops", icon: Bike },
  { name: "Art Supplies", icon: Palette },
]

const MODAL_CATEGORIES = [
  {
    title: "Liquor",
    items: "Breweries & Craft Beer Dealers, Wine Shops, Liquor Stores, Alcohol + Tobacco Combo Stores, Distilleries, Tasting Rooms"
  },
  {
    title: "Tobacco",
    items: "Cigar Lounges, Tobacco Outlets, CBD, Vape Shops, Hookah Lounges, Smoke Shops"
  },
  {
    title: "Clothing",
    items: "Department Stores, Boutique Apparel, Custom Fashion, Shoe Stores, Accessories, Sportswear, Kids & Baby"
  },
  {
    title: "Convenience & Fuel",
    items: "Convenience Stores, Digital Food Menus, Fast Food Chains, Cafes, Bistros, Bakeries, Truck Stops, Delis"
  },
  {
    title: "Nightclub & Bar",
    items: "Events, Music Festivals, Lounges, Sports Bars, Pubs, Dance Clubs, Comedy Clubs"
  },
  {
    title: "Pet",
    items: "Pet Supply Stores, Pet eCommerce, Pet Feed Stores, Grooming Salons, Veterinary Clinics, Aquariums"
  },
  {
    title: "Salon & Spa",
    items: "Spas, Salons, Barbershops, Health & Beauty, Nail Salons, Massage Therapy, Tanning Salons"
  },
  {
    title: "Grocery",
    items: "Supermarkets, Farmers' Markets, Organic Food Stores, Specialty Grocers, Butchers, Seafood Markets"
  }
]

export const RetailStoreDemo = () => {
  return (
    <section className="bg-[#F9F9F9]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-4 md:grid-cols-2">
        <ContainerStagger>
          <ContainerAnimated className="mb-4 block text-sm font-medium text-[#D87027] md:text-base uppercase tracking-widest">
            Industries We Serve
          </ContainerAnimated>
          <ContainerAnimated className="text-4xl font-bold md:text-[2.4rem] tracking-tight text-slate-900">
            Built for Every Type of Retail Store
          </ContainerAnimated>
          <ContainerAnimated className="my-4 text-base text-slate-600 md:my-6 md:text-lg leading-relaxed">
            SellSync adapts to your business workflow—no matter the retail category.
          </ContainerAnimated>
          <ContainerAnimated className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {CATEGORIES.map((category, index) => {
              const Icon = category.icon
              return (
                <div key={index} className="flex items-center gap-2 min-w-0">
                  <div className="p-1 rounded-lg flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#D87027]" />
                  </div>
                  <span className="text-slate-700 font-medium text-sm whitespace-normal">{category.name}</span>
                </div>
              )
            })}
          </ContainerAnimated>
          <ContainerAnimated className="flex flex-col gap-4 sm:flex-row">
            <Dialog>
              <DialogTrigger asChild>
                <div className="inline-block cursor-pointer">
                  <MovingBorderButton
                    borderRadius="1.75rem"
                    containerClassName="h-10"
                    className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                  >
                    Learn More
                  </MovingBorderButton>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Industries We Serve</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 p-6">
                  {MODAL_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="space-y-1">
                      <h3 className="text-xl font-bold text-[#D87027]">{cat.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed text-sm font-medium">
                        {cat.items}
                      </p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </ContainerAnimated>
        </ContainerStagger>

        <GalleryGrid>
          {INDUSTRY_IMAGES.map((imageUrl, index) => (
            <GalleryGridCell index={index} key={index}>
              <img
                className="size-full object-cover object-center hover:scale-105 transition-transform duration-300"
                width="100%"
                height="100%"
                src={imageUrl}
                alt={`Industry ${index + 1}`}
              />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  )
}
