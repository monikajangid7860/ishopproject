'use client'
import { axiosApiInstance,slugGenerator,notify } from "@/helper/helper";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const BrandEdit=({ brand,baseURL })=>{
  const router=useRouter();
  const brandRef=useRef();
  const slugRef=useRef();

  function createSlug(){
    const slug=slugGenerator(brandRef.current.value);
    slugRef.current.value=slug;
  }

  const submitHandler=(event)=>{
    event.preventDefault();
    const formData=new FormData();
    formData.append("image",event.target.image.files[0]||null);
    formData.append("name",brandRef.current.value);
    formData.append("slug",slugRef.current.value);

    axiosApiInstance.put("brand/update/"+brand._id,formData).then(
      (response)=>{
        notify(response.data.msg,response.data.flag);
        if(response.data.flag==1){
          router.push("/admin/brand");
          brandRef.current.value="";
          slugRef.current.value="";
        }
      }
    ).catch(()=>notify("Internal Server Error",0));
  };

  return(
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm max-w-2xl w-full">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Edit Brand</h2>
        <p className="text-sm text-gray-500">Update brand details and logo</p>
      </div>

      <form onSubmit={submitHandler} className="p-6 space-y-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Brand Name</label>
          <input
            type="text"
            ref={brandRef}
            defaultValue={brand?.name}
            onChange={createSlug}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Brand Slug</label>
          <input
            type="text"
            ref={slugRef}
            defaultValue={brand.slug}
            readOnly
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 cursor-not-allowed"
          />
          <p className="text-xs text-gray-400">Auto-generated and cannot be edited</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Brand Image</label>
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-xl bg-white ring-1 ring-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
              {brand.image_name?(
                <img src={baseURL+brand.image_name} alt={brand.name} className="w-full h-full object-contain p-2"/>
              ):null}
            </div>
            <input
              type="file"
              name="image"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500"
        >
          Update Brand
        </button>
      </form>
    </section>
  );
};

export default BrandEdit;
