import createMenu from "./components/common/createMenu.js";

createMenu();

async function onLogin(event) {
    event.preventDefault();
    const form = event.target;
    const body = new FormData(form);
    const method = form.method;
  
    const response = await fetch(form.action, { method, body })
    const result = await response.json()
  
    if (response.ok) {
      localStorage.setItem('token', result.jwt)
      localStorage.setItem('user', JSON.stringify(result.user))
      location.href = '/'
    } else {
      alert(result.error.message)
    }
  }
  
  const loginForm = document.querySelector("form#login");
  
  if (loginForm) {
    loginForm.addEventListener("submit", onLogin);
 }