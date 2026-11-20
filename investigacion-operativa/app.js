const ejerciciosData = {
  u2: Array.from({ length: 10 }, (_, i) => ({
    numero: i + 1,
    titulo: `Ejercicio ${i + 1} — Unidad 2 (Programación Lineal)`,
    descripcion: `Resolución en Excel del ejercicio ${i + 1} de Programación Lineal.`,
    imagen: `img/u2-ej${i + 1}.jpeg`
  })),
  u3: Array.from({ length: 10 }, (_, i) => ({
    numero: i + 1,
    titulo: `Ejercicio ${i + 1} — Unidad 3 (Transporte y Stock)`,
    descripcion: `Resolución en Excel del ejercicio ${i + 1} de Transporte o Modelos de Stock.`,
    imagen: `img/u3-ej${i + 1}.jpeg`
  }))
};

const itemsMenu = document.querySelectorAll('.nav-item');
const panelesVista = document.querySelectorAll('.vista-panel');
const disparadoresNavegacion = document.querySelectorAll('[data-ir]');

function cambiarVista(vistaId) {
  panelesVista.forEach(panel => panel.classList.remove('active'));
  const destino = document.getElementById(`vista-${vistaId}`);
  if (destino) {
    destino.classList.add('active');
  }

  itemsMenu.forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-vista') === vistaId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

itemsMenu.forEach(item => {
  item.addEventListener('click', () => {
    cambiarVista(item.getAttribute('data-vista'));
  });
});

disparadoresNavegacion.forEach(el => {
  el.addEventListener('click', () => {
    cambiarVista(el.getAttribute('data-ir'));
  });
});

function inicializarEjercicios(unidadKey) {
  const contenedorBotones = document.getElementById(`selector-${unidadKey}`);
  const visor = document.getElementById(`visor-${unidadKey}`);
  const lista = ejerciciosData[unidadKey];

  lista.forEach((ej, index) => {
    const btn = document.createElement('button');
    btn.className = 'btn-ejercicio';
    btn.textContent = `Ejercicio ${ej.numero}`;

    btn.addEventListener('click', () => {
      contenedorBotones.querySelectorAll('.btn-ejercicio').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mostrarEjercicio(visor, ej);
    });

    contenedorBotones.appendChild(btn);

    if (index === 0) {
      btn.classList.add('active');
      mostrarEjercicio(visor, ej);
    }
  });
}

function mostrarEjercicio(visor, ejercicio) {
  visor.innerHTML = `
    <div class="visor-header">
      <div>
        <h4>${ejercicio.titulo}</h4>
        <p style="color: var(--texto-suave); font-size: 0.9rem;">${ejercicio.descripcion}</p>
      </div>
      <label class="btn-cargar-img">
        Subir imagen desde PC
        <input type="file" accept="image/*" style="display: none;" onchange="previsualizarArchivo(event, this)">
      </label>
    </div>
    <div class="imagen-contenedor">
      <img src="${ejercicio.imagen}" alt="${ejercicio.titulo}"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
      <div class="mensaje-faltante" style="display: none;">
        <p>No se encontró <strong>${ejercicio.imagen}</strong></p>
        <p style="margin-top: 6px;">Guardá la captura en <strong>img/</strong> con ese nombre o usá el botón <strong>Subir imagen desde PC</strong>.</p>
      </div>
    </div>
  `;
}

function previsualizarArchivo(event, input) {
  const archivo = event.target.files[0];
  if (!archivo) return;

  const lector = new FileReader();
  lector.onload = function(e) {
    const contenedor = input.closest('.visor-ejercicio').querySelector('.imagen-contenedor');
    contenedor.innerHTML = `<img src="${e.target.result}" alt="Vista previa del ejercicio">`;
  };
  lector.readAsDataURL(archivo);
}

inicializarEjercicios('u2');
inicializarEjercicios('u3');