// pages/404.tsx
"use client";

import Link from 'next/link';
import React from 'react';
import '@/app/globals.css'; // Certifique-se de que o arquivo de estilos globais esteja sendo importado

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8 animate-blink">Erro 404: Página Não Encontrada</h1>
        <Link href="/" passHref>
          <button 
            className="mt-4 px-4 py-2 border-none text-white bg-[#ed195c] hover:text-black hover:bg-white transition uppercase"
          >
            Voltar para a Página Inicial
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;