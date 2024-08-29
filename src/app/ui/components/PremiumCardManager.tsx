import { useState, useEffect } from "react";
import PremiumCard from "./Cardpremium";

export default function PremiumCardManager() {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("lastShownTime");

    if (!lastShown || Date.now() - parseInt(lastShown) > 1800000) {
      setShowCard(true);
      localStorage.setItem("lastShownTime", Date.now().toString());
    }

    const interval = setInterval(() => {
      setShowCard(true);
      localStorage.setItem("lastShownTime", Date.now().toString());
    }, 1800000);

    return () => clearInterval(interval);
  }, []);

  return showCard ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <PremiumCard onClose={() => setShowCard(false)} />
    </div>
  ) : null;
}
