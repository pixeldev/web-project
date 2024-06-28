function goToRequestStatus() {
    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:3000/user/service/active?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                if (data.activeService) {
                    window.location.href = '/user/service/status';
                } else {
                    alert('No tienes un servicio activo.');
                }
            }
        });
}