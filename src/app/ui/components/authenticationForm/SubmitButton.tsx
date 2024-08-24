import { LoaderCircle } from "lucide-react";

export default function SubmitButton({
  text = "acao_do_botao",
  loading = false,
  children,
}: {
  text: string;
  loading?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className={`w-full bg-mainBlue bg-opacity-90 h-[50px] rounded-md hover:bg-opacity-100 duration-100 text-white flex justify-center items-center gap-5 ${
        loading && "opacity-100 pointer-events-none"
      }`}
      disabled={loading}
    >
      {loading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          {children}
          <p className="font-bold">{text}</p>
        </>
      )}
    </button>
  );
}
