import { getBrandById } from '@/api-calls/brand';
import BrandEdit from '@/components/admin/BrandEdit';
import React from 'react'

export default async function page({ params }) {
    const resolvePromise = await params;
    const id = resolvePromise?.brand_id
    const brandData = await getBrandById(id);
    const baseURL = brandData.imageUrl

    return (
        <BrandEdit brand={brandData.brand} baseURL={baseURL} />
    )
}
