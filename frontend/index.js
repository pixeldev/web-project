function handleLogout() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = '/';
        return;
    }
    fetch(`http://localhost:3000/login/logout?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.removeItem('userId');
            window.location.href = '/';
        });
}