import Link from "next/link";
import { EyeOff, Eye } from "lucide-react";
import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  useState,
} from "react";

interface LabelProps {
  label: string;
  labelFor: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

function Label({ label, labelFor, isRequired, isDisabled }: LabelProps) {
  return (
    <label className="text-title-light w-fit font-semibold" htmlFor={labelFor}>
      {label}
      <span
        className={`opacity-0 ml-1 text-red-400 font-normal pointer-events-none duration-100 ${
          isRequired && !isDisabled && "opacity-100"
        }`}
      >
        *
      </span>
    </label>
  );
}

interface InputProps {
  id?: string;
  className?: string;
  inputType?: string;
  placeholder?: string;
  isRequired?: boolean;
  value?: string;
  isDisabled?: boolean;
  maxLength?: number;
  error?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export function Input({
  id,
  className = "h-[52px]",
  inputType = "text",
  placeholder = "Digite algo aqui",
  isRequired = true,
  value,
  isDisabled = false,
  maxLength,
  error,
  onClick,
  onChange,
  onBlur,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex items-center overflow-hidden rounded-md group/input">
      <input
        id={id}
        maxLength={maxLength}
        value={value}
        type={inputType === "password" && showPassword ? "text" : inputType}
        placeholder={placeholder}
        required={isRequired}
        disabled={isDisabled}
        onChange={(e) => onChange?.(e)}
        onBlur={onBlur}
        className={`
          ${className}
          ${
            !isDisabled &&
            "group-hover/input:border-mainBlue focus:border-mainBlue bg-background-light"
          }
          ${inputType === "password" && "pr-[45px]"}
          ${error && "border-red-400"}
          w-full px-4 py-3 border-2 border-border-light text-text-light rounded-md outline-none duration-100 peer focus:text-text-light
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
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute right-[10px] opacity-30 border-none outline-none duration-100 group-hover/input:text-mainBlue peer-focus:text-mainBlue group-hover/input:opacity-100 peer-focus:opacity-100`}
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </button>
      )}
    </div>
  );
}

interface SelectProps {
  label: string;
  labelFor: string;
  isRequired?: boolean;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  error?: string;
  isDisabled?: boolean;
  cols?: string;
}

export function Select({
  label,
  labelFor,
  isRequired = true,
  options,
  value,
  onChange,
  error,
  isDisabled = false,
  cols,
}: SelectProps) {
  return (
    <div className={`${cols} flex flex-col gap-[10px]`}>
      <Label
        label={label}
        labelFor={labelFor}
        isRequired={isRequired}
        isDisabled={isDisabled}
      />
      <div className="group/select">
        <select
          id={labelFor}
          value={value}
          required={isRequired}
          onChange={onChange}
          disabled={isDisabled}
          className={`
          ${
            error && "border-red-400"
          } w-full px-4 h-[52px] border-2 border-border-light text-zinc-500 rounded-md outline-none duration-100 bg-background-light group-hover/select:border-mainBlue`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}

interface InputGroupProps extends LabelProps, InputProps {
  isRecoveryInput?: boolean;
  cols?: string;
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
  return (
    <div className={`${cols} flex flex-col gap-[10px]`}>
      <Label
        label={label}
        labelFor={labelFor}
        isRequired={isRequired}
        isDisabled={isDisabled}
      />
      <Input
        id={labelFor}
        inputType={inputType}
        placeholder={placeholder}
        isRequired={isRequired}
        value={value}
        isDisabled={isDisabled}
        maxLength={maxLength}
        error={error}
        onClick={onClick}
        onChange={onChange}
        onBlur={onBlur}
      />
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
