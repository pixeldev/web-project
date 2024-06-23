<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/reset.css">
    <link rel="stylesheet" href="../../css/normalize.css">
    <link rel="stylesheet" href="../../css/styles.css">
    <link rel="icon" type="image/x-icon" href="../../images/favicon.ico"/>
    <link rel="stylesheet" href="../css/styles.css">
    <title>Fugafix | Edición Cuenta</title>
</head>
<body>
<header class="header">
    <img class="logo-navbar" src="../../images/imagotipo-500x500.svg" alt="Fugafix Imagotipo">
    <a href="../index.php"><p>Inicio</p></a>
    <a href="../service/request-service.php"><p>Hacer Solicitud</p></a>
    <a href="../service/requests-status.php"><p>Estado de las solicitudes</p></a>
    <a href="account.html"><p>Cuenta</p></a>
</header>
<section>
    <div id="Title">
        <h1>Información de la cuenta</h1>
    </div>
    <div id="accountInformation">
        <h2>Información de la cuenta</h2>
        <form name="modificationAccount" action="account.php" enctype="multipart/form-data" method="post">
        <div id="InformationUser">
            <label for="nombre">Nombre(s):</label>
            <input type="text" id="nombre" name="nombre" value="PedroPe"><br><br>
            <label for="apellidoPaterno">Apellido Paterno:</label>
            <input type="text" id="apellidoPaterno" name="apellidoPaterno" value="Perez"><br><br>
            <label for="apellidoMaterno">Apellido Materno:</label>
            <input type="text" id="apellidoMaterno" name="apellidoMaterno" value="Perez"><br><br>
            <label for="CorreoElectronico">Correo Electrónico:</label>
            <input type="text" id="CorreoElectronico" name="CorreoElectronico" value="pedrope@hotmail.com" ><br><br>
        </div>
        <h3>Direccion Asociada</h3>
        <br>
        <div id="InformationAddress">
            <label for="Calle">Calle:</label>
            <input type="text" id="Calle" name="Calle" value="Calle 1"><br><br>
            <label for="Colonia">Colonia:</label>
            <input type="text" id="Colonia" name="Colonia" value="Colonia 1"><br><br>
            <label for="NumeroInterior">Número Interior:</label>
            <input type="text" id="NumeroInterior" name="NumeroInterior" value="1"><br><br>
            <label for="NumeroExterior">Número Exterior:</label>
            <input type="text" id="NumeroExterior" name="NumeroExterior" value="1"><br><br>
            <label for="Alcaldia">Alcaldia:</label>
            <select id="alcaldias" name="alcaldias">
                <option value="alvaro-obregon">Álvaro Obregón</option>
                <option value="azcapotzalco">Azcapotzalco</option>
                <option value="benito-juarez">Benito Juárez</option>
                <option value="coyoacan">Coyoacán</option>
                <option value="cuajimalpa-de-morelos">Cuajimalpa de Morelos</option>
                <option value="cuauhtemoc">Cuauhtémoc</option>
                <option value="gustavo-a-madero">Gustavo A. Madero</option>
                <option value="iztacalco">Iztacalco</option>
                <option value="iztapalapa">Iztapalapa</option>
                <option value="la-magdalena-contreras">La Magdalena Contreras</option>
                <option value="miguel-hidalgo">Miguel Hidalgo</option>
                <option value="milpa-alta">Milpa Alta</option>
                <option value="tlahuac">Tláhuac</option>
                <option value="tlalpan">Tlalpan</option>
                <option value="venustiano-carranza">Venustiano Carranza</option>
                <option value="xochimilco">Xochimilco</option>
            </select><br><br>
            <label for="CodigoPostal">Código Postal:</label>
            <input type="text" id="CodigoPostal" name="CodigoPostal" value="12345" ><br><br>
        </div>
        <h3>Medios de Contacto</h3><br>
        <div id="InformationContact">
            <label for="Telefono">Telefono:</label>
            <input type="text" id="Telefono" name="Telefono" value="1234567890"><br><br>
            <label for="Contrasena">Contraseña:</label>
            <input type="password" id="Contrasena" name="Contrasena" value="1234567890" ><br><br>
        </div>
    </div>
    <div id="SaveButton">
        <button type="submit">Guardar Cambios</button>
        </form>
    </div>
</section>
<footer>
    <p>© 2024 FugaFix. Todos los derechos reservados.</p>
</footer>
</body>
</html>