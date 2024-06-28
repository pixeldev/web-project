window.onload = function() {
    fetch('http://localhost:3000/address/city-hall', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            const cityHallSelect = document.getElementById('cityHall');
            data.forEach(city => {
                const option = document.createElement('option');
                option.value = city.id;
                option.text = city.nombre;
                cityHallSelect.add(option);
            });
        });
}

function handleSignupButton() {
    event.preventDefault();
    // we need to post the data to the server
    // we need to get the data from the form
    const form = document.querySelector('form');

    // get the values of password and confirm password
    const password = form.elements['password'].value;
    const confirmPassword = form.elements['passwordConfirm'].value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('http://localhost:3000/signup', {
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
            alert('Usuario creado con éxito. Inicia sesión.');
            window.location = '../login';
        }
    });
}