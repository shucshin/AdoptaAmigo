import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import PublicarMascota from "./pages/PublicarMascota"; 
import DetalleMascota from "./pages/DetalleMascota"; 
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ListaMascotas from "./components/ListaMascotas";
import MuroMascotas from "./pages/MuroMascotas";
import Anuncio from "./pages/Anuncio";
import EditProfile from "./pages/EditProfile";
import MisMascotas from "./pages/MisMascotas";
import AdminDashboard from "./pages/AdminDashboard";
import { BusquedaProvider } from './context/BusquedaContext';

function AppContent() {
    const location = useLocation();
    
    // Lista de rutas donde no se muestra la navbar
    const noNavbarRoutes = ['/login', '/register'];

    const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Solo muestra el Navbar si no se esta en Login o Register */}
            {shouldShowNavbar && <Navbar/>}
            
            <main className="flex-grow bg-blanco">
              <Routes>
                {/* Rutas de Autenticación */}
                <Route path="/login" element={<Register initialType="login" />} />
                <Route path="/register" element={<Register initialType="register" />} />
                <Route path="/" element={<Home/>}/>
                
                {/* Rutas de Contenido */}
                <Route path="/muro" element={<MuroMascotas/>}/>
                <Route path="/mascotas" element={<ListaMascotas/>}/>
                <Route path="/publicar" element={<Anuncio />} />
                <Route path="/mascota/:id" element={<DetalleMascota />} />
                <Route path="/perfil" element={<EditProfile />} />
                <Route path="/mis-mascotas" element={<MisMascotas />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer/>
        </div>
    );
}

// El componente App solo se encarga de envolver con BrowserRouter y AuthProvider
export default function App() {
  // NOTA: Asegúrate de que AuthProvider (del AuthContext) envuelva a este componente
  // en tu archivo index.js o main.jsx para que las ProtectedRoutes funcionen.
  return (
    <BrowserRouter>
      <AuthProvider>
        <BusquedaProvider>
            <AppContent />
        </BusquedaProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}