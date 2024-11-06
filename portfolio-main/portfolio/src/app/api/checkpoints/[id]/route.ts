/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { client } from "@/lib/appwrite_client";
import { Databases, Query } from "appwrite";

const database = new Databases(client);

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ID_CP as string,
      [
        Query.equal("alunos", id),
        Query.orderAsc("$createdAt")
      ]
    )

    return NextResponse.json(response.documents);
  } catch (e) {
    console.error("Falha na recuperação de dados: ", e);
    return NextResponse.json({ message: "Falha na recuperação de dados " + e }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { alunos, materia, semestre, nota, data } = await request.json();

    if (!alunos || !materia || !semestre || !nota || !data) {
      return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ID_CP as string,
      "unique()", 
      {
        alunos,
        materia,
        semestre,
        nota,
        data
      }
    );

    return NextResponse.json(response, { status: 201 });
  } catch (e) {
    console.error("Erro ao adicionar nota: ", e);
    return NextResponse.json({ message: "Erro ao adicionar nota " + e }, { status: 500 });
  }
}
