'use client'

import { axiosApiInstance, notify } from '@/helper/helper';
import React from 'react'
import { useRouter } from 'next/navigation';

export default function StatusToggleBtn({url, status, label, id, flag }) {
    const router = useRouter()
    function getText() {
        if (label == "status") return status ? "Active" : "Inactive";
        if (label == "on_home") return status ? " on Home" : "Not onHome";
        if (label == "is_top") return status ? " on Top " : "Not  on Top ";
        if (label == "is_best") return status ? " as Best" : "Not as Best";
        if (label == "is_hot") return status ? " as Hot" : "Not as Hot";
        if (label == "is_featured") return status ? " Featured" : "Not Featured";
        if (label == "stock") return status ? " In Stock" : "Out of Stock";
        return status ? "Active" : "Inactive";
    }


    function toggleStatus() {
        axiosApiInstance.patch(`${url}`, { flag }).then((response) => {
            
            // notify(response.data.msg, response.data.flag);
            if (response.data.flag == 1) {
                router.refresh();
            }
        }).catch((error) => {
            console.log("Error toggling status", error);
        });
    }
    return (
        <button onClick={toggleStatus}
            className={`px-1 py-1 cursor-pointer rounded text-[10px] font-medium ${status == true
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
                }`}
        >
            {getText()}
        </button>
    )
}
