document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // set token to local storage
      localStorage.setItem('token', data.token);

      // Redirect to main page
      window.location.href = 'amazon.html';
    } else {
      alert(data.error || 'Log in failed!');
    }
  } catch (err) {
    alert('Error connection to server');
  }
});
