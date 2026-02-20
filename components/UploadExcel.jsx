import { useState } from 'react';
export default function UploadExcel() {
  const [file,setFile]=useState(null);
  const handleUpload=async()=>{ if(!file)return alert('اختر ملف Excel');
  const formData=new FormData(); formData.append('file',file);
  const res=await fetch('/api/upload-excel',{method:'POST',body:formData});
  if(res.ok) alert('تم رفع الملف بنجاح'); else alert('حدث خطأ أثناء الرفع');}
  return (<div className='p-4 bg-white rounded shadow'><h2 className='text-lg font-bold mb-2'>رفع ملف Excel للموظفين والحضور</h2>
  <input type='file' accept='.xlsx' onChange={e=>setFile(e.target.files[0])}/>
  <button onClick={handleUpload} className='ml-2 px-4 py-2 bg-blue-500 text-white rounded'>رفع</button></div>); }