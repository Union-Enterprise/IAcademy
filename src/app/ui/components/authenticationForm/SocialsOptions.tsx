import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialOptions({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-[10px] flex-col items-center">
      <span className="relative w-full text-center flex items-center justify-center">
        <p className="text-whiteText min-w-fit bg-white z-[1] px-4">
          Se preferir
        </p>
        <span className="absolute left-0 bg-whiteBorder h-[2px] w-full" />
      </span>
      {children}
    </div>
  );
}

export function Option({ icon = faApple, brandName = "Apple" }) {
  return (
    <div className=" w-full flex items-center justify-center h-[50px] gap-5 rounded-md border-2 border-whiteBorder hover:bg-mainBlue duration-100 group bg-opacity-50 cursor-pointer">
      <FontAwesomeIcon
        icon={icon}
        className="w-[25px] h-[25px] group-hover:text-white"
      />
      <p className="font-semi text-whiteText group-hover:text-white">
        Entrar com {brandName}
      </p>
    </div>
  );
}
