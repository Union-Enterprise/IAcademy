"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import Link from 'next/link';
import { ChevronRight, CreditCard, UserRound } from 'lucide-react';
import axios from 'axios'; // Certifique-se de importar o axios

// Função para validar CPF
const validarCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let primeiroDigitoVerificador = 11 - (soma % 11);
  if (primeiroDigitoVerificador >= 10) primeiroDigitoVerificador = 0;
  if (primeiroDigitoVerificador != parseInt(cpf.charAt(9))) {
    return false;
  }
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let segundoDigitoVerificador = 11 - (soma % 11);
  if (segundoDigitoVerificador >= 10) segundoDigitoVerificador = 0;
  if (segundoDigitoVerificador != parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
}

export default function CheckoutForm() {
  const router = useRouter(); 
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [nome, setNome] = useState('');
  const [nomeError, setNomeError] = useState('');
  const [telefone, setTelefone] = useState('');
  const [telefoneError, setTelefoneError] = useState('');
  const [cep, setCep] = useState('');
  const [cepError, setCepError] = useState('');
  const [rua, setRua] = useState('');
  const [ruaError, setRuaError] = useState('');
  const [numero, setNumero] = useState('');
  const [numeroError, setNumeroError] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [bairroError, setBairroError] = useState('');
  const [cidade, setCidade] = useState('');
  const [cidadeError, setCidadeError] = useState('');
  const [estado, setEstado] = useState('');
  const [estadoError, setEstadoError] = useState('');

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cpfInput = e.target.value;
    setCpf(cpfInput);

    if (!validarCPF(cpfInput)) {
      setCpfError('CPF inválido! Por favor, verifique e tente novamente.');
    } else {
      setCpfError('');
    }
  };

  const fetchAddress = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
      if (response.data.erro) {
        setCepError('CEP não encontrado.');
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
      setCepError('Erro ao buscar o endereço.');
      return null;
    }
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepInput = e.target.value.replace(/\D/g, ''); 
    setCep(e.target.value);

    if (cepInput.length === 8) { 
      const addressData = await fetchAddress(cepInput);
      if (addressData) {
          setRua(addressData.logradouro || '');
          setBairro(addressData.bairro || '');
          setCidade(addressData.localidade || '');
          setEstado(addressData.uf || '');
      }
  } else {
      setCepError('CEP inválido.');
      setRua('');
      setBairro('');
      setCidade('');
      setEstado('');
  }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!nome) {
      setNomeError('Nome é obrigatório.');
      isValid = false;
    } else {
      setNomeError('');
    }

    if (!telefone) {
      setTelefoneError('Telefone é obrigatório.');
      isValid = false;
    } else {
      setTelefoneError('');
    }

    if (!cpf) {
      setCpfError('CPF é obrigatório.');
      isValid = false;
    } else if (!validarCPF(cpf)) {
      setCpfError('CPF inválido! Por favor, verifique e tente novamente.');
      isValid = false;
    } else {
      setCpfError('');
    }

    if (!cep) {
      setCepError('CEP é obrigatório.');
      isValid = false;
    } else {
      setCepError('');
    }

    if (!rua) {
      setRuaError('Rua é obrigatória.');
      isValid = false;
    } else {
      setRuaError('');
    }

    if (!numero) {
      setNumeroError('Número é obrigatório.');
      isValid = false;
    } else {
      setNumeroError('');
    }

    if (!bairro) {
      setBairroError('Bairro é obrigatório.');
      isValid = false;
    } else {
      setBairroError('');
    }

    if (!cidade) {
      setCidadeError('Cidade é obrigatória.');
      isValid = false;
    } else {
      setCidadeError('');
    }

    if (!estado) {
      setEstadoError('Estado é obrigatório.');
      isValid = false;
    } else {
      setEstadoError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }



    router.push('/premium/pagamentPremium');
  };

  return (
    <div className='flex justify-center mt-10'>
      <div className="max-w-xl p-6 rounded-lg shadow-xl text-zinc-600 ml-20">
        {/* Seção "Meus itens" */}
        <div className="mb-4">
          <div className="shadow-lg p-4 rounded-lg flex justify-between items-center border-mainBlue border-b-2">
            <h2 className="text-lg font-bold">Meus itens</h2>
            <Link href={'/premium'}>
              <button className="text-mainBlue text-sm">Alterar</button>
            </Link>
          </div>
        </div>

        <div className="mb-4">
          <div className="shadow-lg p-4 rounded-lg">
            <div className='flex items-center'>
              <UserRound className='text-mainBlue'/><h2 className="text-lg font-bold ml-2">Meus dados</h2>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Confirme seus dados. Eles aparecerão em sua nota fiscal.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium">Dados pessoais</label>
                  <div className="mt-1 flex space-x-4">
                    <input
                      type="text"
                      placeholder="Seu Nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className={`w-full p-2 border-2 rounded-md focus:outline-none ${nomeError ? 'border-red-500' : 'focus:border-mainBlue hover:border-mainBlue'} peer duration-100`}
                    />
                    {nomeError && <p className="text-red-500 text-sm mt-1">{nomeError}</p>}
                  </div>
                  <div className="mt-2 flex space-x-4">
                    <input
                      type="text"
                      placeholder="CPF"
                      value={cpf}
                      onChange={handleCPFChange}
                      className={`w-1/2 p-2 border-2 rounded-md focus:outline-none ${cpfError ? 'border-red-500' : 'focus:border-mainBlue hover:border-mainBlue'} peer duration-100`}
                    />
                    {cpfError && <p className="text-red-500 text-sm mt-1">{cpfError}</p>}
                    <input
                      type="text"
                      placeholder="Telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      className={`w-1/2 p-2 border-2 rounded-md focus:outline-none ${telefoneError ? 'border-red-500' : 'focus:border-mainBlue hover:border-mainBlue'} peer duration-100`}
                    />
                    {telefoneError && <p className="text-red-500 text-sm mt-1">{telefoneError}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">Endereço</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="CEP"
                      value={cep}
                      onChange={handleCepChange} // Atualize aqui
                      className={`w-full p-2 border-2 rounded-md focus:outline-none ${cepError ? 'border-red-500' : 'focus:border-mainBlue hover:border-mainBlue'} peer duration-100`}
                    />
                    {cepError && <p className="text-red-500 text-sm mt-1">{cepError}</p>}
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Rua"
                      value={rua}
                      onChange={(e) => setRua(e.target.value)}
                      className={`w-full p-2 border-2 rounded-md focus:outline-none ${ruaError ? 'border-red-500' : 'focus:border-mainBlue hover:border-mainBlue'} peer duration-100`}
                    />
                    {ruaError && <p className="text-red-500 text-sm mt-1">{ruaError}</p>}
                  </div>
                  <div className="mt-2 flex space-x-4">
                    <input
                      type="text"
                      placeholder="Número"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      className={`w-1/2 p-2 border-2 rounded-md focus:outline-none ${numeroError ? 'border-red-500' : 'focus:border-mainBlue hover:border-mainBlue'} peer duration-100`}
                    />
                    {numeroError && <p className="text-red-500 text-sm mt-1">{numeroError}</p>}
                    <input
                      type="text"
                      placeholder="Complemento"
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                      className={`w-1/2 p-2 border-2 rounded-md focus:outline-none ${complemento ? '' : 'focus:border-mainBlue hover:border-mainBlue'} peer duration-100`}
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Bairro"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      className={`w-full p-2 border-2 rounded-md focus:outline-none ${bairroError ? 'border-red-500' : 'focus:border-mainBlue hover:border-mainBlue'} peer duration-100`}
                    />
                    {bairroError && <p className="text-red-500 text-sm mt-1">{bairroError}</p>}
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Cidade"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      className={`w-full p-2 border-2 rounded-md focus:outline-none ${cidadeError ? 'border-red-500' : 'focus:border-mainBlue hover:border-mainBlue'} peer duration-100`}
                    />
                    {cidadeError && <p className="text-red-500 text-sm mt-1">{cidadeError}</p>}
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Estado"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      className={`w-full p-2 border-2 rounded-md focus:outline-none ${estadoError ? 'border-red-500' : 'focus:border-mainBlue hover:border-mainBlue'} peer duration-100`}
                    />
                    {estadoError && <p className="text-red-500 text-sm mt-1">{estadoError}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <SubmitButton text="Finalizar" />
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="shadow-lg p-4 rounded-lg border-mainBlue border-b-2">
            <div className='flex items-center'>
              <CreditCard className='text-mainBlue'/><h2 className="text-lg font-bold ml-2">Informações de pagamento</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
