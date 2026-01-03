import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CoverSectionProps {
  onOpen: () => void;
}

const CoverSection = ({ onOpen }: CoverSectionProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Wedding date - June 21, 2025
  const weddingDate = new Date("2025-06-21T14:00:00");

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

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
          className="fixed inset-0 z-50 bg-paper paper-texture overflow-y-auto"
        >
          <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-8">
            {/* Top Edition Bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex justify-between items-center text-[10px] md:text-xs text-ink-muted uppercase tracking-wider mb-2 border-b border-ink pb-2"
            >
              <span>Vol. MMXXV • No. 621</span>
              <span>Special Wedding Edition</span>
              <span>Price: Priceless</span>
            </motion.div>

            {/* Masthead */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center py-4 md:py-6 border-b-4 border-double border-ink"
            >
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-ink leading-none">
                The Wedding Times
              </h1>
              <p className="text-[10px] md:text-xs text-ink-muted mt-2 tracking-[0.2em] uppercase">
                "All the Love That's Fit to Print" • Established in the Year of Love
              </p>
            </motion.div>

            {/* Date Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex justify-center items-center py-2 border-b border-ink text-xs md:text-sm text-ink-muted"
            >
              <span className="tracking-wider">{currentDate}</span>
            </motion.div>

            {/* Breaking News Countdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-ink text-paper py-3 px-4 my-4"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest animate-pulse">
                  ⚡ Breaking News ⚡
                </span>
                <div className="flex items-center gap-3 md:gap-4 font-mono">
                  <div className="text-center">
                    <span className="text-xl md:text-3xl font-bold">{countdown.days}</span>
                    <span className="text-[10px] md:text-xs block uppercase tracking-wider">Days</span>
                  </div>
                  <span className="text-xl md:text-2xl font-bold">:</span>
                  <div className="text-center">
                    <span className="text-xl md:text-3xl font-bold">{countdown.hours}</span>
                    <span className="text-[10px] md:text-xs block uppercase tracking-wider">Hours</span>
                  </div>
                  <span className="text-xl md:text-2xl font-bold">:</span>
                  <div className="text-center">
                    <span className="text-xl md:text-3xl font-bold">{countdown.minutes}</span>
                    <span className="text-[10px] md:text-xs block uppercase tracking-wider">Min</span>
                  </div>
                  <span className="text-xl md:text-2xl font-bold">:</span>
                  <div className="text-center">
                    <span className="text-xl md:text-3xl font-bold">{countdown.seconds}</span>
                    <span className="text-[10px] md:text-xs block uppercase tracking-wider">Sec</span>
                  </div>
                </div>
                <span className="text-[10px] md:text-xs uppercase tracking-wider">Until "I Do"</span>
              </div>
            </motion.div>

            {/* Main Headline Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center py-4 border-b border-ink"
            >
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-ink-muted mb-2">
                Wedding Announcement • Save the Date
              </p>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase text-ink leading-none tracking-tight">
                SARAH & MICHAEL
              </h2>
              <p className="font-display text-xl md:text-3xl italic text-ink-light mt-2">
                "A Love Story Worth Printing"
              </p>
            </motion.div>

            {/* Subheadlines Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-3 border-b border-ink text-center"
            >
              <div className="py-3 border-r border-ink">
                <p className="text-[10px] md:text-xs uppercase tracking-wider text-ink-muted">The Ceremony</p>
                <p className="font-display text-sm md:text-lg font-bold text-ink">June 21, 2025</p>
              </div>
              <div className="py-3 border-r border-ink">
                <p className="text-[10px] md:text-xs uppercase tracking-wider text-ink-muted">Time</p>
                <p className="font-display text-sm md:text-lg font-bold text-ink">2:00 PM</p>
              </div>
              <div className="py-3">
                <p className="text-[10px] md:text-xs uppercase tracking-wider text-ink-muted">Venue</p>
                <p className="font-display text-sm md:text-lg font-bold text-ink">Grand Estate</p>
              </div>
            </motion.div>

            {/* Photo Gallery Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-12 gap-2 md:gap-3 py-4 border-b border-ink"
            >
              {/* Left Column - Small Photos */}
              <div className="col-span-3 flex flex-col gap-2 md:gap-3">
                <div className="bg-ink-muted/20 aspect-[3/4] relative overflow-hidden border border-ink">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/30" />
                  <img 
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=400&fit=crop" 
                    alt="The Bride" 
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <p className="text-[8px] md:text-[10px] text-ink-muted text-center uppercase tracking-wider leading-tight">
                  The Beautiful Bride
                </p>
                <div className="bg-ink-muted/20 aspect-square relative overflow-hidden border border-ink">
                  <img 
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=200&h=200&fit=crop" 
                    alt="Engagement Ring" 
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <p className="text-[8px] md:text-[10px] text-ink-muted text-center uppercase tracking-wider leading-tight">
                  The Ring
                </p>
              </div>

              {/* Center - Main Hero Photo */}
              <div className="col-span-6 flex flex-col">
                <div className="bg-ink-muted/20 aspect-[4/5] relative overflow-hidden border-2 border-ink">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/20" />
                  <img 
                    src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&h=750&fit=crop" 
                    alt="The Happy Couple" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-ink/80 py-2 px-3">
                    <p className="text-paper text-[10px] md:text-xs text-center uppercase tracking-wider">
                      Sarah & Michael — Together Forever
                    </p>
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-ink-muted text-center mt-2 italic">
                  Photo: Exclusive portrait of the happy couple on their engagement day
                </p>
              </div>

              {/* Right Column - Small Photos + Text */}
              <div className="col-span-3 flex flex-col gap-2 md:gap-3">
                <div className="bg-ink-muted/20 aspect-[3/4] relative overflow-hidden border border-ink">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop" 
                    alt="The Groom" 
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <p className="text-[8px] md:text-[10px] text-ink-muted text-center uppercase tracking-wider leading-tight">
                  The Handsome Groom
                </p>
                <div className="bg-ink-muted/20 aspect-square relative overflow-hidden border border-ink">
                  <img 
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200&h=200&fit=crop" 
                    alt="Wedding Venue" 
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <p className="text-[8px] md:text-[10px] text-ink-muted text-center uppercase tracking-wider leading-tight">
                  The Venue
                </p>
              </div>
            </motion.div>

            {/* News Columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-ink"
            >
              <div className="border-b md:border-b-0 md:border-r border-ink pb-4 md:pb-0 md:pr-4">
                <h3 className="font-display text-sm md:text-base font-bold uppercase text-ink mb-2 border-b border-ink-muted pb-1">
                  Inside This Edition
                </h3>
                <ul className="text-[10px] md:text-xs text-ink-light space-y-1">
                  <li>• Our Love Story — Page 2</li>
                  <li>• Meet the Bride & Groom — Page 3</li>
                  <li>• Event Details — Page 4</li>
                  <li>• Photo Gallery — Page 5</li>
                  <li>• RSVP Information — Page 6</li>
                </ul>
              </div>
              <div className="border-b md:border-b-0 md:border-r border-ink pb-4 md:pb-0 md:pr-4">
                <h3 className="font-display text-sm md:text-base font-bold uppercase text-ink mb-2 border-b border-ink-muted pb-1">
                  How They Met
                </h3>
                <p className="text-[10px] md:text-xs text-ink-light leading-relaxed">
                  In a twist of fate that could only be described as destiny, two strangers crossed paths 
                  on a rainy afternoon. What began as a chance encounter blossomed into an extraordinary 
                  love story that continues to inspire all who witness it.
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm md:text-base font-bold uppercase text-ink mb-2 border-b border-ink-muted pb-1">
                  From the Editors
                </h3>
                <p className="text-[10px] md:text-xs text-ink-light leading-relaxed">
                  We are delighted to announce this special edition celebrating the union of two 
                  remarkable individuals. Their journey together promises to be filled with love, 
                  laughter, and endless adventures.
                </p>
              </div>
            </motion.div>

            {/* Quote Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-center py-4 border-b border-ink"
            >
              <p className="font-display text-lg md:text-2xl italic text-ink-light">
                "Two souls with but a single thought, two hearts that beat as one."
              </p>
              <p className="text-[10px] md:text-xs text-ink-muted mt-1 uppercase tracking-wider">
                — John Keats
              </p>
            </motion.div>

            {/* Open Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-center py-6"
            >
              <button
                onClick={handleOpen}
                className="bg-ink text-paper px-8 md:px-12 py-3 md:py-4 font-display text-sm md:text-lg uppercase tracking-[0.2em] font-bold hover:bg-ink-light transition-colors duration-300 border-2 border-ink"
              >
                Open Invitation
              </button>
              <p className="mt-3 text-[10px] md:text-xs text-ink-muted uppercase tracking-[0.15em]">
                Click above to continue reading • Exclusive content inside
              </p>
            </motion.div>

            {/* Footer Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-[9px] md:text-[10px] text-ink-muted uppercase tracking-wider border-t border-ink pt-4"
            >
              <span>© 2025 The Wedding Times</span>
              <span className="hidden md:inline">•</span>
              <span>All Rights Reserved</span>
              <span className="hidden md:inline">•</span>
              <span>Printed with Love</span>
              <span className="hidden md:inline">•</span>
              <span>S & M</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoverSection;
