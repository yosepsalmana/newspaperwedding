import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ProfileSectionProps {
  name: string;
  title: string;
  parentInfo: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
}

const ProfileSection = ({
  name,
  title,
  parentInfo,
  description,
  imageUrl,
  reverse = false,
}: ProfileSectionProps) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
            reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 30 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${reverse ? "md:order-2" : ""}`}
          >
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-full h-full border-2 border-ink -z-10" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`${reverse ? "md:order-1" : ""}`}
          >
            <p className="caption-text mb-3">{title}</p>
            <div className="divider-thick w-16 mb-6" />
            <h2 className="headline-secondary mb-3">{name}</h2>
            <p className="subheadline mb-6">{parentInfo}</p>
            <div className="newspaper-columns">
              <p className="body-text">{description}</p>
            </div>
            <div className="divider-ornate mt-8">
              <span className="font-display text-2xl text-ink-muted">❧</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfileSection;
