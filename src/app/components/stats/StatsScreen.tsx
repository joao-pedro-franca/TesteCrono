import { useState } from "react";
import { motion } from "motion/react";
import { Calendar as CalendarIcon, TrendingUp, Users, Download, Moon } from "lucide-react";
import { BottomNav } from "../dashboard/BottomNav";
import { Button } from "../ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Calendar } from "../ui/calendar";

const weeklyData = [
  { day: "Seg", hours: 7.5, quality: 80 },
  { day: "Ter", hours: 6.5, quality: 65 },
  { day: "Qua", hours: 8,   quality: 90 },
  { day: "Qui", hours: 7,   quality: 75 },
  { day: "Sex", hours: 5.5, quality: 50 },
  { day: "Sáb", hours: 9,   quality: 95 },
  { day: "Dom", hours: 8.5, quality: 88 },
];

const monthlyData = [
  { week: "Sem 1", avg: 7.2 },
  { week: "Sem 2", avg: 7.5 },
  { week: "Sem 3", avg: 6.8 },
  { week: "Sem 4", avg: 7.9 },
];

const moodData = [
  { date: new Date(2026, 4, 20), mood: "😊" },
  { date: new Date(2026, 4, 21), mood: "😴" },
  { date: new Date(2026, 4, 22), mood: "😊" },
  { date: new Date(2026, 4, 23), mood: "😃" },
  { date: new Date(2026, 4, 24), mood: "😞" },
  { date: new Date(2026, 4, 25), mood: "😊" },
  { date: new Date(2026, 4, 26), mood: "😃" },
  { date: new Date(2026, 4, 27), mood: "😊" },
];

const YELLOW = "#d79921";
const YELLOW_B = "#fabd2f";
const RED = "#cc241d";
const TEAL = "#458588";
const FG1 = "#ebdbb2";
const FG4 = "#a89984";
const GRAY = "#928374";
const CARD = { background: "rgba(60,56,54,0.45)", border: "1px solid rgba(80,73,69,0.6)" };

