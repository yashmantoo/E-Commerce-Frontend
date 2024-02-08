import { publicRequest } from "../apiRequests"
import { loginStart, loginSuccess, loginFailure } from "./userRedux"

export const login = async(dispatch, user) => {
    dispatch(loginStart())
    try {
        console.log(user)
        const res = await publicRequest.post("/auth/logIn", user)
        console.log(res.data.success)
        if (res.data.success === true) {
            dispatch(loginSuccess(res.data))
        } else {
            dispatch(loginFailure())
            return (res.data.success)
        }
    } catch (error) {
        dispatch(loginFailure())
    }
}