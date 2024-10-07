import { Edit, Trash2 } from "lucide-react";

interface UserItemProps {
  id: string;
  name: string;
  category: string;
  plan: string;
  status: string;
  action: string;
}

export default function UserItem({ id, name, category, plan, status, action }: UserItemProps) {
  return (
    <tr className="text-left w-full *:py-4 flex items-center justify-between px-6">
      <th className="px-5">
        <input type="checkbox" />
      </th>
      <td className="w-full pl-3 text-text-lightSub">{id}</td>
      <td className="w-full pl-3 text-text-lightSub">{name}</td>
      <td className="w-full pl-3 text-text-lightSub">{category}</td>
      <td className="w-full pl-3 text-text-lightSub">{plan}</td>
      <td className="w-full pl-3 text-text-lightSub">{status}</td>
      <td className="w-full pl-3 text-text-lightSub flex items-center">
        12312312312
        <div className="flex gap-2 ml-3">
          <button className="bg-mainBlue text-white p-2 rounded hover:bg-blue-800 duration-150">
            <Edit className="w-4 h-4" />
          </button>
          <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 duration-150">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
