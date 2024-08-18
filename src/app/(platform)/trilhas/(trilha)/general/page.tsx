import { Home } from "lucide-react";

export default function TrilhaGeneral() {
  return (
    <>
      <div className="">
        <div className="border-[1px] border-border-lightB shadow-md rounded-md *:px-8 *:py-5">
          <h3 className="text-title-light border-b-[1px] border-border-lightB text-xl font-bold">
            Detalhes da Trilha
          </h3>
          <div className="bg-blue-200 grid grid-cols-2">
            <DetailItem />
          </div>
        </div>
      </div>
    </>
  );
}

function DetailItem() {
  return (
    <div className="flex gap-5 col-span-1">
      <Home size={32} />
      <div>
        <p className="text-xs text-text-lightSub">Nível de aprendizado</p>
        <h4 className="text-sm text-text-light font-semibold">Intermediário</h4>
      </div>
    </div>
  );
}
