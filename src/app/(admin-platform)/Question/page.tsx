"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css"; 


export default function Questionnaires() {
  const [questionnaires, setQuestionnaires] = useState([
    { id: 1, title: "Matematica" },
    { id: 2, title: "Questionário Geral" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("");

  useEffect(() => {
    // Qualquer código que precisa acessar o DOM pode ir aqui
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewQuestionTitle(""); 
    setNewQuestionType(""); 
    setDescription(""); 
  };

  const handleSaveQuestionnaire = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 
    const newQuestionnaire = {
      id: questionnaires.length + 1,
      title: newQuestionTitle,
      type: newQuestionType,
      description,
    };

    setQuestionnaires([...questionnaires, newQuestionnaire]); 
    handleCloseModal(); 
  };

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Lista de Questões</h1>

      <div className="flex justify-end items-center mb-4">
        <button
          onClick={handleOpenModal}
          className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-green-600 duration-150"
        >
          <Plus className="w-4 h-4" />
          Nova questão
        </button>
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
            <tr
              key={questionnaire.id}
              className="border-b hover:bg-gray-50 duration-150"
            >
              <td className="p-3">{questionnaire.title}</td>
              <td className="p-3 flex gap-3">
                <button className="flex justify-end bg-mainBlue text-white p-2 rounded hover:bg-blue-800 duration-150">
                  <Edit className="w-4 h-4"  onClick={handleOpenModal}/>
                </button>
                <button className="flex justify-end bg-red-500 text-white p-2 rounded hover:bg-red-600 duration-150">
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white  rounded-lg shadow-lg w-1/2">
            <div className="bg-mainBlue text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-bold">Nova questão</h2>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-gray-200"
              >
                X
              </button>
            </div>

           <div className="p-6">
             <form className="space-y-4 p-4" onSubmit={handleSaveQuestionnaire}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nome do Questionário *
                    </label>
                    <input
                      type="text"
                      value={newQuestionTitle}
                      onChange={(e) => setNewQuestionTitle(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-mainBlue focus:border-mainBlue"
                      placeholder="Formulário Geral"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tipo *
                    </label>
                    <select
                      value={newQuestionType}
                      onChange={(e) => setNewQuestionType(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-mainBlue focus:border-mainBlue"
                      required
                    >
                      <option value="">Selecione um tipo</option>
                      <option value="geral">Geometria</option>
                      <option value="feedback">Regra de três</option>
                      <option value="geral">Álgebra</option>
                      <option value="feedback">Geometria Plana</option>
                      <option value="geral">Fração</option>
                      <option value="feedback">Equação</option>
                      <option value="geral">Fracional</option>
                      <option value="feedback">SLA</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Descrição
                    </label>
                    <ReactQuill 
                      value={description} 
                      onChange={setDescription} 
                      modules={modules} 
                      theme="snow" 
                      className="h-32"
                    />
                  </div>

                  <div className="flex justify-end pt-10 ">
                    <button
                      onClick={handleCloseModal}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 duration-150"
                    >
                      Fechar
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 duration-150 ml-2"
                    >
                      Salvar
                    </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
