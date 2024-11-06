/* eslint-disable @next/next/no-img-element */
"use client"; 
import { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';
import { TipoAluno } from '@/types';
import { alunosDescricoes } from '@/descricoes';
import Image from 'next/image';


export default function Home() {
  const [showContent, setShowContent] = useState(true); 
  const [selectedAluno, setSelectedAluno] = useState<TipoAluno | null>(null); 
  const [alunos, setAlunos] = useState<TipoAluno[]>([]); 
  const router = useRouter();

  const chamadaApi = async () => {
    const response = await fetch("/api/alunos");
    const dados = await response.json();
    setAlunos(dados);
  }

  useEffect(() => {
    chamadaApi();
  }, []);

  const handleAlunoSelect = (aluno: TipoAluno) => {
    setSelectedAluno(aluno); 
    router.push(`/perfil/${aluno.$id}`);  
  };
  
  const handleBack = () => {
    setShowContent(true); 
    setSelectedAluno(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      {showContent ? (
        <>
          <h1 className="text-6xl font-bold pb-11">
            <span className="text-[#ed195c] animate-pulse">Port</span>
            <span>FIAP</span>
            <span className="text-[#ed195c] animate-pulse">olio</span>
          </h1>

          <h2 className="text-2xl mt-4">Selecione o Aluno:</h2>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {alunos.map((aluno) => (
              <div 
                key={aluno.$id} 
                className="flex flex-col items-center justify-between p-4 border border-[#ed195c] text-center transition hover:shadow-lg hover:scale-105 h-full"
              >

                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-[#ed195c] flex-shrink-0">
                <Image 
                    src={alunosDescricoes[aluno.nome]?.fotoUrl ? `/img/${alunosDescricoes[aluno.nome].fotoUrl}` : "/img/default-avatar.jpg"}
                    alt={aluno.nome} 
                    width={128}  
                    height={128} 
                    className="rounded-full"
                  />
                </div>

                <p className="text-xl font-medium mb-2">{aluno.nome}</p>

                {alunosDescricoes[aluno.nome]?.github && (
                  <a 
                    href={alunosDescricoes[aluno.nome]?.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 mb-4"
                  >
                    Acessar GitHub
                  </a>
                )}

                <p className="text-sm text-justify text-gray-500 mb-4">
                  {alunosDescricoes[aluno.nome]?.descricao?.split("\n").map((linha, index) => (
                    <span key={index}>{linha}<br /></span>
                  ))}
                </p>

                <button 
                  onClick={() => handleAlunoSelect(aluno)}  
                  className="px-4 py-2 border border-none text-white bg-[#ed195c] hover:text-black hover:bg-white transition uppercase"
                >
                  Ver notas
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold">Aluno Selecionado: {selectedAluno?.nome}</h1> 
          <button 
            onClick={handleBack} 
            className="mt-4 px-4 py-2 border border-none text-white bg-[#ed195c] hover:text-black hover:bg-white transition uppercase">
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}
