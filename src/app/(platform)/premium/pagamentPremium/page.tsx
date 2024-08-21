import React from 'react';
import { ChevronRight, CreditCard, Barcode, HandCoins, SmartphoneNfc, UserRound, BaggageClaim } from 'lucide-react';
import Link from 'next/link';

export default function PaymentInformation() {
  return (
    <div className='flex justify-center  mt-10 '>
      <div className="max-w-xl p-6 rounded-lg shadow-xl text-zinc-600 mt-10 ml-20">
        <div className="mb-4 border-mainBlue border-b-2">
          <div className="shadow-lg p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center">
              <BaggageClaim className='text-mainBlue' />
              <h2 className="text-lg font-bold ml-2">Meus itens</h2>
            </div>
            <Link href={'/premium'}>
              <button className="text-mainBlue text-sm">Alterar</button>
            </Link>
          </div>
        </div>
        <div className="mb-4 border-mainBlue border-b-2">
          <div className="shadow-lg p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center">
              <UserRound className='text-mainBlue' />
              <h2 className="text-lg font-bold ml-2">Meus dados</h2>
            </div>
            <Link href={'/premium/informationPremium'}>
              <button className="text-mainBlue text-sm">Alterar</button>
            </Link>
          </div>
        </div>
        <div className="shadow-lg p-4 rounded-lg">
          <div className="flex items-center">
            <CreditCard className='text-mainBlue' />
            <h2 className="text-lg font-bold ml-2">Informações de pagamento</h2>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Compra nacional</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border-2 hover:border-mainBlue transition-200">
                  <CreditCard className='text-mainBlue' />
                  <span>Cartão de Crédito</span>
                  <div className="flex items-center">
                    <span className="text-gray-400 text-sm">Parcele em até 12x</span>
                    <ChevronRight className="text-mainBlue ml-2" />
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border-2 hover:border-mainBlue transition-200">
                  <Barcode className='text-mainBlue' />
                  <span>Boleto</span>
                  <div className="flex items-center">
                    <span className="text-gray-400 text-sm">10% OFF - Pague o valor à vista</span>
                    <ChevronRight className="text-mainBlue ml-2" />
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border-2 hover:border-mainBlue transition-200">
                  <HandCoins className='text-mainBlue' />
                  <span>Pix</span>
                  <div className="flex items-center">
                    <span className="text-gray-400 text-sm">10% OFF - Pague e libere o curso no mesmo dia</span>
                    <ChevronRight className="text-mainBlue ml-2" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Compra internacional</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border-2 hover:border-mainBlue transition-200">
                  <SmartphoneNfc className='text-mainBlue mr-5' />
                  <span>PayPal</span>
                  <div className="flex items-center">
                    <span className="text-gray-600 ml-5 text-sm">Compre pelo PayPal entrando em contato com nosso time comercial</span>
                    <ChevronRight className="text-mainBlue ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">Suas informações estão seguras</p>
          </div>
        </div>
      </div>
    </div>
    
  );
}
