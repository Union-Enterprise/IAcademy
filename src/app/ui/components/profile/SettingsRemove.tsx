import { X } from "lucide-react";
import axios from "axios";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { useState } from "react";

export default function SettingsRemove({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const router = useRouter();
  const { user } = useUser();
  const [confirmPage, setConfirmPage] = useState(false);

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

    router.push("/login");
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();

        if (user.is_premium && !confirmPage) {
          setConfirmPage(true);
          return;
        }

        sendData();
      }}
    >
      {confirmPage ? (
        <>
          <p>
            Notamos que você possui uma assinatura do plano Premium. Tem certeza
            que deseja excluir a sua conta? Ao confirmar você perderá total
            acesso aos recursos do plano e cobranças feitas antes da exclusão da
            conta se manterão ativas.
          </p>
          <button
            type="submit"
            className="w-full bg-red-400 hover:bg-red-600 bg-opacity-90 px-8 py-3 rounded-md hover:bg-opacity-100 duration-100 *:text-white flex justify-center font-bold items-center gap-5"
          >
            <p>Excluir minha conta</p>
          </button>
        </>
      ) : (
        <>
          <p className="text-sm">
            Você pode excluir sua conta da Iacademy a qualquer momento. Porém,
            se mudar de ideia ou excluir acidentalmente, não será possível
            recuperar seus dados.
            <br /> <br />
            Ao excluir a conta você perderá seu progresso nas trilhas, planos
            assinados e demais recursos da plataforma.
            <br /> <br />
            Essa ação também não pausa a cobrança de compras não finalizadas.
            Assinaturas ativas não serão renovadas automaticamente após o final
            do período contratado. Porém, se o seu parcelamento estiver ativo, a
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
              className="bg-bg-lightC text-gray-600 px-4 py-2 rounded-md hover:bg-zinc-200 duration-100"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full bg-red-400 hover:bg-red-600 bg-opacity-90 px-8 py-3 rounded-md hover:bg-opacity-100 duration-100 *:text-white flex justify-center font-bold items-center gap-5"
            >
              <p>{user.is_premium ? "Continuar" : "Excluir"}</p>
            </button>
          </div>
        </>
      )}
    </form>
  );
}
