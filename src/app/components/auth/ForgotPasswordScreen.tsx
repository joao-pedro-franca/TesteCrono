import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Mail, Moon, ArrowLeft, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1d2021 0%, #282828 50%, #32302f 100%)" }}
    >
      <div className="absolute inset-0 opacity-20">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? "#d79921" : "#928374",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/login"
          className="inline-flex items-center gap-2 mb-6 transition-colors"
          style={{ color: "#a89984" }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </Link>

        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #d79921 0%, #b57614 100%)",
              boxShadow: "0 0 30px rgba(215,153,33,0.4)",
            }}
          >
            <Moon className="w-10 h-10" style={{ color: "#1d2021" }} />
          </div>
        </div>

        {!emailSent ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-2" style={{ color: "#ebdbb2" }}>
              Recuperar senha
            </h1>
            <p className="text-center mb-8" style={{ color: "#a89984" }}>
              Digite seu e-mail para receber as instruções
            </p>

            <div className="glass-card rounded-3xl p-8 mb-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm" style={{ color: "#bdae93" }}>E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#928374" }} />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 border-[#504945] text-[#ebdbb2] placeholder:text-[#928374]/60 rounded-2xl h-12"
                      style={{ background: "rgba(60,56,54,0.6)" }}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-2xl font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #d79921 0%, #b57614 100%)",
                    color: "#1d2021",
                    boxShadow: "0 4px 15px rgba(215,153,33,0.35)",
                  }}
                >
                  Enviar instruções
                </Button>
              </form>
            </div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "rgba(69,133,136,0.2)" }}
              >
                <Check className="w-10 h-10" style={{ color: "#458588" }} />
              </div>
            </motion.div>

            <h1 className="text-3xl font-bold text-center mb-2" style={{ color: "#ebdbb2" }}>
              E-mail enviado!
            </h1>
            <p className="text-center mb-8" style={{ color: "#a89984" }}>
              Verifique sua caixa de entrada em{" "}
              <span style={{ color: "#458588" }}>{email}</span>
            </p>

            <div className="glass-card rounded-3xl p-8 mb-6">
              <p className="text-sm text-center" style={{ color: "#bdae93" }}>
                Não recebeu o e-mail? Verifique sua pasta de spam ou{" "}
                <button
                  onClick={() => setEmailSent(false)}
                  className="font-semibold hover:underline"
                  style={{ color: "#458588" }}
                >
                  tente novamente
                </button>
              </p>
            </div>

            <Link to="/login">
              <Button
                className="w-full h-12 rounded-2xl font-semibold"
                style={{
                  background: "linear-gradient(135deg, #d79921 0%, #b57614 100%)",
                  color: "#1d2021",
                  boxShadow: "0 4px 15px rgba(215,153,33,0.35)",
                }}
              >
                Voltar para login
              </Button>
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}
