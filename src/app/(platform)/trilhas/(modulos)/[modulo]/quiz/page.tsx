"use client";
import FormInputGroup from '@/app/ui/components/trilhas/FormInputGroup';
import React from 'react';

export default function Quizzes() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 mt-10"> Análise de Dados em um Estudo de Saúde Pública</h1>
            <p className="mb-6">
            

Um estudo foi realizado para avaliar o impacto da atividade física na saúde cardiovascular de adultos. Para isso, foram coletados dados de 200 participantes, incluindo a frequência semanal de exercícios (em horas) e a pressão arterial sistólica (em mmHg).

Os resultados mostraram que, em média, os participantes que se exercitavam mais de 5 horas por semana apresentavam uma pressão arterial média de 120 mmHg, enquanto aqueles que se exercitavam menos de 2 horas por semana tinham uma pressão arterial média de 135 mmHg.


          </p>
          <p className='pb-2'>a) Calcule a diferença média na pressão arterial entre os dois grupos de atividade física. </p>
         <p className='pb-52'>b) Discuta o que essa diferença pode indicar sobre a relação entre a atividade física e a saúde cardiovascular. Quais outras variáveis poderiam ser consideradas para uma análise mais completa? 
          </p>
            <img 

                src="/vercel.svg" 
                alt="Estatística" 
                className="mb-32 mx-auto"
                width={500}
            />
           <form className="flex flex-col gap-y-16 mb-10">
          <div className="flex justify-between gap-10 *:w-full ">
            <FormInputGroup label="Responder" />
        </div>
            
            </form>
            <div className='flex justify-end'>
                <button 
                    className="w-52 bg-mainBlue text-white py-2 rounded hover:bg-blue-700 "
                    onClick={() => alert('Resposta enviada!')}
                >
                    Enviar
                </button>
            </div>
           
        </div>
    );
}
