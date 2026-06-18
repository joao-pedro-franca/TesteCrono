import { useState } from "react";
import { motion } from "motion/react";
import {
  BookOpen, PlayCircle, CheckCircle2, Clock, Star, ChevronRight,
  Moon, Sun, Zap, Brain, Leaf,
} from "lucide-react";
import { Progress } from "../ui/progress";
import { BottomNav } from "../dashboard/BottomNav";

const YELLOW = "#d79921";
const YELLOW_B = "#fabd2f";
const RED = "#cc241d";
const TEAL = "#458588";
const FG1 = "#ebdbb2";
const FG4 = "#a89984";
const GRAY = "#928374";

const userChronotype = "Vespertino";
const chronotypeInfo = {
  type: "Vespertino",
  icon: Moon,
  color: YELLOW,
  description: "Você rende melhor no fim do dia e tende a dormir e acordar mais tarde.",
};

type Lesson = { id: number; title: string; duration: string; completed: boolean };
type Course = {
  id: number; title: string; category: string; icon: React.ElementType; color: string;
  description: string; lessons: number; duration: string; rating: number;
  recommended: boolean; progress: number; lessonsList: Lesson[];
};

const courses: Course[] = [
  {
    id: 1, title: "Entenda seu Cronotipo", category: "Cronotipo", icon: Moon, color: YELLOW,
    description: "Descubra como seu relógio biológico funciona e por que você é uma coruja ou uma cotovia.",
    lessons: 6, duration: "45 min", rating: 4.9, recommended: true, progress: 33,
    lessonsList: [
      { id: 1, title: "O que é cronotipo?", duration: "5 min", completed: true },
      { id: 2, title: "Cronotipos: Coruja, Cotovia e Pombo", duration: "8 min", completed: true },
      { id: 3, title: "Como identificar o seu cronotipo", duration: "7 min", completed: false },
      { id: 4, title: "Cronotipo e desempenho cognitivo", duration: "8 min", completed: false },
      { id: 5, title: "Adaptando sua rotina ao cronotipo", duration: "9 min", completed: false },
      { id: 6, title: "Quiz: Qual é o seu cronotipo?", duration: "8 min", completed: false },
    ],
  },
  {
    id: 2, title: "Higiene do Sono para Vespertinos", category: "Hábitos", icon: Leaf, color: TEAL,
    description: "Estratégias práticas para melhorar a qualidade do sono mesmo sendo uma coruja do período noturno.",
    lessons: 8, duration: "60 min", rating: 4.7, recommended: true, progress: 0,
    lessonsList: [
      { id: 1, title: "Por que vespertinos dormem mal?", duration: "6 min", completed: false },
      { id: 2, title: "Luz e melatonina", duration: "8 min", completed: false },
      { id: 3, title: "Rituais noturnos que funcionam", duration: "9 min", completed: false },
      { id: 4, title: "Temperatura e ambiente do quarto", duration: "7 min", completed: false },
      { id: 5, title: "Alimentação e sono vespertino", duration: "8 min", completed: false },
      { id: 6, title: "Exercício no horário certo", duration: "7 min", completed: false },
      { id: 7, title: "Técnicas de relaxamento noturno", duration: "8 min", completed: false },
      { id: 8, title: "Montando sua rotina personalizada", duration: "7 min", completed: false },
    ],
  },
  {
    id: 3, title: "Ciência do Sono Profundo", category: "Ciência", icon: Brain, color: RED,
    description: "Mergulhe na neurociência do sono e aprenda a maximizar suas fases REM e NREM.",
    lessons: 5, duration: "40 min", rating: 4.8, recommended: false, progress: 0,
    lessonsList: [
      { id: 1, title: "As fases do sono explicadas", duration: "8 min", completed: false },
      { id: 2, title: "Sono REM: memória e criatividade", duration: "9 min", completed: false },
      { id: 3, title: "Sono profundo e recuperação física", duration: "8 min", completed: false },
      { id: 4, title: "O que arruína o sono profundo?", duration: "7 min", completed: false },
      { id: 5, title: "Como rastrear suas fases em casa", duration: "8 min", completed: false },
    ],
  },
  {
    id: 4, title: "Energia Solar: Rotina Matinal", category: "Hábitos", icon: Sun, color: YELLOW_B,
    description: "Mesmo sendo vespertino, aprenda a tornar suas manhãs mais produtivas sem forçar seu ritmo.",
    lessons: 7, duration: "50 min", rating: 4.6, recommended: true, progress: 0,
    lessonsList: [
      { id: 1, title: "Por que acordar cedo é difícil para vespertinos", duration: "6 min", completed: false },
      { id: 2, title: "Alarmes inteligentes e ciclos de sono", duration: "8 min", completed: false },
      { id: 3, title: "Exposição matinal à luz solar", duration: "7 min", completed: false },
      { id: 4, title: "Café da manhã e cronobiologia", duration: "7 min", completed: false },
      { id: 5, title: "Exercício leve ao acordar", duration: "8 min", completed: false },
      { id: 6, title: "Meditação de 5 minutos pela manhã", duration: "6 min", completed: false },
      { id: 7, title: "Construindo consistência gradual", duration: "8 min", completed: false },
    ],
  },
  {
    id: 5, title: "Power Nap: A Arte da Soneca", category: "Técnicas", icon: Zap, color: TEAL,
    description: "Domine o cochilo estratégico para restaurar energia sem prejudicar o sono noturno.",
    lessons: 4, duration: "25 min", rating: 4.9, recommended: false, progress: 0,
    lessonsList: [
      { id: 1, title: "Quando e quanto tempo cochilar", duration: "6 min", completed: false },
      { id: 2, title: "Nap de 20 min vs 90 min", duration: "7 min", completed: false },
      { id: 3, title: "Coffee nap: o truque do café + soneca", duration: "6 min", completed: false },
      { id: 4, title: "Evitando a inércia do sono", duration: "6 min", completed: false },
    ],
  },
];

