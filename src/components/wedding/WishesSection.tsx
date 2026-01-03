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
      name: "Amanda & Budi",
      message:
        "Semoga pernikahan ini membawa kebahagiaan selamanya. Semoga perjalanan kalian berdua dipenuhi momen-momen indah!",
      date: "15 Januari 2025",
    },
    {
      name: "Keluarga Santoso",
      message:
        "Selamat menempuh hidup baru! Semoga kisah cinta kalian terus menginspirasi semua orang di sekitar.",
      date: "12 Januari 2025",
    },
    {
      name: "Om Hendra",
      message:
        "Sangat bahagia untuk kalian berdua! Semoga rumah tangga kalian dipenuhi cinta dan kegembiraan.",
      date: "10 Januari 2025",
    },
    {
      name: "Tante Rina",
      message:
        "Dua jiwa indah menjadi satu. Semoga pernikahan kalian seindah kalian berdua!",
      date: "8 Januari 2025",
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
          <p className="caption-text mb-3">Surat Pembaca</p>
          <div className="divider-double w-24 mx-auto mb-6" />
          <h2 className="headline-secondary mb-4">Ucapan & Doa</h2>
          <p className="subheadline max-w-xl mx-auto">
            Pesan-pesan tulus dari keluarga dan sahabat tercinta
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
              Jadilah yang pertama memberikan ucapan untuk mempelai!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WishesSection;