<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Turnos</title>
        <style>
            body {
                font-family: sans-serif; 
                font-size: 30px;
                margin: 20px;
                text-align: center
            }

            p {
                line-height: 2;
            }
        </style>
    </head>
    <body>

        <p>
            GOBERNACION DEL VALLE DEL CAUCA <br />
            SERVICIO: {{ $item->servicio->servicio }} <br />
            TURNO: {{ $item->servicio->codigo }}-{{ $item->id }} <br />
            Documento: {{ $item->documento}} <br />
            Fecha: {{ $item->hora_recibido}} <br />
        </p>

    </body>
</html>
