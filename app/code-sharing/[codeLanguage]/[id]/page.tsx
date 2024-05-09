import { getSharedCode } from "@/actions/ShareCode"
import CodeSharedEditor from "@/components/CodeSharedEditor"
export type PropsCodeShre = {
    id: string
    code: string
    codeLanguage: string
    theme: string
} | null

export default async function CodeShared({params}:{params:any}) {
    const sharedCode = await getSharedCode(params.id)
    
    if (!sharedCode) {
        console.error('Shared code not found');
        return null; 
    }
    return (
        <>
            <CodeSharedEditor sharedCode={sharedCode}/>
        </>
    )
}