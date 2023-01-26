import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

const Logout = () => {
    const [, setCookie] = useCookies(['login']);
    let history = useHistory();

    useEffect(() => {
        // delete login cookie
        setCookie('login', '', { path: '/', expires: new Date(0) });
        history.push("/");
    }, [setCookie, history]);

    return (
        <div>
            Logging out...
        </div>
    );
};

export default Logout;
