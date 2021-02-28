import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface IUser {
    avatar_url: string;
    name: string;
    login: string;
}

interface IAuthContextData {
    singIn: (userName: string) => void;
    logout: () => void;
    userAuth: IUser;
}

interface IAuthContextProps {
    children: ReactNode;
}



export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthContextProps) {
    const router = useRouter();
    const [userAuth, setUserAuth] = useState<IUser>({} as IUser);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    async function loadUserCookie(): Promise<void> {
        const userCookie = Cookies.get('user');
        if (typeof (userCookie) !== 'undefined') {
            const userCookieParse = JSON.parse(userCookie) as IUser;
            const userParams = {
                avatar_url: userCookieParse.avatar_url ?? '',
                name: userCookieParse.name ?? '',
                login: userCookieParse.login ?? '',
            };
            setUserAuth(userParams)
        }
    }
    

    useEffect(() => {
        loadUserCookie();
    }, []);

    async function singIn(userName: string) {
        try {
            const response = await fetch(`https://api.github.com/users/${userName}`);
            const data = await response.json();
            if (data.message) {
                alert(`${data.message === 'Not Found' ? 'Seu usuário não foi encontrado' : data.message}`);
                return;
            }
            const userData = {
                avatar_url: data.avatar_url,
                name: data.name,
                login: data.login
            };
            console.log(userAuth, isAuthenticated);
            setIsAuthenticated(true);
            Cookies.set('user', JSON.stringify(userData));
            loadUserCookie();
            router.push('/');
        } catch (err) {
            alert("Github não responde");
        }
    }

    useEffect(() => {
        if (isAuthenticated == false) {
            router.push('/login');
        }
    }, [isAuthenticated]);

    function logout() {
        setIsAuthenticated(false);
        Cookies.remove('user');
        setUserAuth({} as IUser);
    }

    return (
        <AuthContext.Provider value={{
            userAuth,
            singIn,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}