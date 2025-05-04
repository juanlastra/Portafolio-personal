"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useCallback, useState } from "react";

const images = [
  "/dashboard-ui.png",
  "/imagen-2024-01-01.png",
  "/dashboard-ui.png",
];

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateButtons();
    emblaApi.on("select", updateButtons);

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => {
      emblaApi.off("select", updateButtons);
      clearInterval(autoplay);
    };
  }, [emblaApi, updateButtons]);

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="overflow-hidden rounded-xl shadow-xl" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div className="flex-[0_0_100%] relative" key={i}>
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                width={1200}
                height={800}
                className="w-70 h-80 object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botones */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 backdrop-blur-md p-2 rounded-full shadow hover:bg-white transition"
      >
        ◀
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 backdrop-blur-md p-2 rounded-full shadow hover:bg-white transition"
      >
        ▶
      </button>
    </div>
  );
};

export default EmblaCarousel;
