import axios from "axios";

export async function checkLogin(loginInfor) {
    try{
        const response = await axios.get("https://back-end-c07.onrender.com/accounts");
        const account = response.data.find(ac => ac.username == loginInfor.username && ac.password == loginInfor.password);
        if (account!=null){
            return account;
        }else {
            return null
        }
    }catch (e) {
        return null;
    }

}