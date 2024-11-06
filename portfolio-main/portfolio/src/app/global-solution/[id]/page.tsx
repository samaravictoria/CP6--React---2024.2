/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Menu from "@/components/menu/menu";
import { TipoGs, TipoAluno } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { alunosDescricoes } from "@/descricoes";

export default function GlobalSolutions({ params }: { params: { id: number } }) {
  const [gs, setGs] = useState<TipoGs[]>([]);
  const [aluno, setAluno] = useState<TipoAluno | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [materia, setMateria] = useState("");
  const [semestre, setSemestre] = useState("");
  const [nota, setNota] = useState("");
  const [descricao, setDescricao] = useState(""); 
  const router = useRouter();

  const materias = [
    "Artificial Intelligence & Chatbot",
    "Building Relational Database",
    "Computational Thinking Using Python",
    "Domain Driven Design Using Java",
    "Front-End Design Engineering",
    "Software Engineering and Business Model"
  ];

  const semestres = ["1 Semestre", "2 Semestre"];

  const chamadaApi = async () => {
    const responseGs = await fetch(`/api/gs/${params.id}`);
    const dadosGs = await responseGs.json();
    setGs(dadosGs);

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

  const handleAdicionarNota = async () => {
    if (!materia || !semestre || !nota || !descricao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const notaNumerica = Math.max(0, Math.min(100, parseInt(nota, 10)));

    if (isNaN(notaNumerica) || notaNumerica < 0 || notaNumerica > 100) {
      alert("Por favor, insira um valor válido para a nota (número entre 0 e 100).");
      return;
    }

    try {
      const response = await fetch(`/api/gs/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alunos: params.id,
          materia,
          semestre,
          nota: notaNumerica,
          descricao, 
        }),
      });

      if (response.ok) {
        const newGlobalSolution = await response.json();
        setGs((prev) => [...prev, newGlobalSolution]);
        setShowForm(false); 
      } else {
        alert("Erro ao adicionar Global Solution.");
      }
    } catch (error) {
      console.error("Erro ao adicionar Global Solution:", error);
      alert("Erro ao adicionar Global Solution.");
    }
  };

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
          <h2 className="text-2xl text-black mb-4">Notas das Global Solutions</h2>

          <button
            onClick={() => setShowForm(true)}
            className="mb-6 px-6 py-3 bg-white text-black hover:bg-black hover:text-[#ed195c] uppercase transition duration-200"
          >
            Adicionar Nota
          </button>

          {showForm && (
            <div className="bg-[#1f1f1f] p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Adicionar Nova Nota</h3>

              <div className="mb-4">
                <label className="text-white">Matéria</label>
                <select
                  value={materia}
                  onChange={(e) => setMateria(e.target.value)}
                  className="w-full p-2 mt-2 bg-[#333] text-white border border-[#ed195c] rounded"
                >
                  <option value="">Selecione uma matéria</option>
                  {materias.map((mat, index) => (
                    <option key={index} value={mat}>
                      {mat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="text-white">Semestre</label>
                <select
                  value={semestre}
                  onChange={(e) => setSemestre(e.target.value)}
                  className="w-full p-2 mt-2 bg-[#333] text-white border border-[#ed195c] rounded"
                >
                  <option value="">Selecione um semestre</option>
                  {semestres.map((sem, index) => (
                    <option key={index} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="text-white">Nota</label>
                <input
                  type="number"
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  className="w-full p-2 mt-2 bg-[#333] text-white border border-[#ed195c] rounded"
                />
              </div>

              <div className="mb-4">
                <label className="text-white">Descrição</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full p-2 mt-2 bg-[#333] text-white border border-[#ed195c] rounded"
                  placeholder="Escreva uma descrição para a Global Solution..."
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-600 text-white hover:bg-gray-500 uppercase transition duration-200"
                >
                  Voltar
                </button>
                <button
                  onClick={handleAdicionarNota}
                  className="px-6 py-3 bg-[#ed195c] text-white hover:bg-white hover:text-[#ed195c] uppercase transition duration-200"
                >
                  Adicionar
                </button>
              </div>
            </div>
          )}

          {gs.map((g) => (
            <div key={g.$id} className="mb-6">
              <h3 className="font-semibold text-xl text-black mb-2">{g.materia}</h3>
              <div className="mb-2 text-lg text-black">
                <p>Semestre: {g.semestre}</p>
              </div>
              <div className="space-x-10 bg-[#1f1f1f] text-4xl w-24 flex items-center justify-center text-center">
                <p className="text-white">{g.nota}</p>
              </div>
              <div className="mt-5 text-lg text-black">
                <p>Descrição: {g.descricao}</p> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
