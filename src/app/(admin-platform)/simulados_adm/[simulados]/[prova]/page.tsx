"use client";

import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode } from "react";
import { Plus, Trash2, Upload, X } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface Provas {
    correta: Key | null | undefined;
    alternativas: any;
    titulo: string;
    tema: string;
    enunciado: string,


}

export default function SimuladoQuestao() {
    const params = useParams();

    const [provas, setProvas] = useState<Provas[]>([]);
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isIaModalOpen, setIsIaModalOpen] = useState(false);
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
    const ALFABETO = ["a", "b", "c", "d", "e"];
    const [enunciado, setEnunciado] = useState("");

    const simulados = decodeURIComponent(params.simulados);
    const prova = decodeURIComponent(params.prova);

    console.log(simulados, prova)

    useEffect(() => {
        const fetchQuestionnaires = async () => {
            const storedQuestionnaires = await axios.get(`http://localhost:5002/simulado/${simulados}/${prova}`);// criar uma variavel para o id(cod praticamente igual ao arquivo [simulados] )
            console.log(storedQuestionnaires)
            setProvas(storedQuestionnaires.data.questoes);
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
            setAlternativas(["", "", "", "", ""]);
            setAlternativaCorreta(null);
            setImagem(null);
            setEditingIndex(null);
        }
        setIsQuestionModalOpen(true);
    };

    const handleCloseQuestionModal = () => {
        setIsQuestionModalOpen(false);
    };

    const handleSaveQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(imagem);

        const updatedQuestion = {
            titulo: questaoTitulo,
            enunciado,
            tema,
            alternativas,
            alternativa_correta: ALFABETO[alternativaCorreta]
        };

        if (editingIndex !== null) {
            setProvas((prev) =>
                prev.map((q, index) => (index === editingIndex ? updatedQuestion : q))
            );
        } else {
            console.log(updatedQuestion)

            const index = await axios.post(`http://localhost:5002/simulado/${simulados}/${prova}`, { updatedQuestion });
            const formData = new FormData();
            if (imagem) {
                formData.append("file", imagem);
                await axios.post(`http://localhost:5002/simulado/${simulados}/${prova}/${index.data}/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            setProvas((prev) => [...prev, updatedQuestion]);
        }

        handleCloseQuestionModal();
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

    const handleDeleteQuestion = async () => {
        if (questionToDelete !== null) {
            setProvas((prev) => prev.filter((_, index) => index !== questionToDelete));
            console.log(questionToDelete)
            await axios.delete(`http://localhost:5002/simulado/${simulados}/${questionToDelete}/${questionToDelete}`)
            setIsDeleteModalOpen(false);
        }
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

    const imagePreview = imagem ? URL.createObjectURL(imagem) : "";

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold">
                Prova - <span className="text-mainBlue">{simuladoTitulo || "Carregando..."}</span>
            </h1>

            <div className="flex justify-end items-center mb-4 gap-4">
                <button
                    className="bg-mainBlue text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-blue-700 duration-150"
                    onClick={() => handleOpenQuestionModal()}
                >
                    <Plus className="w-4 h-4" />
                    Criar Questão
                </button>

            </div>

            <div>
                {provas.map((questionnaire, index) => (
                    <div
                        key={index}
                        className="p-4 mb-4 border rounded-md shadow-md bg-gray-50 hover:bg-mainBlue hover:text-white group transition-all duration-300"
                    >
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-semibold group-hover:text-white">{questionnaire.titulo}</h3>
                            <p className="text-gray-700 group-hover:text-white">{questionnaire.tema}</p>

                            <div className="border-b " />
                            <p className="text-gray-600 group-hover:text-white mt-2">{questionnaire.enunciado}</p>
                            <div className="border-b " />
                            <ul className="mt-2">
                                {questionnaire.alternativas?.map((alt, altIndex) => (
                                    <li
                                        key={altIndex}
                                        className="text-gray-600 group-hover:text-white"
                                    >
                                        {altIndex === questionnaire.correta ? (
                                            <strong>{alt}</strong>
                                        ) : (
                                            alt
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex gap-4 mt-4">
                           
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
                <Link href={`/simulados_adm/${simulados}`}>
                    <button className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 duration-150">
                        Voltar para  prova
                    </button>
                </Link>
            </div>

            {isQuestionModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-2/4 max-h-[80vh] overflow-y-auto">
                        <div className="bg-mainBlue text-white p-4 rounded-t-lg flex justify-between items-center">
                            <h2 className="text-xl font-bold">
                                {editingIndex !== null ? "Editar Questão" : "Criar Questão"}
                            </h2>
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
                                        className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:border-mainBlue"
                                        value={questaoTitulo}
                                        onChange={(e) => setQuestaoTitulo(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">Enunciado</label>
                                    <textarea
                                        className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:border-mainBlue"
                                        rows={4}
                                        value={enunciado}
                                        onChange={(e) => setEnunciado(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">Alternativas</label>
                                    {alternativas.map((alt, index) => (
                                        <div key={index} className="flex gap-2 items-center mb-4">
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded-md focus:outline-none focus:border-mainBlue"
                                                value={alt}
                                                onChange={(e) =>
                                                    handleAlternativeChange(index, e.target.value)
                                                }
                                            />
                                        </div>
                                    ))}
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
                                            className="hidden focus:outline-none focus:border-mainBlue"
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
                                        type="submit"
                                        className="bg-mainBlue text-white p-2 rounded-md w-full"
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
        </div>
    );
}
