import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface SearchProps {
  setShowSearchView: React.Dispatch<React.SetStateAction<boolean>>;
  height?: string;
  width?: string;
}

export default function Searchbar({ setShowSearchView }: SearchProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        setShowSearchView(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowSearchView]);

  return (
    <button
      className="w-[450px] mx-auto h-12 px-4 border-2 border-border-light bg-background-lightCard rounded-md duration-200 cursor-pointer relative flex items-center hover:border-mainBlue group"
      onClick={() => setShowSearchView(true)}
    >
      <p className="text-gray-400">Busque por matéria, tópicos e conteúdos</p>
      <span className="absolute right-2 opacity-80 bg-mainBlue pointer-events-none h-fit py-1 px-5 text-sm rounded-md flex items-center justify-center text-white font-bold duration-200">
        /
      </span>
    </button>
  );
}

export function SearchView({ setShowSearchView }: SearchProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSearchView(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setShowSearchView]);

  return (
    <div className="bg-black bg-opacity-60 absolute m-auto w-full h-[100vh] top-0 left-0 z-20 flex items-center justify-center">
      <div className="w-[600px] flex flex-col overflow-hidden rounded-md">
        <div className="flex items-center relative">
          <input
            type="search"
            placeholder="Pesquise aqui"
            className="w-full px-5 py-2 h-[60px] pr-24 border-2 rounded-md rounded-b-none focus:outline-none focus:border-mainBlue focus:ring-transparent duration-100"
          />
          <span
            className="cursor-pointer text-sm font-bold text-white rounded-md px-4 py-1 absolute right-5 bg-mainBlue h-fit"
            onClick={() => setShowSearchView(false)}
          >
            esc
          </span>
        </div>
        <div className="*:px-5 bg-[rgba(253,253,253)] max-h-[650px] overflow-auto">
          <p className="px-5 mt-6 mb-2 text-lg font-bold text-whiteText">
            Trilhas
          </p>
          <SearchResult />
          <SearchResult />
          <SearchResult />

          <p className="px-5 mt-6 mb-2 text-lg font-bold text-whiteText">
            Assuntos
          </p>
          <SearchResult />
          <SearchResult />
          <SearchResult />
          <SearchResult />
        </div>
      </div>
    </div>
  );
}

function SearchResult() {
  return (
    <div className="border-t-2 border-whiteBorder py-5 flex flex-col justify-center gap-2 relative hover:bg-mainBlue duration-200 *:duration-200 group cursor-pointer">
      <p className="px-4 py-1 bg-whiteBorder border-2 border-transparent text-mainBlue rounded-md text-sm font-semibold w-fit group-hover:border-whiteBorder group-hover:bg-transparent group-hover:text-whiteBorder group-hover:text-background-lightHover transition-colors">
        Geometria
      </p>
      <p className="text-gray-500 group-hover:text-white">
        Algo_referente_ao_que_está_sendo_pesquisado
      </p>
      <ChevronRight className="absolute right-5 text-gray-500 group-hover:text-white" />
    </div>
  );
}
