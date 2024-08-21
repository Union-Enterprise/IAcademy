"use client";

import { usePathname } from "next/navigation";

export default function PremiumLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center min-h-screen ml-20"> 
      <div className="p-6 rounded-lg max-w-md shadow-xl text-zinc-700 border-2 "> 
        <div className="mb-4">
          <h2 className="flex items-center mb-2" style={{ color: '#1865F2' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
              style={{ color: '#1865F2' }}  
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75h.75A2.25 2.25 0 0120.25 9v8.25A2.25 2.25 0 0118 19.5H6a2.25 2.25 0 01-2.25-2.25V9a2.25 2.25 0 012.25-2.25h.75m10.5 0V5.25a2.25 2.25 0 00-2.25-2.25h-6A2.25 2.25 0 008.25 5.25V6.75m10.5 0v10.5a2.25 2.25 0 01-2.25 2.25h-9A2.25 2.25 0 015.25 17.25V6.75M9 10.5h6m-6 3h6"
              />
            </svg>
            Resumo
          </h2>
          <p className="text-zinc-600">Iacademy- Assinatura única anual</p>
          <p className="text-zinc-600 text-xl font-semibold mt-2">R$ 199,99</p>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <p className="text-zinc-600 text-sm">
            Total{" "}
            <span className="block text-mainBlue font-semibold text-lg">
              até 12x R$ 16,66 sem juros
            </span>
            <span className="block text-sm mt-1">ou R$ 199,99 à vista</span>
          </p>
        </div>
      </div>
      <div className="w-full mt-10">{children}</div>
    </div>
  );
}
