import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Wish {
  name: string;
  message: string;
  date?: string;
}

interface WishesSectionProps {
  wishes: Wish[];
}

const WishesSection = ({ wishes }: WishesSectionProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const sampleWishes: Wish[] = [
    {
      name: "Amanda & James",
      message:
        "Wishing you both a lifetime of love, laughter, and happiness. May your journey together be filled with beautiful moments!",
      date: "January 15, 2025",
    },
    {
      name: "The Roberts Family",
      message:
        "Congratulations on finding your perfect match! May your love story continue to inspire those around you.",
      date: "January 12, 2025",
    },
    {
      name: "Uncle George",
      message:
        "So thrilled for you both! Wishing you endless adventures and a home filled with love and joy.",
      date: "January 10, 2025",
    },
    {
      name: "Cousin Emily",
      message:
        "Two beautiful souls becoming one. May your marriage be as wonderful as you both are!",
      date: "January 8, 2025",
    },
  ];

  const allWishes = [...wishes, ...sampleWishes];

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="caption-text mb-3">Letters to the Editor</p>
          <div className="divider-double w-24 mx-auto mb-6" />
          <h2 className="headline-secondary mb-4">Wishes & Blessings</h2>
          <p className="subheadline max-w-xl mx-auto">
            Heartfelt messages from our beloved family and friends
          </p>
        </motion.div>

        <div className="newspaper-columns-3">
          {allWishes.map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid mb-6"
            >
              <div className="editorial-card">
                <blockquote className="body-text italic mb-4">
                  "{wish.message}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <p className="font-display font-semibold text-ink">
                    — {wish.name}
                  </p>
                  {wish.date && (
                    <p className="text-xs text-ink-muted">{wish.date}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {allWishes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center py-12"
          >
            <p className="body-text text-ink-muted">
              Be the first to leave your wishes for the couple!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WishesSection;
