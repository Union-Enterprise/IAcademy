import { useEffect } from "react";
import { X } from "lucide-react";
import SubmitButton from "../authenticationForm/SubmitButton";

export default function Modal({
  title,
  onClose,
  onSubmit,
  visible,
  setVisible,
  children,
}: {
  title: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
}) {

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`bg-black bg-opacity-60 absolute m-auto w-full h-full top-0 left-0 z-20 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOutsideClick}
    >
      <form
        className={`w-[500px] flex flex-col border-2 border-border-light rounded-md bg-background-light relative transform transition-transform duration-300 ease-in-out ${
          visible ? "scale-100" : "scale-95"
        }`}
        onSubmit={onSubmit}
      >
        <div className="flex justify-between bg-background-lightA items-center py-4 px-6">
          <h4 className="text-title-light text-2xl font-bold">{`Alterar ${title}`}</h4>
          <div
            className="opacity-40 hover:text-red-600 hover:bg-background-lightC p-1 cursor-pointer hover:opacity-100 duration-200 rounded-md"
            onClick={() => {
              onClose();
            }}
          >
            <X size={30} />
          </div>
        </div>
        <div className="p-6 flex flex-col gap-5">
          {children}
          <SubmitButton text="Alterar" classname="w-full" />
        </div>
      </form>
    </div>
  );
}