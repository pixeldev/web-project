<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="../css/reset.css"> -->
    <link rel="stylesheet" href="../css/normalize.css">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="login.css">
    <link rel="icon" type="image/x-icon" href="../images/favicon.ico"/>
    <title>Fugafix | Inicio de sesión</title>
</head>
<body>
<header class="header">
    <img class="logo-navbar" src="../images/imagotipo-500x500.svg" alt="FugaFix Imagotipo">
    <div class="menu">
        <a href="../signup/signup.php"><p>Regístrate</p></a>
    </div>
</header>

<main id="login-main">
    <section id="contenedor">
        <div class="loginMenu">
            <button>
                <a href="../admin/index.php">INICIAR COMO ADMIN</a>
            </button>
            <button>
                <a href="../technician/index.php"> INICIAR COMO TECNICO</a>
            </button>
            <button>
                <a href="../user/index.php">INICIAR COMO USUARIO</a>
            </button>
        </div>
        <div class="formulario">
            <h2>Iniciar Sesión</h2>
            <form action="#">
                <div>
                    <label for="username">Usuario:</label>
                    <input type="text" id="username" name="username">
                </div>
                <div>
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" name="password">
                </div>
                <div class="buttonContent">
                    <button type="submit">Ingresar</button>
                </div>
                <a href="user/service/requests-status.html"><p>¿Olvidaste tu contraseña?</p></a>
            </form>
        </div>
    </section>
</main>

<footer>
    <p>2024 Fugafix. Todos los derechso reservados</p>
</footer>
</body>