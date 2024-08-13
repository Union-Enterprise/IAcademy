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
      className={`w-full h-fit p-6 bg-background-lightCard gap-5 shadow-sm border-border-light flex flex-col rounded-md ${
        isPremium && "border-mainBlue"
      }
      ${
        !isDeleteAccount
          ? "border-2"
          : "border-t-2 *:text-red-700 bg-background-light rounded-none shadow-none"
      }`}
    >
      {children}
    </div>
  );
}
