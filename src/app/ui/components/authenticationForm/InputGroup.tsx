"use client";

import Link from "next/link";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";

export default function InputGroup({
  label = "Digite algo aqui",
  inputType = "text",
  placeholder = "Digite algo aqui",
  isRecoveryInput = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-[10px]">
      <label className="text-whiteText text-lg font-semibold">{label}</label>
      {inputType === "password" ? (
        <>
          <div className="relative flex items-center overflow-hidden rounded-md group/input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              required
              className="w-full p-[10px] pr-[65px] border-2 border-border-light bg-background-lightA rounded-md outline-none group-hover/input:border-mainBlue focus:border-mainBlue peer duration-200"
            />
            {showPassword ? (
              <Eye
                className="absolute right-0 px-[10px] w-[60px] peer-focus:opacity-100 peer-focus:text-mainBlue group-hover/input:text-mainBlue group-hover/input:opacity-100 text-whiteText opacity-20 cursor-pointer duration-200"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeOff
                className="absolute right-0 px-[10px] w-[60px] peer-focus:opacity-100 peer-focus:text-mainBlue group-hover/input:text-mainBlue group-hover/input:opacity-100 text-whiteText opacity-20 cursor-pointer duration-200"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          {isRecoveryInput && (
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
          required
          className="w-full p-[10px] pr-[65px] border-2 border-border-light bg-background-lightA rounded-md outline-none hover:border-mainBlue focus:border-mainBlue duration-200"
        />
      )}
    </div>
  );
}
