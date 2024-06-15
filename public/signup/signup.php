<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="../css/reset.css"> -->
    <link rel="stylesheet" href="../css/normalize.css">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="signup.css">
    <link rel="icon" type="image/x-icon" href="../images/favicon.ico"/>
    <title>Fugafix | Regístrate</title>
</head>
<body>
<header class="header">
    <img class="logo-navbar" src="../images/imagotipo-500x500.svg" alt="FugaFix Imagotipo">
    <div class="menu">
        <a href="../login/login.php"><p>Iniciar Sesión</p></a>
    </div>
</header>

<main id="signup-main">
    <section>
        <div class="containerSignUp">
            <div class="form">
                <h2>Regístrate</h2>
                <form action="#">
                    <div class="inputForm">
                        <label for="username">Nombre:</label>
                        <input type="text" id="username" name="username">
                    </div>

                    <div class="inputForm">
                        <label for="email">Correo:</label>
                        <input type="email" id="email" name="email">
                    </div>

                    <div class="inputForm">
                        <label for="address">Dirección:</label>
                        <input type="text" id="address" name="address">
                    </div>

                    <div class="inputForm">
                        <label for="password">Contraseña:</label>
                        <input type="password" id="password" name="password">
                    </div>

                    <div class="inputForm">
                        <label for="passwordConfirm">Confirma la contraseña:</label>
                        <input type="password" id="passwordConfirm" name="passwordConfirm">
                    </div>

                    <div class="buttonContent">
                        <button type="submit">Crear Cuenta</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="containerSidebar">
            <img class="imgItem" src="../images/plumber3.png" alt="Plomero">
        </div>

    </section>
</main>

<footer>
    <p>2024 Fugafix. Todos los derechso reservados</p>
</footer>
</body>