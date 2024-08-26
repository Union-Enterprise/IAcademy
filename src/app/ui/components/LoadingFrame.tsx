import Image from "next/image";

export default function LoadingFrame() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src="/blueIcon.svg"
        alt="IAcademy Logo"
        width={150}
        height={150}
        className="animate-bounce duration-500"
      />
    </div>
  );
}
