import { Search } from "lucide-react";

export default function StatResume({
  title = "Alguma_estatistica",
  value = "Número_da_estatística",
}) {
  return (
    <div className="bg-background-lightA rounded-md px-5 py-6 flex justify-between items-center border-l-4 border-2 border-transparent duration-200 hover:border-mainBlue group *:duration-200">
      <div>
        <h2 className="text-2xl font-semibold text-whiteText mb-3">{title}</h2>
        <p>{value}</p>
      </div>
      <Search className="text-whiteText group-hover:text-mainBlue" size={30} />
    </div>
  );
}
