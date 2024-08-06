import Link from "next/link";

export default function Login() {
  return (
    <>
      <main className="pl-10 pt-7"> 
        <img src="./bluelogo.svg" alt="" className="w-[250px]" />
        <title>Entrar</title>
        <div className="w-full max-w-md p-8 rounded">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Entrar</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">E-mail</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Senha</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                </button>
              </div>
            </div>
            <div className="mb-6 text-right">
              <a href="#" className="text-blue-600 hover:underline">Esqueci minha senha</a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Entrar
            </button>
          </form>
          <div className="my-6">
            <div className="flex items-center justify-center">
              <hr className="w-full border-gray-300" />
              <span className="px-3 text-gray-500">ou</span>
              <hr className="w-full border-gray-300" />
            </div>
            <div className="mt-6 flex flex-col space-y-4">
              <button className="flex items-center justify-center bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4,0H7.6A7.6,7.6,0,0,0,0,7.6v8.8A7.6,7.6,0,0,0,7.6,24h8.8A7.6,7.6,0,0,0,24,16.4V7.6A7.6,7.6,0,0,0,16.4,0Zm2.4,12H12v6H9.6v-6H7.2V9.6H9.6V7.6A2.4,2.4,0,0,1,12,5.2h2.4V7.6H12a.8.8,0,0,0-.8.8v1.6h3.2Z" /></svg>
                Entrar com Apple
              </button>
              <button className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5,12.3c0-0.8-0.1-1.6-0.2-2.3H12v4.4h6.5c-0.3,1.7-1.3,3.1-2.8,4v3.3h4.5C21.8,19.2,23.5,15.1,23.5,12.3z" /><path d="M12,24c3.2,0,5.9-1.1,7.9-3l-3.7-3.2c-1.1,0.8-2.6,1.3-4.2,1.3c-3.2,0-5.9-2.1-6.8-4.9H0.9v3.1C2.9,21.2,7.1,24,12,24z" /><path d="M5.2,14.1C4.9,13.3,4.8,12.4,4.8,11.5s0.2-1.8,0.4-2.6V5.9H0.9C0.3,7.3,0,9.2,0,11.5s0.3,4.2,0.9,5.6L5.2,14.1z" /><path d="M12,4.8c1.7,0,3.2,0.6,4.3,1.8l3.2-3.2C18.2,1.3,15.5,0,12,0C7.1,0,2.9,2.8,0.9,7L5.2,9.9C6.1,7.1,8.8,4.8,12,4.8z" /></svg>
                Entrar com Google
              </button>
              <button className="flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7,0H1.3C0.6,0,0,0.6,0,1.3v21.3C0,23.4,0.6,24,1.3,24h11.5v-9.3H9.7v-3.6h3.1V8.1c0-3,1.8-4.7,4.6-4.7c1.3,0,2.7,0.2,2.7,0.2v3h-1.5c-1.5,0-1.9,0.9-1.9,1.8v2.2h3.3l-0.4,3.6H16v9.3h6.7c0.7,0,1.3-0.6,1.3-1.3V1.3C24,0.6,23.4,0,22.7,0z" /></svg>
                Entrar com Facebook
              </button>
            </div>
          </div>
         
          <div className="flex items-center justify-center pt-5">
            <hr className="w-full border-gray-300" />
            <hr className="w-full border-gray-300" />
          </div>
          <div className="flex justify-center pt-5 rounded-sm">
            <div className="bg-loginFundo w-[440px] h-20 rounded-lg">
              <p className="pl-3 pt-3 text-lg">Ainda não tem uma conta?</p>
              <Link  href="/register">
              <p className="text-mainBlue text-lg pl-3 hover:underline">Clique aqui para se cadastrar</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
