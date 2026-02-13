import { SectionData } from '@/types/builder';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Tag, ArrowRight, Heart } from 'lucide-react';
import { getImageUrl } from '@/lib/api';

interface ProductsSectionProps {
  data: SectionData['data'];
  variant?: string;
  isPreview?: boolean;
}

export function ProductsSection({ data, variant = 'grid', isPreview }: ProductsSectionProps) {
  const {
    heading,
    description,
    items = [],
    buttons,
    backgroundColor,
    textColor,
    padding,
  } = data;

  const renderRating = (rating: number, reviews?: number) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-300'
                }`}
            />
          ))}
        </div>
        {reviews && (
          <span className="text-sm text-muted-foreground">({reviews})</span>
        )}
      </div>
    );
  };

  // Gradient Variant - Matches gradient hero
  if (variant === 'gradient') {
    return (
      <section
        className="w-full relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom right, ${backgroundColor || '#6366f1'}, #8b5cf6, #ec4899)`,
          color: textColor || '#ffffff',
          padding: padding || '100px 24px',
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMy4zMTMgMi42ODctNiA2LTZzNi0yLjY4NyA2LTZ2MzZjMCAzLjMxMy0yLjY4NyA2LTYgNnMtNiAyLjY4Ny02IDZWMTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium text-white">
              Products
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {heading || 'Our Products'}
            </h2>
            {description && (
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95 leading-relaxed text-white">
                {description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={getImageUrl(item.image?.src)}
                    alt={item.image?.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.inStock && (
                    <div className="absolute top-4 right-4 bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-bold">
                      In Stock
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {item.name}
                  </h3>
                  {item.rating && renderRating(item.rating, item.reviews)}
                  <p className="text-white/80 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-white">${item.price}</span>
                    <Button
                      size="sm"
                      className="bg-white text-purple-600 hover:bg-white/90"
                      onClick={(e) => isPreview && e.preventDefault()}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fullscreen Variant - Matches fullscreen hero
  if (variant === 'fullscreen') {
    return (
      <section
        className="w-full relative min-h-screen flex items-center"
        style={{
          backgroundColor: backgroundColor || '#000000',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

        <div className="relative z-10 w-full px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium">
                Products
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none text-white tracking-tight">
                {heading || 'Our Products'}
              </h2>
              {description && (
                <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed text-white/90">
                  {description}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="group bg-white/5 backdrop-blur-lg border-2 border-white/20 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={getImageUrl(item.image?.src)}
                      alt={item.image?.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight text-white">
                      {item.name}
                    </h3>
                    <p className="text-white/80 leading-relaxed text-lg">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-3xl font-bold text-white">${item.price}</span>
                      <Button
                        size="lg"
                        className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-bold"
                        onClick={(e) => isPreview && e.preventDefault()}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Minimal Variant - Matches minimal hero
  if (variant === 'minimal') {
    return (
      <section
        className="w-full"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '140px 24px',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight" style={{ color: textColor }}>
              {heading || 'Our Products'}
            </h2>
            {description && (
              <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-70" style={{ color: textColor }}>
                {description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="group space-y-6"
              >
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={getImageUrl(item.image?.src)}
                    alt={item.image?.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight" style={{ color: textColor }}>
                    {item.name}
                  </h3>
                  <p className="leading-relaxed opacity-70" style={{ color: textColor }}>
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-3xl font-bold" style={{ color: textColor }}>${item.price}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => isPreview && e.preventDefault()}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // CTA Focused Variant - Matches cta-focused hero
  if (variant === 'cta-focused') {
    return (
      <section
        className="w-full relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${backgroundColor || '#10b981'} 0%, #059669 100%)`,
          color: textColor || '#ffffff',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white font-bold shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              Featured Products
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-white">
              {heading || 'Shop Now'}
            </h2>
            {description && (
              <p className="text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed font-medium text-white">
                {description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={item.image?.src}
                    alt={item.image?.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.originalPrice && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      <Tag className="w-4 h-4 inline mr-1" />
                      SALE
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                    {item.name}
                  </h3>
                  {item.rating && renderRating(item.rating, item.reviews)}
                  <p className="text-gray-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-green-600">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">${item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg"
                    onClick={(e) => isPreview && e.preventDefault()}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Split Variant - Matches split hero
  if (variant === 'split') {
    return (
      <section
        className="w-full"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                Products
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight" style={{ color: textColor }}>
                {heading || 'Our Products'}
              </h2>
              {description && (
                <p className="text-lg md:text-xl leading-relaxed opacity-80" style={{ color: textColor }}>
                  {description}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              {buttons && buttons.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {buttons.map((button: any, idx: number) => (
                    <Button
                      key={idx}
                      variant={button.variant}
                      size={button.size}
                      onClick={(e) => isPreview && e.preventDefault()}
                    >
                      {button.text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item: any) => (
              <Card
                key={item.id}
                className="group overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden relative bg-gradient-to-br from-muted to-muted/50">
                  <img
                    src={getImageUrl(item.image?.src)}
                    alt={item.image?.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold tracking-tight" style={{ color: textColor }}>
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed line-clamp-2" style={{ color: textColor, opacity: 0.8 }}>
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-primary">${item.price}</span>
                    <Button
                      size="sm"
                      onClick={(e) => isPreview && e.preventDefault()}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Image Right Variant - Matches image-right hero
  if (variant === 'image-right') {
    const featuredProduct = items[0];
    const otherProducts = items.slice(1);

    return (
      <section
        className="w-full"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Featured Product */}
          {featuredProduct && (
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  Featured Product
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight" style={{ color: textColor }}>
                  {featuredProduct.name}
                </h2>
                {featuredProduct.rating && renderRating(featuredProduct.rating, featuredProduct.reviews)}
                <p className="text-lg md:text-xl leading-relaxed opacity-80" style={{ color: textColor }}>
                  {featuredProduct.description}
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">${featuredProduct.price}</span>
                  {featuredProduct.originalPrice && (
                    <span className="text-2xl text-muted-foreground line-through">${featuredProduct.originalPrice}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button size="lg" onClick={(e) => isPreview && e.preventDefault()}>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg" onClick={(e) => isPreview && e.preventDefault()}>
                    <Heart className="w-5 h-5 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={getImageUrl(featuredProduct.image?.src)}
                    alt={featuredProduct.image?.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Other Products */}
          {otherProducts.length > 0 && (
            <>
              <div className="text-center space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: textColor }}>
                  {heading || 'More Products'}
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherProducts.map((item: any) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-square overflow-hidden relative bg-gradient-to-br from-muted to-muted/50">
                      <img
                        src={getImageUrl(item.image?.src)}
                        alt={item.image?.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6 space-y-3">
                      <h3 className="text-xl font-bold tracking-tight" style={{ color: textColor }}>
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed line-clamp-2" style={{ color: textColor, opacity: 0.8 }}>
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-2xl font-bold text-primary">${item.price}</span>
                        <Button
                          size="sm"
                          onClick={(e) => isPreview && e.preventDefault()}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    );
  }

  // Featured Product Variant
  if (variant === 'featured') {
    const product = items[0];
    if (!product) return null;

    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              {product.originalPrice && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  <Tag className="w-4 h-4 inline mr-1" />
                  {Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)}% OFF
                </div>
              )}
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 shadow-2xl">
                <img
                  src={getImageUrl(product.image?.src)}
                  alt={product.image?.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {heading || 'Featured Product'}
              </div>

              <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: textColor }}>
                {product.name}
              </h2>

              {product.rating && renderRating(product.rating, product.reviews)}

              <p className="text-xl text-muted-foreground leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
                {product.description}
              </p>

              {product.features && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Key Features:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>

              {buttons && buttons.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {buttons.map((button: any, idx: number) => (
                    <Button
                      key={idx}
                      variant={button.variant}
                      size={button.size}
                      className="shadow-lg"
                      onClick={(e) => isPreview && e.preventDefault()}
                    >
                      {button.variant === 'primary' && <ShoppingCart className="w-5 h-5 mr-2" />}
                      {button.text}
                    </Button>
                  ))}
                </div>
              )}

              {product.inStock ? (
                <p className="text-sm text-green-600 font-medium">✓ In Stock - Ships in 24 hours</p>
              ) : (
                <p className="text-sm text-red-600 font-medium">Out of Stock</p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Carousel Variant
  if (variant === 'carousel') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--muted))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Products
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: textColor }}>
              {heading || 'Our Products'}
            </h2>
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
                {description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item: any) => (
              <Card
                key={item.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card"
              >
                <div className="aspect-square overflow-hidden relative bg-gradient-to-br from-muted to-muted/50">
                  <img
                    src={getImageUrl(item.image?.src)}
                    alt={item.image?.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.inStock && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      In Stock
                    </div>
                  )}
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold tracking-tight" style={{ color: textColor }}>
                    {item.name}
                  </h3>
                  {item.rating && renderRating(item.rating, item.reviews)}
                  <p className="text-muted-foreground leading-relaxed line-clamp-2" style={{ color: textColor, opacity: 0.8 }}>
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-primary">${item.price}</span>
                    <Button
                      size="sm"
                      className="shadow-md"
                      onClick={(e) => isPreview && e.preventDefault()}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Grid Variant (default) - Matches centered hero
  return (
    <section
      className="w-full transition-all"
      style={{
        backgroundColor: backgroundColor || 'hsl(var(--background))',
        color: textColor || 'hsl(var(--foreground))',
        padding: padding || '100px 24px',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Products
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: textColor }}>
            {heading || 'Our Products'}
          </h2>
          {description && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
              {description}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any, index: number) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card"
            >
              <div className="aspect-square overflow-hidden relative bg-gradient-to-br from-muted to-muted/50">
                <img
                  src={getImageUrl(item.image?.src)}
                  alt={item.image?.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.category && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {item.category}
                  </div>
                )}
                {item.inStock && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    In Stock
                  </div>
                )}
              </div>
              <CardContent className="p-6 space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors" style={{ color: textColor }}>
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed line-clamp-2" style={{ color: textColor, opacity: 0.8 }}>
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-2xl font-bold text-primary">${item.price}</span>
                  <Button
                    size="sm"
                    className="shadow-md group-hover:scale-105 transition-transform"
                    onClick={(e) => isPreview && e.preventDefault()}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
