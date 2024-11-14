<?php

$transacciones = [];

//Función para Registrar Transacción:
function registrarTransaccion($id, $descripcion, $monto) {
    global $transacciones;
    $transacciones[] = [
        "id" => $id,
        "descripcion" => $descripcion,
        "monto" => $monto
    ];
}
//Función para Generar Estado de Cuenta:

function generarEstadoDeCuenta() {
    global $transacciones;

    $montoContado = 0;
    foreach ($transacciones as $transaccion) {
        $montoContado += $transaccion['monto'];
    }

    $montoConInteres = $montoContado * 1.026;
    $cashback = $montoContado * 0.001;
    $montoFinal = $montoConInteres - $cashback;

    echo PHP_EOL;
    echo "Estado de Cuenta:\n";
    foreach ($transacciones as $transaccion) {
        echo "ID: {$transaccion['id']}, Descripción: {$transaccion['descripcion']}, Monto: {$transaccion['monto']}\n";
    }
    echo PHP_EOL;
    echo "Monto de Contado: $montoContado\n";
    echo "Monto con Intereses: $montoConInteres\n";
    echo "Cashback: $cashback\n";
    echo "Monto Final a Pagar: $montoFinal\n";
    echo PHP_EOL;

}

//Simulación de Transacciones y Generación del Estado de Cuenta:
registrarTransaccion(1, "Compra en supermercado", 50.00);
registrarTransaccion(2, "Pago de servicios públicos", 100.00);
registrarTransaccion(3, "Gasolina", 40.00);

generarEstadoDeCuenta();


