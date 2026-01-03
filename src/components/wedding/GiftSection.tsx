import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface GiftAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

const giftAccounts: GiftAccount[] = [
  {
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "1234-5678-9012",
    accountHolder: "Sarah Johnson",
  },
  {
    bankName: "Bank Mandiri",
    accountNumber: "9876-5432-1098",
    accountHolder: "Michael Thompson",
  },
];

const physicalAddress = "Jl. Mawar No. 789, Apt 12B, Jakarta Selatan 12345";

const GiftSection = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      toast({
        title: "Berhasil disalin",
        description: `${label} telah disalin ke clipboard.`,
      });
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      toast({
        title: "Gagal menyalin",
        variant: "destructive",
      });
    }
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-paper-aged">
      <div className="container max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="caption-text mb-3">Iklan Baris</p>
          <div className="divider-double w-24 mx-auto mb-6" />
          <h2 className="headline-secondary mb-4">Kado Pernikahan</h2>
          <p className="subheadline max-w-xl mx-auto">
            Kehadiran Anda adalah hadiah terbesar bagi kami. Namun, jika Anda ingin 
            memberikan kado, berikut adalah informasinya.
          </p>
        </motion.div>

        {/* Bank Accounts */}
        <div className="space-y-4 mb-8">
          {giftAccounts.map((account, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="editorial-card"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="caption-text text-xs mb-1">{account.bankName}</p>
                  <p className="font-display text-lg text-ink mb-1">
                    {account.accountNumber}
                  </p>
                  <p className="body-text text-sm text-ink-muted">
                    a.n. {account.accountHolder}
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(account.accountNumber, "Nomor rekening")
                  }
                  className="btn-editorial-outline text-xs flex items-center gap-2 self-start md:self-center"
                >
                  {copiedItem === "Nomor rekening" ? (
                    <>
                      <Check className="w-4 h-4" />
                      Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Salin
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Physical Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="editorial-card"
        >
          <p className="caption-text text-xs mb-3">Untuk Kado Fisik</p>
          <div className="divider-thin mb-4" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="font-display text-base text-ink">{physicalAddress}</p>
            <button
              onClick={() => copyToClipboard(physicalAddress, "Alamat")}
              className="btn-editorial-outline text-xs flex items-center gap-2 self-start md:self-center"
            >
              {copiedItem === "Alamat" ? (
                <>
                  <Check className="w-4 h-4" />
                  Tersalin
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Salin Alamat
                </>
              )}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-ink-muted italic">
            Dengan penuh rasa terima kasih, Sarah & Michael
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftSection;