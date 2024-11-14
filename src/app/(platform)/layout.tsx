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
import axios from "axios";  // Adicionando axios

const inter = Inter({ subsets: ["latin"] });

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
  const [questions, setQuestions] = useState([]);  // Estado para armazenar as questões
  const { user } = useUser();

  const userQuizKey = `quizAnswered_${user?.email}`;
  const userModalKey = `modalsClosed_${user?.email}`;

  // useEffect para buscar as questões da API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5002/quizzes");  // Fazendo a requisição à API
        const quizzes = response.data.map((quiz: any) => ({
          title: `${quiz.titulo} - ${quiz.tema}`,
          question: quiz.questao,
          options: quiz.alternativas,  // Adapte as opções conforme necessário
          correctAnswer: quiz.resposta,  // Substitua pela resposta correta se vier da API
        }));
        setQuestions(quizzes);
      } catch (error) {
        console.error("Erro ao buscar quizzes:", error);
      }
    };

    fetchQuestions();
  }, []);

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

  const handleNext = async () => {
    console.log('prox')
    if (currentQuestion < questions.length-1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
    } else {
      console.log(questions)
      const data = [];
      let count = 0;
      for (let question of questions){
        data[count] = { "titulo": question.title, "questao": question.question, "alternativa_escolhida": userAnswers[count], "resposta_correta": question.correctAnswer}
        count++;
      }
      console.log(data)
      axios.post("http://localhost:5002/quiz/register/user", { quiz: data }, { withCredentials: true })
      localStorage.setItem(userQuizKey, "true");
      setQuizAnswered(true);
      setCurrentQuestion((prev) => prev + 1);
      // closeModal();
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
  }, [questions]);

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
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 max-h-[80vh] overflow-hidden">
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
                        className={`w-6 h-6 rounded-full border-2 transition-all ${selectedAnswer === option ? "bg-mainBlue border-mainBlue" : " border-gray-400"}`}
                      ></span>
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
                    className={`py-2 px-4 rounded-md ${!selectedAnswer ? "!bg-gray-500 text-black cursor-not-allowed" : "bg-mainBlue text-white"}`}
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
              <div className="text-center p-3 max-h-[70vh] overflow-y-auto">
                <h2 className="text-lg font-semibold  text-gray-800">Quiz Finalizado</h2>
                <p className="text-xs text-gray-600 mb-3">Obrigado por participar do nosso quiz!</p>
                <p className="text-sm text-gray-700 mb-3">
                  Você acertou <span className="font-bold text-mainBlue">{calculateResults().correctAnswersCount}</span> de{" "}
                  <span className="font-bold text-mainBlue">{questions.length}</span> questões.
                </p>

                <div className="space-y-1 ">
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
                  className="mt-3 py-1 px-3 rounded-md bg-mainBlue text-white font-semibold text-xs hover:bg-mainBlueDark transition-all w-full h-12 hover:bg-mainBlue/90"
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