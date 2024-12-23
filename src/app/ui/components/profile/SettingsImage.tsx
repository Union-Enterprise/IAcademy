import { Eye, SquareX, X, ImagePlus } from "lucide-react";
import SubmitButton from "../authenticationForm/SubmitButton";
import { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import { useToast } from "@/app/context/ToastContext";
import Image from "next/image";

export default function SetImage({ closeModal }: { closeModal: () => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user, setAuth } = useUser();
  const [loading, setLoading] = useState(false);
  const addToast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  console.log(user.img);

  const sendData = async () => {
    if (!selectedFile) {
      console.error("Nenhum arquivo foi selecionado.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:5002/upload_pfp", formData, {
        withCredentials: true,
      })
      .then(function (response) {
        const updatedUser = { ...user, img: response.data.user.img };
        setAuth(true, updatedUser);
        closeModal();
        addToast("Foto de perfil alterada com sucesso!", "success");
      })
      .catch(function (error) {
        console.error("Erro ao alterar a imagem:", error);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  return (
    <form
      className="gap-6 flex flex-col"
      id="form"
      onSubmit={(e) => {
        e.preventDefault();
        sendData();
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center bg-slate-300 w-60 h-60 rounded-lg">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 bg-blue-600 rounded-full"
          >
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Foto de Perfil"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <ImagePlus className="text-white w-8 h-8" />
            )}
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      <SubmitButton
        text="Alterar foto"
        classname="w-full"
        isDisabled={loading || !selectedFile}
      />
    </form>
  );
}
