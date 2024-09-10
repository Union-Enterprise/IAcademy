import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function usePageTitle() {
  const pathname = usePathname();

  let pageTitle = "";
  useEffect(() => {
    if (pathname.includes("/trilhas")) {
      pageTitle = "Trilhas";
    } else if (pathname.includes("/premium")) {
      pageTitle = "Premium";
    } else if (pathname.startsWith("/profile")) {
      if (pathname.includes("/access")) {
        pageTitle = "Dados de Acesso";
      } else if (pathname.includes("/user")) {
        pageTitle = "Dados Pessoais";
      } else if (pathname.includes("/purchases")) {
        pageTitle = "Assinaturas";
      } else {
        pageTitle = "Minha Conta";
      }
    } else if (pathname.includes("/login")) {
      pageTitle = "Login";
    } else if (pathname.includes("/register")) {
      pageTitle = "Cadastro";
    } else if (pathname.includes("/recovery")) {
      pageTitle = "Recuperação";
    } else if (pathname.includes("/admins")) {
      pageTitle = "Admins";
    } else if (pathname.includes("/dashboard")) {
      pageTitle = "Dashboard";
    } else if (pathname.includes("/users")) {
      pageTitle = "Usuários";
    } else if (pathname.includes("/notifications")) {
      pageTitle = "Notificações";
    } else {
      pageTitle = "Home";
    }

    document.title = `${pageTitle} | IAcademy`;
  }, [pathname]);
}
