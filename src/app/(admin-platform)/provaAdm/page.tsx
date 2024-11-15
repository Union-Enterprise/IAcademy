"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import Link from "next/link";

interface Question {
    titulo: string;
    tema: string;
    alternativas: string[];
    correta: number | null;
    imagem?: File | null;
}

export default function SimuladoQuestao() {
    const [simuladoTitulo, setSimuladoTitulo] = useState<string | null>(null);
    const [questoes, setQuestoes] = useState<Question[]>([]);
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);

    const [questaoTitulo, setQuestaoTitulo] = useState("");
    const [tema, setTema] = useState("");
    const [alternativas, setAlternativas] = useState<string[]>(["", "", "", ""]);
    const [alternativaCorreta, setAlternativaCorreta] = useState<number | null>(null);
    const [imagem, setImagem] = useState<File | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    // Recuperar questões do localStorage ao montar o componente
    useEffect(() => {
        const storedQuestoes = localStorage.getItem("questoes");
        if (storedQuestoes) {
            setQuestoes(JSON.parse(storedQuestoes));
        }
    }, []);

    // Salvar questões no localStorage sempre que elas forem alteradas
    useEffect(() => {
        localStorage.setItem("questoes", JSON.stringify(questoes));
    }, [questoes]);

    const handleOpenQuestionModal = (questionIndex: number | null = null) => {
        if (questionIndex !== null) {
            const question = questoes[questionIndex];
            setQuestaoTitulo(question.titulo);
            setTema(question.tema);
            setAlternativas(question.alternativas);
            setAlternativaCorreta(question.correta);
            setImagem(question.imagem || null);
            setEditingIndex(questionIndex);
        } else {
            setQuestaoTitulo("");
            setTema("");
            setAlternativas(["", "", "", ""]);
            setAlternativaCorreta(null);
            setImagem(null);
            setEditingIndex(null);
        }
        setIsQuestionModalOpen(true);
    };

    const handleCloseQuestionModal = () => {
        setIsQuestionModalOpen(false);
    };

    const handleSaveQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedQuestion: Question = {
            titulo: questaoTitulo,
            tema,
            alternativas,
            correta: alternativaCorreta,
            imagem,
        };

        if (editingIndex !== null) {
            setQuestoes((prev) =>
                prev.map((q, index) => (index === editingIndex ? updatedQuestion : q))
            );
        } else {
            setQuestoes((prev) => [...prev, updatedQuestion]);
        }

        handleCloseQuestionModal();
    };

    const handleDeleteQuestion = () => {
        if (questionToDelete !== null) {
            setQuestoes((prev) => prev.filter((_, index) => index !== questionToDelete));
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold">
                Simulado - <span className="text-mainBlue">Estatistica</span>
            </h1>

            <div className="flex justify-end items-center mb-4">
                <button
                    className="bg-mainBlue text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-blue-700 duration-150"
                    onClick={() => handleOpenQuestionModal()}
                >
                    <Plus className="w-4 h-4" />
                    Criar Prova
                </button>
            </div>

            <div>
                <div>
                    {questoes.map((questao, index) => (
                        <div
                            key={index}
                            className="p-4 mb-4 border rounded-md shadow-md bg-gray-50 hover:bg-mainBlue hover:text-white transition-all duration-300"
                        >
                            <Link href={"/simuladoQuestao"}>
                                <h3 className="text-xl font-semibold">{questao.titulo}</h3>
                                <p className="text-gray-700 mt-2 hover:text-white">{questao.tema}</p>
                                <ul className="mt-2">
                                    {questao.alternativas.map((alt, altIndex) => (
                                        <li key={altIndex} className="text-gray-600">
                                            {altIndex === questao.correta ? <strong>{alt}</strong> : alt}
                                        </li>
                                    ))}
                                </ul>
                            </Link>
                            <div className="flex gap-4 mt-4">
                                <button
                                    className="p-2 bg-green-500 text-white rounded-md"
                                    onClick={() => handleOpenQuestionModal(index)}
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    className="p-2 bg-red-500 text-white rounded-md"
                                    onClick={() => {
                                        setQuestionToDelete(index);
                                        setIsDeleteModalOpen(true);
                                    }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <Link href="/simuladosAdm">
                    <button className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 duration-150">
                        Voltar para o Simulado
                    </button>
                </Link>
            </div>

            {isQuestionModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-2/4 max-h-[80vh] overflow-y-auto">
                        <div className="bg-mainBlue text-white p-4 rounded-t-lg flex justify-between items-center">
                            <h2 className="text-xl font-bold">
                                {editingIndex !== null ? "Editar Prova" : "Criar Prova"}
                            </h2>
                            <button
                                onClick={handleCloseQuestionModal}
                                className="text-white hover:text-gray-200"
                            >
                                X
                            </button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSaveQuestion} className="space-y-4">
                                <div>
                                    <label className="block font-medium">Título</label>
                                    <input
                                        type="text"
                                        className="w-full mt-2 p-2 border rounded-md"
                                        value={questaoTitulo}
                                        onChange={(e) => setQuestaoTitulo(e.target.value)}
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

                                <div className="flex justify-end gap-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={handleCloseQuestionModal}
                                        className="bg-gray-300 text-black p-2 rounded-md"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-mainBlue text-white p-2 rounded-md"
                                    >
                                        {editingIndex !== null ? "Salvar Alterações" : "Criar Prova"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-1/4 p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Tem certeza que deseja excluir esta questão?
                        </h2>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-300 text-black py-2 px-4 rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeleteQuestion}
                                className="bg-red-500 text-white py-2 px-4 rounded-md"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
