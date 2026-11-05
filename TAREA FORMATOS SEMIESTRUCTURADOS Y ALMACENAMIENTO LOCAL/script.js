// Reglas de validación con expresiones regulares
const rules = {
  cedula: { re: /^\d{10}$/ },
  apellidos: { re: /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]{3,}$/ },
  nombres: { re: /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]{3,}$/ },
  telefono: { re: /^(09|02)\d{8}$/ },
  direccion: { re: /^.{5,}$/ },
  correo: { re: /^[\w.+-]+@[\w-]+\.[a-z]{2,}$/i },
  facultad: { re: /^.+$/ },
  nivel: { re: /^.+$/ },
  paralelo: { re: /^.+$/ },
};

// Validar un campo individual
function validate(id) {
  const el = document.getElementById(id);
  const val = el.value.trim();
  const ok = rules[id].re.test(val);

  // Lógica especial para correo: distinguir vacío vs formato inválido
  if (id === 'correo') {
    const errorEl = document.getElementById('correo-error');
    errorEl.textContent = val === '' ? 'Este campo es requerido.' : 'Correo electrónico no válido.';
  }

  // Restaurar mensaje original de cédula al editar
  if (id === 'cedula') {
    document.getElementById('cedula-error').textContent = 'Ingrese exactamente 10 dígitos.';
  }

  el.closest('.field').classList.toggle('invalid', !ok);
  return ok;
}

// Validar en tiempo real al escribir
Object.keys(rules).forEach(id =>
  document.getElementById(id).addEventListener('input', () => validate(id))
);

// Mostrar mensaje de éxito o error
function showMsg(text, type) {
  const m = document.getElementById('msg');
  m.textContent = text;
  m.className = type;
  setTimeout(() => (m.className = ''), 3000);
}

// Limpiar formulario
function clearForm() {
  document.getElementById('form').reset();
  document.querySelectorAll('.field').forEach(f => f.classList.remove('invalid'));
  document.getElementById('msg').className = '';
}

// Guardar estudiante
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();

  const ids = Object.keys(rules);
  const allOk = ids.map(validate).every(Boolean);
  if (!allOk) { showMsg('Edite los campos inválidos.', 'err'); return; }

  const estudiantes = JSON.parse(localStorage.getItem('estudiantes') || '[]');
  const cedula = document.getElementById('cedula').value.trim();

  // Validar cédula duplicada
  if (estudiantes.some(s => s.cedula === cedula)) {
    document.getElementById('cedula-error').textContent = 'Cédula ya registrada.';
    document.getElementById('cedula').closest('.field').classList.add('invalid');
    showMsg('Ya existe un estudiante con esa cédula.', 'err');
    return;
  }

  // Construir objeto estudiante
  const nuevo = {};
  ids.forEach(id => (nuevo[id] = document.getElementById(id).value.trim()));

  estudiantes.push(nuevo);
  localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
  showMsg('✅ Estudiante guardado correctamente.', 'ok');
  clearForm();
  renderTable();
});

// Eliminar estudiante por cédula
function deleteEstudiante(cedula) {
  if (!confirm(`¿Estás seguro de que deseas eliminar al estudiante con cédula ${cedula}?`)) return;
  let data = JSON.parse(localStorage.getItem('estudiantes') || '[]');
  data = data.filter(s => s.cedula !== cedula);
  localStorage.setItem('estudiantes', JSON.stringify(data));
  renderTable();
}

// Renderizar tabla desde localStorage
function renderTable() {
  const data = JSON.parse(localStorage.getItem('estudiantes') || '[]');
  const tbody = document.getElementById('tbody');

  tbody.innerHTML = data.length === 0
    ? '<tr><td colspan="9" style="text-align:center;color:#999;padding:16px">No hay estudiantes registrados.</td></tr>'
    : data.map(s => `
        <tr>
          <td>${s.cedula}</td><td>${s.apellidos}</td><td>${s.nombres}</td>
          <td>${s.telefono}</td><td>${s.correo}</td><td>${s.facultad}</td>
          <td>${s.nivel}</td><td>${s.paralelo}</td>
          <td><button class="btn-del" onclick="deleteEstudiante('${s.cedula}')">✕</button></td>
        </tr>`).join('');
}

// Cargar tabla al iniciar
renderTable();
