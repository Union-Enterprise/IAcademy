import Link from "next/link";
import Generic from "@/app/ui/components/flows/Generic";

export default function Overview({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="grid grid-cols-3 py-10 gap-10 px-[200px] relative h-full mt-6">
      <div className="col-span-2">
        <Generic />
      </div>
      <div className="col-span-1 flex flex-col gap-2 sticky top-5">
        <h3 className="font-semibold text-xl">Conteúdos desta trilha</h3>
        <ContentLink title="Módulo 1: Estatística" />
        <ContentLink title="Quiz: Estatísticas" />
        <ContentLink title="Módulo 2: Geometria" />
        <ContentLink title="Módulo 3: Medidas e Trigonometria" />
        <ContentLink title="Módulo 4: Probabilidade" />
        <ContentLink title="Módulo 5: Álgebra 1" />
        <ContentLink title="Módulo 6: Álgebra 2" />
        <ContentLink title="Avaliação Final: Matemática Ensino Médio" />
      </div>
    </section>
  );
}

function ContentLink({ title = "" }) {
  return (
    <Link
      href="#"
      className="border-[1px] border-borders-lightA p-4 rounded-md border-opacity-35 hover:border-opacity-100 duration-100"
    >
      <p>{title}</p>
    </Link>
  );
}

function StickyCard({
  isPremium = false,
  title = "",
  children,
  action = "",
}: {
  isPremium?: boolean;
  title: string;
  children: React.ReactNode;
  action: string;
}) {
  return (
    <div
      className={`${
        isPremium
          ? "bg-mainBlue"
          : "bg-bg-lightCard border-2 border-border-light"
      } p-6 rounded-md shadow-sm`}
    >
      <h2
        className={`${
          isPremium ? "text-white" : "text-title-light"
        } text-xl font-bold mb-4`}
      >
        {title}
      </h2>
      {children}
      {isPremium ? (
        <Link
          href={"/premium"}
          className="w-full flex items-center justify-center bg-white text-mainBlue py-2 rounded-md hover:bg-mainBlue border-2 hover:border-white border-transparent duration-100 hover:text-white"
        >
          {action}
        </Link>
      ) : (
        <button className="w-full flex items-center justify-center bg-mainBlue opacity-80 hover:opacity-100 duration-100 text-white py-2 rounded-md">
          {action}
        </button>
      )}
    </div>
  );
}
