

import { getCategoryById } from '@/api-calls/category';
import CategoryEdit from '@/components/admin/CategoryEdit';
import React from 'react'

export default async function page({ params }) {
    const resolvePromise = await params;
    const id = resolvePromise?.category_id
    const categoryData = await getCategoryById(id);
    const baseURL = categoryData.imageUrl

    return (
        <CategoryEdit category={categoryData.category} baseURL={baseURL} />
    )
}
