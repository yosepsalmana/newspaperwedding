import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "March 2019",
    title: "The First Encounter",
    description:
      "A chance meeting at a mutual friend's gathering. Little did they know, this would be the beginning of something beautiful.",
  },
  {
    date: "June 2019",
    title: "The First Date",
    description:
      "A quiet dinner turned into hours of conversation under the stars. It was clear this was more than just friendship.",
  },
  {
    date: "December 2020",
    title: "Moving In Together",
    description:
      "Taking the next step, they made a home together, learning the art of compromise and the beauty of everyday love.",
  },
  {
    date: "February 2024",
    title: "The Proposal",
    description:
      "On a winter evening, under the same stars where they had their first date, he asked the question that changed everything.",
  },
  {
    date: "June 2025",
    title: "The Wedding Day",
    description:
      "And so, surrounded by loved ones, they begin their forever. A new chapter in their greatest love story.",
  },
];

const LoveStorySection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-paper-aged">
      <div className="container max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="caption-text mb-3">Feature Story</p>
          <div className="divider-double w-24 mx-auto mb-6" />
          <h2 className="headline-secondary mb-4">Our Love Story</h2>
          <p className="subheadline max-w-xl mx-auto">
            The extraordinary journey of two ordinary hearts finding each other
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-divider transform md:-translate-x-1/2" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative mb-12 last:mb-0 ${
                index % 2 === 0
                  ? "md:pr-1/2 md:text-right"
                  : "md:pl-1/2 md:ml-auto"
              }`}
            >
              <div
                className={`flex items-start gap-6 md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-paper border-2 border-ink flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-ink" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 editorial-card ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                >
                  <p className="caption-text text-xs mb-2">{event.date}</p>
                  <h3 className="headline-tertiary mb-3">{event.title}</h3>
                  <p className="body-text text-base">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;
