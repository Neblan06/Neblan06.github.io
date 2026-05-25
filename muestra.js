function calcular() {
  const datos = [
    parseInt(document.getElementById("Ddato1").value),
    parseInt(document.getElementById("Ddato2").value),
    parseInt(document.getElementById("Ddato3").value),
    parseInt(document.getElementById("Ddato4").value),
    parseInt(document.getElementById("Ddato5").value),
    parseInt(document.getElementById("Ddato6").value),
    parseInt(document.getElementById("Ddato7").value),
    parseInt(document.getElementById("Ddato8").value),
    parseInt(document.getElementById("Ddato9").value),
    parseInt(document.getElementById("Ddato10").value)
  ];

  // Validación
  if (datos.some(isNaN)) {
    alert("Por favor ingresa los 10 datos antes de calcular.");
    return;
  }

  const tabla = document.getElementById("tabla");
  tabla.innerHTML = `
    <tr>
      <th>Muestra</th>
      <th>x̄</th>
      <th>∑x</th>
      <th>Fa</th>
      <th>x·Fa</th>
    </tr>
  `;

  let resultados = [];

  // Generar combinaciones con reemplazo en orden natural
  for (let i = 0; i < datos.length; i++) {
    for (let j = 0; j < datos.length; j++) {
      const suma = datos[i] + datos[j];
      const media = suma / 2;
      resultados.push({ muestra: `${datos[i]}, ${datos[j]}`, media });
    }
  }

  // Calcular frecuencias de las medias
  let frecuencias = {};
  resultados.forEach(r => {
    frecuencias[r.media] = (frecuencias[r.media] || 0) + 1;
  });

  // ⚠️ Mantener el orden natural (NO ordenar por media)
  // resultados.sort((a, b) => a.media - b.media);

  // Mostrar resultados en la tabla
  resultados.forEach(r => {
    const fa = frecuencias[r.media];
    const xfa = r.media * fa;
    const fila = `
      <tr>
        <td>${r.muestra}</td>
        <td>${r.media}</td>
        <td>${r.media}</td>
        <td>${fa}</td>
        <td>${xfa}</td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });

  // Totales
  const totalFa = Object.values(frecuencias).reduce((a, b) => a + b, 0);
  const totalXfa = Object.entries(frecuencias)
    .reduce((acc, [media, fa]) => acc + (parseFloat(media) * fa), 0);

  tabla.innerHTML += `
    <tr style="font-weight:bold;">
      <td>Total</td>
      <td>-</td>
      <td>-</td>
      <td>${totalFa}</td>
      <td>${totalXfa}</td>
    </tr>
  `;
}

function limpiar() {
  document.getElementById("Ddato1").value = "";
  document.getElementById("Ddato2").value = "";
  document.getElementById("Ddato3").value = "";
  document.getElementById("Ddato4").value = "";
  document.getElementById("Ddato5").value = "";
  document.getElementById("Ddato6").value = "";
  document.getElementById("Ddato7").value = "";
  document.getElementById("Ddato8").value = "";
  document.getElementById("Ddato9").value = "";
  document.getElementById("Ddato10").value = "";

  document.getElementById("tabla").innerHTML = `
    <tr>
      <th>Muestra</th>
      <th>x̄</th>
      <th>∑x</th>
      <th>Fa</th>
      <th>x·Fa</th>
    </tr>
  `;
}