const activeCourse = courses.find((c) => c.progress > 0 && c.progress < 100)!;
const nextLesson = activeCourse?.lessonsList.find((l) => !l.completed);

export function CoursesScreen() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<"recommended" | "all">("recommended");

  const filteredCourses = activeTab === "recommended" ? courses.filter((c) => c.recommended) : courses;
  const ChronoIcon = chronotypeInfo.icon;

  if (selectedCourse) {
    return <CourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
  }

  return (
    <div
      className="min-h-screen pb-24 relative"
      style={{ background: "linear-gradient(135deg, #1d2021 0%, #282828 100%)" }}
    >
      <div className="px-6 pt-8 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold mb-1" style={{ color: FG1 }}>Aulas & Cursos</h1>
          <p className="text-sm" style={{ color: FG4 }}>Aprenda sobre seu sono e cronotipo</p>
        </motion.div>
      </div>

      <div className="px-6 space-y-5">
        {/* Banner cronotipo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(215,153,33,0.18) 0%, rgba(181,118,20,0.1) 100%)",
            border: "1px solid rgba(215,153,33,0.3)",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "rgba(215,153,33,0.2)" }}
            >
              <ChronoIcon className="w-6 h-6" style={{ color: YELLOW }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider" style={{ color: GRAY }}>Seu Cronotipo</p>
              <p className="font-bold" style={{ color: FG1 }}>{chronotypeInfo.type} — Coruja 🦉</p>
            </div>
          </div>
          <p className="text-sm" style={{ color: FG4 }}>{chronotypeInfo.description}</p>
          <p className="text-xs mt-2" style={{ color: TEAL }}>
            Cursos selecionados especialmente para você ✨
          </p>
        </motion.div>

        {/* Continuar assistindo */}
        {activeCourse && nextLesson && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h2 className="font-bold mb-3" style={{ color: FG1 }}>Continuar assistindo</h2>
            <button
              onClick={() => setSelectedCourse(activeCourse)}
              className="w-full rounded-3xl p-5 text-left"
              style={{ background: "rgba(60,56,54,0.45)", border: "1px solid rgba(80,73,69,0.6)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${activeCourse.color}22` }}
                >
                  <activeCourse.icon className="w-6 h-6" style={{ color: activeCourse.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate" style={{ color: FG1 }}>{activeCourse.title}</p>
                  <p className="text-sm truncate" style={{ color: FG4 }}>Próximo: {nextLesson.title}</p>
                </div>
                <PlayCircle className="w-8 h-8 flex-shrink-0" style={{ color: YELLOW }} />
              </div>
              <Progress value={activeCourse.progress} className="h-2" style={{ background: "rgba(60,56,54,0.6)" }} />
              <p className="text-xs mt-1" style={{ color: FG4 }}>{activeCourse.progress}% concluído</p>
            </button>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-2">
          {(["recommended", "all"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={
                activeTab === tab
                  ? { background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)`, color: "#1d2021" }
                  : { background: "rgba(60,56,54,0.5)", color: FG4 }
              }
            >
              {tab === "recommended" ? "Para você" : "Todos os cursos"}
            </button>
          ))}
        </div>

        {/* Lista de cursos */}
        <div className="space-y-4 pb-4">
          {filteredCourses.map((course, i) => (
            <motion.button
              key={course.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              onClick={() => setSelectedCourse(course)}
              className="w-full rounded-3xl p-5 text-left"
              style={{ background: "rgba(60,56,54,0.45)", border: "1px solid rgba(80,73,69,0.6)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${course.color}22` }}
                >
                  <course.icon className="w-7 h-7" style={{ color: course.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {course.recommended && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: "rgba(215,153,33,0.2)", color: YELLOW }}
                      >
                        Para você
                      </span>
                    )}
                    <span className="text-xs" style={{ color: GRAY }}>{course.category}</span>
                  </div>

                  <p className="font-semibold mb-1" style={{ color: FG1 }}>{course.title}</p>
                  <p className="text-xs mb-3 line-clamp-2" style={{ color: FG4 }}>{course.description}</p>

                  <div className="flex items-center gap-3 text-xs" style={{ color: GRAY }}>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />{course.lessons} aulas
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />{course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" style={{ color: YELLOW_B }} />{course.rating}
                    </span>
                  </div>

                  {course.progress > 0 && (
                    <div className="mt-3">
                      <Progress value={course.progress} className="h-1.5" style={{ background: "rgba(60,56,54,0.6)" }} />
                      <p className="text-xs mt-1" style={{ color: FG4 }}>{course.progress}% concluído</p>
                    </div>
                  )}
                </div>

                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: GRAY }} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function CourseDetail({ course, onBack }: { course: Course; onBack: () => void }) {
  const completedCount = course.lessonsList.filter((l) => l.completed).length;

  return (
    <div
      className="min-h-screen pb-24 relative"
      style={{ background: "linear-gradient(135deg, #1d2021 0%, #282828 100%)" }}
    >
      <div className="px-6 pt-8 pb-6">
        <button onClick={onBack} className="text-sm mb-4 flex items-center gap-1" style={{ color: FG4 }}>
          <ChevronRight className="w-4 h-4 rotate-180" />
          Voltar
        </button>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6"
          style={{
            background: `linear-gradient(135deg, ${course.color}22 0%, rgba(60,56,54,0.4) 100%)`,
            border: `1px solid ${course.color}40`,
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `${course.color}22` }}
            >
              <course.icon className="w-8 h-8" style={{ color: course.color }} />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: GRAY }}>{course.category}</p>
              <h2 className="text-xl font-bold" style={{ color: FG1 }}>{course.title}</h2>
            </div>
          </div>

          <p className="text-sm mb-4" style={{ color: FG4 }}>{course.description}</p>

          <div className="flex items-center gap-4 text-sm mb-4" style={{ color: GRAY }}>
            <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{course.lessons} aulas</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4" style={{ color: YELLOW_B }} />{course.rating}</span>
          </div>

          {course.progress > 0 && (
            <>
              <Progress value={course.progress} className="h-2 mb-1" style={{ background: "rgba(60,56,54,0.6)" }} />
              <p className="text-xs" style={{ color: FG4 }}>{completedCount} de {course.lessons} aulas concluídas</p>
            </>
          )}
        </motion.div>
      </div>

      <div className="px-6">
        <h3 className="font-bold mb-4" style={{ color: FG1 }}>Aulas do curso</h3>
        <div className="space-y-3">
          {course.lessonsList.map((lesson, i) => {
            const isNext = !lesson.completed && course.lessonsList[i - 1]?.completed !== false;
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="flex items-center gap-4 rounded-2xl p-4"
                style={{
                  background: isNext ? `${course.color}14` : "rgba(60,56,54,0.35)",
                  border: isNext ? `1px solid ${course.color}35` : "1px solid rgba(80,73,69,0.5)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: lesson.completed
                      ? "rgba(69,133,136,0.2)"
                      : isNext
                      ? `${course.color}25`
                      : "rgba(60,56,54,0.6)",
                  }}
                >
                  {lesson.completed ? (
                    <CheckCircle2 className="w-5 h-5" style={{ color: TEAL }} />
                  ) : isNext ? (
                    <PlayCircle className="w-5 h-5" style={{ color: course.color }} />
                  ) : (
                    <span className="text-xs font-bold" style={{ color: GRAY }}>{lesson.id}</span>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: lesson.completed ? GRAY : FG1 }}>
                    {lesson.title}
                  </p>
                  <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: GRAY }}>
                    <Clock className="w-3 h-3" />{lesson.duration}
                  </p>
                </div>

                {isNext && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                    style={{ background: `${course.color}22`, color: course.color }}
                  >
                    Próxima
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
