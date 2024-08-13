import Link from "next/link";

export default function TrilhaContent({ title = "" }) {
  return (
    <section className="flex flex-col ">
      <div className="flex justify-between items-center"></div>
      <div className="mb-1  ">
        <Link href={"./contentIA"}>
          <Item
            title="Geometria"
            text="Este módulo oferece uma imersão nos fundamentos da programação em Go,
            preparando você para o projeto prático Guessing Game. Abordamos desde as razões para escolher Go até a criação do seu primeiro programa,
            proporcionando uma compreensão detalhada da linguagem. Este módulo é essencial para estabelecer uma base sólida em Go e desenvolver projetos robustos com confiança."
          />
        </Link>
        <div className="mt-3">
          <Item
            title="Seno, Cosseno e Tangente"
            text="Nos módulos de Fundamentos,
            vamos explorar as bases essenciais do universo C#.
            Vamos entender e conhecer a história dessa linguagem de programação;
            as diferentes versões de IDEs disponíveis para nós desenvolvedores utilizarmos,
            e claro, exploraremos a sintaxe e faremos nosso primeiro Hello World."
          />
        </div>
        <div className="mt-3">
          <Item
            title="Angulos"
            text="Neste módulo prático, iremos criar a primeira API usando. 
          NET Core: Desde a configuração do ambiente de desenvolvimento até a implementação de operações CRUD.
          Ao final do módulo, teremos uma compreensão prática e sólida de como criar APIs funcionais e escaláveis, 
          prontas para serem integradas em seus projetos."
          />
        </div>
        <div className="mt-3">
          <Item
            title="Angulos"
            text="Neste módulo, o objetivo é demonstrar que o projeto deve ser organizado em camadas distintas.
           O projeto de API deve ser responsável exclusivamente por receber as requisições e fornecer as respostas correspondentes."
          />
        </div>
      </div>
    </section>
  );
}

function Item({ title = "", text = "" }) {
  return (
    <div className="flex flex-col  justify-between p-5 rounded-md w-full h-[200px] border-whiteBorder border-2  hover:border-mainBlue">
      <div>
        <h6 className="font-bold text-lg text-whiteText mb-1">{title}</h6>
        <p className="text-sm text-[rgba(0,0,0,0.57)]">{text}</p>
      </div>
    </div>
  );
}

export function Trail({ description = "", href = "" }) {
  return (
    <Link
      href={href}
      className="hover:border-mainBlue flex flex-col justify-between p-5 rounded-md w-full min-h-[250px] duration-100 border-whiteBorder border-2 gap-4"
    >
      <div>
        <h6 className="font-bold text-lg text-whiteText">Geometria</h6>
        <p className="text-sm text-[rgba(0,0,0,0.4)]">
          00/00 tópicos estudados
        </p>
      </div>
      <p className="text-sm leading-6 justify-items-end flex">{description}</p>
      <div className="flex gap-2 *:text-sm overflow-hidden">
        <Tag name="Intermediário" />
        <Tag name="Geometria" />
        <Tag name="Matemática" />
      </div>
    </Link>
  );
}

export function Tag({ name = "" }) {
  return (
    <div className="flex justify-center items-center rounded-md px-[15px] border-whiteBorder border-2">
      <p className="whitespace-nowrap">{name}</p>
    </div>
  );
}
