window.onload = function() {
    const userId = localStorage.getItem('userId');
    fetch(`https://proyecto-backend.houtave.com/user?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('user-name').value = data.names;
            document.getElementById('user-lastname').value = data.lastName;
            document.getElementById('user-second-lastname').value = data.secondLastName;
            document.getElementById('user-email').value = data.email;
            document.getElementById('address-address').value = data.street;
            document.getElementById('address-suburb').value = data.suburb;
            document.getElementById('address-int-number').value = data.intNumber;
            document.getElementById('address-ext-number').value = data.extNumber;
            document.getElementById('address-city-hall').value = data.cityHall;
            document.getElementById('address-postal-code').value = data.postalCode;
            document.getElementById('user-phone').value = data.phone;
        });

    fetch('https://proyecto-backend.houtave.com/address/city-hall', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            const cityHallSelect = document.getElementById('address-city-hall');
            data.forEach(city => {
                const option = document.createElement('option');
                option.value = city.id;
                option.text = city.nombre;
                cityHallSelect.add(option);
            });
        });
}

function handleSaveChanges() {
    event.preventDefault();

    const form = document.querySelector('form');

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log(data);

    const userId = localStorage.getItem('userId');

    fetch(`https://proyecto-backend.houtave.com/user?userId=${userId}`, {
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
                alert('Cambios guardados con éxito.');
                window.location.href = '/user/account';
            }
        });
}