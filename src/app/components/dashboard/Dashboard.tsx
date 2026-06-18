import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  Moon,
  Sun,
  Plus,
  Trophy,
  TrendingUp,
  Coins,
  ChevronRight,
  Flame,
  Target,
  Zap,
  Star,
  BookOpen,
  Crown,
  ShoppingBag,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Progress } from "../ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { BottomNav } from "./BottomNav";
import { SleepLogModal } from "./SleepLogModal";

const sleepData = [
  { day: "Seg", hours: 7.5 },
  { day: "Ter", hours: 6.5 },
  { day: "Qua", hours: 8 },
  { day: "Qui", hours: 7 },
  { day: "Sex", hours: 5.5 },
  { day: "Sáb", hours: 9 },
  { day: "Dom", hours: 8.5 },
];

const dailyChallenges = [
  { id: 1, title: "Medite antes de dormir", progress: 0, total: 5, reward: 30, icon: Zap, unit: "min" },
  { id: 2, title: "Cama antes das 23h", progress: 0, total: 1, reward: 40, icon: Target, unit: "" },
];

const closestAchievement = {
  title: "Sequência de 7 Dias",
  icon: Flame,
  progress: 4,
  total: 7,
  reward: 200,
};

const activeCourses = [
  {
    id: 1,
    title: "Entenda seu Cronotipo",
    progress: 33,
    lessons: 6,
    icon: Moon,
    nextLesson: "Como identificar o seu cronotipo",
  },
];

// Gruvbox palette constants
const BG = "linear-gradient(135deg, #1d2021 0%, #282828 100%)";
const CARD_BG = "rgba(60,56,54,0.45)";
const CARD_BORDER = "rgba(80,73,69,0.6)";
const FG1 = "#ebdbb2";
const FG4 = "#a89984";
const GRAY = "#928374";
const YELLOW = "#d79921";
const YELLOW_BRIGHT = "#fabd2f";
const RED = "#cc241d";
const TEAL = "#458588";

