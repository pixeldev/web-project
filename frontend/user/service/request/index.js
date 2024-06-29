window.onload = function() {
    fetch('http://199.127.62.211:3000/service/types', {
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

document.addEventListener('DOMContentLoaded', (event) => {
    const date = new Date();
    const dateString = date.toISOString().substring(0,10);
    const timeString = date.toTimeString().substring(0,5);

    document.getElementById('date').min = dateString;
    document.getElementById('hour').min = timeString;
});

function handleRequest() {
    event.preventDefault();

    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert('No estás logueado. Por favor, inicia sesión.');
        window.location = '../login';
        return;
    }

    const form = document.querySelector('form');

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    data.userId = userId;

    console.log(data);

    fetch('http://199.127.62.211:3000/user/service/request', {
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