export const getMe = async () => {
    const res = await fetch('/api/users/me');
    const data = await res.json();
    return data;
}