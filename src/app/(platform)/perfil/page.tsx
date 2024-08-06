import Link from "next/link";
import { UserRound, BadgeCheck, KeyRound, Mail, LockKeyhole, UsersRound, User} from 'lucide-react';
import Image from "next/image";


export default function profile() {
    return (
      
        <div className="max-h-screen  p-2">
            <div className="max-w-4xl mx-auto  rounded-lg p-6">
              <div className="flex gap-5 items-center">
                <Image
                  src="./blueIcon.svg"
                  alt="Descrição da Imagem"
                  width={60}
                  height={60}
                  className="border-whiteBorder border-2 rounded-full"
                />
                  <h1 className="text-2xl font-semibold mb-1">Minha conta</h1>
              </div>
              <p className="text-lg font-semibold mb-6 text-zinc-500">Gerencie as informações da sua conta, dados pessoais e assinaturas</p>
          
              <div className="border p-4 rounded-lg mb-6">
              <div className="flex gap-1 items-center">
                <BadgeCheck/>
                <h2 className="text-lg font-medium">iAcademy Premium</h2>
              </div>
                <p className="text-gray-600">Você ainda não possui nenhuma ativa. <a href="/premium" className="text-blue-500">Clique aqui</a> para conhecer as opções.</p>
              </div>

              <div className="border p-4 rounded-lg mb-6">
                <div className="flex gap-1 items-center mb-2">
                  <KeyRound className="w-5"/>
                  <h2 className="text-lg font-medium">Dados de Acesso</h2>
                </div>
                <div className="flex gap-1 items-center mb-2">
                  <Mail className="w-5"/>
                  <p className="text-gray-600">iacademy.silva@gmail.com</p>
                </div>
                <div className="flex gap-1 items-center mb-1">
                  <LockKeyhole className="w-5"/>
                  <p className="text-gray-600">**************</p>
                </div>
                <a href="#" className="text-blue-500">Alterar</a>
              </div>

              <div className="border p-3 rounded-lg mb-6">
                  <div className="flex gap-1 items-center mb-3">
                    <UserRound/>
                    <h2 className="text-lg font-medium">Dados Pessoais</h2>
                  </div>
                  <div className="flex gap-1 items-center mb-2">
                    <User/>
                    <p className="text-gray-600">Iacademy</p>
                  </div>
                <a href="#" className="text-blue-500">Alterar</a>
            </div>
              <div className=" border p-3 rounded-lg mb-6">
                <h2 className="text-lg font-medium">Editar foto de perfil</h2>
                <a href="#" className="text-blue-500">Alterar</a>
              </div>
              <div className="border-t pt-3">
                <h2 className="text-lg font-medium text-red-600">Excluir conta</h2>
                <p className="text-gray-600">Ao excluir sua conta, todos os seus dados relacionados a você serão deletados e não será possível restaurá-los.</p>
                <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded">Excluir minha conta</button>
              </div>
          </div>
      </div>

    )
  }