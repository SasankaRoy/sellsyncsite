import { SectionData } from '@/types/builder';
import { Expand, ZoomIn, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { getImageUrl } from '@/lib/api';

interface GallerySectionProps {
  data: SectionData['data'];
  variant?: string;
  isPreview?: boolean;
}

export function GallerySection({ data, variant = 'grid', isPreview }: GallerySectionProps) {
  const {
    heading,
    description,
    items = [],
    backgroundColor,
    textColor,
    padding,
  } = data;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const openLightbox = (index: number) => {
    if (!isPreview) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % items.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const filteredItems = data.categories && selectedCategory !== 'All'
    ? items.filter((item: any) => item.category === selectedCategory)
    : items;

  if (variant === 'masonry') {
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
          <div className="text-center mb-16 space-y-6">
            {heading && (
              <div className="space-y-2">
                <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Portfolio
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{heading}</h2>
              </div>
            )}
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
            )}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="break-inside-avoid overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {item.image && (
                  <div className="relative">
                    <img
                      src={getImageUrl(item.image.src)}
                      alt={item.image.alt}
                      className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-6">
                      {item.title && (
                        <p className="text-white text-xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</p>
                      )}
                      {item.description && (
                        <p className="text-white/80 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.description}</p>
                      )}
                      <div className="mt-4 flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
                          <Expand className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Gallery with Lightbox Variant
  if (variant === 'lightbox') {
    return (
      <>
        <section
          className="w-full transition-all"
          style={{
            backgroundColor: backgroundColor || 'hsl(var(--muted))',
            color: textColor || 'hsl(var(--foreground))',
            padding: padding || '100px 24px',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-6">
              {heading && (
                <div className="space-y-2">
                  <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    Project Showcase
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{heading}</h2>
                </div>
              )}
              {description && (
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  onClick={() => openLightbox(index)}
                >
                  {item.image && (
                    <div className="relative aspect-video">
                      <img
                        src={getImageUrl(item.image.src)}
                        alt={item.image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                        {item.title && (
                          <p className="text-white text-xl font-bold text-center">{item.title}</p>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="p-6 bg-card">
                    {item.title && (
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    )}
                    {item.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-full">
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative">
                <img
                  src={items[currentImageIndex]?.image?.src}
                  alt={items[currentImageIndex]?.image?.alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />

                {items.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-6 text-center text-white">
                {items[currentImageIndex]?.title && (
                  <h3 className="text-2xl font-bold mb-2">{items[currentImageIndex].title}</h3>
                )}
                {items[currentImageIndex]?.description && (
                  <p className="text-white/80 max-w-2xl mx-auto">{items[currentImageIndex].description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Minimal Gallery Variant
  if (variant === 'minimal') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '140px 24px',
        }}
      >
        <div className="max-w-6xl mx-auto text-center space-y-16">
          {heading && (
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{heading}</h2>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {items.map((item: any) => (
              <div key={item.id} className="group space-y-4">
                {item.image && (
                  <div className="aspect-square overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                    <img
                      src={getImageUrl(item.image.src)}
                      alt={item.image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                {item.title && (
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{item.title}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Gallery with Categories Variant
  if (variant === 'categories') {
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
          <div className="text-center mb-16 space-y-6">
            {heading && (
              <div className="space-y-2">
                <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Our Projects
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{heading}</h2>
              </div>
            )}
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
            )}
          </div>

          {/* Category Filter */}
          {data.categories && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {data.categories.map((category: string) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white/50 hover:bg-white/80 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item: any) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-card"
              >
                {item.image && (
                  <div className="relative aspect-video">
                    <img
                      src={getImageUrl(item.image.src)}
                      alt={item.image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  {item.category && (
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                      {item.category}
                    </span>
                  )}
                  {item.title && (
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Gallery Carousel Variant
  if (variant === 'carousel') {
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
          <div className="text-center mb-16 space-y-6">
            {heading && (
              <div className="space-y-2">
                <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Featured Work
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{heading}</h2>
              </div>
            )}
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
            )}
          </div>

          <div className="relative overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {items.map((item: any) => (
                <div key={item.id} className="w-full flex-shrink-0 relative">
                  {item.image && (
                    <div className="aspect-[16/9] relative">
                      <img
                        src={getImageUrl(item.image.src)}
                        alt={item.image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 flex items-center">
                        <div className="max-w-4xl mx-auto px-12 text-white">
                          {item.title && (
                            <h3 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h3>
                          )}
                          {item.description && (
                            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {items.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {items.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

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
        <div className="text-center mb-16 space-y-6">
          {heading && (
            <div className="space-y-2">
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Gallery
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{heading}</h2>
            </div>
          )}
          {description && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item: any, index: number) => (
            <div
              key={item.id}
              className={`overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              {item.image && (
                <div className="relative h-full aspect-square">
                  <img
                    src={getImageUrl(item.image.src)}
                    alt={item.image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-end p-6">
                    {item.title && (
                      <p className="text-white text-lg font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</p>
                    )}
                    <div className="mt-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-white/40">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

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
        <div className="text-center mb-16 space-y-6">
          {heading && (
            <div className="space-y-2">
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Gallery
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{heading}</h2>
            </div>
          )}
          {description && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item: any, index: number) => (
            <div
              key={item.id}
              className={`overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              {item.image && (
                <div className="relative h-full aspect-square">
                  <img
                    src={getImageUrl(item.image.src)}
                    alt={item.image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-6">
                    {item.title && (
                      <p className="text-white text-lg font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</p>
                    )}
                    <div className="mt-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-white/40">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
