"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';



function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [buttonDiabaled, setButtonDiabaled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLogin= async ()=>{
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login",user);
      console.log(response);
      router.push("/profile");
    } catch (error:any) {
      console.log("login error: ", error);
      toast.error(error.response.data.error);
    }
  }
  const onChan = (e:any) => {
    setUser({...user, [e.target.id]: e.target.value })
  }
  useEffect(() => {
    if(user.email.length>0 && user.password.length>0) {
      setButtonDiabaled(false);
    }else{
      setButtonDiabaled(true);
    }
  }, [user])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing":"Login"}</h1>
      <label htmlFor="email">Email:</label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id='email' value={user.email} onChange={(e)=>onChan(e)} type="text" />
      <label htmlFor="password">Password:</label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id='password' value={user.password} onChange={(e)=>onChan(e)} type="Password" />
      <button onClick={onLogin}  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        {buttonDiabaled? "No Login" : "Login"}
      </button>
      <Link href="/signup">Visit SignUp Page</Link>
    </div>
  )
}

export default Login