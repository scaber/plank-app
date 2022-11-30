export const getToken = () => {
    return localStorage.getItem('token');
}

export const removeToken = () => {
    localStorage.removeItem('token');
}

export const setToken = (val:any) => {
    localStorage.setItem('token', val);
}
export const setUser = (val:any) => {
    localStorage.setItem('user', val);
}
export const getUser = () => {
    return localStorage.getItem('user');
}
export const isLoggedIn = (val:any) => {
    localStorage.setItem('token', val);
}