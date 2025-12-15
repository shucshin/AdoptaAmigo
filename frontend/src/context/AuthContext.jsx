import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Mascotas adoptadas por usuario
    const [adoptedPets, setAdoptedPets] = useState([]);


    // Verificar autenticación al cargar la app
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const data = await authAPI.checkAuth();
            
            if (data.isAuthenticated) {
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }

        } catch (error) {
            console.error("Error al verificar autenticación:", error);
            setUser(null);
            setIsAuthenticated(false);

        } finally {
            setIsLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const data = await authAPI.login(username, password);
            setUser(data.user);
            setIsAuthenticated(true);
            return { success: true, user: data.user };

        } catch (error) {
            console.error("Error en login:", error);
            return {
                success: false,
                error: error.message || "Error al iniciar sesión"
            };
        }
    };

    const register = async (userData) => {
        try {
            const data = await authAPI.register(userData);
            setUser(data.user);
            setIsAuthenticated(true);
            return { success: true, user: data.user };

        } catch (error) {
            console.error("Error en registro:", error);
            return {
                success: false,
                error: error.message || "Error al registrar usuario"
            };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout(); // <-- llama al backend
        } catch (error) {
            console.warn("El backend dio error en logout, pero igual cerramos sesión:", error);
        }

        setUser(null);
        setIsAuthenticated(false);
        setAdoptedPets([]);
    };

    const adoptarMascota = (petId) => {
        if (!user) return;

        // evita duplicados
        if (!adoptedPets.includes(petId)) {
            setAdoptedPets([...adoptedPets, petId]);
        }
    };

    // Roles del usuario 
    const puedeAdoptar = user?.rol === "Quiero Adoptar";
    const puedePublicar = user?.rol === "Quiero Publicar Mascotas";
    const esAdmin = user?.rol === "Administrador";


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, puedeAdoptar, puedePublicar, esAdmin, adoptedPets, adoptarMascota, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
