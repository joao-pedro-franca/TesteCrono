import { useState } from "react";
import { User, Settings, Moon, Sun, Bell, Target, LogOut, Crown, Trophy, Flame } from "lucide-react";
import { BottomNav } from "../dashboard/BottomNav";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { useNavigate } from "react-router";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const YELLOW = "#d79921";
const YELLOW_B = "#fabd2f";
const RED = "#cc241d";
const TEAL = "#458588";
const FG1 = "#ebdbb2";
const FG4 = "#a89984";
const GRAY = "#928374";
const CARD = { background: "rgba(60,56,54,0.45)", border: "1px solid rgba(80,73,69,0.6)" };

export function ProfileScreen() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [sleepReminder, setSleepReminder] = useState(true);
  const [wakeReminder, setWakeReminder] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({ name: "Ana Silva", email: "ana.silva@email.com", age: 28, sleepGoal: 8 });

  const userStats = { level: 3, totalCoins: 1250, achievements: 12, streak: 7 };

  return (
    <div
      className="min-h-screen pb-20"
      style={{ background: "linear-gradient(135deg, #1d2021 0%, #282828 100%)" }}
    >
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold mb-2" style={{ color: FG1 }}>Perfil</h1>
        <p style={{ color: FG4 }}>Gerencie sua conta e configurações</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Avatar & Stats */}
        <div
          className="rounded-3xl p-6"
          style={{
            background: "linear-gradient(135deg, rgba(60,56,54,0.6) 0%, rgba(50,48,47,0.5) 100%)",
            border: "1px solid rgba(80,73,69,0.6)",
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)` }}
              >
                <User className="w-10 h-10" style={{ color: "#1d2021" }} />
              </div>
              <button
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: YELLOW_B }}
              >
                <Crown className="w-4 h-4" style={{ color: "#1d2021" }} />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1" style={{ color: FG1 }}>{userData.name}</h2>
              <p className="text-sm mb-2" style={{ color: FG4 }}>{userData.email}</p>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full" style={{ background: "rgba(215,153,33,0.2)" }}>
                  <span className="text-xs font-semibold" style={{ color: YELLOW }}>Nível {userStats.level}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl p-3 text-center" style={{ background: "rgba(60,56,54,0.6)" }}>
              <Trophy className="w-5 h-5 mx-auto mb-1" style={{ color: YELLOW_B }} />
              <p className="font-bold" style={{ color: FG1 }}>{userStats.achievements}</p>
              <p className="text-xs" style={{ color: FG4 }}>Conquistas</p>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ background: "rgba(60,56,54,0.6)" }}>
              <Flame className="w-5 h-5 mx-auto mb-1" style={{ color: RED }} />
              <p className="font-bold" style={{ color: FG1 }}>{userStats.streak}</p>
              <p className="text-xs" style={{ color: FG4 }}>Dias seguidos</p>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ background: "rgba(60,56,54,0.6)" }}>
              <Crown className="w-5 h-5 mx-auto mb-1" style={{ color: YELLOW }} />
              <p className="font-bold" style={{ color: FG1 }}>{userStats.totalCoins}</p>
              <p className="text-xs" style={{ color: FG4 }}>Moedas</p>
            </div>
          </div>
        </div>

        {/* Dados Pessoais */}
        <div className="rounded-3xl p-6" style={CARD}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: FG1 }}>Dados Pessoais</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setEditMode(!editMode)}
              style={{ color: TEAL }}
            >
              {editMode ? "Cancelar" : "Editar"}
            </Button>
          </div>

          <div className="space-y-4">
            {[
              { label: "Nome", key: "name", type: "text" },
              { label: "E-mail", key: "email", type: "email" },
              { label: "Idade", key: "age", type: "number" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="text-sm mb-2 block" style={{ color: FG4 }}>{label}</label>
                <Input
                  type={type}
                  value={userData[key as keyof typeof userData]}
                  onChange={(e) => setUserData({ ...userData, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
                  disabled={!editMode}
                  className="border-[#504945] text-[#ebdbb2] rounded-2xl h-11"
                  style={{ background: "rgba(60,56,54,0.6)" }}
                />
              </div>
            ))}

            {editMode && (
              <Button
                onClick={() => setEditMode(false)}
                className="w-full rounded-2xl h-11"
                style={{ background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)`, color: "#1d2021" }}
              >
                Salvar Alterações
              </Button>
            )}
          </div>
        </div>

        {/* Meta de Sono */}
        <div className="rounded-3xl p-6" style={CARD}>
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-5 h-5" style={{ color: TEAL }} />
            <h3 className="text-lg font-bold" style={{ color: FG1 }}>Meta de Sono</h3>
          </div>
          <div>
            <label className="text-sm mb-2 block" style={{ color: FG4 }}>Objetivo diário</label>
            <Select
              value={userData.sleepGoal.toString()}
              onValueChange={(value) => setUserData({ ...userData, sleepGoal: Number(value) })}
            >
              <SelectTrigger
                className="border-[#504945] text-[#ebdbb2] rounded-2xl h-11"
                style={{ background: "rgba(60,56,54,0.6)" }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ background: "#282828", borderColor: "#504945" }}>
                {["6", "7", "8", "9", "10"].map((h) => (
                  <SelectItem key={h} value={h} style={{ color: FG1 }}>
                    {h} horas{h === "8" ? " (recomendado)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Configurações */}
        <div className="rounded-3xl p-6" style={CARD}>
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5" style={{ color: GRAY }} />
            <h3 className="text-lg font-bold" style={{ color: FG1 }}>Configurações</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode
                  ? <Moon className="w-5 h-5" style={{ color: YELLOW }} />
                  : <Sun className="w-5 h-5" style={{ color: YELLOW_B }} />}
                <div>
                  <p className="font-medium" style={{ color: FG1 }}>Modo escuro</p>
                  <p className="text-sm" style={{ color: FG4 }}>Tema escuro ativado</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" style={{ color: TEAL }} />
                <div>
                  <p className="font-medium" style={{ color: FG1 }}>Lembrete de dormir</p>
                  <p className="text-sm" style={{ color: FG4 }}>Notificação às 22:30</p>
                </div>
              </div>
              <Switch checked={sleepReminder} onCheckedChange={setSleepReminder} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" style={{ color: YELLOW_B }} />
                <div>
                  <p className="font-medium" style={{ color: FG1 }}>Lembrete de acordar</p>
                  <p className="text-sm" style={{ color: FG4 }}>Notificação às 07:00</p>
                </div>
              </div>
              <Switch checked={wakeReminder} onCheckedChange={setWakeReminder} />
            </div>
          </div>
        </div>

        <Button
          onClick={() => navigate("/login")}
          variant="outline"
          className="w-full rounded-2xl h-12"
          style={{
            background: "rgba(204,36,29,0.08)",
            border: "1px solid rgba(204,36,29,0.3)",
            color: "#fb4934",
          }}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sair da conta
        </Button>

        <div className="pb-4" />
      </div>

      <BottomNav />
    </div>
  );
}
