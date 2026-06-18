import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Moon, Sparkles } from "lucide-react";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1d2021 0%, #282828 50%, #32302f 100%)" }}
    >
      {/* Partículas de fundo */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() > 0.5 ? "2px" : "1px",
              height: Math.random() > 0.5 ? "2px" : "1px",
              background: i % 3 === 0 ? "#d79921" : i % 3 === 1 ? "#a89984" : "#ebdbb2",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Logo central */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(215,153,33,0.25) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <div
            className="relative w-32 h-32 flex items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, #d79921 0%, #b57614 100%)",
              boxShadow: "0 0 40px rgba(215,153,33,0.5)",
            }}
          >
            <Moon className="w-16 h-16 text-[#1d2021]" strokeWidth={1.5} />
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-[#fabd2f]" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          className="mt-8 text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            background: "linear-gradient(135deg, #fabd2f 0%, #d79921 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Cronoplay
        </motion.h1>

        <motion.p
          className="mt-3 text-lg"
          style={{ color: "#a89984" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Domine a arte do sono
        </motion.p>

        <motion.div
          className="mt-8 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: "#d79921" }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
