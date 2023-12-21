import { publicRequest } from "../apiRequests"
import { loginStart, loginSuccess, loginFailure } from "./userRedux"

export const login = async(dispatch, user) => {
    dispatch(loginStart())
    try {
        console.log(user)
        const res = await publicRequest.post("/auth/logIn", user)
        console.log(res)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}