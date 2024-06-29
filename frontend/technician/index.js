window.onload = async function() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert('No estás logueado. Por favor, inicia sesión.');
        window.location = '/login';
        return;
    }

    const nameResponse = await fetch(`http://localhost:3000/technician/name?userId=${userId}`);

    if (nameResponse.status !== 200) {
        alert(nameResponse.error);
        window.location = '/login';
        return;
    }

    const nameResponseJson = await nameResponse.json();
    document.getElementById('technician-welcome-text').innerText = `Bienvenido, ${nameResponseJson.name}`;

    const todayServicesResponse = await fetch(`http://localhost:3000/technician/service/today?technicianId=${userId}`);

    if (todayServicesResponse.status !== 200) {
        alert(todayServicesResponse.error);
        return;
    }

    const todayServicesResponseJson = await todayServicesResponse.json();

    for (const service of todayServicesResponseJson) {
        const serviceElement = document.createElement('div');
        serviceElement.classList.add('service');
        serviceElement.innerHTML = `
            <h3>Servicio #${service.id} - ${service.nombre_servicio}</h3>
            <p>Hora: ${service.hora_servicio}</p>
            <button type="button" onclick="
                localStorage.setItem('service-selected', ${service.id});
                window.location.href = './service/details/';
            ">
                Detalles
            </button>
        `;

        document.getElementById('services-container').appendChild(serviceElement);
    }
}