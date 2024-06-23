<!DOCTYPE html>
<html lang="es" xmlns="">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/reset.css">
    <link rel="stylesheet" href="../../css/normalize.css">
    <link rel="stylesheet" href="../../css/styles.css">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="icon" type="image/x-icon" href="../../images/favicon.ico"/>
    <title>Fugafix | Estado de solicitudes</title>
    <?php $EncabezadoTabla = "<table>
            <thead>
            <tr>
                <th>Num. Pedido</th>
                <th>Tipo de Servicio</th>
                <th>Fecha de Solicitud</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Monto</th>
                <th>Visualizar Evidencia</th>
            </tr>
            </thead>"; ?>
</head>
<body>
<header class="header">
    <img class="logo-navbar" src="../../images/imagotipo-500x500.svg" alt="Fugafix Imagotipo">
    <a href="../index.php"><p>Inicio</p></a>
    <a href="request-service.php"><p>Hacer Solicitud</p></a>
    <a href="requests-status.html"><p>Estado de las solicitudes</p></a>
    <a href="../account/account.html"><p>Cuenta</p></a>
</header>
<section>
    <div id="Title">
        <h1>Visualizar Estado de las solicitudes</h1>
    </div>
    <div id="BoxTable">
        <?php
        echo $EncabezadoTabla;
        ?>
            <tbody>
            <tr>
                <td><p>Something<p></td>
                <td><p>Something<p></td>
                <td><p>Something<p></td>
                <td><p>Something<p></td>
                <td><p>Something<p></td>
                <td><p>Something<p></td>
                <td><a href="evidences.html">Visualizar</a></td>
            </tr>
            <tr>
                <td>Something</td>
                <td>Something</td>
                <td>Something</td>
                <td>Something</td>
                <td>Something</td>
                <td>Something</td>
                <td><a href="evidences.html">Visualizar</a></td>
            </tr>
            </tbody>
        </table>
    </div>
</section>
<footer>
    <p>© 2024 FugaFix. Todos los derechos reservados.</p>
</footer>
</body>
</html>