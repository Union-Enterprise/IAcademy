"use client";

import Link from "next/link";
import { EyeOff, Eye } from "lucide-react";
import { ChangeEventHandler, useState } from "react";

interface InputGroupProps {
  label: string;
  labelFor: string;
  inputType?: string;
  placeholder: string;
  isRecoveryInput?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function InputGroup({
  label,
  labelFor,
  inputType = "text",
  placeholder = "Digite algo aqui",
  isRecoveryInput = false,
  onChange,
}: InputGroupProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-[10px]">
      <label
        className="text-title-light text-lg font-semibold"
        htmlFor={labelFor}
      >
        {label}
      </label>
      {inputType === "password" ? (
        <>
          <div className="relative flex items-center overflow-hidden rounded-md group/input">
            <input
              id={labelFor}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              required
              onChange={onChange}
              className="w-full p-[10px] pr-[65px] border-2 border-border-light text-text-light bg-background-lightA rounded-md outline-none group-hover/input:border-mainBlue focus:border-mainBlue peer duration-200"
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
        id={labelFor}
          type={inputType}
          placeholder={placeholder}
          required
          onChange={onChange}
          className="w-full p-[10px] pr-[65px] border-2 border-border-light text-text-light bg-background-lightA rounded-md outline-none hover:border-mainBlue focus:border-mainBlue duration-200"
        />
      )}
    </div>
  );
}
