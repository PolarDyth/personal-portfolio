import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: {
    src: string;
    alt: string;
    description?: string;
  }[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages =
    images.length > 0
      ? images
      : [
          {
            src: "https://kzmqem5a2thfoqjtshg0.lite.vusercontent.net/placeholder.svg",
            alt: "Placeholder Image",
          },
        ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentIndex(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {galleryImages.map((image, index) => (
            <CarouselItem key={index} className="relative group/hide">
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-5 items-center justify-between flex opacity-0 z-10 group/hide group-hover/hide:opacity-100 transition-opacity duration-100">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 backdrop-blur-sm">
                  <p className="text-sm">{image.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-4 p-4">
          {galleryImages.map((image, index) => (
            <button
              className={cn(
                "overflow-hidden transition-all rounded-md cursor-pointer",
                currentIndex - 1 === index
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "opacity-60 hover:opacity-100"
              )}
              onClick={() => api?.scrollTo(index)}
              key={index}
            >
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                height="64"
                width="64"
                className="aspect-square object-cover"
              />
            </button>
          ))}
        </div>
      </Carousel>
    </div>
  );
}
