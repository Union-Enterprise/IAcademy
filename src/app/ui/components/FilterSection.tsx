import React from "react";

interface FilterItem {
  name: string;
}

interface FilterListProps {
  title: string;
  items: FilterItem[];
}

export default function FilterSection() {
  return (
    <section className="flex flex-col gap-5 w-[300px]">
      <h3 className="text-lg font-bold">Filtre os conteúdos</h3>
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
    <div className="flex flex-col gap-4">
      <h4 className="font-bold">{title}</h4>
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <input type="checkbox" name={item.name} id={item.name} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};
