import Link from "next/link";
import { EyeOff, Eye } from "lucide-react";
import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  useState,
} from "react";

interface InputGroupProps {
  label: string;
  labelFor: string;
  inputType?: string;
  placeholder: string;
  isRequired?: boolean;
  isRecoveryInput?: boolean;
  isDisabled?: boolean;
  maxLength?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value?: string;
  cols?: string;
  error?: string;
}

export default function InputGroup({
  label,
  labelFor,
  inputType = "text",
  placeholder = "Digite algo aqui",
  isRequired = true,
  value,
  isRecoveryInput = false,
  isDisabled = false,
  maxLength,  
  error,
  onClick,
  onChange,
  onBlur,
  cols,
}: InputGroupProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${cols} flex flex-col gap-[10px]`}>
      <label
        className="text-title-light w-fit font-semibold"
        htmlFor={labelFor}
      >
        {label}
        <span
          className={`opacity-0 ml-1 text-red-400 font-normal pointer-events-none duration-100 ${
            isRequired && !isDisabled && "opacity-100"
          }`}
        >
          *
        </span>
      </label>

      <div className="relative flex items-center overflow-hidden rounded-md group/input">
        <input
          id={labelFor}
          maxLength={maxLength}
          value={value}
          type={inputType === "password" && showPassword ? "text" : inputType}
          placeholder={placeholder}
          required={isRequired}
          disabled={isDisabled}
          onChange={(e) => onChange?.(e)}
          onBlur={onBlur}
          className={`w-full px-4 py-3 border-2 border-border-light text-text-light rounded-md outline-none duration-100 peer
            ${
              !isDisabled &&
              "group-hover/input:border-mainBlue focus:border-mainBlue bg-background-light"
            }
            ${inputType === "password" && "pr-[45px]"}
            ${error && "border-red-400"}
          `}
        />

        {isDisabled && (
          <button
            className="text-mainBlue text-sm absolute right-0 px-[10px] h-full"
            onClick={onClick}
          >
            Alterar
          </button>
        )}

        {inputType === "password" && (
          <button
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className={`absolute right-[10px] opacity-30 border-none outline-none duration-100 group-hover/input:text-mainBlue peer-focus:text-mainBlue group-hover/input:opacity-100 peer-focus:opacity-100`}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>
      {error && <p className="text-red-400">{error}</p>}

      {isRecoveryInput && (
        <Link
          href="/recovery"
          className="text-blue-400 hover:text-mainBlue duration-100 w-fit"
        >
          Esqueci minha senha
        </Link>
      )}
    </div>
  );
}
