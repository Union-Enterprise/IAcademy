import React from "react";

export default function StatResume({
  title,
  value,
  lucideIcon: LucideIcon,
}: {
  title: string;
  value: string;
  lucideIcon?: React.ElementType;
}) {
  return (
    <div className="rounded-xl border-[1px] border-border-lightA border-opacity-30 shadow-sm p-6 flex flex-col hover:-translate-y-1 duration-100 hover:shadow-md">
      {LucideIcon && <LucideIcon className="text-text-lightSub" size={30} />}
      <h2 className="text-2xl font-bold text-title-light mt-3">{value}</h2>
      <p className="text-text-light font-semibold my-1">{title}</p>
      <p className="text-text-lightSub text-[12px]">
        + 100% em relação ao mês anterior
      </p>
    </div>
  );
}
