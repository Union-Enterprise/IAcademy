"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface Question {
    titulo: string;
    enunciado: string;
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
    const [enunciado, setEnunciado] = useState("");
    const [alternativas, setAlternativas] = useState<string[]>(["", "", "", ""]);
    const [alternativaCorreta, setAlternativaCorreta] = useState<number | null>(null);
    const [imagem, setImagem] = useState<File | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);


    useEffect(() => {
        const storedQuestoes = localStorage.getItem("questoes");
        if (storedQuestoes) {
            setQuestoes(JSON.parse(storedQuestoes));
        }
    }, []);

    useEffect(() => {
        const tema = localStorage.getItem("simuladoTema");
        setSimuladoTitulo(tema);
    }, []);


    useEffect(() => {
        if (questoes.length > 0) {
            localStorage.setItem("questoes", JSON.stringify(questoes));
        }
    }, [questoes]);

    const handleOpenQuestionModal = (questionIndex: number | null = null) => {
        if (questionIndex !== null) {
            const question = questoes[questionIndex];
            setQuestaoTitulo(question.titulo);
            setEnunciado(question.enunciado);
            setAlternativas(question.alternativas);
            setAlternativaCorreta(question.correta);
            setImagem(question.imagem || null);
            setEditingIndex(questionIndex);
        } else {
            setQuestaoTitulo("");
            setEnunciado("");
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
            enunciado,
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

    const handleAlternativeChange = (index: number, value: string) => {
        const updatedAlternativas = [...alternativas];
        updatedAlternativas[index] = value;
        setAlternativas(updatedAlternativas);
    };

    const handleAddAlternative = () => {
        setAlternativas((prev) => [...prev, ""]);
    };

    const handleDeleteAlternative = (index: number) => {
        const updatedAlternativas = alternativas.filter((_, i) => i !== index);
        setAlternativas(updatedAlternativas);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagem(e.target.files[0]);
        }
    };

    const imagePreview = imagem ? URL.createObjectURL(imagem) : "";

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold">
                Prova - <span className="text-mainBlue">{simuladoTitulo || "Carregando.."}</span>
            </h1>


            <div className="flex justify-end items-center mb-4">
                <button
                    className="bg-mainBlue text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-blue-700 duration-150"
                    onClick={() => handleOpenQuestionModal()}
                >
                    <Plus className="w-4 h-4" />
                    Criar Questão
                </button>
            </div>

            <div>
                {questoes.map((questao, index) => (
                    <div key={index} className="p-4 mb-4 border rounded-md shadow-md bg-gray-50">
                        <h3 className="text-xl font-semibold">{questao.titulo}</h3>
                        <p className="text-gray-700 mt-2">{questao.enunciado}</p>
                        <ul className="mt-2">
                            {questao.alternativas.map((alt, altIndex) => (
                                <li key={altIndex} className="text-gray-600">
                                    {altIndex === questao.correta ? <strong>{alt}</strong> : alt}
                                </li>
                            ))}
                        </ul>
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

            <div className="mt-4">
                <Link href="/provaAdm">
                    <button className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 duration-150">
                        Voltar para a prova
                    </button>
                </Link>
            </div>

            {isQuestionModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-2/4 max-h-[80vh] overflow-y-auto">
                        <div className="bg-mainBlue text-white p-4 rounded-t-lg flex justify-between items-center">
                            <h2 className="text-xl font-bold">{questaoTitulo ? "Editar Questão" : "Criar Questão"}</h2>
                            <button
                                onClick={handleCloseQuestionModal}
                                className="text-white hover:text-gray-200"
                            >
                                X
                            </button>
                        </div>
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
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
                                    <label className="block font-medium">Enunciado</label>
                                    <textarea
                                        className="w-full mt-2 p-2 border rounded-md"
                                        rows={4}
                                        value={enunciado}
                                        onChange={(e) => setEnunciado(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">Alternativas</label>
                                    {alternativas.map((alt, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded-md"
                                                value={alt}
                                                onChange={(e) =>
                                                    handleAlternativeChange(index, e.target.value)
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteAlternative(index)}
                                                className="bg-red-500 text-white p-2 rounded-md"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleAddAlternative}
                                        className="mt-4 text-mainBlue"
                                    >
                                        Adicionar Alternativa
                                    </button>
                                </div>
                                <div>
                                    <label className="block font-medium">Correta</label>
                                    <select
                                        className="w-full mt-2 p-2 border rounded-md"
                                        value={alternativaCorreta ?? ""}
                                        onChange={(e) =>
                                            setAlternativaCorreta(Number(e.target.value))
                                        }
                                    >
                                        <option value="">Escolha uma alternativa</option>
                                        {alternativas.map((alt, index) => (
                                            <option key={index} value={index}>
                                                {alt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-medium">Imagem </label>
                                    <div className="mt-2">
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById("fileInput")?.click()}
                                            className="bg-mainBlue text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-blue-700 duration-150"
                                        >
                                            <span>Selecionar Imagem</span>
                                        </button>
                                        <input
                                            id="fileInput"
                                            type="file"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </div>

                                    {imagem && (
                                        <img
                                            src={imagePreview}
                                            alt="Pré-visualização"
                                            className="mt-4 rounded-md w-48 h-32"
                                        />
                                    )}
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
                                        {questaoTitulo ? "Salvar Alterações" : "Criar Questão"}
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
                        <h3 className="text-xl font-bold">Excluir questão</h3>
                        <p className="pb-5">Você realmente deseja excluir esta questão?</p>
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
