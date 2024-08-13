import { Trail } from "../../ui/components/ContentList";

export default function Trilhas() {
  return (
    <div className="mx-[200px] mt-[70px]">
      <div className="flex flex-col gap-5 mb-8">
        <h1 className="text-3xl font-bold text-title-light">
          Trilhas de Aprendizado
        </h1>
        <p className="max-w-3xl text-text-light">
          Bem-vindo às trilhas. Aqui você encontrará tudo que você precisa para
          aprender os mais diversos assuntos que caem nos vestibulares. Sinta-se
          à vontade para explorar todos eles.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-title-light">Matemática</h2>
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
