import { ReactNode } from "react";

interface SettingsSectionProps {
  children: ReactNode;
  isPremium?: boolean;
  isDeleteAccount?: boolean;
}

export default function SettingsSection({
  children,
  isPremium = false,
  isDeleteAccount = false,
}: SettingsSectionProps) {
  return (
    <div
      className={`w-full h-fit p-6 gap-5 flex flex-col ${
        isPremium && "border-mainBlue"
      }
      ${
        !isDeleteAccount
          ? "border-2 rounded-md bg-background-lightA" 
          : "border-t-2 *:text-red-700 bg-background-light"
      }`}
    >
      {children}
    </div>
  );
}
