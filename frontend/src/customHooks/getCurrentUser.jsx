import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice.js";

const useGetCurrentUser = () => {
    console.log("Hook Called")
    const dispatch = useDispatch();

    useEffect(() => {
         console.log("EFFECT RUN");
        const fetchUser = async () => {
            try {
                console.log("done");
                const result = await axios.get(
                    "http://localhost:8000/api/users/me"
                ,{ withCredentials: true });
                dispatch(setUserData(result.data));
                console.log(result.data);
            } catch (error) {
                console.log(error);
                dispatch(setUserData(null));
            }
        };

        fetchUser();

    }, [dispatch]);
};

export default useGetCurrentUser;