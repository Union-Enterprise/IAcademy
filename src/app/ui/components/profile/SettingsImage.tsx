import { Eye, SquareX, X, ImagePlus } from "lucide-react";
import SubmitButton from "../authenticationForm/SubmitButton";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SettingsCPF() {
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
      .post("http://localhost:5002/upload_pfp", formData, {
        withCredentials: true,
      })
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
      </div>

      <SubmitButton text="Alterar foto" classname="w-full" />
    </form>
  );
}
