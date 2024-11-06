import { NextResponse } from 'next/server';
import { client } from "@/lib/appwrite_client";
import { Databases, Query } from "appwrite";

const database = new Databases(client);

export async function GET(request: Request, { params }: { params: { id: string}}) {

    try {

        const { id } = await params;

        const response = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ID_MEDIA as string, 
            [
                Query.equal("alunos", id),
                Query.orderAsc("$createdAt")
            ]
            );
        return NextResponse.json(response.documents)

    } catch (e) {
        console.error("Falha na recuperação de dados: ", e);
        return NextResponse.json({ message: "Falha na recuperação de dados " + e }, { status: 500 });
    }
}