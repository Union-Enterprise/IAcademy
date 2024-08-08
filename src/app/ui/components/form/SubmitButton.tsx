export default function SubmitButton({ text = "Enviar" }) {
  return (
    <button
      type="submit"
      className="w-full bg-mainBlue bg-opacity-90 p-[10px] rounded-md hover:bg-opacity-100 duration-100"
    >
      <p className="text-lg text-white font-bold">{text}</p>
    </button>
  );
}
