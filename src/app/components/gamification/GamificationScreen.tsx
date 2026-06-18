import { motion } from "motion/react";
import { Trophy, Star, Flame, Target, Crown, Zap, Lock, ShoppingBag } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { BottomNav } from "../dashboard/BottomNav";
import { useNavigate } from "react-router";

const achievements = [
  { id: 1, title: "Primeira Noite", description: "Registre seu primeiro sono", icon: Star, unlocked: true, progress: 100, total: 1, reward: 50 },
  { id: 2, title: "Sequência de 7 Dias", description: "Durma bem por 7 dias consecutivos", icon: Flame, unlocked: false, progress: 4, total: 7, reward: 200 },
  { id: 3, title: "Dorminhoco Matinal", description: "Durma antes das 23h por 5 dias", icon: Target, unlocked: false, progress: 2, total: 5, reward: 150 },
  { id: 4, title: "Mestre do Sono", description: "Atinja sua meta por 30 dias", icon: Crown, unlocked: false, progress: 8, total: 30, reward: 500 },
];

const dailyChallenges = [
  { id: 1, title: "Medite 5 minutos antes de dormir", progress: 0, total: 5, reward: 30, icon: Zap },
  { id: 2, title: "Vá para cama antes das 23h", progress: 0, total: 1, reward: 40, icon: Target },
  { id: 3, title: "Durma pelo menos 8 horas", progress: 0, total: 8, reward: 50, icon: Star },
];

const YELLOW = "#d79921";
const YELLOW_B = "#fabd2f";
const RED = "#cc241d";
const TEAL = "#458588";
const FG1 = "#ebdbb2";
const FG4 = "#a89984";
const GRAY = "#928374";

export function GamificationScreen() {
  const navigate = useNavigate();
  const currentLevel = 3;
  const levelProgress = 65;
  const totalCoins = 1250;

  return (
    <div
      className="min-h-screen pb-20"
      style={{ background: "linear-gradient(135deg, #1d2021 0%, #282828 100%)" }}
    >
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold mb-2" style={{ color: FG1 }}>Conquistas & Desafios</h1>
        <p style={{ color: FG4 }}>Complete desafios e desbloqueie recompensas</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Card de Nível */}
        <div
          className="rounded-3xl p-6"
          style={{
            background: "linear-gradient(135deg, rgba(60,56,54,0.6) 0%, rgba(50,48,47,0.5) 100%)",
            border: "1px solid rgba(80,73,69,0.6)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)` }}
              >
                <Crown className="w-7 h-7" style={{ color: "#1d2021" }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: FG4 }}>Seu nível atual</p>
                <h2 className="text-2xl font-bold" style={{ color: FG1 }}>Nível {currentLevel}</h2>
                <p className="text-sm" style={{ color: YELLOW }}>Dorminhoco Nível {currentLevel}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <ShoppingBag className="w-4 h-4" style={{ color: YELLOW_B }} />
                <span className="font-bold" style={{ color: YELLOW_B }}>{totalCoins}</span>
              </div>
              <Button
                size="sm"
                onClick={() => navigate("/shop")}
                className="text-xs px-3 py-1 h-auto rounded-full"
                style={{ background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)`, color: "#1d2021" }}
              >
                Loja
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: FG4 }}>Progresso para Nível {currentLevel + 1}</span>
              <span className="font-semibold" style={{ color: FG1 }}>{levelProgress}%</span>
            </div>
            <Progress value={levelProgress} className="h-3" style={{ background: "rgba(60,56,54,0.6)" }} />
          </div>
        </div>

        {/* Desafios Diários */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{ color: FG1 }}>Desafios Diários</h2>
            <div className="px-3 py-1 rounded-full" style={{ background: "rgba(204,36,29,0.2)" }}>
              <span className="text-sm font-semibold" style={{ color: RED }}>24h restantes</span>
            </div>
          </div>

          <div className="space-y-3">
            {dailyChallenges.map((challenge, index) => {
              const Icon = challenge.icon;
              const isCompleted = challenge.progress >= challenge.total;
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl p-4"
                  style={{ background: "rgba(60,56,54,0.45)", border: "1px solid rgba(80,73,69,0.6)" }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: isCompleted ? "rgba(184,187,38,0.2)" : "rgba(215,153,33,0.2)" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: isCompleted ? "#b8bb26" : YELLOW }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1" style={{ color: FG1 }}>{challenge.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Progress
                          value={(challenge.progress / challenge.total) * 100}
                          className="h-2 flex-1"
                          style={{ background: "rgba(60,56,54,0.6)" }}
                        />
                        <span className="text-xs" style={{ color: FG4 }}>{challenge.progress}/{challenge.total}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" style={{ color: YELLOW_B }} />
                        <span className="text-sm font-semibold" style={{ color: YELLOW_B }}>+{challenge.reward} moedas</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Conquistas */}
        <div>
          <h2 className="text-lg font-bold mb-4" style={{ color: FG1 }}>Conquistas</h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              const isUnlocked = achievement.unlocked;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-4 ${!isUnlocked ? "opacity-60" : ""}`}
                  style={{
                    background: "rgba(60,56,54,0.45)",
                    border: isUnlocked ? "1px solid rgba(215,153,33,0.35)" : "1px solid rgba(80,73,69,0.6)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={
                          isUnlocked
                            ? { background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)` }
                            : { background: "rgba(60,56,54,0.7)" }
                        }
                      >
                        {isUnlocked ? (
                          <Icon className="w-6 h-6" style={{ color: "#1d2021" }} />
                        ) : (
                          <Lock className="w-6 h-6" style={{ color: GRAY }} />
                        )}
                      </div>
                      {isUnlocked && (
                        <div
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: TEAL }}
                        >
                          <Trophy className="w-3 h-3" style={{ color: "#1d2021" }} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold mb-1" style={{ color: FG1 }}>{achievement.title}</h3>
                      <p className="text-sm mb-2" style={{ color: FG4 }}>{achievement.description}</p>

                      {!isUnlocked && (
                        <div className="flex items-center gap-2 mb-2">
                          <Progress
                            value={(achievement.progress / achievement.total) * 100}
                            className="h-2 flex-1"
                            style={{ background: "rgba(60,56,54,0.6)" }}
                          />
                          <span className="text-xs" style={{ color: FG4 }}>
                            {achievement.progress}/{achievement.total}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" style={{ color: YELLOW_B }} />
                        <span className="text-sm font-semibold" style={{ color: YELLOW_B }}>
                          {isUnlocked ? "Ganhou" : "Recompensa:"} {achievement.reward} moedas
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
