import React from "react";

export default function StatResume({
  title,
  value,
  description = "+ 100% em relação ao mês anterior",
  iconColor = "text-text-lightSub",
  iconBg,
  lucideIcon: LucideIcon,
}: {
  title: string;
  value: string;
  description?: string;
  iconColor?: string;
  iconBg?: string;
  lucideIcon?: React.ElementType;
}) {
  return (
    <div className="relative bg-background-light rounded-xl border-[1px] border-border-lightA border-opacity-30 shadow-sm p-6 flex flex-col hover:-translate-y-1 duration-100 hover:shadow-md">
      {LucideIcon && (
        <LucideIcon
          className={`${iconColor} ${iconBg} absolute right-6 top-6 rounded-lg p-1`}
          size={35}
        />
      )}
      <h2 className="text-2xl font-bold text-title-light mt-3">{value}</h2>
      <p className="text-text-light font-semibold my-1">{title}</p>
      <p className="text-text-lightSub text-[12px]">{description}</p>
    </div>
  );
}
