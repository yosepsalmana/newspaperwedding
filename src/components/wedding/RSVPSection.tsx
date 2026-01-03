import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface RSVPFormData {
  name: string;
  attendance: "yes" | "no" | "";
  guests: number;
  wishes: string;
}

interface RSVPSectionProps {
  onSubmit: (data: RSVPFormData) => void;
}

const RSVPSection = ({ onSubmit }: RSVPSectionProps) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    attendance: "",
    guests: 1,
    wishes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.attendance) {
      toast({
        title: "Mohon lengkapi semua kolom yang wajib diisi",
        variant: "destructive",
      });
      return;
    }
    onSubmit(formData);
    setSubmitted(true);
    toast({
      title: "Terima kasih atas respons Anda!",
      description: "Kami tidak sabar untuk merayakannya bersama Anda.",
    });
  };

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="caption-text mb-3">Konfirmasi Kehadiran</p>
          <div className="divider-double w-24 mx-auto mb-6" />
          <h2 className="headline-secondary mb-4">RSVP</h2>
          <p className="subheadline max-w-xl mx-auto">
            Mohon konfirmasi kehadiran sebelum 21 Mei 2025
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="editorial-card"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block caption-text text-xs mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input-editorial"
                  placeholder="Masukkan nama lengkap Anda"
                  required
                />
              </div>

              <div>
                <label className="block caption-text text-xs mb-2">
                  Apakah Anda akan hadir? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={formData.attendance === "yes"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attendance: e.target.value as "yes" | "no",
                        })
                      }
                      className="w-4 h-4 accent-ink"
                    />
                    <span className="body-text">Dengan Senang Hati Hadir</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={formData.attendance === "no"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attendance: e.target.value as "yes" | "no",
                        })
                      }
                      className="w-4 h-4 accent-ink"
                    />
                    <span className="body-text">Mohon Maaf Tidak Bisa</span>
                  </label>
                </div>
              </div>

              {formData.attendance === "yes" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block caption-text text-xs mb-2">
                    Jumlah Tamu
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: Number(e.target.value) })
                    }
                    className="input-editorial"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} Orang
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              <div>
                <label className="block caption-text text-xs mb-2">
                  Ucapan & Doa untuk Mempelai
                </label>
                <textarea
                  value={formData.wishes}
                  onChange={(e) =>
                    setFormData({ ...formData, wishes: e.target.value })
                  }
                  rows={4}
                  className="input-editorial resize-none"
                  placeholder="Sampaikan ucapan dan doa terbaik Anda untuk mempelai..."
                />
              </div>

              <div className="text-center pt-4">
                <button type="submit" className="btn-editorial">
                  Kirim Konfirmasi
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="font-display text-4xl mb-4">❧</div>
              <h3 className="headline-tertiary mb-4">Terima Kasih!</h3>
              <p className="body-text">
                Respons Anda telah tercatat. Kami menantikan kehadiran Anda!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPSection;