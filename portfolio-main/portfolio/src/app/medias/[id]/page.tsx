/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Menu from "@/components/menu/menu";
import { TipoMedia, TipoAluno } from "@/types"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { alunosDescricoes } from "@/descricoes";

export default function Medias({ params }: { params: { id: number } }) {
  const [medias, setMedias] = useState<TipoMedia[]>([]);
  const [aluno, setAluno] = useState<TipoAluno | null>(null);  
  const router = useRouter();

  const chamadaApi = async () => {
    const responseMedia = await fetch(`/api/media/${params.id}`);
    const dadosMedia = await responseMedia.json();
    setMedias(dadosMedia);

    const responseAluno = await fetch(`/api/alunos/${params.id}`);
    const dadosAluno = await responseAluno.json();
    setAluno(dadosAluno);
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
                src={
                  alunosDescricoes[aluno.nome]?.fotoUrl
                    ? `/img/${alunosDescricoes[aluno.nome].fotoUrl}`
                    : "/img/default-avatar.jpg"
                }
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
          <h2 className="text-2xl text-black mb-4">Média Geral</h2>
          {medias.map((m) => (
            <div key={m.$id} className="mb-6">
              <h3 className="font-semibold text-xl text-black mb-2">{m.materia}</h3>
              <div className="mb-2 text-lg text-black">
                <p>Semestre: {m.semestre}</p>
              </div>
              <div className="space-x-10 bg-[#1f1f1f] text-4xl w-24 flex items-center justify-center text-center">
                <p className="text-white">{m.nota}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
