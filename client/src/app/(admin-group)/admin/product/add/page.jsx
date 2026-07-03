'use client';

import { axiosApiInstance,slugGenerator,notify } from "@/helper/helper";
import { useEffect,useRef,useState } from "react";
import { getBrands } from "@/api-calls/brand";
import { getColors } from "@/api-calls/color";
import { getCategories } from "@/api-calls/category";
import Select from "react-select";
import FileUpload from "@/components/common/FileUpload";
import { Editor } from "primereact/editor";

const Add=()=>{
  const [categoryData,setCategoryData]=useState([]);
  const [colorData,setColorData]=useState([]);
  const [brandData,setBrandData]=useState([]);
  const [description,setDescription]=useState("");
  const [colorIds,setColorIds]=useState([]);
  const [mainImage,setMainImage]=useState(null);
  const [loading,setLoading]=useState(false);
  const [selectedCategory,setSelectedCategory]=useState(null);
  const [selectedBrand,setSelectedBrand]=useState(null);
  const [selectedColors,setSelectedColors]=useState([]);

  const nameRef=useRef();
  const slugRef=useRef();
  const originalPriceRef=useRef();
  const finalPriceRef=useRef();
  const discountPercentRef=useRef();

  useEffect(()=>{
    async function fetchData(){
      const brandJSON=await getBrands();
      const colorJSON=await getColors();
      const categoryJSON=await getCategories();
      setCategoryData(categoryJSON.categories||[]);
      setColorData(colorJSON.colors||[]);
      setBrandData(brandJSON.brands||[]);
    }
    fetchData();
  },[]);

  const createSlug=()=>{
    slugRef.current.value=slugGenerator(nameRef.current.value);
  };

  const calculateDiscount=()=>{
    const op=Number(originalPriceRef.current.value);
    const fp=Number(finalPriceRef.current.value);
    if(!op||!fp)return;
    if(fp>op){
      notify("Final price cannot be greater than original price",0);
      discountPercentRef.current.value="";
      return;
    }
    discountPercentRef.current.value=(100-(fp/op)*100).toFixed(2);
  };

  const resetForm=()=>{
    nameRef.current.value="";
    slugRef.current.value="";
    originalPriceRef.current.value="";
    finalPriceRef.current.value="";
    discountPercentRef.current.value="";
    setDescription("");
    setColorIds([]);
    setMainImage(null);
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedColors([]);
  };

  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const formData=new FormData();
      formData.append("name",nameRef.current.value);
      formData.append("slug",slugRef.current.value);
      formData.append("original_price",originalPriceRef.current.value);
      formData.append("final_price",finalPriceRef.current.value);
      formData.append("discount_percentage",discountPercentRef.current.value);
      formData.append("category_id",selectedCategory?.value);
      formData.append("brand_id",selectedBrand?.value);
      formData.append("color_ids",JSON.stringify(colorIds));
      formData.append("description",description);
      formData.append("thumbnail",mainImage?.file);
      const response=await axiosApiInstance.post("product/create",formData);
      if(response.data?.flag===1){
        notify("Product created",1);
        resetForm();
      }else{
        notify("Failed to create product",0);
      }
    }catch{
      notify("Server error",0);
    }finally{
      setLoading(false);
    }
  };

  return(
    <section className="max-w-7xl">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Add Product</h1>
        <p className="text-sm text-gray-500">Create and configure a new product</p>
      </header>

      <form onSubmit={submitHandler} className="space-y-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Basic Information</h3>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="label">Product Name</label>
              <input ref={nameRef} onChange={createSlug} className="admin-input"/>
            </div>
            <div>
              <label className="label">Slug</label>
              <input ref={slugRef} readOnly className="admin-input bg-gray-50"/>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Pricing</h3>
          <div className="grid grid-cols-3 gap-5">
            <input ref={originalPriceRef} onChange={calculateDiscount} type="number" placeholder="Original Price" className="admin-input"/>
            <input ref={finalPriceRef} onChange={calculateDiscount} type="number" placeholder="Final Price" className="admin-input"/>
            <input ref={discountPercentRef} readOnly placeholder="Discount %" className="admin-input bg-gray-50"/>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Attributes</h3>
          <div className="grid grid-cols-3 gap-5">
            <Select value={selectedCategory} onChange={setSelectedCategory} placeholder="Category" options={categoryData.map(c=>({value:c._id,label:c.name}))}/>
            <Select isMulti value={selectedColors} onChange={(opts)=>{setSelectedColors(opts);setColorIds(opts?.map(o=>o.value)||[]);}} placeholder="Colors" options={colorData.map(c=>({value:c._id,label:c.name}))}/>
            <Select value={selectedBrand} onChange={setSelectedBrand} placeholder="Brand" options={brandData.map(b=>({value:b._id,label:b.name}))}/>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Description</h3>
          <Editor value={description} onTextChange={(e)=>setDescription(e.htmlValue)} style={{height:180}}/>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Media</h3>
          <FileUpload onFilesChange={(f)=>setMainImage(f[0])} maxFiles={1}/>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg disabled:opacity-50">
            {loading?"Saving…":"Save Product"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Add;
