import { Trail } from "../../ui/components/ContentList";

export default function Trilhas() {
  return (
    <div className="px-[200px] pt-[40px] pb-[140px]">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Trilhas de Aprendizado</h1>
        <p className="max-w-3xl">
          Bem-vindo às trilhas. Aqui você encontrará tudo que você precisa para
          aprender os mais diversos assuntos que caem nos vestibulares. Sinta-se
          à vontade para explorar todos eles.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Matemática</h2>
        <div className="grid grid-cols-2 gap-5 grid-rows">
          <Trail
            href="/trilhas/general"
            description="Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel  "
          />
          <Trail description="Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel  " />
          <Trail description="Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel  " />
          <Trail description="Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel Lorel lorel  " />
        </div>
      </section>
    </div>
  );
}
