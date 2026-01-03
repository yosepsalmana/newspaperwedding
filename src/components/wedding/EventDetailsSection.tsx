import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useState } from "react";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
  delay?: number;
}

const EventCard = ({
  title,
  date,
  time,
  venue,
  address,
  mapUrl,
  delay = 0,
}: EventCardProps) => {
  const [showMap, setShowMap] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const addToCalendar = () => {
    const startDate = new Date("2025-06-21T14:00:00");
    const endDate = new Date("2025-06-21T23:00:00");
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `${title} - Pernikahan Sarah & Michael`
    )}&dates=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}/${endDate
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent(
      `Bergabunglah bersama kami untuk ${title.toLowerCase()} di ${venue}`
    )}&location=${encodeURIComponent(address)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        className="editorial-card"
      >
        <p className="caption-text mb-3">{title}</p>
        <div className="divider-thick w-12 mb-6" />

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-ink-muted flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-display text-lg text-ink">{date}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-ink-muted flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-display text-lg text-ink">{time}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-ink-muted flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-display text-lg text-ink">{venue}</p>
              <p className="body-text text-sm text-ink-muted">{address}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={addToCalendar} className="btn-editorial-outline text-xs">
            Tambah ke Kalender
          </button>
          <button
            onClick={() => setShowMap(true)}
            className="btn-editorial-outline text-xs"
          >
            Lihat Lokasi
          </button>
        </div>
      </motion.div>

      {/* Map Modal */}
      {showMap && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
          onClick={() => setShowMap(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-paper w-full max-w-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="headline-tertiary">{venue}</h3>
              <button
                onClick={() => setShowMap(false)}
                className="text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-muted mb-4">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="body-text text-sm text-ink-muted">{address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial mt-4 text-xs"
            >
              Buka di Google Maps
            </a>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const EventDetailsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="caption-text mb-3">Pengumuman</p>
          <div className="divider-double w-24 mx-auto mb-6" />
          <h2 className="headline-secondary mb-4">Detail Acara</h2>
          <p className="subheadline max-w-xl mx-auto">
            Bergabunglah bersama kami merayakan momen bahagia ini
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <EventCard
            title="Akad Nikah"
            date="Sabtu, 21 Juni 2025"
            time="14:00 WIB"
            venue="Masjid Al-Hikmah"
            address="Jl. Raya No. 123, Jakarta Selatan 12345"
            mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.0123456789!2d-117.3961!3d33.9533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU3JzEyLjAiTiAxMTfCsDIzJzQ2LjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
            delay={0.2}
          />
          <EventCard
            title="Resepsi"
            date="Sabtu, 21 Juni 2025"
            time="17:00 WIB"
            venue="Grand Estate Gardens"
            address="Jl. Garden Boulevard No. 456, Jakarta Selatan 12346"
            mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.0123456789!2d-117.3961!3d33.9533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU3JzEyLjAiTiAxMTfCsDIzJzQ2LjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default EventDetailsSection;