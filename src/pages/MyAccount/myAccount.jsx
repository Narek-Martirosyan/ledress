import "./myAccount.scss";
import { getUser } from "../../api/user_API";
import { useEffect } from "react";
import { useState } from "react";

export const MyAccount = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser().then(res => setUser(res.data.user));
    }, []);

    return (
        <div>
            <h1>Page is coming :)</h1>
            <img src={user?.avatar?.[0]?.url} alt="" width={300}/>
        </div>
    )
}