// ======================== [ login api ] ================================
export const loginApi = async (credentials) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (response.status === 200) return response.json();

    const { message } = await response.json();
    throw new Error(message);

};
// ======================== [ login api ] ================================

// ====================== [ Register api ] ===============================
export const register = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status === 201) return response.json();

    const { message } = await response.json();
    throw new Error(message);

};
// ====================== [ Register api ] ===============================

// ========================== [ New Property ] ===========================
export const newProperty = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}property/addproperty`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status === 201) return response.json();

    const { message } = await response.json();
    throw new Error(message);
};
// ========================== [ New Property ] ===========================