export function StatsScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  const weeklyAverage = 7.4;
  const monthlyAverage = 7.4;
  const comparisonPercentage = 12;

  const getMoodForDate = (date: Date) =>
    moodData.find((m) => m.date.toDateString() === date.toDateString())?.mood;

  const handleExportPDF = () => alert("Relatório exportado! (Funcionalidade simulada)");

  return (
    <div
      className="min-h-screen pb-20"
      style={{ background: "linear-gradient(135deg, #1d2021 0%, #282828 100%)" }}
    >
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold" style={{ color: FG1 }}>Estatísticas</h1>
          <Button
            size="sm"
            onClick={handleExportPDF}
            className="flex items-center gap-2 rounded-full px-4"
            style={{ background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)`, color: "#1d2021" }}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">PDF</span>
          </Button>
        </div>
        <p style={{ color: FG4 }}>Acompanhe seu progresso detalhado</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Toggle */}
        <div className="flex gap-2">
          {(["week", "month"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className="flex-1 py-3 rounded-2xl font-semibold transition-all"
              style={
                viewMode === mode
                  ? { background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)`, color: "#1d2021" }
                  : { background: "rgba(60,56,54,0.5)", color: FG4 }
              }
            >
              {mode === "week" ? "Semana" : "Mês"}
            </button>
          ))}
        </div>

        {/* Average Sleep Card */}
        <div
          className="rounded-3xl p-6"
          style={{
            background: "linear-gradient(135deg, rgba(60,56,54,0.6) 0%, rgba(50,48,47,0.5) 100%)",
            border: "1px solid rgba(80,73,69,0.6)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)` }}
            >
              <Moon className="w-6 h-6" style={{ color: "#1d2021" }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: FG4 }}>Média de sono</p>
              <h2 className="text-3xl font-bold" style={{ color: FG1 }}>
                {viewMode === "week" ? weeklyAverage : monthlyAverage}h
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4" style={{ color: "#98971a" }} />
            <span className="font-semibold" style={{ color: "#b8bb26" }}>+{comparisonPercentage}%</span>
            <span style={{ color: FG4 }}>vs. {viewMode === "week" ? "semana" : "mês"} anterior</span>
          </div>
        </div>

        {/* Gráficos */}
        {viewMode === "week" ? (
          <div className="rounded-3xl p-6" style={CARD}>
            <h3 className="text-lg font-bold mb-4" style={{ color: FG1 }}>Horas de Sono (Semanal)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyData}>
                <defs>
                  <linearGradient id="gbGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={YELLOW} />
                    <stop offset="100%" stopColor="#b57614" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: GRAY, fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: GRAY, fontSize: 12 }} domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#282828",
                    border: "1px solid rgba(80,73,69,0.7)",
                    borderRadius: "12px",
                    color: FG1,
                  }}
                />
                <Bar dataKey="hours" fill="url(#gbGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="rounded-3xl p-6" style={CARD}>
            <h3 className="text-lg font-bold mb-4" style={{ color: FG1 }}>Média de Sono (Mensal)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: GRAY, fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: GRAY, fontSize: 12 }} domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#282828",
                    border: "1px solid rgba(80,73,69,0.7)",
                    borderRadius: "12px",
                    color: FG1,
                  }}
                />
                <Line type="monotone" dataKey="avg" stroke={YELLOW} strokeWidth={3} dot={{ fill: "#b57614", r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Comparação Social */}
        <div className="rounded-3xl p-6" style={CARD}>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" style={{ color: TEAL }} />
            <h3 className="text-lg font-bold" style={{ color: FG1 }}>Comparação Social</h3>
          </div>
          <p className="text-sm mb-4" style={{ color: FG4 }}>Comparado com usuários da sua faixa etária</p>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: FG4 }}>Você</span>
                <span className="font-semibold" style={{ color: FG1 }}>7.4h</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(60,56,54,0.6)" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: "74%", background: `linear-gradient(90deg, ${YELLOW} 0%, #b57614 100%)` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: FG4 }}>Média geral</span>
                <span className="font-semibold" style={{ color: FG4 }}>6.8h</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(60,56,54,0.6)" }}>
                <div className="h-full rounded-full" style={{ width: "68%", background: "rgba(146,131,116,0.4)" }} />
              </div>
            </div>
          </div>

          <div
            className="mt-4 p-3 rounded-xl"
            style={{ background: "rgba(184,187,38,0.1)", border: "1px solid rgba(184,187,38,0.2)" }}
          >
            <p className="text-sm text-center" style={{ color: "#b8bb26" }}>
              🎉 Você está {comparisonPercentage}% acima da média!
            </p>
          </div>
        </div>

        {/* Calendário de Humor */}
        <div className="rounded-3xl p-6" style={CARD}>
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="w-5 h-5" style={{ color: YELLOW }} />
            <h3 className="text-lg font-bold" style={{ color: FG1 }}>Calendário de Humor</h3>
          </div>
          <p className="text-sm mb-4" style={{ color: FG4 }}>Como você se sentiu ao acordar</p>

          <div className="rounded-2xl p-4" style={{ background: "rgba(60,56,54,0.4)" }}>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md"
              modifiers={{ mood: moodData.map((m) => m.date) }}
              modifiersStyles={{ mood: { fontWeight: "bold" } }}
              components={{
                Day: ({ date, ...props }) => {
                  const mood = getMoodForDate(date);
                  return (
                    <div className="relative">
                      <button {...(props as any)} className="w-full h-full">{date.getDate()}</button>
                      {mood && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs">{mood}</div>
                      )}
                    </div>
                  );
                },
              }}
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-sm flex-wrap">
            {[["😃", "Excelente"], ["😊", "Bom"], ["😴", "Cansado"], ["😞", "Ruim"]].map(([emoji, label]) => (
              <div key={label} className="flex items-center gap-1">
                <span>{emoji}</span>
                <span style={{ color: FG4 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
