import { X } from "lucide-react";
import SubmitButton from "../authenticationForm/SubmitButton";

import axios from "axios";


export default function SettingsRemove({
  closeView,
}: {
  closeView: () => void;
}) {

  const sendData = () => {
    axios
      .delete(
        "http://localhost:5002/delete",
        { withCredentials: true }
      )
      .then(function (response) {
        console.log(response.status); // cod da requisição
        console.log(response.data); // mensagem de sucesso / erro (e.g email ou senha incorreto)
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="bg-black bg-opacity-60 absolute m-auto w-full h-full top-0 left-0 z-20 flex items-center justify-center">
      <form className="w-[500px] p-6 gap-5 flex flex-col border-2 rounded-md bg-white relative pt-14 text-gray-800"
      
          onSubmit={(e) => {
          e.preventDefault();
          sendData();
        }}>
        <X
          className="cursor-pointer opacity-40 hover:text-red-600 hover:opacity-100 duration-200 w-[30px] h-[30px] absolute right-6 top-6"
          onClick={closeView}
        />
        <h2 className="text-lg font-semibold">Excluir sua conta</h2>
        <p className="text-sm">
          Você pode excluir sua conta da Iacademy a qualquer momento. Porém, se mudar de ideia ou excluir acidentalmente, não será possível recuperar seus dados.
        </p>
        <p className="text-sm">
          Ao excluir a conta você perderá seu progresso nas trilhas, registro de ofensivas e demais informações.
        </p>
        <p className="text-sm">
          Essa ação também não pausa a cobrança de compras não quitadas. Assinaturas ativas não serão renovadas automaticamente após o final do período contratado. Porém, se o seu parcelamento estiver ativo, a cobrança será realizada até a última parcela. Só é feito reembolso para compras canceladas dentro do período de garantia. Se estiver com dúvidas, <a href="#" className="text-blue-600">fale com o suporte</a>.
        </p>
        <p className="text-sm">
          Agora, se você deseja apenas dar uma pausa, não é necessário excluir sua conta, basta não acessar a plataforma por um tempo.
        </p>
        <div className="flex justify-end gap-4 mt-5">
          <button
            type="button"
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300"
            onClick={closeView}
          >
            Cancelar
          </button>
          <SubmitButton text="Continuar" />
        </div>
      </form>
    </div>
  );
}
