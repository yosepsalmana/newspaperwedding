import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "Maret 2019",
    title: "Pertemuan Pertama",
    description:
      "Pertemuan tak terduga di acara teman bersama. Tak mereka sangka, ini akan menjadi awal dari sesuatu yang indah.",
  },
  {
    date: "Juni 2019",
    title: "Kencan Pertama",
    description:
      "Makan malam sederhana berubah menjadi percakapan berjam-jam di bawah bintang. Jelas ini lebih dari sekadar pertemanan.",
  },
  {
    date: "Desember 2020",
    title: "Tinggal Bersama",
    description:
      "Mengambil langkah selanjutnya, mereka membangun rumah bersama, belajar seni kompromi dan keindahan cinta sehari-hari.",
  },
  {
    date: "Februari 2024",
    title: "Lamaran",
    description:
      "Di malam musim dingin, di bawah bintang yang sama saat kencan pertama, ia mengajukan pertanyaan yang mengubah segalanya.",
  },
  {
    date: "Juni 2025",
    title: "Hari Pernikahan",
    description:
      "Dan begitulah, dikelilingi orang-orang tercinta, mereka memulai keabadian. Babak baru dalam kisah cinta terbesar mereka.",
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
          <p className="caption-text mb-3">Liputan Khusus</p>
          <div className="divider-double w-24 mx-auto mb-6" />
          <h2 className="headline-secondary mb-4">Kisah Cinta Kami</h2>
          <p className="subheadline max-w-xl mx-auto">
            Perjalanan luar biasa dari dua hati biasa yang saling menemukan
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