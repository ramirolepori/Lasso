const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  // Aquí se puede agregar la lógica para verificar las credenciales del usuario
  console.log(`Email: ${email} | Password: ${password}`);
});