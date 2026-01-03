import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    alt: "Potret pasangan",
    caption: "Musim Panas 2023",
  },
  {
    src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800",
    alt: "Foto pertunangan",
    caption: "Lamaran",
  },
  {
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800",
    alt: "Bersama",
    caption: "Petualangan kami",
  },
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
    alt: "Momen romantis",
    caption: "Musim Semi 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
    alt: "Foto candid",
    caption: "Di pantai",
  },
  {
    src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800",
    alt: "Bersama selamanya",
    caption: "Selamanya dimulai",
  },
];

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goToPrevious = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    );
  const goToNext = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );

  return (
    <section ref={ref} className="py-16 md:py-24 bg-paper-aged">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="caption-text mb-3">Galeri Foto</p>
          <div className="divider-double w-24 mx-auto mb-6" />
          <h2 className="headline-secondary mb-4">Momen Terabadikan</h2>
          <p className="subheadline max-w-xl mx-auto">
            Kumpulan kenangan dari perjalanan kami bersama
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden cursor-pointer group ${
                index === 0 || index === 5 ? "md:row-span-2" : ""
              }`}
              onClick={() => openLightbox(index)}
            >
              <div
                className={`aspect-square ${
                  index === 0 || index === 5 ? "md:aspect-[3/4]" : ""
                } overflow-hidden`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-all duration-300 flex items-end justify-center pb-4">
                <span className="text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-body tracking-wider">
                  {image.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-paper/70 hover:text-paper z-50"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/70 hover:text-paper z-50 p-2"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-paper/70 hover:text-paper z-50 p-2"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                className="max-w-full max-h-[75vh] object-contain"
              />
              <p className="text-center text-paper/70 mt-4 font-body tracking-wider">
                {galleryImages[selectedIndex].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;