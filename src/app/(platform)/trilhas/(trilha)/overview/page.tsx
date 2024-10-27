"use client";

import Link from "next/link";
import Generic from "@/app/ui/components/flows/Generic";
import { MessageCircleQuestion } from "lucide-react";
import { usePathname } from "next/navigation";
import TrilhaMenu from "@/app/ui/components/trilhas/TrilhaMenu";

export default function Overview({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <section className="mb-10 mt-5 px-[200px] relative flex flex-col items-center gap-5">
      <div className="bg-bg-light border-2 border-borders-light p-3 px-5 rounded-md flex justify-between gap-5 w-[800px] *:text-sm">
        <div className="flex items-center gap-2">
          <span className="bg-yellow-200 px-2 py-1 rounded-md">
            0% concluído
          </span>
          <p>0 de 200 concluídos</p>
        </div>
        <button className="*:text-text-lightSub *:text-sm flex items-center gap-2 *:opacity-50 *:duration-100 group cursor-pointer">
          <MessageCircleQuestion className="group-hover:opacity-100" />
          <p className="group-hover:opacity-100">
            Como rastrear meu progresso?
          </p>
        </button>
      </div>
      <Generic />
    </section>
  );
}
