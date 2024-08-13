import React from "react";

import { FilterIcon } from "lucide-react";

interface FilterItem {
  name: string;
}

interface FilterListProps {
  title: string;
  items: FilterItem[];
}

export default function FilterSection() {
  return (
    <section className="flex flex-col gap-4 w-[300px]">
      <div className="flex gap-3 items-center">
        <FilterIcon />
        <h3 className="text-xl font-bold text-title-light">
          Filtros
        </h3>
      </div>
      <FilterList
        title="Conteúdo"
        items={[
          { name: "Geometria" },
          { name: "Estatística" },
          { name: "Aritmética" },
          { name: "Álgebra" },
        ]}
      />
      <FilterList
        title="Tópicos"
        items={[
          { name: "Sólidos Geométricos" },
          { name: "Logaritmos" },
          { name: "Funções epxonenciais" },
          { name: "Matrizes" },
        ]}
      />
      <FilterList
        title="Nível de Aprendizado"
        items={[
          { name: "Iniciante" },
          { name: "Intermediário" },
          { name: "Avançado" },
        ]}
      />
    </section>
  );
}

const FilterList: React.FC<FilterListProps> = ({ title = "", items = [] }) => {
  return (
    <div className="flex flex-col">
      <h4 className="font-bold text-title-light text-lg">{title}</h4>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input type="checkbox" name={item.name} id={item.name} />
            <p className="text-text-lightSub">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
