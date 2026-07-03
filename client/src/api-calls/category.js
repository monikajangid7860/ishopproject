

import { axiosApiInstance } from "@/helper/helper"

async function getCategories(queryParams = {}) {
    const query = new URLSearchParams();
    if(queryParams.limit) {
        query.append("limit", queryParams.limit);
    }
    if(queryParams.status) {
        query.append("status", queryParams.status);
    }
    if(queryParams.home) {
        query.append("home", queryParams.home);
    }
    if(queryParams.top) {
        query.append("top", queryParams.top);
    }   
    if(queryParams.best){
        query.append("best", queryParams.best);
    }
    if(queryParams.slug) {
        query.append("slug", queryParams.slug);
    }
    console.log(query.toString());
    try {
        const response = await axiosApiInstance.get(`category?${query.toString()}`)
        
        if (response.data.flag == 1) {
            return response.data
        } else {
            console.log("API ERROR:", error.response?.data || error.message);
            return []
            
        }
    } catch (error) {
        console.log("API ERROR:", error.response?.data || error.message);

        return []
        
    }

}


async function getCategoryById(id) {
    try {
        const response = await axiosApiInstance.get(`category/${id}`)
        if (response.data.flag == 1) {
            return response.data
        } else {
            return {}
        }
    } catch (error) {
        return {}
    }

}




export { getCategories, getCategoryById }