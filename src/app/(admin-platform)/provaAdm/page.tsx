"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Upload, X } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface Provas {
    titulo: string;
    tema: string;

}

export default function SimuladoQuestao() {
    const [provas, setProvas] = useState<Provas[]>([]);
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isIaModalOpen, setIsIaModalOpen] = useState(false);
    const [uploadedPdf, setUploadedPdf] = useState<File | null>(null);
    const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);
    const [quantidade, setQuantidade] = useState<number>(1);
    const [tituloIa, setTituloIa] = useState("");
    const [questaoTitulo, setQuestaoTitulo] = useState("");
    const [tema, setTema] = useState("");
    const [alternativas, setAlternativas] = useState<string[]>(["", "", "", ""]);
    const [alternativaCorreta, setAlternativaCorreta] = useState<number | null>(null);
    const [imagem, setImagem] = useState<File | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [simuladoTitulo, setSimuladoTitulo] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestionnaires = async () => {
            const storedQuestionnaires = await axios.get("http://localhost:5002/simulado/673a9ee67c14998b91d37875");// criar uma variavel para o id(cod praticamente igual ao arquivo [simulados] )
            console.log(storedQuestionnaires)
            setProvas(storedQuestionnaires.data.provas);
        }
        // if (storedQuestionnaires) {
        // }
        fetchQuestionnaires();

    }, []);


    useEffect(() => {
        const titulo = localStorage.getItem("simuladoTitulo");
        setSimuladoTitulo(titulo);
    }, []);

    useEffect(() => {
        if (provas.length > 0) {
            localStorage.setItem("provas", JSON.stringify(provas));
        }
    }, [provas]);


    const handleOpenQuestionModal = (questionIndex: number | null = null) => {
        if (questionIndex !== null) {
            const question = provas[questionIndex];
            setQuestaoTitulo(question.titulo);
            setTema(question.tema);

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
        const updatedQuestion: Provas = {
            titulo: questaoTitulo,
            tema,
        };

        if (editingIndex !== null) {
            setProvas((prev) =>
                prev.map((q, index) => (index === editingIndex ? updatedQuestion : q))
            );
        } else {
            setProvas((prev) => [...prev, updatedQuestion]);
        }

        handleCloseQuestionModal();
    };

    const handleDeleteQuestion = () => {
        if (questionToDelete !== null) {
            setProvas((prev) => prev.filter((_, index) => index !== questionToDelete));
            setIsDeleteModalOpen(false);
        }
    };

    const handleUploadPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadedPdf(e.target.files[0]);
            setIsUploadModalOpen(true);
        }
    };

    const handleConfirmUpload = () => {
        console.log("PDF uploaded:", uploadedPdf);
        setIsUploadModalOpen(false);
    };

    const handleCancelUpload = () => {
        setUploadedPdf(null);
        setIsUploadModalOpen(false);
    };

    const handleOpenIaModal = () => {
        setIsIaModalOpen(true);
    };

    const handleCloseIaModal = () => {
        setIsIaModalOpen(false);
    };

    const handleCreateWithIA = () => {
        console.log("Criar", quantidade, "questões com IA");

        setIsIaModalOpen(false);
    };

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold">
                Simulado - <span className="text-mainBlue">{simuladoTitulo || "Carregando..."}</span>
            </h1>

            <div className="flex justify-end items-center mb-4 gap-4">
                <label
                    htmlFor="uploadPdf"
                    className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center gap-2 cursor-pointer hover:bg-green-600 duration-150"
                >
                    <Upload className="w-4 h-4" />
                    Upload PDF
                </label>
                <input
                    type="file"
                    id="uploadPdf"
                    accept="application/pdf"
                    onChange={handleUploadPdf}
                    className="hidden"
                />

                <button
                    className="bg-mainBlue text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-blue-700 duration-150"
                    onClick={() => handleOpenQuestionModal()}
                >
                    <Plus className="w-4 h-4" />
                    Criar Prova
                </button>

            </div>

            <div>
                {provas.map((questionnaire, index) => (
                    <div
                        key={index}
                        className="p-4 mb-4 border rounded-md shadow-md bg-gray-50 hover:bg-mainBlue hover:text-white transition-all duration-300"
                    >
                        <Link href={"/simuladoQuestao"}
                            onClick={() => {
                                localStorage.setItem("simuladoTema", questionnaire.tema);
                            }}
                        >
                            <h3 className="text-xl font-semibold pb-4">{questionnaire.titulo}</h3>
                            <div className="border-b w-80 border-zinc-400" />
                            <p className="text-gray-700 mt-2">{questionnaire.tema}</p>
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
                                <X className="w-5 h-5" />
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

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-mainBlue text-white py-2 px-6 rounded-md w-full hover:bg-blue-700"
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
                    <div className="bg-white rounded-lg shadow-lg w-1/4 p-6">
                        <h3 className="text-xl font-bold">Excluir prova</h3>
                        <p className="pb-5">Você realmente deseja excluir esta prova?</p>
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

            {isIaModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-2/4 max-h-[80vh] overflow-y-auto">
                        <div className="bg-purple-500 text-white p-4 rounded-t-lg flex justify-between items-center">
                            <h2 className="text-xl font-bold">Criar com IA</h2>
                            <button
                                onClick={handleCloseIaModal}
                                className="text-white hover:text-gray-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block font-medium">Título da Prova</label>
                                <input
                                    type="text"
                                    value={tituloIa}
                                    onChange={(e) => setTituloIa(e.target.value)}
                                    className="w-full p-2 mt-2 border rounded-md"
                                    placeholder="Digite o título da prova"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Quantidade de Questões</label>
                                <input
                                    type="number"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))}
                                    className="w-full p-2 mt-2 border rounded-md"
                                   
                                    placeholder="Digite a quantidade de questões"
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={handleCreateWithIA}
                                    className="bg-purple-500 text-white py-2 px-6 rounded-md w-full hover:bg-purple-600"
                                >
                                    Criar
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isUploadModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
                        <h3 className="text-xl font-bold mb-4">Confirmar Upload</h3>
                        <p className="text-gray-700 mb-6">Você deseja mesmo usar este PDF?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCancelUpload}
                                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 duration-150"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmUpload}
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 duration-150"
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
