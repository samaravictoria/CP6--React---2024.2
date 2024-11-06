import { NextResponse } from 'next/server';
import { client } from "@/lib/appwrite_client";
import { Databases, Query } from "appwrite";

const database = new Databases(client);

export async function GET() {

  try {
    
    const response = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ID_ALUNOS as string, [Query.orderAsc("$createdAt")]
    );
    return NextResponse.json(response.documents);

  } catch (err) {
    console.error("Falha na obtenção de dados: ", err);
    return NextResponse.json({message: "Falha na obtenção de dados " + err}, {status: 500});
  }
  
}
