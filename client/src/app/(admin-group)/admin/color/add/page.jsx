'use client'
import { axiosApiInstance,slugGenerator,notify } from "@/helper/helper";
import { useRef } from "react";

const AddCategoryForm=()=>{
  const categoryRef=useRef();
  const slugRef=useRef();

  function createSlug(){
    const slug=slugGenerator(categoryRef.current.value);
    slugRef.current.value=slug;
  }

  const submitHandler=(event)=>{
    event.preventDefault();
    const data={
      name:categoryRef.current.value,
      slug:slugRef.current.value,
      code:event.target.code.value
    };

    axiosApiInstance.post("color/create",data).then(
      (response)=>{
        notify(response.data.msg,response.data.flag);
        if(response.data.flag==1){
          categoryRef.current.value="";
          slugRef.current.value="";
        }
      }
    ).catch(()=>notify("Internal Server Error",0));
  };

  return(
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm max-w-xl w-full">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Add New Color</h2>
        <p className="text-sm text-gray-500">Create a color option for products</p>
      </div>

      <form onSubmit={submitHandler} className="p-6 space-y-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Color Name</label>
          <input
            type="text"
            ref={categoryRef}
            onChange={createSlug}
            placeholder="e.g. Black, Silver"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            ref={slugRef}
            readOnly
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 cursor-not-allowed"
          />
          <p className="text-xs text-gray-400">Auto-generated from color name</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Color Code</label>
          <div className="flex items-center gap-4">
            <input type="color" name="code" className="h-10 w-16 rounded-md border border-gray-300 cursor-pointer"/>
            <span className="text-xs text-gray-500">Pick the exact color shade</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500"
        >
          Add Color
        </button>
      </form>
    </section>
  );
};

export default AddCategoryForm;
