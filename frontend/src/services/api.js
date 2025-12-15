/**
 * @fileoverview API Service - Manejo de peticiones para autenticación
 */

const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Obtener el token CSRF de las cookies
 */
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/**
 * Obtener el token CSRF del servidor
 */
async function fetchCSRFToken() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/csrf/`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Error al obtener CSRF token');
        }
        return getCookie('csrftoken');
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }
}

/**
 * Función genérica para hacer peticiones con CSRF
 */
async function apiFetch(url, options = {}) {
    const defaultOptions = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    // Si es POST, agregar el token CSRF
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method?.toUpperCase())) {
        const csrfToken = getCookie('csrftoken');
        if (csrfToken) {
            defaultOptions.headers['X-CSRFToken'] = csrfToken;
        } else {
            await fetchCSRFToken();
            const newCsrfToken = getCookie('csrftoken');
            if (newCsrfToken) {
                defaultOptions.headers['X-CSRFToken'] = newCsrfToken;
            }
        }
    }

    const mergedOptions = { ...defaultOptions, ...options };

    try {
        const response = await fetch(url, mergedOptions);
        
        if (response.status === 204) {
            return { success: true };
        }

        const data = await response.json();

        if (!response.ok) {
            if (data.error) {
                throw new Error(data.error);
            }
            if (typeof data === 'object') {
                const errors = Object.values(data).flat().join(', ');
                throw new Error(errors || 'Error en la petición');
            }
            throw new Error(data.detail || 'Error en la petición');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// API de Autenticación
export const authAPI = {
    checkAuth: async () => {
        return apiFetch(`${API_BASE_URL}/auth/check/`, {
            method: 'GET',
        });
    },

    login: async (username, password) => {
        return apiFetch(`${API_BASE_URL}/auth/login/`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    },

    register: async (userData) => {
        return apiFetch(`${API_BASE_URL}/auth/register/`, {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },
};

export default { authAPI };

