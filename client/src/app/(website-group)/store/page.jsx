import HeroCarousel from '@/components/website/HeroCarousel'

import Storemain from '@/components/website/Storemain'
import { getProducts } from '@/api-calls/products'
import React from 'react'
import ListingHeader from './ListingHeader'
import { Scroll } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'


async function page( {params,searchParams}) {
  const query = {status:true}
  const UrlSearchParams = await searchParams
  console.log(UrlSearchParams)
  if(UrlSearchParams.colors){
    query.colors =await UrlSearchParams.colors
  }
  if(UrlSearchParams.brands){
    query.brands =await UrlSearchParams.brands
  }
  if (UrlSearchParams.sortby) {
    query.sortby = await UrlSearchParams.sortby;
  }
  if (UrlSearchParams.limit) {
    query.limit = await UrlSearchParams.limit;
  }
console.log(query)
  const productsJson = await getProducts(query);
  const productsData = productsJson.products;
  const imgurl =productsJson.imageUrl;
  console.log(productsData)

  return (
  <>
 <ListingHeader/>

<Storemain products={productsData} imgurl={imgurl} />

  </>
  )
}

export default page
