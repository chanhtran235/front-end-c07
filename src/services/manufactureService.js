
import axios from "axios";
export async function getAllManufacture() {
    try{
        const res = await axios.get("https://back-end-c07.onrender.com/manufactures");
        return res.data;
    }catch (e) {
        return []
    }

}