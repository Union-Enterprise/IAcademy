import Image from "next/image";

export default function AvatarResume() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex shrink-0 overflow-hidden rounded-full h-9 w-9">
        <Image
          src="/blueIcon.svg"
          alt="Avatar"
          width={36}
          height={36}
          className="aspect-square w-full h-full"
        />
      </span>
      <div>
        <p className="text-text-light leading-none text-sm font-medium">
          Shaolin Matador de Porco
        </p>
        <p className="text-sm text-text-lightSub mt-[4px]">
          oshaolinmataporco@email.com
        </p>
      </div>
      {/* <p className="ml-auto text-text-light font-medium">$1200</p> */}
    </div>
  );
}
