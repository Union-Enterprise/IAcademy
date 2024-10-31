"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import axios from "axios";

export default function Questionnaires() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [questao, setQuestao] = useState("");
  const [tema, setTema] = useState("");
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const response = await axios.get("http://localhost:5002/quizzes");
        const formattedData = response.data.map((question) => ({
          id: question._id,
          titulo: question.titulo,
          questao: question.questao,
          tema: question.tema,
        }));
        setQuestionnaires(formattedData);
      } catch (error) {
        console.error("Erro ao buscar os questionários:", error);
      }
    };

    fetchQuestionnaires();
  }, []);

  const handleOpenModal = (question) => {
    setIsModalOpen(true);
    if (question) {
      setSelectedQuestion(question);
      setTitulo(question.titulo || "");
      setQuestao(question.questao || "");
      setTema(question.tema || "");
    } else {
      setSelectedQuestion(null);
      setTitulo("");
      setQuestao("");
      setTema("");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setTitulo("");
    setQuestao("");
    setTema("");
  };

  const handleSaveQuestionnaire = async (e) => {
    e.preventDefault();
    const newQuestionnaire = { titulo, questao, tema };

    try {
      if (selectedQuestion) {
        await axios.put(
          `http://localhost:5002/quiz/${selectedQuestion.id}`,
          newQuestionnaire
        );
        const updatedQuestions = questionnaires.map((q) =>
          q.id === selectedQuestion.id ? { ...q, ...newQuestionnaire } : q
        );
        setQuestionnaires(updatedQuestions);
      } else {
        const response = await axios.post(
          "http://localhost:5002/quiz",
          newQuestionnaire
        );
        const createdQuestion = {
          id: response.data.insertedId,
          titulo,
          questao,
          tema,
        };
        setQuestionnaires([...questionnaires, createdQuestion]);
      }
    } catch (error) {
      console.error("Erro ao salvar a questão:", error);
    }

    handleCloseModal();
  };

  const confirmDeleteQuestion = (id) => {
    setQuestionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/quiz/${id}`);
      const updatedQuestions = questionnaires.filter((q) => q.id !== id);
      setQuestionnaires(updatedQuestions);
    } catch (error) {
      console.error("Erro ao deletar a questão:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Formulários iniciais</h1>

      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-mainBlue text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-mainBlue/80 duration-150"
        >
          <Plus className="w-4 h-4" />
          Criar Questão
        </button>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Título</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {questionnaires.map((questionnaire) => (
            <tr
              key={questionnaire.id}
              className="border-b hover:bg-gray-50 duration-150"
            >
              <td className="p-3">{questionnaire.titulo} - {questionnaire.tema}</td>
              <td className="p-3 flex gap-3">
                <button
                  className="bg-mainBlue text-white p-2 rounded hover:bg-blue-800 duration-150"
                  onClick={() => handleOpenModal(questionnaire)}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 duration-150"
                  onClick={() => confirmDeleteQuestion(questionnaire.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
            <div className="bg-mainBlue text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {selectedQuestion ? "Editar Questão" : "Nova Questão"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-gray-200"
              >
                X
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-4" onSubmit={handleSaveQuestionnaire}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-mainBlue focus:border-mainBlue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Questão *
                  </label>
                  <textarea
                    value={questao}
                    onChange={(e) => setQuestao(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-mainBlue focus:border-mainBlue"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tema *
                  </label>
                  <input
                    type="text"
                    value={tema}
                    onChange={(e) => setTema(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-mainBlue focus:border-mainBlue"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-mainBlue text-white py-2 rounded-md hover:bg-blue-800 duration-150"
                >
                  {selectedQuestion ? "Salvar Alterações" : "Criar Questão"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir esta questão?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleDeleteQuestion(questionToDelete);
                  setIsDeleteModalOpen(false);
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
