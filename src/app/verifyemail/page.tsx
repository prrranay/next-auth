'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


function Verify() {
  const [token, setToken] = useState("")
  const [error, setError] = useState(false)
  const [verifyed, setVerifyed] = useState(false)

  const verifyUser= async ()=>{
    try {
      await axios.post("/api/users/verifyemail", {token});
      setVerifyed(true);
      setError(false)
    } catch (error:any) {
      setError(true);
      console.log(error.resposnse.data);
    }
  }
  useEffect(() => {
    const urltoken=window.location.search.split("=")[1]
    setToken(urltoken || '');
  }, [])
  useEffect(() => {
    if(token.length>0){
      verifyUser();
    }

  }, [token])
  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verifyed && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
  )
}

export default Verify