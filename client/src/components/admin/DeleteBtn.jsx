'use client'

import React from 'react'
import { Trash2 } from "lucide-react";
import { axiosApiInstance, notify } from '@/helper/helper';
import { useRouter } from 'next/navigation';

export default function DeleteBtn({ slug, id }) {
    const router = useRouter()
    function deleteHandler() {
        axiosApiInstance.delete(`${slug}/delete/${id}`).then(
            (response) => {
                console.log(response)
                notify(response.data.msg, response.data.flag)
                if (response.data.flag == 1) {
                    router.refresh()
                }

            }
        ).catch(
            (error) => {
                console.log("Error", error);
            }
        )
    }
    return (
        <button className="text-red-600 cursor-pointer hover:text-red-800 bg-red-50 p-2 rounded-lg shadow-sm transition">
            <Trash2 onClick={deleteHandler} size={17} />
        </button>
    )
}
