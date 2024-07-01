function goToRequestStatus() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('No has iniciado sesión.');
        window.location.href = '/login';
        return;
    }
    fetch(`https://proyecto-backend.houtave.com/user/service/active?userId=${userId}`, {
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

function goToAccount() {
    event.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('No has iniciado sesión.');
        window.location.href = '/login';
        return;
    }
    fetch(`https://proyecto-backend.houtave.com/login/authenticated?id=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(async data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            if (!data.authenticated) {
                window.location.href = '/login';
                return;
            }

            const roleResponse = await fetch(`https://proyecto-backend.houtave.com/user/role?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const roleData = await roleResponse.json();

            if (roleData.role !== 'usuario') {
                alert('No tienes permiso para acceder a esta página.');
                return;
            }

            window.location.href = '/user/account';
        });
}

function goToCreateRequest() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('No has iniciado sesión.');
        window.location.href = '/login';
        return;
    }
    fetch(`https://proyecto-backend.houtave.com/login/authenticated?id=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(async data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            if (!data.authenticated) {
                window.location.href = '/login';
                return;
            }
            const result = await fetch(`https://proyecto-backend.houtave.com/user/service/active?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const resultData = await result.json();

            if (resultData.error) {
                alert(resultData.error);
                return;
            }

            if (resultData.activeService) {
                alert('Ya tienes un servicio activo.');
                return;
            }

            window.location.href = 'service/request';
        });
}