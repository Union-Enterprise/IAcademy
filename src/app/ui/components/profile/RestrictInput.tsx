export default function RestictInput({
  label,
  value,
  onChangeClick,
  cols,
}: {
  label: string;
  value: string;
  onChangeClick: () => void;
  cols?: string;
}) {
  return (
    <div className={`${cols} w-full flex flex-col gap-[10px]`}>
      <label className="text-title-light w-fit font-semibold">{label}</label>
      <div className="relative flex items-center overflow-hidden rounded-md">
        <input
          type={label === "Senha" ? "password" : "text"}
          disabled
          value={value}
          className="bg-background-lightA text-text-lightSub text-opacity-65 w-full  px-4 py-3 pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue peer duration-100"
        />
        <span
          className="text-mainBlue opacity-50 hover:opacity-100 duration-100 text-sm absolute right-0 px-[10px] h-full cursor-pointer items-center flex"
          onClick={onChangeClick}
        >
          Alterar
        </span>
      </div>
    </div>
  );
}
