import { Eye, SquareX, X, ImagePlus } from "lucide-react";
import SubmitButton from "../authenticationForm/SubmitButton";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SettingsCPF({ closeView }: { closeView: () => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      console.log(selectedFile);
    }
  }, [selectedFile]);

  const sendData = () => {
    if (!selectedFile) {
      console.error("Nenhum arquivo foi selecionado.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post(
        "http://localhost:5002/upload_pfp",
        formData, 
        { withCredentials: true }
      )
      .then(function (response) {
        console.log(response.status); // cod da requisição
        console.log(response.data); // mensagem de sucesso / erro (e.g email ou senha incorreto)
      })
      .catch(function (error) {
        console.error(error);
      });

      window.location.reload();
  };

  return (
    <div className="bg-black bg-opacity-60 absolute m-auto w-full h-full top-0 left-0 z-20 flex items-center justify-center">
      <form className="w-[500px] p-6 gap-5 flex flex-col border-2 rounded-md bg-[rgba(253,253,253)] relative pt-14"
        id="form"
        onSubmit={(e) => {
          e.preventDefault();
          sendData();
        }}
      >
        <X
          className="cursor-pointer opacity-40 hover:text-red-600 hover:opacity-100 duration-200 w-[30px] h-[30px] absolute right-6 top-6"
          onClick={closeView}
        />
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center bg-slate-300 w-60 h-60 rounded-lg">
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 bg-blue-600 rounded-full"
            >
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Imagem selecionada"
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
          <p className="mt-2 text-sm text-gray-500">Enviar imagem</p>
        </div>

        <SubmitButton text="Mudar foto de perfil"/>
      </form>
    </div>
  );
}
