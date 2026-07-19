// ============================================================
// EFC - Escuela de Futbol Infantil - script.js
// Conectado al backend API - SweetAlert2 para notificaciones
// ============================================================

const API = '/api';

// ---- Configuración de colores del sitio ----
const SWAL_COLORS = {
  confirmButtonBg: '#0B1B46',
  confirmButtonColor: '#fff',
  denyButtonBg: '#D6BE66',
  denyButtonColor: '#0B1B46',
};

// ---- Utilidad para alertas ----
function swalExito(titulo, texto) {
  return Swal.fire({
    icon: 'success',
    title: titulo,
    text: texto,
    confirmButtonColor: SWAL_COLORS.confirmButtonBg,
    confirmButtonText: 'Entendido',
    customClass: { popup: 'swal-efc' },
  });
}

function swalError(titulo, texto) {
  return Swal.fire({
    icon: 'error',
    title: titulo,
    text: texto,
    confirmButtonColor: SWAL_COLORS.confirmButtonBg,
    confirmButtonText: 'OK',
    customClass: { popup: 'swal-efc' },
  });
}

function swalWarning(titulo, texto) {
  return Swal.fire({
    icon: 'warning',
    title: titulo,
    text: texto,
    confirmButtonColor: SWAL_COLORS.confirmButtonBg,
    confirmButtonText: 'OK',
    customClass: { popup: 'swal-efc' },
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // ---- Hero Carousel ----
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-arrow-prev');
  const nextBtn = document.querySelector('.hero-arrow-next');
  let currentSlide = 0;
  let heroInterval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoPlay() {
    heroInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(heroInterval);
  }

  if (slides.length > 0) {
    startAutoPlay();

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopAutoPlay();
        goToSlide(parseInt(dot.dataset.slide));
        startAutoPlay();
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });

    // Pausar al hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);
    }
  }

  // ---- Menú móvil ----
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // ---- Marcar enlace activo según la página actual ----
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });

  // ---- Formulario de Contacto ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      swalExito(
        '¡Mensaje enviado!',
        '¡Gracias por escribirnos! Te responderemos a la brevedad. ⚽'
      );
      contactForm.reset();
    });
  }

  // ---- Formulario de Inscripción ----
  const inscrForm = document.getElementById('inscripcion-form');
  if (inscrForm) {
    // Cargar categorías desde la API
    cargarCategorias();

    inscrForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const required = inscrForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#D64545';
        } else {
          field.style.borderColor = '#1A6B4A';
        }
      });

      if (!valid) {
        swalWarning(
          'Campos incompletos',
          'Por favor completá todos los campos obligatorios (*).'
        );
        return;
      }

      const btn = inscrForm.querySelector('.form-submit');
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      try {
        // 1. Crear tutor
        const tutorData = {
          nombre: inscrForm.querySelector('[name="tutor_nombre"]').value.trim(),
          apellido: inscrForm.querySelector('[name="tutor_apellido"]').value.trim(),
          DNI: inscrForm.querySelector('[name="tutor_dni"]').value.trim(),
          telefono: inscrForm.querySelector('[name="tutor_telefono"]').value.trim(),
          correo: inscrForm.querySelector('[name="tutor_email"]').value.trim(),
          parentesco: inscrForm.querySelector('[name="tutor_parentesco"]').value || null,
        };

        const tutorRes = await fetch(`${API}/tutores`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tutorData),
        });

        if (!tutorRes.ok) {
          const err = await tutorRes.json();
          throw new Error(err.message || 'Error al crear tutor');
        }

        const tutorCreado = await tutorRes.json();
        const tutorId = tutorCreado.data?.id_tutor || tutorCreado.id_tutor;

        // 2. Obtener categoría seleccionada o sugerida
        const categoriaSelect = document.getElementById('categoria-interes');
        let categoriaId = null;
        const catSeleccionada = categoriaSelect.value;

        if (catSeleccionada) {
          const catsRes = await fetch(`${API}/categorias`);
          const catsData = await catsRes.json();
          const cats = catsData.data || catsData;
          const catEncontrada = cats.find(c => catSeleccionada.includes(c.nombre));
          if (catEncontrada) categoriaId = catEncontrada.id_categoria;
        }

        // Si no hay categoría, buscar la más adecuada por defecto
        if (!categoriaId) {
          const catsRes = await fetch(`${API}/categorias`);
          const catsData = await catsRes.json();
          const cats = catsData.data || catsData;
          if (cats.length > 0) categoriaId = cats[0].id_categoria;
        }

        // 3. Crear jugador
        const jugadorData = {
          nombre: inscrForm.querySelector('[name="jugador_nombre"]').value.trim(),
          apellido: inscrForm.querySelector('[name="jugador_apellido"]').value.trim(),
          fecha_nacimiento: inscrForm.querySelector('[name="jugador_fecha"]').value,
          DNI: inscrForm.querySelector('[name="jugador_dni"]').value.trim(),
          id_tutor: tutorId,
          id_categoria: categoriaId,
        };

        const jugadorRes = await fetch(`${API}/jugadores`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jugadorData),
        });

        if (!jugadorRes.ok) {
          const err = await jugadorRes.json();
          throw new Error(err.message || 'Error al crear jugador');
        }

        // 4. Mostrar éxito
        const formWrapper = document.getElementById('form-fields-wrapper');
        const successBox = document.getElementById('form-success');
        if (formWrapper && successBox) {
          formWrapper.style.display = 'none';
          successBox.style.display = 'block';
        }

        swalExito(
          '¡Inscripción enviada!',
          'Gracias por sumarte a Escuelita FC. Nos pondremos en contacto con vos en las próximas 24 a 48 horas para confirmar la categoría y coordinar la semana de prueba. ⚽'
        );

      } catch (err) {
        swalError(
          'Error en la inscripción',
          'Hubo un error: ' + err.message
        );
        btn.textContent = 'Enviar inscripción';
        btn.disabled = false;
      }
    });
  }

  // ---- Calcular edad / sugerir categoría ----
  const fechaNac = document.getElementById('fecha-nacimiento');
  const categoriaSelect = document.getElementById('categoria-interes');
  if (fechaNac && categoriaSelect) {
    fechaNac.addEventListener('change', () => {
      const nacimiento = new Date(fechaNac.value);
      if (isNaN(nacimiento)) return;
      const hoy = new Date();
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;

      let sugerida = '';
      if (edad >= 6 && edad <= 8) sugerida = 'Sub-8';
      else if (edad >= 9 && edad <= 10) sugerida = 'Sub-10';
      else if (edad >= 11 && edad <= 12) sugerida = 'Sub-12';

      if (sugerida) {
        for (const opt of categoriaSelect.options) {
          if (opt.text.includes(sugerida)) {
            categoriaSelect.value = opt.value;
            break;
          }
        }
      }
    });
  }

});

// ---- Cargar categorías desde la API ----
async function cargarCategorias() {
  const select = document.getElementById('categoria-interes');
  if (!select) return;

  try {
    const res = await fetch(`${API}/categorias`);
    const data = await res.json();
    const cats = data.data || data;

    if (cats && cats.length > 0) {
      // Solo agregar si hay datos de la API
      cats.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id_categoria;
        opt.textContent = cat.nombre;
        select.appendChild(opt);
      });
    }
    // Si no hay datos, se quedan las opciones estáticas del HTML
  } catch (err) {
    // Si falla, se quedan las opciones estáticas del HTML
    console.log('Usando categorías estáticas');
  }
}
