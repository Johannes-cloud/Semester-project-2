import createMenu from "./components/common/createMenu.js";
import headers from './headers.js'

createMenu();

export async function onCreateExampleWithMedia(event) {
  event.preventDefault();
  const form = event.target;
  const action = form.action;
  const method = form.method;
  const enctype = form.enctype;

  const originalFormData = new FormData(form);
  const body = new FormData();

  for (const [key, value] of originalFormData.entries()) {
    if (key.includes("files.")) {
      body.append(key, value);
      originalFormData.delete(key);
    }
  }

  const data = Object.fromEntries(originalFormData.entries());
  body.append("data", JSON.stringify(data));

  const response = await fetch(action, { body, method, enctype, headers });

  if (response.ok) {
    window.location = "index.html";
  }
}

const createForm = document.querySelector("form#create");

if (createForm) {
  createForm.addEventListener("submit", onCreateExampleWithMedia);
}