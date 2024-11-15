"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, File, Bot } from "lucide-react";
import dynamic from "next/dynamic";
import axios from "axios";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Questionnaires() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [questao, setQuestao] = useState("");
  const [explicacao, setExplicacao] = useState("");
  const [alternativa_correta, setAlternativa_correta] = useState("");
  const [alternativas, setAlternativas] = useState([""]);
  const [tema, setTema] = useState("");
  const [ID, setID] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [imagem, setImagem] = useState(null);
  


  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const response = await axios.get("http://localhost:5002/all_questions");
        const formattedData = response.data.map((question) => ({
          id: question._id,
          titulo: question.titulo,
          questao: question.questao,
          explicacao: question.explicacao,
          alternativa_correta: question.alternativa_correta,
          alternativas: question.alternativas,
          tema: question.tema,
        }));
        setQuestionnaires(formattedData);
      } catch (error) {
        console.error("Erro ao buscar os questionários:", error);
      }
    };

    fetchQuestionnaires();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenModal = (question) => {
    setIsModalOpen(true);
    if (question) {
      setSelectedQuestion(question);
      setID(question.id || "");
      setTitulo(question.titulo || "");
      setQuestao(question.questao || "");
      setExplicacao(question.explicacao || "");
      setAlternativa_correta(question.alternativa_correta || "");
      setAlternativas(question.alternativas || []);
      setTema(question.tema || "");
    } else {
      setSelectedQuestion(null);
      setTitulo("");
      setQuestao("");
      setExplicacao("");
      setAlternativa_correta("");
      setAlternativas([""]);
      setTema("");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setTitulo("");
    setQuestao("");
    setExplicacao("");
    setAlternativa_correta("");
    setAlternativas([""]);
    setTema("");
    setImagem(null);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    setSelectedPdf(file);
    setIsPdfModalOpen(true);
  };

  const handleConfirmPdf = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedPdf);

      await axios.post("http://localhost:5000/upload_quiz_pdf", formData);
      await axios.post("http://localhost:5000/generate_quiz");

      setIsPdfModalOpen(false);
      setSelectedPdf(null);
    } catch (error) {
      console.error("Erro ao fazer upload e gerar quiz:", error);
    }
  };

  const handleSaveQuestionnaire = async (e) => {
    e.preventDefault();
  
    const newQuestionnaire = {
      ID,
      titulo,
      questao,
      explicacao,
      alternativa_correta,
      alternativas,
      tema,
      imagem,
    };
  
    try {
      if (selectedQuestion) {
        await axios.put("http://localhost:5002/question/" + selectedQuestion.id, newQuestionnaire);
        const updatedQuestions = questionnaires.map((q) =>
          q.id === selectedQuestion.id ? { ...q, ...newQuestionnaire } : q
        );
        setQuestionnaires(updatedQuestions);
      } else {
        const response = await axios.post("http://localhost:5002/question", newQuestionnaire);
        const createdQuestion = {
          id: response.data.insertedId,
          titulo,
          questao,
          explicacao,
          alternativa_correta,
          alternativas,
          tema,
          imagem,
        };
  
        setQuestionnaires([...questionnaires, createdQuestion]);
        setSelectedQuestion(createdQuestion);
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
      await axios.delete(`http://localhost:5002/question/${id}`);
      const updatedQuestions = questionnaires.filter((q) => q.id !== id);
      setQuestionnaires(updatedQuestions);
    } catch (error) {
      console.error("Erro ao deletar a questão:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Lista de Questões</h1>

      <div className="flex justify-end items-center mb-4 ">
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-green-600 duration-150"
        >
          <Plus className="w-4 h-4" />
          Nova questão
        </button>
        <button
          className="bg-purple-500  text-white py-2 px-4 ml-4 rounded-md flex items-center gap-2 hover:bg-purple-600 duration-150"
        >
          <Bot className="w-4 h-4" />
          Criar com IA
        </button>

        <label className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-blue-600 duration-150 cursor-pointer">
          <File className="w-4 h-4" />
          Upload de questões por PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            className="hidden"
          />
        </label>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Nome</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {questionnaires.map((questionnaire) => (
            <tr key={questionnaire.id} className="border-b hover:bg-gray-50 duration-150">
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
          <div className="bg-white rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto"> {/* Scrollable form */}
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
                  <label className="block text-sm font-medium text-gray-700">Título *</label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-mainBlue focus:border-mainBlue"
                    required
                  />
                </div>

                <div className="!mb-14">
                  <label className="block text-sm font-medium text-gray-700">Questão *</label>
                  <ReactQuill
                    value={questao}
                    onChange={setQuestao}
                    theme="snow"
                    className="h-32"
                  />
                </div>

                <div className="!mb-14">
                  <label className="block text-sm font-medium text-gray-700">Explicação</label>
                  <ReactQuill
                    value={explicacao}
                    onChange={setExplicacao}
                    theme="snow"
                    className="h-32"
                  />
                </div>

                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">Alternativa Correta *</label>
                  <input
                    type="text"
                    value={alternativa_correta}
                    onChange={(e) => setAlternativa_correta(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-mainBlue focus:border-mainBlue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Alternativas *</label>
                  <textarea
                    value={alternativas.join("\n")}
                    onChange={(e) => {
                      const newAlternativas = e.target.value.split("\n");
                      setAlternativas(newAlternativas);
                      if (!newAlternativas.includes(alternativa_correta)) {
                        setAlternativa_correta("");
                      }
                    }}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-mainBlue focus:border-mainBlue"
                    rows={4}
                    required
                  />
                  <small className="text-gray-500">Separe as alternativas por linhas.</small>
                </div>

                {imagem && !selectedQuestion && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Imagem</label>
                    <img src={imagem} alt="Imagem carregada" className="h-96 mt-2" />
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Imagem (Opcional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-1 block  p-2 border border-gray-300 rounded-md shadow-sm focus:ring-mainBlue focus:border-mainBlue"
                  />
                  {selectedQuestion && selectedQuestion.imagem && !imagem && (
                    <div className="mt-2">
                      <img
                        src={selectedQuestion.imagem}
                        alt="Imagem original"
                        className=""
                      />
                    </div>
                  )}
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

      {isPdfModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 className="text-xl font-bold mb-4">Confirmar Upload de PDF</h2>
            <p>Tem certeza que deseja enviar este PDF para gerar questões?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmPdf}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Confirmar
              </button>
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
