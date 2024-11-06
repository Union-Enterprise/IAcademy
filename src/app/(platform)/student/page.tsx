"use client";

import { MessageCircleQuestion, Layers, Split } from "lucide-react";
import { useState, useEffect, SetStateAction } from "react";
import CardsStudent from "@/app/ui/components/Student/CardsStudent";
import { Fifagrafico } from "@/app/ui/components/Student/Fifagrafico";
import { LoginsChart } from "@/app/ui/components/Student/LoginsChart";
import { TimeChart } from "@/app/ui/components/Student/TimeChart";
import { UtilizationChart } from "@/app/ui/components/Student/UtilizationChart";
import { useUser } from "@/app/context/UserContext";
import { X } from "lucide-react";

const questions = [
  {
    title: "Questão 1 - Estatística",
    question:
      "Um professor aplicou uma prova para 10 alunos e obteve as seguintes notas: 6, 8, 5, 7, 9, 8, 5, 10, 6, 7. Qual é a média aritmética das notas desses alunos?",
  },
  {
    title: "Questão 2 - Geometria Plana",
    question:
      "Um triângulo equilátero possui cada lado medindo 6 cm. Qual é a área desse triângulo?",
  },
  {
    title: "Questão 3 - Equação de Primeiro Grau",
    question:
      "João tinha R$50 e gastou R$x em uma compra. Se ele ficou com R$20, qual o valor de x?",
  },
  {
    title: "Questão 4 - Operações Básicas",
    question:
      "Maria foi à feira e comprou 3 kg de laranja por R$5/kg e 2 kg de maçã por R$8/kg. Qual foi o valor total da compra?",
  },
  {
    title: "Questão 5 - Geometria",
    question:
      "Qual é o volume de uma esfera cujo raio mede 3 cm? (Use π ≈ 3,14)",
  },
  { title: "Questão 6 - Fatorial", question: "Calcule o fatorial de 5 (5!)." },
  {
    title: "Questão 7 - Equação de Terceiro Grau",
    question:
      "Resolva a equação x³ - 3x² - 4x + 12 = 0 encontrando uma de suas raízes reais.",
  },
];

const Student = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [answer, setAnswer] = useState(""); 
  const { user } = useUser();

 
  useEffect(() => {
    if (user && !quizAnswered) {
      setIsConfirmModalOpen(true);
    }
  }, [user, quizAnswered]);

  const questionsLeft = questions.length - currentQuestion - 1;

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
    } else {
      setQuizAnswered(true);
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAnswerChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setAnswer(event.target.value);
  };

  const handleConfirmStart = () => {
 
    setIsConfirmModalOpen(false);
    setIsModalOpen(true);
  };

  const handleCancelStart = () => {

    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-10 gap-5 min-h-full p-8">
        <div className="col-span-6 flex flex-col gap-5">
          <div className="w-full h-full bg-mainBlue p-10 text-white flex flex-col gap-5 rounded-lg">
            <h1 className="text-4xl">
              Bem-vindo(a) de volta, <b>{user?.name || "Usuário"}</b> 👋
            </h1>
            <p className="max-w-[60%]">
              Você concluiu <b className="font-bold">80%</b> da trilha de
              matemática neste mês! Continue assim e você estará cada vez mais
              próximo dos seus objetivos.
            </p>
          </div>
          <div className="grid grid-cols-3 col-span-1 gap-5 h-full">
            <CardsStudent
              title="Quizzes realizados"
              value={"0"}
              lucideIcon={MessageCircleQuestion}
              iconBg="bg-[#F4734C]"
            />
            <CardsStudent
              title="Tópicos lidos"
              value={"00/00"}
              lucideIcon={Layers}
              iconBg="bg-[#438FFB]"
            />
            <CardsStudent
              title="Tópicos Restantes"
              value={"0"}
              lucideIcon={Split}
            />
          </div>
        </div>
        <div className="col-span-2 h-full">
          <UtilizationChart />
        </div>
        <div className="col-span-2 h-full">
          <Fifagrafico />
        </div>
        <div className="col-span-4">
          <LoginsChart />
        </div>
        <div className="col-span-6">
          <TimeChart />
        </div>
      </div>

      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <div className="flex justify-end pb-2">
              <X className="hover:text-red-500" onClick={handleCancelStart} />
            </div>
            <h2 className="text-xl font-bold mb-4">Iniciar o Quiz?</h2>
            <p className="mb-4">
             Ola, nós somos a IAcademy 
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleCancelStart}
                className="py-2 px-4 rounded-md bg-gray-300 text-black"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmStart}
                className="py-2 px-4 rounded-md bg-mainBlue text-white"
              >
                Iniciar Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal do Quiz */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <div className="flex justify-end pb-2">
              <X className="hover:text-red-500" onClick={closeModal} />
            </div>

            {currentQuestion < questions.length ? (
              <>
                <h2 className="text-xl font-bold mb-4">
                  {questions[currentQuestion].title}
                </h2>
                <p className="mb-4">{questions[currentQuestion].question}</p>
                <input
                  type="text"
                  value={answer}
                  onChange={handleAnswerChange}
                  placeholder="Digite sua resposta..."
                  className="border rounded-md p-2 w-full mb-4 focus:border-mainBlue focus:outline-none"
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrevious}
                    className={`py-2 px-4 rounded-md ${
                      currentQuestion === 0
                        ? "bg-gray-300"
                        : "bg-mainBlue text-white"
                    }`}
                    disabled={currentQuestion === 0}
                  >
                    Voltar
                  </button>

                  <button
                    onClick={handleNext}
                    className={`py-2 px-4 rounded-md ${
                      currentQuestion === questions.length - 1
                        ? "bg-mainBlue text-white"
                        : "bg-mainBlue text-white"
                    } ${answer.trim() === "" ? "bg-gray-600 cursor-not-allowed" : ""}`}
                    disabled={answer.trim() === ""}
                  >
                    {currentQuestion === questions.length - 1
                      ? "Finalizar"
                      : "Próximo"}
                  </button>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full ${
                        index === currentQuestion
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
                </div>

                <p className="text-center mt-2">
                  Faltam <b>{questionsLeft}</b> questão
                  {questionsLeft !== 1 ? "s" : ""}.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Parabéns!</h2>
                <p className="mb-4">Você finalizou todas as questões.</p>
                <button
                  onClick={closeModal}
                  className="py-2 px-4 rounded-md bg-green-500 text-white"
                >
                  Fechar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Student;
