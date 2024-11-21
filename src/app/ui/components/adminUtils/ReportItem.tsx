import { Mail, Check, MessageSquareDot } from "lucide-react";
import { useState } from "react";

interface ReportItemProps {
  id: string;
  sender: string;
  topic: string;
  complaint: string;
  solved: string;
  message: string;
  reportId: string;
  onSolve: (id: string) => void;
  onUnsolve: (id: string) => void;
}

export default function UserItem({
  id,
  sender,
  topic,
  complaint,
  solved,
  message,
  reportId,
  onSolve,
  onUnsolve,
  
}: ReportItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const types = ["Mensagem", "Problema"];
  const [msgTipo, setMsgTipo] = useState("");
 

  const handleSolve = () => {
    setIsDeleteModalOpen(true);
  };

  const handleView = () => {
    if(complaint=="Outro"){
        setMsgTipo(types[0]);
    }else{
        setMsgTipo(types[1]);
    }
    setIsEditModalOpen(true);
  };

  return (
    <>
      <tr className="text-left w-full *:py-4 flex items-center justify-between px-6">
        <th className="px-5 ">
          <input type="checkbox" />
        </th>
        <td className="w-full pl-3 text-text-lightSub">{id}</td>
        <td className="w-full pl-3 text-text-lightSub">{sender}</td>
        <td className="w-full pl-3 text-text-lightSub">{complaint}</td>
        <td className="w-full pl-3 text-text-lightSub">{topic}</td>
        <td className="w-full pl-3 text-text-lightSub">{solved}</td>
        <td className="w-full pl-3 text-text-lightSub flex items-center">
          <div className="flex gap-2 ml-3">
            <button
              className="bg-mainBlue text-white p-2 rounded hover:bg-blue-800 duration-150"
              onClick={() => handleView()}
            >
              <Mail className="w-4 h-4" />
            </button>
            {solved !== "Em análise" ? (
              <button
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 duration-150"
                onClick={() => onUnsolve(reportId)}
              >
                <MessageSquareDot className="w-4 h-4" />
              </button>
            ) : (
              <button
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 duration-150"
                onClick={() => onSolve(reportId)}
              >
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">{msgTipo} - {sender}</h2>
            {solved !== "Em análise" ? (
              <h5 className=" text-green-500">
                Resolvido
              </h5>
            ) : (
              <h5 className=" text-yellow-500">
                Em análise
              </h5>
            )}
            <h4 className="pt-6 text-xl">{message}</h4>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}  // Close the modal
                className="ml-4 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 duration-150"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Confirmar Suspensão</h2>
            <p>Você tem certeza de que deseja suspender este usuário?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 duration-150"
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                }}
                className="ml-4 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 duration-150"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}