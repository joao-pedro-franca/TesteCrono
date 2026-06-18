import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Clock, Moon, Sun, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface SleepLogModalProps {
  onClose: () => void;
}

export function SleepLogModal({ onClose }: SleepLogModalProps) {
  const [sleepTime, setSleepTime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [saved, setSaved] = useState(false);

  const calculateHours = () => {
    const sleep = new Date(`2000-01-01 ${sleepTime}`);
    let wake = new Date(`2000-01-01 ${wakeTime}`);
    if (wake < sleep) wake = new Date(`2000-01-02 ${wakeTime}`);
    return ((wake.getTime() - sleep.getTime()) / (1000 * 60 * 60)).toFixed(1);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      toast.success("Sono registrado com sucesso! +50 moedas 🪙");
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70"
          onClick={onClose}
        />

        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-md rounded-t-3xl p-6"
          style={{
            background: "linear-gradient(135deg, #282828 0%, #32302f 100%)",
            borderTop: "1px solid rgba(80,73,69,0.7)",
          }}
        >
          {!saved ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: "#ebdbb2" }}>Registrar Sono</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "rgba(60,56,54,0.7)", color: "#928374" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5 mb-6">
                <div className="space-y-2">
                  <label className="text-sm flex items-center gap-2" style={{ color: "#bdae93" }}>
                    <Moon className="w-4 h-4" style={{ color: "#d79921" }} />
                    Hora que dormiu
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#928374" }} />
                    <Input
                      type="time"
                      value={sleepTime}
                      onChange={(e) => setSleepTime(e.target.value)}
                      className="pl-11 border-[#504945] text-[#ebdbb2] rounded-2xl h-12"
                      style={{ background: "rgba(60,56,54,0.6)" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm flex items-center gap-2" style={{ color: "#bdae93" }}>
                    <Sun className="w-4 h-4" style={{ color: "#fabd2f" }} />
                    Hora que acordou
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#928374" }} />
                    <Input
                      type="time"
                      value={wakeTime}
                      onChange={(e) => setWakeTime(e.target.value)}
                      className="pl-11 border-[#504945] text-[#ebdbb2] rounded-2xl h-12"
                      style={{ background: "rgba(60,56,54,0.6)" }}
                    />
                  </div>
                </div>

                <div
                  className="rounded-2xl p-4 text-center"
                  style={{ background: "rgba(60,56,54,0.5)", border: "1px solid rgba(80,73,69,0.5)" }}
                >
                  <p className="text-sm mb-1" style={{ color: "#a89984" }}>Total dormido</p>
                  <p className="text-3xl font-bold" style={{ color: "#ebdbb2" }}>{calculateHours()}h</p>
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="w-full h-12 rounded-2xl font-semibold"
                style={{
                  background: "linear-gradient(135deg, #d79921 0%, #b57614 100%)",
                  color: "#1d2021",
                  boxShadow: "0 4px 15px rgba(215,153,33,0.35)",
                }}
              >
                Salvar Registro
              </Button>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-8 flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg, #d79921 0%, #b57614 100%)" }}
              >
                <Check className="w-10 h-10" style={{ color: "#1d2021" }} />
              </motion.div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#ebdbb2" }}>Registrado!</h3>
              <p className="text-center" style={{ color: "#a89984" }}>
                Você dormiu {calculateHours()}h esta noite
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
