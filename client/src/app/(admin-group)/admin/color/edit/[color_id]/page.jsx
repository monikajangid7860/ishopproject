"use client";

import { useEffect,useRef,useState } from "react";
import { useParams } from "next/navigation";
import { slugGenerator,notify,axiosApiInstance } from "@/helper/helper";
import { getColorById } from "@/api-calls/color";

export default function EditColor(){
  const { color_id }=useParams();
  const nameRef=useRef(null);
  const slugRef=useRef(null);
  const codeRef=useRef(null);
  const statusRef=useRef(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    if(!color_id)return;
    const fetchColor=async()=>{
      try{
        const data=await getColorById(color_id);
        if(!data||data.flag!==1||!data.color){
          notify("Color not found",0);
          return;
        }
        const { name,slug,code,status }=data.color;
        nameRef.current.value=name;
        slugRef.current.value=slug;
        codeRef.current.value=code;
        statusRef.current.checked=status;
      }catch(error){
        console.error(error);
      }finally{
        setLoading(false);
      }
    };
    fetchColor();
  },[color_id]);

  const createSlug=()=>{
    slugRef.current.value=slugGenerator(nameRef.current.value);
  };

  const submitHandler=async(e)=>{
    e.preventDefault();
    const payload={
      name:nameRef.current.value,
      slug:slugRef.current.value,
      code:codeRef.current.value,
      status:statusRef.current.checked
    };
    try{
      const response=await axiosApiInstance.put(`color/update/${color_id}`,payload);
      notify(response.data.msg,response.data.flag);
    }catch(error){
      console.error(error);
      notify("Internal Server Error",0);
    }
  };

  if(loading){
    return(
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-xl">
        <p className="text-sm text-gray-500">Loading color details…</p>
      </div>
    );
  }

  return(
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm max-w-xl w-full">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Edit Color</h2>
        <p className="text-sm text-gray-500">Update color name, shade, and status</p>
      </div>

      <form onSubmit={submitHandler} className="p-6 space-y-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Color Name</label>
          <input
            ref={nameRef}
            onChange={createSlug}
            type="text"
            maxLength={20}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Slug</label>
          <input
            ref={slugRef}
            type="text"
            readOnly
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 cursor-not-allowed"
          />
          <p className="text-xs text-gray-400">Auto-generated from color name</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Color Code</label>
          <div className="flex items-center gap-4">
            <input
              ref={codeRef}
              type="color"
              className="h-12 w-20 rounded-lg border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={codeRef.current?.value||""}
              readOnly
              className="w-32 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input ref={statusRef} type="checkbox" id="status" className="w-4 h-4"/>
          <label htmlFor="status" className="text-sm text-gray-700">Active</label>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition focus:ring-2 focus:ring-gray-800"
        >
          Update Color
        </button>
      </form>
    </section>
  );
}
