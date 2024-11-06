/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Menu from "@/components/menu/menu";
import { alunosDescricoes } from "@/descricoes";
import { TipoAluno } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Perfil({ params }: { params: { id: number } }) {
  const [aluno, setAluno] = useState<TipoAluno | null>(null); 
  const router = useRouter();

  const chamadaApi = async () => {
    const response = await fetch(`/api/alunos/${params.id}`);
    const dados = await response.json();
    setAluno(dados);
  };

  useEffect(() => {
    chamadaApi();
  }, [params.id]); 

  if (!aluno) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div>
        <Menu params={{ id: params.id }} />
      </div>

      <div className="flex justify-start pt-3 px-6 space-x-6">
        <div className="w-[320px] h-[400px] bg-[#1f1f1f] p-6 border-2 border-[#ed195c]">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-[#ed195c]">
              <Image 
                src={alunosDescricoes[aluno.nome]?.fotoUrl ? `/img/${alunosDescricoes[aluno.nome].fotoUrl}` : "/img/default-avatar.jpg"}
                alt={aluno.nome}
                width={128}  
                height={128} 
                className="rounded-full"
              />
            </div>

            <h1 className="text-3xl text-center font-bold text-[#ed195c] mb-2">{aluno.nome}</h1>
            <p className="text-lg text-gray-300">RM: {aluno.rm}</p>
            <p className="text-lg text-gray-300">Sala: {aluno.sala}</p>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-[#ed195c] text-white hover:bg-white hover:text-[#ed195c] uppercase transition duration-200"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#ed195c] p-6 font-bold">
          <h2 className="text-2xl text-black mb-4">Avaliação FIAP</h2>
          
          <p className="text-lg text-black mb-4">
            Na FIAP, as avaliações são baseadas em uma combinação de provas, trabalhos e projetos práticos.
          </p>
          <p className="text-lg text-black mb-4">
            A nota final do aluno é composta por:
          </p>
          <ul className="list-disc text-black pl-5 mb-4">
            <li>Challenge (20% da nota)</li>
            <li>Checkpoints (20% da nota)</li>
            <li>Global Solution (40% da nota)</li>
          </ul>
          <p className="text-lg text-black mb-4">
            O Challenge é um projeto que envolve todas as disciplinas e, quando necessário, integra elas. Separado por sprints, cada professor é resposável por avaliar o desempenho da equipe em sua matéria.
          </p>
          <p className="text-lg text-black mb-4">
            Durante o semestre, são aplicados 3 Checkpoints, onde a nota final é a média entre as duas maiores notas.
          </p>
          <p className="text-lg text-black mb-4">
            A Global Solution é a avaliação mais importante e engloba todas as disciplinas, integrando-as quando necessário, assim como no Challenge.
          </p>
          <p className="text-lg text-black">
            As notas são atribuídas de acordo com os critérios específicos de cada disciplina e podem incluir a avaliação de habilidades técnicas, resolução de problemas e a capacidade de trabalhar em equipe.
          </p>
        </div>
      </div>
    </div>
  );
}
