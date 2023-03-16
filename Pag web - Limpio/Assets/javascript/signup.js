const registerForm = document.querySelector("#register-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  // Aquí se puede agregar la lógica para registrar al usuario
  console.log(`Nombre: ${name}
  Correo Electrónico: ${email}
  Contraseña: ${password}
  Confirmar Contraseña: ${confirmPassword}`);
  registerForm.reset();
  });
