
import axios from "axios";
export async function getAllManufacture() {
    try{
        const res = await axios.get("http://localhost:8080/manufactures");
        return res.data;
    }catch (e) {
        return []
    }

}