import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";

export default function CardsStudent({
  title,
  value,
  iconColor = "text-white",
  iconBg = "bg-gray-400",
  lucideIcon: LucideIcon,
}: {
  title: string;
  value: string;
  iconColor?: string;
  iconBg?: string;
  lucideIcon?: React.ElementType;
}) {
  return (
    <div className="w-full rounded-2xl bg-white shadow-md flex flex-col overflow-hidden h-fit">
      <div className="flex gap-5 px-5 py-7 items-center">
        <div
          className={`${iconBg} rounded-full h-14 w-14 flex items-center justify-center`}
        >
          {LucideIcon && <LucideIcon size={30} className={`${iconColor}`} />}
        </div>
        <div>
          <h4 className="text-title-light font-bold text-xl">{value}</h4>
          <p className="text-text-lightSub">{title}</p>
        </div>
      </div>
      <Link
        href={"#"}
        className="flex justify-between border-t-2 border-border border-opacity-30 *:text-text-lightSub hover:bg-border duration-100 px-5 py-4"
      >
        <p>Ver mais</p>
        <ChevronRight />
      </Link>
    </div>
  );
}
