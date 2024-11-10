"use client";

import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../ui/components/Navbar";
import { SidebarProvider } from "../context/SidebarContext";
import Sidebar from "../ui/components/Sidebar";
import { UserProvider, useUser } from "../context/UserContext";
import { ToastProvider } from "../context/ToastContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { useState, useEffect } from "react";
import { MessageCircleQuestion, X, SquareChartGantt } from "lucide-react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const questions = [
  {
    title: "Questão 1 - Estatística",
    question:
      "Um professor aplicou uma prova para 10 alunos e obteve as seguintes notas: 6, 8, 5, 7, 9, 8, 5, 10, 6, 7. Qual é a média aritmética das notas desses alunos?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "7",
  },
  {
    title: "Questão 2 - Geometria Plana",
    question:
      "Um triângulo equilátero possui cada lado medindo 6 cm. Qual é a área desse triângulo?",
    options: ["9 cm²", "12 cm²", "15 cm²", "18 cm²"],
    correctAnswer: "12 cm²",
  },
  {
    title: "Questão 3 - Equação de Primeiro Grau",
    question:
      "João tinha R$50 e gastou R$x em uma compra. Se ele ficou com R$20, qual o valor de x?",
    options: ["10", "15", "20", "30"],
    correctAnswer: "30",
  },
  {
    title: "Questão 4 - Operações Básicas",
    question:
      "Maria foi à feira e comprou 3 kg de laranja por R$5/kg e 2 kg de maçã por R$8/kg. Qual foi o valor total da compra?",
    options: ["R$31", "R$33", "R$35", "R$36"],
    correctAnswer: "R$31",
  },
  {
    title: "Questão 5 - Geometria",
    question:
      "Qual é o volume de uma esfera cujo raio mede 3 cm? (Use π ≈ 3,14)",
    options: ["60 cm³", "80 cm³", "100 cm³", "120 cm³"],
    correctAnswer: "60 cm³",
  },
  {
    title: "Questão 6 - Fatorial",
    question: "Calcule o fatorial de 5 (5!).",
    options: ["120", "150", "100", "130"],
    correctAnswer: "120",
  },
  {
    title: "Questão 7 - Equação de Terceiro Grau",
    question:
      "Resolva a equação x³ - 3x² - 4x + 12 = 0 encontrando uma de suas raízes reais.",
    options: ["1", "2", "-1", "-2"],
    correctAnswer: "2",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePageTitle();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<"confirmation" | "quiz">("confirmation");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFloatingIcon, setShowFloatingIcon] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]); 
  const { user } = useUser();

  const userQuizKey = `quizAnswered_${user?.email}`;
  const userModalKey = `modalsClosed_${user?.email}`;

  useEffect(() => {
    if (user) {
      const isQuizCompleted = localStorage.getItem(userQuizKey);
      const areModalsClosed = JSON.parse(localStorage.getItem(userModalKey) || "false");

      if (isQuizCompleted) {
        setQuizAnswered(true);
      } else if (areModalsClosed) {
        setShowFloatingIcon(true);
      } else {
        setIsConfirmModalOpen(true);
      }
    }
  }, [user]);


  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
    } else {
      localStorage.setItem(userQuizKey, "true");
      setQuizAnswered(true);
      closeModal();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
    localStorage.setItem(userModalKey, "true");
    localStorage.setItem(userQuizKey, "true");
    setShowFloatingIcon(false);
  };


  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = answer;
    setUserAnswers(updatedAnswers); 
  };
  
  
 
  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("answers") || "{}");
    const userAnswersArray = questions.map((_, index) => savedAnswers[index] || "");
    setUserAnswers(userAnswersArray); 
  }, []);
  
  const handleConfirmStart = () => {
    setIsConfirmModalOpen(false);
    setModalStep("quiz");
    setIsModalOpen(true);
  };

  const handleCancelStart = () => {
    setIsConfirmModalOpen(false);
    localStorage.setItem(userModalKey, "true");
    setShowFloatingIcon(true);
  };

  const reopenModal = () => {
    if (modalStep === "quiz") {
      setIsModalOpen(true);
    } else {
      setIsConfirmModalOpen(true);
    }
    setShowFloatingIcon(false);
  };

  const calculateResults = () => {
    let correctAnswersCount = 0;
    const results = questions.map((question, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) {
        correctAnswersCount += 1;
      }
      return {
        question: question.title,
        correctAnswer: question.correctAnswer,
        userAnswer: userAnswer, 
        isCorrect,
      };
    });
    return { correctAnswersCount, results };
  };
  

  return (
    <html lang="pt-br" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${inter.className} relative h-[100vh] pt-20 select-none bg-bg-light flex`}
      >
        <UserProvider>
          <SidebarProvider>
            <Navbar />
            <Sidebar />
            <main className="flex flex-col overflow-auto w-full h-[calc(100% - 80px)]">
              <ToastProvider>{children}</ToastProvider>
            </main>
          </SidebarProvider>
        </UserProvider>
      </body>

      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <div className="flex justify-end pb-2">
              <X className="hover:text-red-500" onClick={handleCancelStart} />
            </div>
            <h2 className="text-xl font-bold mb-4">Iniciar o Quiz?</h2>
            <p className="mb-4">
              Olá, nós somos a IAcademy e queremos saber se você quer fazer o nosso quiz para termos um mapeamento no seu método de desenvolvimento.
            </p>
            <div className="flex justify-between">
              <button onClick={handleCancelStart} className="py-2 px-4 rounded-md bg-gray-300 text-black">
                Cancelar
              </button>
              <button onClick={handleConfirmStart} className="py-2 px-4 rounded-md bg-mainBlue text-white">
                Iniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <div className="flex justify-end pb-2">
              <X className="hover:text-red-500" onClick={closeModal} />
            </div>

            {currentQuestion < questions.length ? (
              <>
                <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].title}</h2>
                <p className="mb-4">{questions[currentQuestion].question}</p>

                <div className="space-y-4 pb-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all"
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={() => handleAnswerChange(option)}
                        className="hidden"
                      />
                      <span
                        className={`w-6 h-6 rounded-full border-2 transition-all ${selectedAnswer === option ? "bg-mainBlue border-mainBlue" : " border-gray-400"}`}></span>
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrevious}
                    className={`py-2 px-4 rounded-md ${currentQuestion === 0 ? "bg-gray-300" : "bg-mainBlue text-white"}`}
                    disabled={currentQuestion === 0}
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleNext}
                    className={`py-2 px-4 rounded-md ${currentQuestion === questions.length ? "bg-mainBlue text-white" : "bg-mainBlue text-white"} ${!selectedAnswer ? "!bg-gray-500 text-black cursor-not-allowed" : ""}`}
                    disabled={!selectedAnswer}
                  >
                    {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
                  </button>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full ${index === currentQuestion ? "bg-blue-500" : "bg-gray-300"}`}
                    ></div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center p-3">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Quiz Finalizado</h2>
              <p className="text-xs text-gray-600 mb-3">Obrigado por participar do nosso quiz!</p>
              <p className="text-sm text-gray-700 mb-3">
                Você acertou <span className="font-bold text-mainBlue">{calculateResults().correctAnswersCount}</span> de{" "}
                <span className="font-bold text-mainBlue">{questions.length}</span> questões.
              </p>
            
              <div className="space-y-2">
                {calculateResults().results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-md border-l-2 ${result.isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'}`}
                  >
                    <h3 className="text-xs font-medium text-gray-800">{result.question}</h3>
                    <p className="text-xs mt-1">
                      {result.isCorrect ? (
                        <span className="text-green-600">Correto</span>
                      ) : (
                        <span className="text-red-600">Errado</span>
                      )}
                    </p>
                 
                    <p className="text-xs text-gray-500 mt-1">
                      Sua resposta: <strong>{result.userAnswer}</strong>
                    </p>
                 
                    {!result.isCorrect && (
                      <p className="text-xs text-gray-500 mt-1">
                        Resposta correta: <strong>{result.correctAnswer}</strong>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            
              <button
                onClick={closeModal}
                className="mt-3 py-1 px-3 rounded-md bg-mainBlue text-white font-semibold text-xs hover:bg-mainBlueDark transition-all"
              >
                Fechar
              </button>
            </div>
            )}
          </div>
        </div>
      )}

      {showFloatingIcon && !quizAnswered && (
        <div
          className="fixed bottom-10 right-10 bg-mainBlue text-white p-4 rounded-full shadow-lg cursor-pointer z-50"
          onClick={reopenModal}
        >
          <SquareChartGantt size={32} />
        </div>
      )}
    </html>
  );
}
