import { useDispatch, useSelector } from "react-redux";
import { Register, Login, getMe } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";



export function useAuth(){

    const dispatch = useDispatch();

    async function handlRegisterUser({email,fullname:{firstname,lastname}, password}){
        try {
            dispatch(setError(true));
            const response = await Register({email, fullName:{firstname,lastname}, password})
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Something went wrong'));
        }
        finally{
            dispatch(setError(false));
        }
    }

    async function handleLogin({email,password}){
        try {
            dispatch(setLoading(true));
            const response = await Login({email,password});
            dispatch(setUser(response?.user));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login faild"));
        }finally{
            dispatch(setLoading(false));
             
        }
    }

    async function handlGetme(){
        try {
            dispatch(setLoading(true));
            const response = await getMe();
            console.log("Getme", response)
            dispatch(setUser(response?.user));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'User not found'));
        }finally{
            dispatch(setLoading(false));
        }
    }

    return{
        handlRegisterUser,
        handleLogin,
        handlGetme
    }

}
