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
    <div className="rounded-xl border-[1px] border-border-lightC shadow-md p-6 flex flex-col hover:-translate-y-1 duration-100 hover:shadow-lg">
      <div className="flex justify-between">
        <p className="text-text-light text-sm mb-2">{title}</p>
        {LucideIcon && <LucideIcon className="text-text-lightSub w-[20px]" />}
      </div>
      <h2 className="text-2xl font-semibold text-title-light mb-1">{value}</h2>
      <p className="text-text-lightSub text-[12px]">
        + 100% em relação ao mês anterior
      </p>
    </div>
  );
}
