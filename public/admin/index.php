<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/normalize.css">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="icon" type="image/x-icon" href="../images/favicon.ico"/>
    <title>Fugafix | Administración</title>
</head>
<body>
<header class="header">
    <img class="logo-navbar" src="../images/imagotipo-500x500.svg" alt="Fugafix Imagotipo">
    <button class="red-button">
        <a href="../index.php">Cerrar sesión</a>
    </button>
</header>
<main>
    <h1>Panel de administración</h1>
    <section id="admin-details-section">
        <article>
            <div id="admin-details-used-materials">
                <h2>Material usado</h2>
                <p>En esta sección podrá visualizar el material utilizado en los servicios.</p>
                <button class="accent-button">
                    <a href="service/used-material.php">Visualizar material usado</a>
                </button>
            </div>
            <div id="admin-details-storage">
                <h2>Almacén</h2>
                <p>En esta sección podrá revisar y registrar el material disponible en el almacén.</p>
                <button class="accent-button">
                    <a href="storage/index.php">Inspeccionar almacén</a>
                </button>
            </div>
        </article>
        <article>
            <div id="admin-details-technicians">
                <h2>Horas laboradas</h2>
                <p>En esta sección podrá visualizar a los técnicos más productivos de la empresa.</p>
                <button class="accent-button">
                    <a href="technician/index.php">Visualizar técnicos</a>
                </button>
            </div>
            <div id="admin-details-graph-hours">
                <h2>Gráfico de horas</h2>
            </div>
        </article>
        <article>
            <div id="admin-details-graph-income">
                <h2>Gráfico de ingresos</h2>
            </div>
            <div id="admin-details-costs-report">
                <h2>Reporte de ingresos</h2>
                <p>En esta sección podrás visualizar el reporte de ingresos hasta el momento.</p>
                <button class="accent-button">
                    <a href="report/index.php">Visualizar reporte</a>
                </button>
            </div>
        </article>
    </section>
</main>
<footer>
    <p>© 2024 Fugafix. Todos los derechos reservados.</p>
</footer>
</body>
</html>