import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TypingText = ({ texts }: { texts: string[] }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setIndex(0);
          setTextIndex((prev) => (prev + 1) % texts.length);
          setSpeed(50);
        }
      }, speed / 2);
    } else {
      if (index < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + currentText[index]);
          setIndex((prev) => prev + 1);
        }, speed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setSpeed(100);
        }, 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, displayedText, speed, textIndex, texts]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-xl text-blue-100 leading-8"
    >
      {displayedText}
      <span className="animate-pulse cursor">|</span>
    </motion.div>
  );
};

export default TypingText;
