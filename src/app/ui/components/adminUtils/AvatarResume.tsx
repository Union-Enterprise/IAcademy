import Image from "next/image";

interface AvatarResumeProps {
  name: string;
  email: string;
  avatarUrl: string;
}

export default function AvatarResume({ name, email, avatarUrl }: AvatarResumeProps) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 hover:bg-background-lightHover duration-100">
      <span className="flex shrink-0 overflow-hidden rounded-full h-9 w-9">
        <Image
          src={avatarUrl}
          alt={`Avatar of ${name}`}
          width={36}
          height={36}
          className="aspect-square w-full h-full"
        />
      </span>
      <div>
        <p className="text-text-light leading-none text-sm font-medium">
          {name}
        </p>
        <p className="text-sm text-text-lightSub mt-[4px]">
          {email}
        </p>
      </div>
      {/* <p className="ml-auto text-text-light font-medium">$1200</p> */}
    </div>
  );
}
