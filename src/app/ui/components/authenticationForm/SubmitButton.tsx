export default function SubmitButton({
  text = "acao_do_botao",
  children,
}: Readonly<{
  text: string;
  children?: React.ReactNode;
}>) {
  return (
    <button
      type="submit"
      className="w-full bg-mainBlue bg-opacity-90 p-[10px] rounded-md hover:bg-opacity-100 duration-100 *:text-white flex justify-center items-center gap-5"
    >
      {children}
      <p className="font-bold">{text}</p>
    </button>
  );
}
