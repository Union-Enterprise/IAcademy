import Image from "next/image";

export default function Home() {
  return (
    <section className="bg-blueLoging w-3/5 h-[747px]">
      <div className="flex justify-center items-center pt-32">
        <Image 
          src=".\IAcademy Logo.svg"
          alt="Descrição da Imagem" 
          width={500} height={460.63}
        />
      </div> 
    </section>
  );
}
