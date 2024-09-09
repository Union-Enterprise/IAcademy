interface UserItemProps {
  id: string;
  name: string;
  categorie: string;
  plan: string;
  status: string;
  action: string;
}

export default function UserItem({ id, name, categorie, plan, status, action }: UserItemProps) {
  return (
    <tr className="text-left w-full *:py-4 flex items-center justify-between px-6">
        <th className="px-5">
        <input type="checkbox" />
        </th>
        <td className="w-full pl-3 text-text-lightSub">{id}</td>
        <td className="w-full pl-3 text-text-lightSub">{name}</td>
        <td className="w-full pl-3 text-text-lightSub">{categorie}</td>
        <td className="w-full pl-3 text-text-lightSub">{plan}</td>
        <td className="w-full pl-3 text-text-lightSub">{status}</td>
        <td className="w-full pl-3 text-text-lightSub">12312312312</td>
    </tr>
  );
}
