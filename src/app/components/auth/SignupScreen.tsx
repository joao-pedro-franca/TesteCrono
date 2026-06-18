import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, User, Calendar, Target, Moon, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function SignupScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", age: "", sleepGoal: "" });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
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
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #d79921 0%, #b57614 100%)",
              boxShadow: "0 0 30px rgba(215,153,33,0.4)",
            }}
          >
            <Moon className="w-8 h-8" style={{ color: "#1d2021" }} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2" style={{ color: "#ebdbb2" }}>Crie sua conta</h1>
        <p className="text-center mb-6" style={{ color: "#a89984" }}>Comece sua jornada para um sono melhor</p>

        <div className="glass-card rounded-3xl p-8 mb-6">
          <form onSubmit={handleSignup} className="space-y-4">
            {[
              { label: "Nome completo", key: "name", type: "text", placeholder: "Seu nome", Icon: User },
              { label: "E-mail", key: "email", type: "email", placeholder: "seu@email.com", Icon: Mail },
            ].map(({ label, key, type, placeholder, Icon }) => (
              <div key={key} className="space-y-2">
                <label className="text-sm" style={{ color: "#bdae93" }}>{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#928374" }} />
                  <Input
                    type={type}
                    placeholder={placeholder}
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className="pl-11 border-[#504945] text-[#ebdbb2] placeholder:text-[#928374]/60 rounded-2xl h-12"
                    style={{ background: "rgba(60,56,54,0.6)" }}
                    required
                  />
                </div>
              </div>
            ))}

            <div className="space-y-2">
              <label className="text-sm" style={{ color: "#bdae93" }}>Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#928374" }} />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-11 pr-11 border-[#504945] text-[#ebdbb2] placeholder:text-[#928374]/60 rounded-2xl h-12"
                  style={{ background: "rgba(60,56,54,0.6)" }}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#928374" }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm" style={{ color: "#bdae93" }}>Idade</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#928374" }} />
                <Input
                  type="number"
                  placeholder="Sua idade"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="pl-11 border-[#504945] text-[#ebdbb2] placeholder:text-[#928374]/60 rounded-2xl h-12"
                  style={{ background: "rgba(60,56,54,0.6)" }}
                  required min={1} max={120}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm" style={{ color: "#bdae93" }}>Objetivo de sono diário</label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10" style={{ color: "#928374" }} />
                <Select value={formData.sleepGoal} onValueChange={(value) => setFormData({ ...formData, sleepGoal: value })}>
                  <SelectTrigger
                    className="pl-11 border-[#504945] text-[#ebdbb2] rounded-2xl h-12"
                    style={{ background: "rgba(60,56,54,0.6)" }}
                  >
                    <SelectValue placeholder="Selecione seu objetivo" />
                  </SelectTrigger>
                  <SelectContent style={{ background: "#282828", borderColor: "#504945" }}>
                    {["6", "7", "8", "9", "10"].map((h) => (
                      <SelectItem key={h} value={h} style={{ color: "#ebdbb2" }}>
                        {h} horas{h === "8" ? " (recomendado)" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-2xl font-semibold mt-6"
              style={{
                background: "linear-gradient(135deg, #d79921 0%, #b57614 100%)",
                color: "#1d2021",
                boxShadow: "0 4px 15px rgba(215,153,33,0.35)",
              }}
            >
              Criar conta
            </Button>
          </form>
        </div>

        <p className="text-center" style={{ color: "#a89984" }}>
          Já tem uma conta?{" "}
          <Link to="/login" className="font-semibold hover:underline" style={{ color: "#458588" }}>
            Fazer login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
