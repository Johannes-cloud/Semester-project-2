export function onLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location = 'login.html'
}