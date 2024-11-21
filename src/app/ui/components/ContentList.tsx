import Link from "next/link";
import React from "react";

export default function ContentList({
  title = "",
  cols,
  children,
}: {
  title: string;
  cols?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h5 className="text-xl font-bold text-title-light">{title}</h5>
      <div
        className={`${
          cols ? "grid-cols-4" : "grid-cols-3"
        } grid gap-5 *:col-span-1`}
      >
        {children}
      </div>
    </section>
  );
}

export function Item({
  title = "Título aqui",
  description = "Descrição",
  href = "",
  lucideIcon: LucideIcon,
}: {
  title: string;
  description: string;
  href: string;
  lucideIcon: React.ElementType;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border-2 border-borders-light shadow-sm hover:shadow-md hover:border-mainBlue flex flex-col justify-between p-5 w-full h-[200px] duration-100 gap-4"
    >
      <div>
        <div className="flex gap-2">
          {LucideIcon && (
            <LucideIcon
              size={25}
              className="flex-shrink-0 group group-hover:text-mainBlue"
            />
          )}
          <h6 className="font-bold text-lg text-text-light flex group group-hover:text-mainBlue">
            {title}
          </h6>
        </div>
      </div>
      <p className="group group-hover:text-mainBlue text-sm text-text-lightSub leading-6 justify-items-end flex h-[75px] overflow-hidden">
        {description}
      </p>
      <div className="flex gap-2 *:text-sm overflow-hidden">
        <Tag name="Intermediário" />
        <Tag name="Geometria" />
        <Tag name="Matemática" />
      </div>
    </Link>
  );
}

export function Tag({ name = "" }) {
  return (
    <div className="flex justify-center items-center rounded-md px-[15px] border-border-light border-2">
      <p className="whitespace-nowrap text-text-lightSub">{name}</p>
    </div>
  );
}
