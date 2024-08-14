import React from 'react';
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import Link from 'next/link';
import { ChevronRight, CreditCard, Barcode, HandCoins, SmartphoneNfc, UserRound, BaggageClaim} from 'lucide-react';

export default function CheckoutForm() {
  return (
    <div className='flex justify-center  mt-10 '>
        <div className="max-w-xl p-6 rounded-lg shadow-xl text-zinc-600 ml-20">
        <div className="mb-4">
          <div className="shadow-lg p-4 rounded-lg flex justify-between items-center border-mainBlue border-b-2 ">
            <h2 className="text-lg font-bold">Meus itens</h2>
            <Link href={'/premium'} >
              <button className="text-mainBlue text-sm">Alterar</button>
            </Link>
          </div>
        </div>
        <div className="mb-4">
          <div className="shadow-lg p-4 rounded-lg ">
              <div className='flex  items-center '>
                <UserRound className='text-mainBlue'/><h2 className="text-lg font-bold ml-2">Meus dados</h2>
              </div>
            <p className="text-gray-600 text-sm mt-2">
              Confirme seus dados. Eles aparecerão em sua nota fiscal.
            </p>

            <div className="mt-4 space-y-4">
            
              <div>
                <label className="block text-sm font-medium ">Dados pessoais</label>
                <div className="mt-1 flex space-x-4">
                  <input
                    type="text"
                    placeholder="Seu Nome"
                    className="w-full p-2 border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100 "
                  />
                </div>
                <div className="mt-2 flex space-x-4">
                  <input
                    type="text"
                    placeholder="CPF"
                    className="w-1/2 p-2 border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                  />
                  <input
                    type="text"
                    placeholder="Telefone"
                    className="w-1/2 p-2 border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                  />
                </div>
              </div>

            
              <div>
                <label className="block text-sm font-medium text-gray-400">Endereço</label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="CEP"
                    className="w-full p-2 border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Rua"
                    className="w-full p-2 border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                  />
                </div>
                <div className="mt-2 flex space-x-4">
                  <input
                    type="text"
                    placeholder="Número"
                    className="w-1/2 p-2 border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                  />
                  <input
                    type="text"
                    placeholder="Complemento"
                    className="w-1/2 p-2 border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                  />
                </div>
                
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Bairro"
                    className="w-full p-2 border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                  />
                </div>
                <div className="mt-2 flex space-x-4">
                  <input
                    type="text"
                    placeholder="Cidade"
                    className="w-1/2 p-2 border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                  />
                  <input
                    type="text"
                    placeholder="Estado"
                    className="w-1/2 p-2 border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              <Link href={'/premium/pagamentPremium'}>
                <SubmitButton text="Avançar" />
              </Link>
            </div>
          </div>
        </div>

        
        <div>
          <div className="shadow-lg p-4 rounded-lg border-mainBlue border-b-2 ">
          <     div className='flex  items-center '>
                  <CreditCard className='text-mainBlue'/><h2 className="text-lg font-bold ml-2">Informações de pagamento</h2>
              </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}
