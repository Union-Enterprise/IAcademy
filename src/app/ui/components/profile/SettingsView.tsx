import { Eye, SquareX, X } from "lucide-react";
import InputGroup from "../authenticationForm/InputGroup";
import SubmitButton from "../authenticationForm/SubmitButton";

export default function SettingsView({
  closeView,
  children,
}: {
  children: React.ReactNode;
  closeView: () => void;
}) {
  return (
    <div className="bg-black bg-opacity-60 absolute m-auto w-full h-full top-0 left-0 z-20 flex items-center justify-center">
      <form className="w-[500px] p-6 gap-5 flex flex-col border-2 rounded-md bg-[rgba(253,253,253)] relative pt-14">
        <X
          className="cursor-pointer opacity-40 hover:text-red-600 hover:opacity-100 duration-200 w-[30px] h-[30px] absolute right-6 top-6"
          onClick={closeView}
        />
        {children}
        <SubmitButton text="Alterar" />
      </form>
    </div>
  );
}
