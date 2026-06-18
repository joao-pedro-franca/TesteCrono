import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, Moon, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function LoginScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1d2021 0%, #282828 50%, #32302f 100%)" }}
    >
      {/* Partículas */}
      <div className="absolute inset-0 opacity-25">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? "#d79921" : "#a89984",
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
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #d79921 0%, #b57614 100%)",
              boxShadow: "0 0 30px rgba(215,153,33,0.4)",
            }}
          >
            <Moon className="w-10 h-10 text-[#1d2021]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-[#ebdbb2] mb-2">Bem-vindo de volta</h1>
        <p className="text-center text-[#a89984] mb-8">Continue sua jornada para o sono perfeito</p>

        {/* Card de Login */}
        <div className="glass-card rounded-3xl p-8 mb-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-[#bdae93]">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#928374]" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 border-[#504945] text-[#ebdbb2] placeholder:text-[#928374] rounded-2xl h-12"
                  style={{ background: "rgba(60,56,54,0.6)" }}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#bdae93]">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#928374]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 pr-11 border-[#504945] text-[#ebdbb2] placeholder:text-[#928374] rounded-2xl h-12"
                  style={{ background: "rgba(60,56,54,0.6)" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#928374] hover:text-[#a89984]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm" style={{ color: "#458588" }}>
                Esqueci minha senha
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-2xl font-semibold text-[#1d2021]"
              style={{
                background: "linear-gradient(135deg, #d79921 0%, #b57614 100%)",
                boxShadow: "0 4px 15px rgba(215,153,33,0.35)",
              }}
            >
              Entrar
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#504945]" />
            <span className="text-sm text-[#928374]">ou continue com</span>
            <div className="flex-1 h-px bg-[#504945]" />
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 rounded-2xl border-[#504945] text-[#ebdbb2] hover:bg-[#3c3836]"
              style={{ background: "rgba(60,56,54,0.4)" }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Entrar com Google
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 rounded-2xl border-[#504945] text-[#ebdbb2] hover:bg-[#3c3836]"
              style={{ background: "rgba(60,56,54,0.4)" }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Entrar com Apple
            </Button>
          </div>
        </div>

        <p className="text-center text-[#a89984]">
          Não tem uma conta?{" "}
          <Link to="/signup" className="font-semibold hover:underline" style={{ color: "#458588" }}>
            Cadastre-se
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
