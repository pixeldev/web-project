window.onload = function() {
    fetch('http://localhost:3000/service/types', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            const serviceTypeSelect = document.getElementById('serviceType');
            data.forEach(serviceType => {
                const option = document.createElement('option');
                option.value = serviceType.id;
                option.text = `${serviceType.nombre} - $${serviceType.costo}`;
                serviceTypeSelect.add(option);
            });
        });
}

function handleRequest() {
    event.preventDefault();

    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert('No estás logueado. Por favor, inicia sesión.');
        window.location = '../login';
        return;
    }

    // we need to post the data to the server
    // we need to get the data from the form
    const form = document.querySelector('form');

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    data.userId = userId;

    console.log(data);

    fetch('http://localhost:3000/user/service/request', {
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
                alert(data.message);
            }
        });
}