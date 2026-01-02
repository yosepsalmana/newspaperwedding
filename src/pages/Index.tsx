import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CoverSection from "@/components/wedding/CoverSection";
import NewsTicker from "@/components/wedding/NewsTicker";
import ProfileSection from "@/components/wedding/ProfileSection";
import LoveStorySection from "@/components/wedding/LoveStorySection";
import EventDetailsSection from "@/components/wedding/EventDetailsSection";
import GallerySection from "@/components/wedding/GallerySection";
import RSVPSection from "@/components/wedding/RSVPSection";
import GiftSection from "@/components/wedding/GiftSection";
import WishesSection from "@/components/wedding/WishesSection";
import Footer from "@/components/wedding/Footer";

interface Wish {
  name: string;
  message: string;
  date?: string;
}

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleRSVPSubmit = (data: {
    name: string;
    attendance: string;
    guests: number;
    wishes: string;
  }) => {
    if (data.wishes) {
      const newWish: Wish = {
        name: data.name,
        message: data.wishes,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      };
      setWishes((prev) => [newWish, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta */}
      <title>Sarah & Michael | Wedding Invitation</title>
      <meta
        name="description"
        content="You are cordially invited to celebrate the wedding of Sarah Johnson and Michael Thompson on June 21, 2025."
      />

      {/* Cover Section - Locked until opened */}
      <AnimatePresence>
        {!isOpen && <CoverSection onOpen={handleOpen} />}
      </AnimatePresence>

      {/* Main Content - Revealed after opening */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* News Ticker */}
            <NewsTicker />

            {/* Main Content with top padding for ticker */}
            <main className="pt-12">
              {/* Section Divider - Masthead */}
              <motion.header
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="py-8 md:py-12 text-center"
              >
                <div className="container max-w-4xl mx-auto px-6">
                  <div className="divider-double mb-6" />
                  <h1 className="font-display text-sm md:text-base uppercase tracking-[0.3em] text-ink-muted mb-2">
                    The Wedding Chronicle
                  </h1>
                  <p className="text-xs text-ink-muted tracking-widest uppercase mb-4">
                    Special Edition • June 21, 2025
                  </p>
                  <div className="divider-thick" />
                </div>
              </motion.header>

              {/* Hero Section */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="py-12 md:py-20 text-center"
              >
                <div className="container max-w-4xl mx-auto px-6">
                  <p className="caption-text mb-4">Joyfully Announce</p>
                  <h2 className="headline-primary mb-6">Sarah & Michael</h2>
                  <p className="subheadline text-2xl md:text-3xl mb-4">
                    are getting married
                  </p>
                  <div className="divider-ornate">
                    <span className="font-display text-2xl text-ink-muted">
                      ❧
                    </span>
                  </div>
                  <p className="font-display text-xl md:text-2xl text-ink-light mt-4">
                    Saturday, the Twenty-First of June
                  </p>
                  <p className="font-display text-lg text-ink-light">
                    Two Thousand Twenty-Five
                  </p>
                </div>
              </motion.section>

              <div className="container max-w-5xl mx-auto px-6">
                <div className="divider-thin" />
              </div>

              {/* Bride Profile */}
              <ProfileSection
                name="Sarah Johnson"
                title="The Bride"
                parentInfo="Daughter of Robert & Elizabeth Johnson"
                description="A woman of grace and warmth, Sarah brings light into every room she enters. Her passion for art and love for adventure have led her on many journeys, but the most meaningful one was finding her way to Michael. With a heart full of love and dreams of forever, she steps into this new chapter with joy and anticipation."
                imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600"
              />

              <div className="container max-w-5xl mx-auto px-6">
                <div className="divider-thin" />
              </div>

              {/* Groom Profile */}
              <ProfileSection
                name="Michael Thompson"
                title="The Groom"
                parentInfo="Son of William & Margaret Thompson"
                description="A gentleman with a kind soul and a contagious smile, Michael has always believed in the power of love. His dedication to family and his unwavering support for Sarah have made their bond unbreakable. Today, he stands ready to make his promises eternal, grateful for the journey that brought them together."
                imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
                reverse
              />

              <div className="container max-w-5xl mx-auto px-6">
                <div className="divider-thin" />
              </div>

              {/* Love Story */}
              <LoveStorySection />

              {/* Event Details */}
              <EventDetailsSection />

              <div className="container max-w-5xl mx-auto px-6">
                <div className="divider-thin" />
              </div>

              {/* Gallery */}
              <GallerySection />

              {/* RSVP */}
              <RSVPSection onSubmit={handleRSVPSubmit} />

              {/* Gift Section */}
              <GiftSection />

              {/* Wishes Display */}
              <WishesSection wishes={wishes} />

              {/* Footer */}
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
