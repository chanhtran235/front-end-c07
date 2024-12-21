
import axios from "axios";

export async  function getAllProduct() {

    try {
        const  response = await axios.get("https://back-end-c07.onrender.com/products?_sort=name&_order=asc");
        console.log(response);
        return response.data;

    }catch (e) {
        console.log("lỗi "+e);
        return [];
    }
}

export async  function searchProductByName(searchName,manufactureId) {

    let url =`https://back-end-c07.onrender.com/products?name_like=${searchName}&manufacture.id=${manufactureId}&_sort=name&_order=asc`
    if (manufactureId==""){
        url =`https://back-end-c07.onrender.com/products?name_like=${searchName}&_sort=name&_order=asc`
    }
    try {
        const  response = await axios.get(url);
        console.log("-------search--------")
        console.log(response.data);
        return response.data;
    }catch (e) {
        console.log("lỗi "+e);
        return [];
    }
}


export async function addNewProduct(product) {

    try {
        const  response = await axios.post("https://back-end-c07.onrender.com/products",product);
        console.log("---------service- thêm mới-------------")
    }catch (e) {
        console.log("lỗi "+e);
    }

}

export async function getProductById(id) {
    try {
        const  response = await axios.get("https://back-end-c07.onrender.com/products/"+id);
        console.log(response);
        return response.data;

    }catch (e) {
        console.log("lỗi "+e);
        return null;
    }
}
export async function deleteProductById(id) {
    try {
        const  response = await axios.delete("https://back-end-c07.onrender.com/products/"+id);
        console.log("---------service- thêm mới-------------")
    }catch (e) {
        console.log("lỗi "+e);
    }
}
// viét function xoá