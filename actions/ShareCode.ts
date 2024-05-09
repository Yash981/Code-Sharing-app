"use server"

import { db } from "@/lib/db"
export type Props = {
    code: string
    language: string
    mode: string

}
export async function ShareCode({code,language,mode}:Props) {
    const codey = await db.codeSnippet.create({
        data: {
            code : code,
            codeLanguage : language,
            theme : mode
        },
    })
    return codey
}

export async function getSharedCode(id:string) {
    const codey = await db.codeSnippet.findUnique({
        where: {
            id: id
        }
    })
    return codey
}