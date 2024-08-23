import { X } from "lucide-react";
import axios from "axios";
import Link from "next/link";

import { useRouter } from "next/navigation";


export default function SettingsRemove({
  closeView,
}: {
  closeView: () => void;
}) {
  const router = useRouter();
  const sendData = () => {
    axios
      .delete("http://localhost:5002/delete", { withCredentials: true })
      .then(function (response) {
        console.log(response.status);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

      router.push('/login')
  };

  return (
    <div className="bg-black bg-opacity-60 absolute m-auto w-full h-full top-0 left-0 z-20 flex items-center justify-center">
      <form
        className="w-[500px] p-6 gap-5 flex flex-col border-2 rounded-md bg-white relative pt-14 text-gray-800"
        onSubmit={(e) => {
          e.preventDefault();
          sendData();
        }}
      >
        <X
          className="cursor-pointer opacity-40 hover:text-red-600 hover:opacity-100 duration-200 w-[30px] h-[30px] absolute right-6 top-6"
          onClick={closeView}
        />
        <h2 className="text-lg font-semibold">Excluindo sua conta</h2>
        <p className="text-sm">
          Você pode excluir sua conta da Iacademy a qualquer momento. Porém, se
          mudar de ideia ou excluir acidentalmente, não será possível recuperar
          seus dados.
          <br /> <br />
          Ao excluir a conta você perderá seu progresso nas trilhas, planos
          assinados e demais recursos da plataforma.
          <br /> <br />
          Essa ação também não pausa a cobrança de compras não finalizadas.
          Assinaturas ativas não serão renovadas automaticamente após o final do
          período contratado. Porém, se o seu parcelamento estiver ativo, a
          cobrança será realizada até a última parcela. Só é feito reembolso
          para compras canceladas dentro do período de garantia.
          <br /> <br /> Se estiver com dúvidas
          <Link href="#">
            <span className="text-mainBlue opacity-80 hover:opacity-100 duration-100 ml-1">
              contate o suporte clicando aqui
            </span>
          </Link>
          .
        </p>
        <p className="text-sm">
          Agora, se você deseja apenas dar uma pausa, não é necessário excluir
          sua conta, basta não acessar a plataforma por um tempo.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <button
            type="button"
            className="bg-background-lightCard text-gray-600 px-4 py-2 rounded-md hover:bg-background-lightHover duration-100"
            onClick={closeView}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full bg-red-400 hover:bg-red-600 bg-opacity-90 px-8 py-3 rounded-md hover:bg-opacity-100 duration-100 *:text-white flex justify-center font-bold items-center gap-5"
          >
            <p>Continuar</p>
          </button>
        </div>
      </form>
    </div>
  );
}
