import { useState, useEffect } from "react";
import PremiumCard from "./Cardpremium";
import { useUser } from "@/app/context/UserContext";

export default function PremiumCardManager() {
  const [showCard, setShowCard] = useState(false);
  const { user } = useUser();

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


  return showCard && !user.is_adm? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <PremiumCard onClose={() => setShowCard(false)} />
    </div>
  ) : null;
}
