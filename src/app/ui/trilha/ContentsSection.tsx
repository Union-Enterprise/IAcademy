import { Box } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";

export function ContentsSection({
  children,
  title,
  href,
  className,
}: {
  children: ReactNode;
  title: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${
        !className && "h-[150px]"
      } border-2 rounded-md shadow-sm border-border-lightC flex gap-5 px-8 py-6 cursor-pointer overflow-hidden hover:border-mainBlue duration-100 group w-full`}
    >
      <span className="p-2 border-2 border-inherit rounded-full w-fit h-fit text-text-lightSub group-hover:text-mainBlue">
        <Box size={25} />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-title-light text-lg font-bold">{title}</h3>
        <div className="text-text-lightSub text-sm max-h-[64px] overflow-hidden">
          {children}
        </div>
      </div>
    </Link>
  );
}

function Tag({ title = "" }) {
  return (
    <span className="bg-bg-lightA px-2 py-1 rounded text-xs">{title}</span>
  );
}
