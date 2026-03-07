 
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('usernameInput').value;
  const password = document.getElementById('passwordInput').value;

  if(username === 'admin' && password === 'admin123') {
    // Login সফল হলে main.html এ redirect
    window.location.href = "main.html";
  } else {
    alert("Invalid credentials! Please try again.");
  }
});
 