import { CirclePlus, Upload } from "lucide-react";

export default function ExportButton() {
  return (
    <button
      type="submit"
      className="h-10 py-2 border-border-lightA border-2 px-4 rounded-lg hover:bg-background-lightHover hover:text-text-light duration-100 *:text-text-lightSub flex items-center gap-2"
    >
      <Upload size={20} />
      <p className="font-semibold text-sm">Exportar</p>
    </button>
  );
}

export function AddButton() {
  return (
    <button
      type="submit"
      className="h-10 py-2 bg-mainBlue *:text-white px-4 rounded-lg hover:bg-blue-700 duration-100 flex items-center gap-2"
    >
      <CirclePlus size={20} />
      <p className="font-semibold text-sm">Adicionar</p>
    </button>
  );
}
