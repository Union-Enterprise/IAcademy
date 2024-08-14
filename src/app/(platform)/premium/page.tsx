import React from 'react';
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import Link from 'next/link';
import { ChevronRight, CreditCard, Barcode, HandCoins, SmartphoneNfc, UserRound, BaggageClaim} from 'lucide-react';


export default function CheckoutPage() {
  return (
    <div className="flex justify-start ml-20 mt-10">
      <div className="max-w-xl p-6 rounded-lg shadow-xl">
      
        <div className="mb-8">
          <img src="/blueLogo.svg" alt="Logo" className="h-30 w-28" />
          <div className="p-4 rounded-lg mt-4 text-left">
            <div className="flex">
              <div className="ml-4">
                <h3 className="text-lg font-semibold">
                  IAcademy - Assinatura única anual
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Acesso total à plataforma com todas as Ias que a 
                  Iacademy pode oferecer para evolui seu conhecimento.
                </p>
                <ul className="text-gray-600 text-sm list-disc pl-5 mt-2">
                  <li>Quizzes ilimitados</li>
                  <li>chats com a IA ilimitados</li>
                 
                </ul>
              </div>
            </div>
            <div className="mt-4 text-right">
              <p className="text-sm text-gray-400">
                até 12x <span className="font-bold text-white">R$ 166,42</span> ou <span className="font-bold text-white">R$ 1.987,00</span> à vista
              </p>
              <div className='mt-5'>
                <Link href={'/premium/informationPremium'}>
                  <SubmitButton text='Avançar'/>
                </Link>
              </div>
            </div>
          </div>
        </div>

    

    
        <div className="mb-4">
          <div className="shadow-lg p-4 rounded-lg">
          <div className='flex  items-center '>
                <UserRound className='text-mainBlue'/><h2 className="text-lg font-bold ml-2">Meus dados</h2>
            </div>
          </div>
        </div>

      
        <div>
          <div className="shadow-lg p-4 rounded-lg">
             <div className='flex  items-center '>
                <CreditCard className='text-mainBlue'/><h2 className="text-lg font-bold ml-2">Informações de pagamento</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
