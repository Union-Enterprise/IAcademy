import { ReactNode } from "react";

interface SettingsSectionProps {
  children: ReactNode;
  isPremium?: boolean;
  isDeleteAccount?: boolean;
  style?: string;
}

export default function SettingsSection({
  children,
  isPremium = false,
  isDeleteAccount = false,
  style,
}: SettingsSectionProps) {
  return (
    <div
      className={`border-border-lightC w-full h-fit p-6 
        ${style || "gap-4 flex flex-col"}
      ${
        !isDeleteAccount
          ? "border-[1px] rounded-xl shadow-sm"
          : "border-t-2 *:text-red-700"
      }
      ${isPremium && "border-mainBlue border-[2px]"}
      `}
    >
      {children}
    </div>
  );
}
