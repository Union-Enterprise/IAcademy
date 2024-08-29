import { LoaderCircle } from "lucide-react";

export default function SubmitButton({
  text = "acao_do_botao",
  loading = false,
  classname,
  isDisabled = false,
  children,
}: {
  text: string;
  loading?: boolean;
  classname?: string;
  children?: React.ReactNode;
  isDisabled?: boolean;
}) {
  return (
    <button
      type="submit"
      className={`
        
        ${isDisabled && "pointer-events-none opacity-60"}
        ${
          classname || "w-full"
        }  px-8 bg-mainBlue bg-opacity-90 h-[50px] rounded-md hover:bg-opacity-100 duration-100 text-white flex justify-center items-center gap-5 ${
        loading && "opacity-100 pointer-events-none"
      }`}
      disabled={loading || isDisabled}
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
