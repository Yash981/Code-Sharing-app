"use client"
import { ShareCode } from "@/actions/ShareCode";
import { defaultHtmlCode } from "@/lib/default-code";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from '@/public/assets/NoteCodeLogo.svg'
import Share from '@/public/assets/Share.svg'
import { Editor } from "@monaco-editor/react";
import { PropsCodeShre } from "@/app/code-sharing/[codeLanguage]/[id]/page";
import Link from '@/public/assets/link.svg'


export default function CodeSharedEditor({ sharedCode }: { sharedCode: PropsCodeShre }) {
    const [language, setlanguage] = useState<string>(sharedCode?.codeLanguage || 'html')
  const [mode, setmode] = useState<string>(sharedCode?.theme || 'light')
  const [code, setcode] = useState<string>(sharedCode?.code || defaultHtmlCode)
  const [isButtonDisabled, setisButtonDisabled] = useState(false)
  const [link, setlink] = useState('')

  const handleShare = async () => {
    const data = await ShareCode({ code , language, mode })
    // console.log(data)
    if(typeof window !== 'undefined'){
      const baseUrl = window.location.origin; 
      const sharedUrl = `${baseUrl}/code-sharing/${language}/${data.id}`
      navigator.share({ url: sharedUrl })
    }
    
    setlink('...'+'/' + data.id.substring(0, 10))
    setisButtonDisabled(!isButtonDisabled)
    
  }
  useEffect(()=>{
    setisButtonDisabled(false)
    setlink('')
  },[code])
    return (
        <div className="App relative">
      <div className="w-full h-screen bg-[url('../public/assets/Hero-Background-notecode.svg')] bg-cover bg-no-repeat bg-center" />
      <div className="logo absolute top-0 flex justify-center items-center w-full mt-12">
        <Image src={logo} alt="logo" />
      </div>
      <div className="absolute top-0 flex justify-center items-center w-full mt-24 flex-col gap-4">
        <h2 className='text-3xl font-medium text-black'>Create & Share</h2>
        <h2 className='text-5xl font-medium text-black'>Your Code easily</h2>
      </div>
      <div className="absolute top-0 w-full flex justify-center items-center mt-32 flex-col rounded-xl ">
        <div className={`flex justify-center items-center w-[70%] mt-24 flex-col gap-4 ${mode === 'light' ? 'bg-white' : 'bg-[#1e1e1e]'} rounded-xl pt-5 shadow-2xl`}>
          <Editor
            width="100%"
            height="100vh"
            defaultLanguage={sharedCode?.codeLanguage}
            language={language}
            theme={mode}
            value={code}
            defaultValue={code}
            className="font-['none']"
            onChange={(e) => {
              if (e === undefined) return;
              setcode(e);
            }}
          />
        </div>
        <div className={` selectLanguage  flex justify-start items-start w-[70%]  gap-4 ${mode === 'light' ? 'bg-white' : 'bg-[#1e1e1e]'}   p-5  rounded-b-xl shadow-2xl mb-10`}>
          <select
            name="language"
            id="language"
            className="w-32 h-8  bg-[#CED6E1] text-black rounded-full shadow-sm focus:outline-none appearance-none bg-[url('../public/assets/downArrow.svg')] bg-no-repeat bg-right px-2" value={language} onChange={(e) => setlanguage(e.target.value)}
          >
            <option value="html" >HTML</option>
            <option value="css" >CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
          </select>
          <select
            name="theme"
            id="theme"
            className={`w-32 h-8  bg-[#CED6E1] text-black rounded-full shadow-sm focus:outline-none appearance-none bg-[url('../public/assets/downArrow.svg')] bg-no-repeat bg-right px-2 outline-none`} value={mode} onChange={(e) => setmode(e.target.value)}>
            <option value="light">Light</option>
            <option value="vs-dark">VS Dark</option>
          </select>
          <div className="flex justify-end w-full gap-4 items-center">
            {link && <div className="flex p-2">
              <Image src={Link} alt="link" className='cursor-pointer hover:bg-[#dde1e6] rounded-lg ' onClick={() => navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.origin + '/code-sharing/' + language + '/' + link: '')} title="copy link"/>
              <h1 className={`${mode === 'light' ? 'text-[#1e1e1e]' : 'text-white'}`}>{link}</h1>
            </div>}
            <button className={`w-24 h-10 ${isButtonDisabled === true ? 'bg-[#CED6E1]' : 'bg-[#406AFF] cursor-pointer'}  text-white rounded-full shadow-sm focus:outline-none flex justify-center items-center gap-2 p-2 `} onClick={handleShare} disabled={isButtonDisabled}><Image src={Share} alt="share" />Share</button>
          </div>
        </div>
      </div>
    </div>
    )
}