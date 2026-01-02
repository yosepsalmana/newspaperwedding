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
    bankName: "First National Bank",
    accountNumber: "1234-5678-9012-3456",
    accountHolder: "Sarah Johnson",
  },
  {
    bankName: "Pacific Trust",
    accountNumber: "9876-5432-1098-7654",
    accountHolder: "Michael Thompson",
  },
];

const physicalAddress = "789 Rose Avenue, Apt 12B, Riverside, CA 92503";

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
        title: "Copied to clipboard",
        description: `${label} has been copied.`,
      });
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
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
          <p className="caption-text mb-3">Classifieds</p>
          <div className="divider-double w-24 mx-auto mb-6" />
          <h2 className="headline-secondary mb-4">Wedding Gifts</h2>
          <p className="subheadline max-w-xl mx-auto">
            Your presence is the greatest gift of all. However, if you wish to
            honor us with a gift, here are our details.
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
                    {account.accountHolder}
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(account.accountNumber, "Account number")
                  }
                  className="btn-editorial-outline text-xs flex items-center gap-2 self-start md:self-center"
                >
                  {copiedItem === "Account number" ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
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
          <p className="caption-text text-xs mb-3">For Physical Gifts</p>
          <div className="divider-thin mb-4" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="font-display text-base text-ink">{physicalAddress}</p>
            <button
              onClick={() => copyToClipboard(physicalAddress, "Address")}
              className="btn-editorial-outline text-xs flex items-center gap-2 self-start md:self-center"
            >
              {copiedItem === "Address" ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Address
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
            With gratitude, Sarah & Michael
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftSection;
