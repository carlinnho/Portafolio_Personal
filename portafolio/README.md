# Portafolio de Carlos Daniel Pure

Primera versión de una página personal con React, Vite y Tailwind CSS. Ejecuta `npm install` y `npm run dev` para trabajar en local.

## Contenido temporal

- Edita los cinco proyectos en `src/data/projects.js`. Sustituye nombres, descripciones, tecnologías y enlaces. El carrusel admite más proyectos sin alargar la página. Las vistas de las tarjetas son imágenes temporales hechas con CSS en `src/App.jsx` y `src/App.css`; reemplaza `ProjectPreview` por imágenes reales con texto alternativo.
- Edita la selección de herramientas en `src/data/technologies.js`. Conserva solo las que utilizas.
- Actualiza los textos personales en `src/App.jsx` y los metadatos en `index.html` cuando tengas el contenido definitivo. En la sección Sobre mí, reemplaza el elemento `about-photo` por tu fotografía.

## Configurar el formulario con EmailJS

La opción Correo está conectada al endpoint REST de EmailJS sin dependencias adicionales. Hasta configurarla, muestra un aviso y nunca afirma que envió un mensaje. La opción WhatsApp abre una conversación con el texto preparado; el visitante debe confirmar el envío allí. El número público de destino está en `src/components/sections/ContactSection.jsx`.

1. Crea una cuenta en EmailJS y conecta el servicio de correo que recibirá los mensajes.
2. Crea una plantilla de correo con estas variables: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`. Configura como destinatario **tu dirección personal dentro de EmailJS** y usa `{{reply_to}}` como correo de respuesta.
3. Copia `.env.example` a `.env.local` y completa `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` y `VITE_EMAILJS_PUBLIC_KEY`. Reinicia Vite.
4. Envía un mensaje de prueba y verifica la recepción en tu correo. Configura restricciones de origen y límites de uso en EmailJS antes de publicar.

Las variables `VITE_` se incluyen en el JavaScript del navegador: usa solo la clave pública de EmailJS, nunca una clave privada. `.env.local` está excluido de Git.

## Comprobaciones

`npm run lint` y `npm run build`.