export function Dashboard() {
  const navigate = useNavigate();
  const [showSleepModal, setShowSleepModal] = useState(false);

  const userName = "Ana";
  const sleepGoal = 8;
  const lastNightSleep = 7;
  const currentLevel = 3;
  const levelProgress = 65;
  const coins = 1250;

  const avgSleep = sleepData.reduce((s, d) => s + d.hours, 0) / sleepData.length;
  const daysOnTarget = sleepData.filter((d) => d.hours >= sleepGoal).length;

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Bom dia";
    if (h < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <div className="min-h-screen pb-24 relative" style={{ background: BG }}>
      {/* ── Header ── */}
      <div className="px-6 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: FG1 }}>
              {getGreeting()}, {userName}! 👋
            </h1>
            <p className="text-sm mt-0.5" style={{ color: FG4 }}>Como foi seu sono?</p>
          </div>

          <button onClick={() => navigate("/profile")} className="relative" aria-label="Ir para perfil">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)`,
                boxShadow: `0 0 0 2px rgba(215,153,33,0.4)`,
              }}
            >
              <span className="font-bold text-lg" style={{ color: "#1d2021" }}>A</span>
            </div>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{ background: TEAL, borderColor: "#1d2021" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#1d2021]" />
            </div>
          </button>
        </div>

        {/* Coins pill */}
        <div
          className="flex items-center gap-2 mt-4 self-start w-fit px-4 py-2 rounded-full"
          style={{ background: "rgba(215,153,33,0.15)", border: "1px solid rgba(215,153,33,0.3)" }}
        >
          <Coins className="w-4 h-4" style={{ color: YELLOW_BRIGHT }} />
          <span className="font-bold text-sm" style={{ color: YELLOW }}>{coins} moedas</span>
        </div>
      </div>

      <div className="px-6 space-y-5">
        {/* ── Sono de ontem ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4"
          style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(215,153,33,0.2)" }}
            >
              <Moon className="w-5 h-5" style={{ color: YELLOW }} />
            </div>
            <div className="flex-1">
              <p className="font-semibold" style={{ color: FG1 }}>Você dormiu {lastNightSleep}h esta noite</p>
              <p className="text-xs" style={{ color: FG4 }}>+50 moedas ganhas 🪙</p>
            </div>
            <div className="flex items-center gap-1">
              <Sun className="w-4 h-4" style={{ color: YELLOW_BRIGHT }} />
              <span className="text-xs font-semibold" style={{ color: FG1 }}>07:00</span>
            </div>
          </div>
          <Progress
            value={(lastNightSleep / sleepGoal) * 100}
            className="h-2"
            style={{ background: "rgba(60,56,54,0.6)" }}
          />
          <p className="text-xs mt-1" style={{ color: FG4 }}>
            {Math.round((lastNightSleep / sleepGoal) * 100)}% da meta de {sleepGoal}h
          </p>
        </motion.div>

        {/* ── Estatísticas Semanais ── */}
        <SectionCard
          title="Estatísticas de Sono"
          subtitle="Esta semana"
          icon={<TrendingUp className="w-5 h-5" style={{ color: TEAL }} />}
          onClick={() => navigate("/stats")}
        >
          <div className="grid grid-cols-3 gap-3 mb-4">
            <MiniStat label="Média" value={`${avgSleep.toFixed(1)}h`} color={YELLOW} />
            <MiniStat label="Na meta" value={`${daysOnTarget}/7`} color={TEAL} />
            <MiniStat label="Melhor" value={`${Math.max(...sleepData.map((d) => d.hours))}h`} color={YELLOW_BRIGHT} />
          </div>

          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={sleepData} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: GRAY, fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: GRAY, fontSize: 11 }} domain={[0, 10]} />
              <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                {sleepData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.hours >= sleepGoal ? YELLOW : "#b57614"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* ── Conquistas & Desafios ── */}
        <SectionCard
          title="Conquistas & Desafios"
          subtitle={`Nível ${currentLevel} · ${levelProgress}% para o próximo`}
          icon={<Trophy className="w-5 h-5" style={{ color: YELLOW_BRIGHT }} />}
          onClick={() => navigate("/gamification")}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)` }}
            >
              <Crown className="w-5 h-5" style={{ color: "#1d2021" }} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold" style={{ color: FG1 }}>Nível {currentLevel}</span>
                <span style={{ color: FG4 }}>{levelProgress}%</span>
              </div>
              <Progress value={levelProgress} className="h-2" style={{ background: "rgba(60,56,54,0.6)" }} />
            </div>
          </div>

          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: GRAY }}>Desafios de hoje</p>
          <div className="space-y-2 mb-4">
            {dailyChallenges.map((ch) => {
              const Icon = ch.icon;
              return (
                <div
                  key={ch.id}
                  className="flex items-center gap-3 rounded-xl px-3 py-2"
                  style={{ background: "rgba(60,56,54,0.5)" }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(215,153,33,0.2)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: YELLOW }} />
                  </div>
                  <span className="text-sm flex-1" style={{ color: FG1 }}>{ch.title}</span>
                  <span className="text-xs font-semibold" style={{ color: YELLOW_BRIGHT }}>+{ch.reward}🪙</span>
                </div>
              );
            })}
          </div>

          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: GRAY }}>Conquista mais próxima</p>
          <div
            className="flex items-center gap-3 rounded-xl px-3 py-2"
            style={{
              background: "rgba(204,36,29,0.08)",
              border: "1px solid rgba(204,36,29,0.2)",
            }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(204,36,29,0.2)" }}
            >
              <closestAchievement.icon className="w-4 h-4" style={{ color: RED }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm" style={{ color: FG1 }}>{closestAchievement.title}</p>
              <Progress
                value={(closestAchievement.progress / closestAchievement.total) * 100}
                className="h-1.5 mt-1"
                style={{ background: "rgba(60,56,54,0.6)" }}
              />
              <p className="text-xs mt-0.5" style={{ color: FG4 }}>
                {closestAchievement.progress}/{closestAchievement.total} dias
              </p>
            </div>
            <span className="text-xs font-semibold flex-shrink-0" style={{ color: YELLOW_BRIGHT }}>
              +{closestAchievement.reward}🪙
            </span>
          </div>
        </SectionCard>

        {/* ── Loja ── */}
        <SectionCard
          title="Loja Cronoplay"
          subtitle="Troque moedas por recompensas"
          icon={<ShoppingBag className="w-5 h-5" style={{ color: YELLOW_BRIGHT }} />}
          onClick={() => navigate("/shop")}
        >
          <div
            className="flex items-center gap-4 rounded-2xl p-4"
            style={{
              background: "linear-gradient(135deg, rgba(215,153,33,0.12) 0%, rgba(181,118,20,0.08) 100%)",
              border: "1px solid rgba(215,153,33,0.25)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(215,153,33,0.2)" }}
            >
              <Coins className="w-6 h-6" style={{ color: YELLOW_BRIGHT }} />
            </div>
            <div>
              <p className="font-bold text-2xl" style={{ color: FG1 }}>{coins}</p>
              <p className="text-xs" style={{ color: YELLOW }}>moedas disponíveis</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs" style={{ color: FG4 }}>Itens na loja</p>
              <p className="font-semibold" style={{ color: FG1 }}>8 itens</p>
            </div>
          </div>
          <p className="text-xs mt-3 text-center" style={{ color: FG4 }}>
            Temas, avatares, sons relaxantes e muito mais ✨
          </p>
        </SectionCard>

        {/* ── Aulas & Cursos ── */}
        <SectionCard
          title="Aulas & Cursos"
          subtitle="Continue aprendendo"
          icon={<BookOpen className="w-5 h-5" style={{ color: TEAL }} />}
          onClick={() => navigate("/courses")}
        >
          {activeCourses.length === 0 ? (
            <p className="text-sm text-center py-2" style={{ color: FG4 }}>
              Nenhum curso em andamento. Explore os cursos disponíveis!
            </p>
          ) : (
            <div className="space-y-3">
              {activeCourses.map((course) => {
                const CourseIcon = course.icon;
                return (
                  <div
                    key={course.id}
                    className="flex items-center gap-3 rounded-2xl p-3"
                    style={{
                      background: "rgba(69,133,136,0.1)",
                      border: "1px solid rgba(69,133,136,0.25)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(69,133,136,0.2)" }}
                    >
                      <CourseIcon className="w-5 h-5" style={{ color: TEAL }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: FG1 }}>{course.title}</p>
                      <div className="flex items-center gap-1 mt-0.5 mb-1.5">
                        <Clock className="w-3 h-3" style={{ color: GRAY }} />
                        <p className="text-xs truncate" style={{ color: FG4 }}>{course.nextLesson}</p>
                      </div>
                      <Progress
                        value={course.progress}
                        className="h-1.5"
                        style={{ background: "rgba(60,56,54,0.6)" }}
                      />
                      <div className="flex justify-between mt-0.5">
                        <p className="text-xs" style={{ color: FG4 }}>{course.progress}% concluído</p>
                        <p className="text-xs" style={{ color: GRAY }}>{course.lessons} aulas</p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: TEAL }} />
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>
      </div>

      {/* FAB */}
      <motion.button
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-20"
        style={{
          background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)`,
          boxShadow: "0 4px 20px rgba(215,153,33,0.45)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowSleepModal(true)}
      >
        <Plus className="w-6 h-6" style={{ color: "#1d2021" }} />
      </motion.button>

      <BottomNav />

      {showSleepModal && <SleepLogModal onClose={() => setShowSleepModal(false)} />}
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  icon,
  onClick,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl overflow-hidden"
      style={{ background: "rgba(60,56,54,0.45)", border: "1px solid rgba(80,73,69,0.6)" }}
    >
      <button onClick={onClick} className="w-full flex items-center gap-3 px-5 pt-5 pb-3 text-left">
        {icon && (
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(60,56,54,0.7)" }}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-bold" style={{ color: "#ebdbb2" }}>{title}</p>
          {subtitle && <p className="text-xs mt-0.5" style={{ color: "#928374" }}>{subtitle}</p>}
        </div>
        <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: "#928374" }} />
      </button>
      <div className="px-5 pb-5">{children}</div>
    </motion.div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="rounded-2xl p-3 flex flex-col items-center gap-1"
      style={{ background: `${color}18` }}
    >
      <p className="font-bold" style={{ color }}>{value}</p>
      <p className="text-xs" style={{ color: "#928374" }}>{label}</p>
    </div>
  );
}
