import FilterSection from "../ui/components/FilterSection";
import ContentList from "../ui/components/ContentList";

export default function Home() {
  return (
    <div className="px-[200px] pt-[40px] pb-[140px]">
      <div>
        <h1 className="text-3xl font-bold">Página Inicial</h1>
        <p className="text-base mb-5">
          Navegue por nosso catálogo de conteúdos e se prepare para os mais
          diversos Vestibulares.
        </p>
      </div>
      <div className="flex justify-between gap-[40px]">
        <div className="flex flex-col gap-[40px] w-full">
          <div className="flex bg-mainBlue gap-10 justify-center items-center *:text-white p-[60px] rounded-xl">
            <div>
              <h2 className="text-2xl font-bold">
                Aprenda Matemática do jeito mais simples.
              </h2>
              <p className="">
                Com nossa trilha de matemática você aprende no seu tempo e do
                seu jeito.
              </p>
            </div>
            <button className="bg-white rounded-md px-10 hover:border-white border-2 border-transparent hover:bg-transparent duration-200 py-[10px] group">
              <p className="text-lg text-mainBlue duration-200 group-hover:text-white font-semi">
                Conhecer
              </p>
            </button>
          </div>
          <ContentList title="Assuntos em destaque" />
          <ContentList title="Tópicos" />
          <ContentList title="Tópicos" />
          <ContentList title="Tópicos" />
        </div>
        <FilterSection />
      </div>
    </div>
  );
}
