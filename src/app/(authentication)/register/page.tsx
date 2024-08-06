import Link from "next/link";

export default function Login() {
  return (
    <>
  <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8  rounded ">
        <div className="mb-10">
          <img src="./bluelogo.svg" alt="Academy logo" className="w-[250px] " />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-left ">Cadastrar</h2>
        <form>
          <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
            <input
              type="email"
              placeholder="Digite seu nome"
              className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-6">
            <label className="block text-gray-700">Confirmar senha</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirme sua senha"
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            Ao se cadastrar, você aceita nossos <a href="#" className="text-blue-600 hover:underline">termos de uso</a> e a nossa <a href="#" className="text-blue-600 hover:underline">política de privacidade</a>.
          </p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Cadastrar
          </button>
        </form>
        <div className="text-center mt-6">
          <p>
            Já possui uma conta?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Clique aqui para entrar
            </Link>
          </p>
        </div>
      </div>
    </main>
    </>
  );
}
