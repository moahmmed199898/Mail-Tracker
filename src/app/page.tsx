"use client"

import { sleep } from "@/Services/Util"
import { useEffect, useState } from "react"

export default function App() {
  const [newMail, setNewMail] = useState(false)
  const [lastCheck, setLastCheck] = useState("")

  const updateNewMailStatus = async () => {
    const data = await fetch("./api").then(b => b.json())
    setNewMail(data.newMail)
    setLastCheck(new Date().toString())
    await sleep(process.env.NEXT_PUBLIC_Mail_Check_Interval as unknown as number * 1000)
    updateNewMailStatus()
    console.log("updated")
  }

  useEffect(() => {
    updateNewMailStatus()
  }, [])
  return <div className={`w-screen h-screen text-center grid items-center text-8xl transition-all
  ${lastCheck === "" ? "bg-yellow-700" : null}
  ${lastCheck && newMail ? "bg-red-700" : null}
  ${lastCheck && !newMail ? "bg-green-700" : null}
  `}>
    
    {lastCheck === "" ? "Loading...." : null}
    {lastCheck && newMail ? process.env.NEXT_PUBLIC_New_Mail_Text : null}
    {lastCheck && !newMail ? process.env.NEXT_PUBLIC_No_New_Mail_Text : null}
  
    <span className="text-sm absolute left-10 bottom-10">Last updated: {lastCheck}</span>
  </div>

}