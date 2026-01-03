import { motion } from "framer-motion";

const NewsTicker = () => {
  const headlines = [
    "BERITA TERKINI: Cinta Ditemukan di Tempat Tak Terduga",
    "EKSKLUSIF: Dua Hati Bersatu dalam Pernikahan",
    "LAPORAN KHUSUS: Pernikahan Tahun Ini",
    "PENGUMUMAN: Perayaan Cinta & Komitmen",
    "LIPUTAN: Dari Kencan Pertama Hingga Selamanya",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 bg-ink text-paper py-2 overflow-hidden"
    >
      <div className="flex items-center">
        <span className="flex-shrink-0 px-4 py-1 bg-paper text-ink text-xs font-bold uppercase tracking-wider mr-4">
          Terkini
        </span>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker whitespace-nowrap">
            {headlines.map((headline, index) => (
              <span key={index} className="inline-block mx-8 text-sm font-body">
                {headline}
                <span className="mx-4 text-gold">◆</span>
              </span>
            ))}
            {headlines.map((headline, index) => (
              <span key={`repeat-${index}`} className="inline-block mx-8 text-sm font-body">
                {headline}
                <span className="mx-4 text-gold">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsTicker;