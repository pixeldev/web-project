window.onload = function() {
    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:3000/user/service/get?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('service-technician').innerText = data.technician;
            document.getElementById('service-request-date').innerText = data.requestDate;
            document.getElementById('service-date').innerText = data.serviceDate
            document.getElementById('service-hour').innerText = data.serviceHour;
            document.getElementById('service-type').innerText = data.serviceType;
            document.getElementById('service-cost').innerText = data.serviceCost;
            document.getElementById('service-description').innerText = data.serviceDescription;
            document.getElementById('service-status').innerText = data.serviceStatus;
            document.getElementById('service-id').innerText = data.serviceId;
        });
}