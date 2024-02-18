import { useNavigate } from "react-router-dom";
import { store } from "../Redux/Store";
import { useEffect } from "react";


function useVerifyLoggedIn() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = store.getState().auth.token;
        if (!token) {
            navigate("/home");
        }
    }, [])

    return store.getState().auth.user
}

export default useVerifyLoggedIn;