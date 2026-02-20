import { useState } from 'react';
export default function Login() {
  const [email,setEmail] = useState(''); const [password,setPassword]=useState('');
  const handleSubmit=async(e)=>{e.preventDefault(); const res=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}); if(res.ok){alert('Login success'); window.location.href='/dashboard';} else{alert('Invalid credentials');}}
  return <div className='min-h-screen flex items-center justify-center bg-gray-100'>
    <form className='bg-white p-8 rounded shadow' onSubmit={handleSubmit}>
      <h1 className='text-2xl mb-4'>Login</h1>
      <input type='email' placeholder='Email' className='border p-2 mb-2 w-full' value={email} onChange={e=>setEmail(e.target.value)} />
      <input type='password' placeholder='Password' className='border p-2 mb-4 w-full' value={password} onChange={e=>setPassword(e.target.value)} />
      <button className='bg-blue-500 text-white px-4 py-2 rounded'>Login</button>
    </form>
  </div>;
}