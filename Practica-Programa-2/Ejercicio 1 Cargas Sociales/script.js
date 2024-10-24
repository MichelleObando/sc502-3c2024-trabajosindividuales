document.getElementById('salaryForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario

    const salarioBruto = parseFloat(document.getElementById('salarioBruto').value);

    if (isNaN(salarioBruto) || salarioBruto <= 0) {
        alert('Por favor, ingrese un salario bruto válido.');
        return;
    }

    // **Cálculo de Cargas Sociales (9.34% del salario bruto)**
    const cargasSociales = salarioBruto * 0.0934;

    // **Cálculo del Impuesto sobre la Renta** (ejemplo simplificado)
    let impuestoRenta = 0;
    if (salarioBruto > 941000) {
        impuestoRenta = (salarioBruto - 941000) * 0.15;
    } else if (salarioBruto > 542000) {
        impuestoRenta = (salarioBruto - 542000) * 0.10;
    }

    // **Cálculo del Salario Neto**
    const salarioNeto = salarioBruto - cargasSociales - impuestoRenta;

    // **Mostrar los resultados**
    document.getElementById('cargasSociales').textContent = cargasSociales.toFixed(2);
    document.getElementById('impuestoRenta').textContent = impuestoRenta.toFixed(2);
    document.getElementById('salarioNeto').textContent = salarioNeto.toFixed(2);

    document.getElementById('resultados').classList.remove('d-none');
});

  