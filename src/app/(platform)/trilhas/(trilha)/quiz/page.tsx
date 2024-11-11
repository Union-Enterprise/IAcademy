"use client";
import React from 'react';

export default function Quizzes() {
    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 mt-10 text-center text-gray-800">Análise de Dados em um Estudo de Saúde Pública</h1>
            <p className="mb-6 text-gray-700 leading-relaxed text-lg">
                Um estudo foi realizado para avaliar o impacto da atividade física na saúde cardiovascular de adultos. Para isso, foram coletados dados de 200 participantes, incluindo a frequência semanal de exercícios e a pressão arterial sistólica.
                Os resultados mostraram que os participantes que se exercitavam mais de 5 horas por semana tinham, em média, uma pressão arterial mais baixa do que aqueles que se exercitavam menos de 2 horas por semana.
            </p>
            <p className="pb-4 text-gray-700 font-medium">
                Com base nos resultados do estudo, qual afirmação a seguir melhor descreve a relação entre a atividade física e a saúde cardiovascular?
            </p>

            <img 
                src="/graficoEstatistica.png" 
                alt="Estatística"
                className="mb-10 mx-auto rounded shadow-lg"
                width={500}
            />

            <form className="flex flex-col gap-y-8 mb-10">
                <div className="flex flex-col gap-4">
                    {[
                        "A prática de atividade física regular pode estar associada a uma pressão arterial mais baixa.",
                        "Não existe qualquer relação entre atividade física e pressão arterial.",
                        "A pressão arterial aumenta quanto mais horas de atividade física são realizadas.",
                        "Apenas atividades físicas intensas afetam a pressão arterial, não atividades leves."
                    ].map((option, index) => (
                        <label 
                            key={index} 
                            className="flex items-center gap-4 p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:border-mainBlue transition duration-200 cursor-pointer bg-white"
                        >
                            <input 
                                type="radio" 
                                name="questionA" 
                                value={option} 
                                className="form-radio text-mainBlue focus:ring-mainBlue focus:ring-2 checked:scale-125"
                            />
                            <span className="text-gray-700 font-medium">{option}</span>
                        </label>
                    ))}
                </div>
            </form>

            <div className="flex justify-end">
                <button 
                    className="w-52 bg-mainBlue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md"
                   
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}
