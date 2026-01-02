import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CoverSectionProps {
  onOpen: () => void;
}

const CoverSection = ({ onOpen }: CoverSectionProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-paper paper-texture overflow-hidden"
        >
          <div className="w-full max-w-4xl mx-auto px-6 py-8">
            {/* Newspaper Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-4"
            >
              <p className="caption-text mb-2">{currentDate}</p>
              <div className="divider-double mb-4" />
            </motion.div>

            {/* Masthead */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="font-display text-sm md:text-base uppercase tracking-[0.3em] text-ink-muted mb-2">
                The Wedding Chronicle
              </h1>
              <p className="text-xs text-ink-muted tracking-widest uppercase">
                Special Edition • Est. 2025
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="divider-thick mb-8"
            />

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center mb-8"
            >
              <p className="caption-text mb-4">Breaking News</p>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-ink leading-none mb-4">
                Sarah & Michael
              </h2>
              <p className="font-display text-2xl md:text-3xl italic text-ink-light">
                are getting married
              </p>
            </motion.div>

            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="divider-ornate">
                <span className="font-display text-lg md:text-xl text-ink-muted px-4">❧</span>
              </div>
              <p className="font-display text-xl md:text-2xl text-ink-light mt-4">
                Saturday, the Twenty-First of June
              </p>
              <p className="font-display text-lg md:text-xl text-ink-light">
                Two Thousand Twenty-Five
              </p>
            </motion.div>

            {/* Columns Teaser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 md:gap-8 mb-10 text-center"
            >
              <div className="border-r border-divider pr-4">
                <p className="caption-text text-xs mb-1">The Ceremony</p>
                <p className="font-display text-sm md:text-base text-ink-light">2:00 PM</p>
              </div>
              <div className="border-r border-divider px-4">
                <p className="caption-text text-xs mb-1">The Reception</p>
                <p className="font-display text-sm md:text-base text-ink-light">5:00 PM</p>
              </div>
              <div className="pl-4">
                <p className="caption-text text-xs mb-1">The Venue</p>
                <p className="font-display text-sm md:text-base text-ink-light">Grand Estate</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="divider-thin mb-8"
            />

            {/* Open Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-center"
            >
              <button
                onClick={handleOpen}
                className="btn-editorial group relative overflow-hidden"
              >
                <span className="relative z-10">Open Invitation</span>
              </button>
              <p className="mt-4 text-xs text-ink-muted uppercase tracking-widest">
                Click to read the full story
              </p>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-12 text-center"
            >
              <div className="divider-thin mb-4" />
              <p className="text-xs text-ink-muted tracking-wider">
                "Two souls, one love story"
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoverSection;
