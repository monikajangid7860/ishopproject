

import { axiosApiInstance } from "@/helper/helper"

async function getBrands() {
    try {
        const response = await axiosApiInstance.get("brand")
        if (response.data.flag == 1) {
            return response.data
        } else {
            return []
        }
    } catch (error) {
        return []
    }

}


async function getBrandById(id) {
    try {
        const response = await axiosApiInstance.get(`brand/${id}`)
        if (response.data.flag == 1) {
            return response.data
        } else {
            return {}
        }
    } catch (error) {
        return {}
    }

}




export { getBrands, getBrandById }