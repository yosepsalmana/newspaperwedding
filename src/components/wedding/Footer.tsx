import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <footer ref={ref} className="py-12 bg-ink text-paper">
      <div className="container max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Ornament */}
          <div className="mb-6">
            <span className="font-display text-3xl text-gold-muted">❧</span>
          </div>

          {/* Initials */}
          <div className="mb-6">
            <span className="font-display text-4xl md:text-5xl font-bold tracking-wider">
              S & M
            </span>
          </div>

          {/* Date */}
          <p className="font-display text-lg mb-2">21 Juni 2025</p>

          {/* Divider */}
          <div className="w-24 h-px bg-paper/30 mx-auto my-6" />

          {/* Tagline */}
          <p className="text-sm text-paper/60 tracking-widest uppercase mb-4">
            Dicetak dengan cinta
          </p>

          {/* Credits */}
          <p className="text-xs text-paper/40">
            The Wedding Chronicle • Edisi Khusus
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;