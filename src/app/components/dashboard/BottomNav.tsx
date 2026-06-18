import { useNavigate, useLocation } from "react-router";
import { Home, Trophy, BarChart3, User, BookOpen } from "lucide-react";
import { motion } from "motion/react";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Início", path: "/dashboard" },
    { icon: Trophy, label: "Conquistas", path: "/gamification" },
    { icon: BookOpen, label: "Cursos", path: "/courses" },
    { icon: BarChart3, label: "Stats", path: "/stats" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t px-6 py-3 z-30"
      style={{
        background: "rgba(29,32,33,0.97)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(80,73,69,0.6)",
      }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 py-2 px-3 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: "rgba(215,153,33,0.15)" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <Icon
                className="w-6 h-6 relative z-10 transition-colors"
                style={{ color: isActive ? "#d79921" : "#928374" }}
              />

              <span
                className="text-xs relative z-10 transition-colors"
                style={{ color: isActive ? "#ebdbb2" : "#928374", fontWeight: isActive ? 600 : 400 }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
