function handleLogin() {
    event.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            localStorage.setItem('userId', data.id);

            switch (data.rol) {
                case 'admin':
                    window.location = '../admin';
                    alert('Bienvenido administrador');
                    break;
                case 'usuario':
                    window.location = '../user';
                    alert('Bienvenido usuario');
                    break;
                case 'tecnico':
                    window.location = '../technician';
                    alert('Bienvenido técnico');
                    break;
                default:
                    alert('Rol no válido');
                    break;
            }
        }
    });
}