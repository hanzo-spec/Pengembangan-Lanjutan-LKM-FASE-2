import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null); 

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("portofolio_user");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("portofolio_user", JSON.stringify(user));
        } else {
            localStorage.removeItem("portofolio_user");
        }
    }, [user]);

    function login(email, password) {
        if (!email.trim() || !password.trim()) {
            return false;
        }
        setUser({ name: email.split("@")[0], email });
        return true;
    }

    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}