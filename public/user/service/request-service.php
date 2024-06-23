<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/reset.css">
    <link rel="stylesheet" href="../../css/normalize.css">
    <link rel="stylesheet" href="../../css/styles.css">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="icon" type="image/x-icon" href="../../images/favicon.ico"/>
    <title>Fugafix | Solicitar servicio</title>
</head>
<body>
<header class="header">
    <img class="logo-navbar" src="../../images/imagotipo-500x500.svg" alt="Fugafix Imagotipo">
    <a href="../index.php"><p>Inicio</p></a>
    <a href="request-service.php"><p>Hacer Solicitud</p></a>
    <a href="requests-status.php"><p>Estado de las solicitudes</p></a>
    <a href="../account/account.html"><p>Cuenta</p></a>
</header>
<section>
    <div id="Title">
        <h1>Formulario para solicitar servicios</h1>
    </div>
    <div id="InformacionContacto">
        <form action="request-service.php" method="post">
        <h2>Información de contacto de quien recibirá el servicio</h2>
        <div id="ContenedorContacto">
                <div id="ContenedorNombresNombre">
                    <label for="Nombre">Nombre(s):</label>
                    <input type="text" id="Nombre" name="Nombre" required>
                </div>
                <div id="ContenedorNombresApellidoPaterno">
                    <label for="ApellidoPaterno">Apellido Paterno:</label>
                    <input type="text" id="ApellidoPaterno" name="ApellidoPaterno" required>
                </div>
                <div id="ContenedorNombresApellidoMaterno">
                    <label for="ApellidoMaterno">Apellido Materno:</label>
                    <input type="text" id="ApellidoMaterno" name="ApellidoMaterno" required>
                </div>
                <div id="ContenedorDireccionCalle">
                    <label for="Calle">Calle:</label>
                    <input type="text" id="Calle" name="Calle" required>
                </div>
                <div id="ContenedorDireccionColonia">
                    <label for="Colonia">Colonia:</label>
                    <input type="text" id="Colonia" name="Colonia" required>
                </div>
                <div ID="ContenedorDireccionNumeroInterior">
                    <label for="NumeroInterior">Número Interior:</label>
                    <input type="text" id="NumeroInterior" name="NumeroInterior" required>
                </div>
                <div id="ContenedorTelefonoNumeroExterior">
                    <label for="NumeroExterior">Número Exterior:</label>
                    <input type="text" id="NumeroExterior" name="NumeroExterior" required>
                </div>
                <div id="ContenedorTelefonoAlcaldia">
                     <label for="alcaldias">Alcaldía:</label>
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
                        </select>
                </div>
                <div id="ContenedorTelefonoTelefono">
                    <label for="Telefono">Teléfono:</label>
                    <input type="text" id="Telefono" name="Telefono" required>
                </div>
        </div>
    </div>
    <div id="InformacionServicio">
        <h2>¿Qué tipo de servicio necesita?</h2>
        <div id="ContenedorOpciones">
               <input type="radio" id="LimpiezaTinaco" name="tipoServicio" value="LimpiezaTinaco">
               <label for="LimpiezaTinaco">Limpieza de tinaco ($00.00 MXN)</label><br>
               <input type="radio" id="CambioFiltro" name="tipoServicio" value="CambioFiltro">
               <label for="CambioFiltro">Cambio de filtro ($00.00 MXN)</label><br>
               <input type="radio" id="ReparacionFuga" name="tipoServicio" value="ReparacionFuga">
               <label for="ReparacionFuga">Reparación de fuga ($00.00 MXN)</label>
        </div>
    </div>
    <div id="InformacionFecha">
        <h2>¿Cuándo necesita el servicio?</h2>
        <div id="ContenedorFechas">
            <div id="FechaYFormulario">
                    <label for="Fecha">Fecha:</label>
                    <input type="date" id="Fecha" name="Fecha" required><br><br>
                    <label for="Hora">Hora:</label>
                    <input type="time" id="Hora" name="Hora" required>
            </div>
        </div>
    </div>
    <div id="DescripcionProblema">
            <h2>Describa el problema</h2>
            <div id="DescripcionProblemas">
                    <label for="Descripcion"></label>
                    <textarea id="Descripcion" name="Descripcion" rows="7" cols="75" required></textarea>
            </div>
    </div>
    <div id="BotonSolicitar">
        <button type="submit"><p>Solicitar</p></button>
    </div>
    </form>
</section>
<footer>
    <p>© 2024 FugaFix. Todos los derechos reservados.</p>
</footer>
</body>
</html>