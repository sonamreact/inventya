import React, { useState, useCallback, useEffect } from 'react';
import { notification } from 'antd';
import Parameters from '../parameters';
import API_SERVICE from 'client/src/services/api-service';

let AUTH_TOKEN: any = null;
let listener: any = null;

interface AuthToken {
    user: any;
    token: string;
}

interface AuthContextProps {
    authToken: AuthToken | null;
    user: any | undefined;
    isAuth: boolean;
    updateAuthToken: (authToken: AuthToken | null) => void;
}


const AuthContext = React.createContext<AuthContextProps>({
    authToken: null,
    user: undefined,
    isAuth: false,
    updateAuthToken: () => {
    },
});

function AuthProvider({ children }: any) {
    const [authToken, setAuthToken] = useState(() => {
        const authTokenStr = localStorage.getItem('user');
        const lAuthToken = authTokenStr ? JSON.parse(authTokenStr) : undefined;
        AUTH_TOKEN = lAuthToken;
        return lAuthToken;
    });
    const [isAuth, setIsAuth] = useState(() => {
        const authTokenStr = localStorage.getItem('user');
        const lAuthToken = authTokenStr ? JSON.parse(authTokenStr) : undefined;
        return !!lAuthToken && !!lAuthToken.token;
    });
    const [user, setUser] = useState<any | undefined>(
        authToken && authToken.user,
    );
    const fetchSelf = async () => {
        try {
            const { data: { data } } = await API_SERVICE.self();
            const u = { ...authToken.user, ...data};
            const localData = authToken || {};
            localData['user'] = u;
            localStorage.setItem('user', JSON.stringify(localData));
            setUser(u);
            setIsAuth(true);


            // const u = { ...data, role: data.roles[0] };
            // const localData = authToken || {};
            // localData['user'] = authToken.user;
            // localStorage.setItem('user', JSON.stringify(localData));
            // setUser(authToken.user);
            // setIsAuth(true);
        } catch (e) {
            notification.error({ message: API_SERVICE.handleErrors(e) });
        }
    };
    const updateAuthToken = useCallback((pAuthToken: any) => {
        if (pAuthToken) {
            localStorage.setItem('user', JSON.stringify(pAuthToken));
        } else {
            localStorage.removeItem('user');
        }
        AUTH_TOKEN = pAuthToken;
        setAuthToken(pAuthToken);

    }, []);

    useEffect(() => {
        if(authToken){
            fetchSelf();
        }
    }, [authToken]);

    return (
        <AuthContext.Provider
            value={{ updateAuthToken, authToken, user, isAuth }}
        >
            {children}
        </AuthContext.Provider>
    );
}

const AuthConsumer = AuthContext.Consumer;

/**
 * We use this function to be able to access
 * the auth token from outside React components.
 */
function getAuthToken() {
    return AUTH_TOKEN;
}

function getUrlFormatedToken() {
    const token = getAuthToken();
    return token ? encodeURIComponent(token.value) : '';
}

function logout() {
    if (listener != null) {
        listener(null);
    }
    //console.log('here');
    localStorage.clear();
    window.location.reload();
    notification.error({ message: 'You are logged out' });
}

export {
    AuthProvider,
    AuthConsumer,
    AuthContext,
    getAuthToken,
    getUrlFormatedToken,
    logout,
};
