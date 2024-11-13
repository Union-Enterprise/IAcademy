import { Edit, Ban, RotateCcw } from "lucide-react";
import { useState } from "react";

interface UserItemProps {
  id: string;
  name: string;
  category: string;
  plan: string;
  status: string;
  email: string;
  onEdit: (email: string, updatedData: { name: string; category: string; plan: string; }) => void;
  onDelete: (email: string) => void;
  onUnban: (email: string) => void;
}

export default function UserItem({
  id,
  name,
  category,
  plan,
  status,
  email,
  onEdit,
  onDelete,
  onUnban
}: UserItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pendingDeleteEmail, setPendingDeleteEmail] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [editedName, setEditedName] = useState(name); 
  const [editedEmail, setEditedEmail] = useState(email); 
  const [editedCategory, setEditedCategory] = useState(category);  
  const [editedPlan, setEditedPlan] = useState(plan); 

 
  const categories = ["Adm", "Usuario"];
  const plans = ["Selecione  um plano", "premium", "básico"];

  const handleDeleteClick = (email: string) => {
    setPendingDeleteEmail(email);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (pendingDeleteEmail) {
      await onDelete(pendingDeleteEmail);
      setIsDeleteModalOpen(false);
      setPendingDeleteEmail(null);
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);  
  };

  const confirmEdit = () => {
   
    onEdit(editedEmail, { name: editedName, category: editedCategory, plan: editedPlan });
    setIsEditModalOpen(false);
  };

  return (
    <>
      <tr className="text-left w-full *:py-4 flex items-center justify-between px-6">
        <th className="px-5 ">
          <input type="checkbox" />
        </th>
        <td className="w-full pl-3 text-text-lightSub">{id}</td>
        <td className="w-full pl-3 text-text-lightSub">{name}</td>
        <td className="w-full pl-3 text-text-lightSub">{category}</td>
        <td className="w-full pl-3 text-text-lightSub">{plan}</td>
        <td className="w-full pl-3 text-text-lightSub">{status}</td>
        <td className="w-full pl-3 text-text-lightSub flex items-center">
          <div className="flex gap-2 ml-3">
            <button
              className="bg-mainBlue text-white p-2 rounded hover:bg-blue-800 duration-150"
              onClick={handleEditClick}  // Open the Edit modal when clicked
            >
              <Edit className="w-4 h-4" />
            </button>
            {status !== "Suspenso" ? (
              <button
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 duration-150"
                onClick={() => handleDeleteClick(email)}
              >
                <Ban className="w-4 h-4" />
              </button>
            ) : (
              <button
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 duration-150"
                onClick={() => onUnban(email)}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>
            <form className="flex flex-col gap-5">
              <label htmlFor="name" className="font-semibold">Nome</label>
              <input
                id="name"
                type="text"
                className="border-2 border-border-light p-2 rounded"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />

              <label htmlFor="category" className="font-semibold">Categoria</label>
              <select
                id="category"
                className="border-2 border-border-light p-2 rounded"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <label htmlFor="plan" className="font-semibold">Plano</label>
              <select
                id="plan"
                className="border-2 border-border-light p-2 rounded"
                value={editedPlan}
                onChange={(e) => setEditedPlan(e.target.value)}
              >
                {plans.map((pl, index) => (
                  <option key={index} value={pl}>
                    {pl}
                  </option>
                ))}
              </select>
            </form>
            <div className="mt-4 flex justify-end">
              <button
                onClick={confirmEdit}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 duration-150"
              >
                Confirmar
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}  // Close the modal
                className="ml-4 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 duration-150"
              >
                Cancelar
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
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 duration-150"
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setPendingDeleteEmail(null);
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
