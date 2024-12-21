
//  viết các hàm trả về action {type: , payload}
// account = {
//     username: "",
//     password: "",
//     role: "" // quyền
// }
import {checkLogin} from "../services/accounServcie";

export function login(loginInfo) {
    return async (dispatch)=>{
        const account = await checkLogin(loginInfo);
        console.log("account after login" + account)
        if (account!=null){
            dispatch(   {
                type: "LOGIN",
                payload: account
            })
            return true;
        }else {
            console.log("login khong thanh cong");
            return false;
        }

    }
}

export function logout() {

    return {
        type: "LOGOUT",
        payload: null
    }
}