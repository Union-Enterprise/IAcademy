import { Box } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";

export function OverviewSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="border-[1px] rounded-md shadow-sm border-border-lightC flex flex-col *:px-8 *:py-5">
      <h3 className="text-title-light border-b-[1px] border-border-lightB text-xl font-bold">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function ContentsSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <Link
      href="/trilhas/topic"
      className="border-2 rounded-md shadow-sm border-border-lightC flex gap-5 px-8 py-5 cursor-pointer hover:border-mainBlue duration-100 group"
    >
      <span className="p-2 border-2 border-inherit rounded-full w-fit h-fit text-text-lightSub group-hover:text-mainBlue">
        <Box size={25} />
      </span>
      <div>
        <h3 className="text-title-light text-lg font-bold mb-2">{title}</h3>
        <p className="text-text-lightSub text-sm">{children}</p>
      </div>
    </Link>
  );
}
