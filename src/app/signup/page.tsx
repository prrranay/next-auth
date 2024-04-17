"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';



function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })
  const [buttonDiabaled, setButtonDiabaled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignup= async ()=>{
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup",user);
      console.log(response);
      router.push("/login");
    } catch (error:any) {
      console.log("signup error: ", error);
      toast.error(error.response.data.error);
    }
  }
  const onChan = (e:any) => {
    setUser({...user, [e.target.id]: e.target.value })
  }
  useEffect(() => {
    if(user.email.length>0 && user.password.length>0 && user.username.length>0) {
      setButtonDiabaled(false);
    }else{
      setButtonDiabaled(true);
    }
  }, [user])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing":"Signup"}</h1>
      <label htmlFor="username">Username:</label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id='username' value={user.username} onChange={(e)=>onChan(e)} type="text" />
      <label htmlFor="email">Email:</label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id='email' value={user.email} onChange={(e)=>onChan(e)} type="text" />
      <label htmlFor="password">Password:</label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id='password' value={user.password} onChange={(e)=>onChan(e)} type="Password" />
      <button onClick={onSignup}  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        {buttonDiabaled? "No sign up" : "Sign Up"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  )
}

export default Signup