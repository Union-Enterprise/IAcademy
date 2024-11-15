"use client";

import { Plus, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Question {
    id: string;
    titulo: string;
    tema: string;
}

export default function SimuladosAdm() {
    const [questionnaires, setQuestionnaires] = useState<Question[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [tema, setTema] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleOpenModal = (id?: string) => {
        if (id) {
            const questionnaireToEdit = questionnaires.find((q) => q.id === id);
            if (questionnaireToEdit) {
                setTitulo(questionnaireToEdit.titulo);
                setTema(questionnaireToEdit.tema);
                setEditingId(id);
            }
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTitulo("");
        setTema("");
        setEditingId(null);
    };

    const handleSaveQuestionnaire = (e: React.FormEvent) => {
        e.preventDefault();

        const newQuestionnaire = {
            id: editingId ? editingId : Date.now().toString(),
            titulo,
            tema,
        };

        if (editingId) {
            setQuestionnaires((prev) =>
                prev.map((q) => (q.id === editingId ? newQuestionnaire : q))
            );
        } else {
            setQuestionnaires((prev) => [...prev, newQuestionnaire]);
        }

        handleCloseModal();
    };

    const handleDeleteQuestionnaire = () => {
        if (deletingId) {
            setQuestionnaires((prev) =>
                prev.filter((q) => q.id !== deletingId)
            );
            setIsDeleteModalOpen(false);
        }
    };

    const handleOpenDeleteModal = (id: string) => {
        setDeletingId(id);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingId(null);
    };

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Lista de Simulados</h1>
            <div className="flex justify-end items-center mb-4">
                <button
                    className="bg-mainBlue text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-blue-700 duration-150"
                    onClick={() => handleOpenModal()}
                >
                    <Plus className="w-4 h-4" />
                    Criar Simulados
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {questionnaires.map((questionnaire) => (
                    <div
                        key={questionnaire.id}
                        className="p-4 bg-white w-full h-72 border rounded-md shadow-md hover:bg-mainBlue hover:text-white transition-all hover:shadow-md group relative"
                    >
                        <Link href={`/provaAdm`} className="h-[600px]" >
                            <h3 className="text-2xl font-semibold flex justify-center pb-6 group-hover:text-white">
                                {questionnaire.titulo}
                            </h3>
                      
                        <div className="border-b w-full" />
                        <p className="text-lg flex justify-center text-gray-600 mt-6 group-hover:text-white">
                            {questionnaire.tema}
                        </p>
                        </Link>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                                className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition transform group-hover:scale-100 scale-0 duration-300"
                                onClick={(e) => {
                                    e.stopPropagation(); // Impede a navegação ao clicar nos botões
                                    handleOpenModal(questionnaire.id);
                                }}
                            >
                                <Edit className="w-5 h-5 text-white" />
                            </button>
                            <button
                                className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition transform group-hover:scale-100 scale-0 duration-300"
                                onClick={(e) => {
                                    e.stopPropagation(); // Impede a navegação ao clicar nos botões
                                    handleOpenDeleteModal(questionnaire.id);
                                }}
                            >
                                <Trash2 className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modais para criação, edição e exclusão */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
                        <div className="bg-mainBlue text-white p-4 rounded-t-lg flex justify-between items-center">
                            <h2 className="text-xl font-bold">
                                {editingId ? "Editar Simulado" : "Novo Simulado"}
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
                                    <label className="block font-medium">Título</label>
                                    <input
                                        type="text"
                                        className="w-full mt-2 p-2 border rounded-md"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">Tema</label>
                                    <input
                                        type="text"
                                        className="w-full mt-2 p-2 border rounded-md"
                                        value={tema}
                                        onChange={(e) => setTema(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        onClick={handleCloseModal}
                                        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-mainBlue text-white py-2 px-4 rounded-md hover:bg-blue-800 duration-150"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-1/3">
                        <div className="p-4">
                            <h3 className="text-xl font-bold">Tem certeza?</h3>
                            <p>Você realmente deseja excluir este simulado?</p>
                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    onClick={handleCloseDeleteModal}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleDeleteQuestionnaire}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
