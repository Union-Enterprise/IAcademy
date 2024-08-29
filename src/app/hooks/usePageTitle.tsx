import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function usePageTitle() {
  const pathname = usePathname();

  useEffect(() => {
    const pageTitle = pathname.includes("/trilhas")
      ? "Trilhas"
      : pathname.includes("/premium")
      ? "Premium"
      : pathname.startsWith("/profile")
      ? pathname.includes("/access")
        ? "Dados de Acesso"
        : pathname.includes("/user")
        ? "Dados Pessoais"
        : pathname.includes("/purchases")
        ? "Assinaturas"
        : "Minha Conta"
      : "Home";

    document.title = `${pageTitle} | IAcademy`;
  }, [pathname]);
}
