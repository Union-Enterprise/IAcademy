import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface PremiumCardProps {
  onClose: () => void;
}

function PremiumCard({ onClose }: PremiumCardProps) {
    const [showCloseIcon, setShowCloseIcon] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCloseIcon(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20">
        <div className="relative bg-white rounded-lg w-screen max-w-3xl overflow-hidden">
            {showCloseIcon && (
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white focus:outline-none"
                >
                    <X className="w-6 h-6 text-gray-600 hover:text-red-600" />
                </button>
            )}

            <div className="absolute -top-28 -right-10">
                <svg
                    width="610"
                    height="538"
                    viewBox="0 0 610 538"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        d="M684.56 800.598L0.105616 643.602C0.105616 643.602 66.7846 442.279 377.588 321.801C688.391 201.323 755.07 -3.33241e-05 755.07 -3.33241e-05L684.56 800.598Z"
                        fill="#1865F2" />
                </svg>
            </div>

            <div className="absolute -top-20 -right-32">
                <svg
                    width="637"
                    height="538"
                    viewBox="0 0 637 538"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        d="M684.56 764.598L0.105616 607.602C0.105616 607.602 66.7846 406.279 377.588 285.801C688.391 165.323 755.07 -36 755.07 -36L684.56 764.598Z"
                        fill="#304FFE" />
                </svg>
            </div>

            <div className="relative rounded-t-lg p-6 z-10">
                <h2 className="text-3xl font-bold text-mainBlue">
                    TRANSFORME SEUS ESTUDOS COM O PLANO PREMIUM
                </h2>
            </div>
            <div className="relative p-6 z-10">
                <div className="text-gray-700">
                    <p>Como aluno premium, você não apenas recebe nosso melhor serviço,</p>
                    <p>mas também acesso exclusivo a benefícios que fazem toda a diferença</p>
                    <p>na sua experiência conosco.</p>
                </div>
                <ul className="text-gray-700 mt-4 space-y-2">
                    <li>&gt; Ganham módulos diários</li>
                    <li>&gt; Podem refazer quizzes sem limites</li>
                    <li>&gt; Mais perguntas à IA</li>
                </ul>
                <Link href="/premium">
                    <button
                        onClick={onClose}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        ASSINE O PLANO PREMIUM
                    </button>
                </Link>
            </div>
        </div>
    </div>
    );
}

export default PremiumCard;
