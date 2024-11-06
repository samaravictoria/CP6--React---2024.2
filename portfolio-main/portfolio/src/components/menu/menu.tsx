"use client";
import { TipoAluno } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react'; 

const Menu = ({params}: {params: {id:number}}) => {
  const pathname = usePathname();
   
  const [aluno, setAluno] = useState<TipoAluno | null>(null);

  const chamadaApi = async () => {
    const response = await fetch(`/api/alunos/${params.id}`);
    const dados = await response.json();
    setAluno(dados);
  }

  useEffect(() => {
    chamadaApi();
  }, []);

  return (
    <nav className="justify-center w-full ml-64 pl-64 mt-20 space-x-4">
      <Link 
        href={`/perfil/${aluno?.$id}`} 
        className={`bg-[#1f1f1f] text-white hover:bg-[#ed195c] px-6 py-4 text-center transition duration-300 ${pathname.startsWith ('/perfil') ? 'bg-[#ed195c]' : ''}`}
      >
        Sobre
      </Link>

      <Link 
        href={`/medias/${aluno?.$id}`} 
        className={`bg-[#1f1f1f] text-white hover:bg-[#ed195c] px-6 py-4 text-center transition duration-300 ${pathname.startsWith(`/medias`) ? 'bg-[#ed195c]' : ''}`}
      >
        Media
      </Link>

      {aluno && aluno.$id && (
        <Link 
          href={`/checkpoint/${aluno?.$id}`} 
          className={`bg-[#1f1f1f] text-white hover:bg-[#ed195c] px-6 py-4 text-center transition duration-300 ${pathname.startsWith('/checkpoint') ? 'bg-[#ed195c]' : ''}`}
        >
          Checkpoint
        </Link>
      )}

      <Link 
        href={`/challenge/${aluno?.$id}`} 
        className={`bg-[#1f1f1f] text-white hover:bg-[#ed195c] px-6 py-4 text-center transition duration-300 ${pathname.startsWith ('/challenge') ? 'bg-[#ed195c]' : ''}`}
      >
        Challenge
      </Link>

      <Link 
        href={`/global-solution/${aluno?.$id}`} 
        className={`bg-[#1f1f1f] text-white hover:bg-[#ed195c] px-6 py-4 text-center transition duration-300 ${pathname.startsWith ('/global-solution') ? 'bg-[#ed195c]' : ''}`}
      >
        Global Solution
      </Link>
    </nav>
  );
};

export default Menu;
