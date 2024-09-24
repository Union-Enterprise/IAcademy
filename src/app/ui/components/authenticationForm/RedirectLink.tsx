import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface RedirectLinkProps {
  message: string;
  action: string;
  href: string;
}

export default function RedirectLink({
  message,
  action,
  href,
}: RedirectLinkProps) {
  return (
    <div className="border-t-2 border-border-light pt-5">
      <Link
        href={href}
        className="bg-bg-lightA hover:bg-bg-lightC duration-100 p-5 rounded-lg relative flex flex-col justify-center"
      >
        <p>{message}</p>
        <p className="text-mainBlue font-bold">{action}</p>

        <ChevronRight className="absolute right-5" />
      </Link>
    </div>
  );
}
