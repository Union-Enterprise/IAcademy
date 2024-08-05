import Image from "next/image";

export default function Login() {
  return (
    <section className="bg-mainBlue w-3/5 h-[747px]">
      <div className="flex justify-center items-center pt-32">
        <Image
          src=".\whiteIcon.svg"
          alt="Descrição da Imagem"
          width={500}
          height={460.63}
        />
      </div>
    </section>
  );
}
