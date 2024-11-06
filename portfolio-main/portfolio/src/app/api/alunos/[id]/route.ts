import { NextResponse } from "next/server";
import { client } from "@/lib/appwrite_client";
import { Databases } from "appwrite";

const database = new Databases(client);

export async function GET(request: Request, { params }: { params:{ id: string } }) {
    
    try{

        const response = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ID_ALUNOS as string,
            params.id
        );

        return NextResponse.json(response);

    } catch (e) {
        console.error("Falha ao recuperar a informação : ", e);
        return NextResponse.json(
            {message: "Falha ao recuperar a informação: " + e},
            {status: 500}
        )
    }
}
