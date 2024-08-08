import Link from "next/link";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InputGroup({
  label = "E-mail",
  inputType = "email",
  placeholder = "Digite seu e-mail",
  isConfirm = false,
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      <label className="text-whiteText text-lg font-bold">{label}</label>
      {inputType === "password" ? (
        <>
          <div className="relative">
            <input
              type="password"
              placeholder={placeholder}
              className="w-full p-[10px] border rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue peer duration-100"
            />
            <FontAwesomeIcon
              icon={faEye}
              className="bg-red h-[25px] w-[25px] absolute right-[10px] bottom-[10px] opacity-20 text-whiteText hover:text-mainBlue cursor-pointer hover:opacity-100 duration-100 peer-focus:text-mainBlue peer-focus:opacity-100"
            />
          </div>
          {!isConfirm && (
            <Link
              href="/recovery"
              className="text-blue-600 hover:underline w-fit"
            >
              Esqueci minha senha
            </Link>
          )}
        </>
      ) : (
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full p-[10px] border rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue peer duration-100"
        />
      )}
    </div>
  );
}
