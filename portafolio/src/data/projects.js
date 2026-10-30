export const projects = [
  {
    id: "convenios-jb",
    name: "Convenios JB",
    type: "LANDING PAGE",
    organization: "Consultora de Asesoría Empresarial JB",
    description:
      "Landing que presenta los convenios y beneficios de la consultora JB, desarrollada con HTML y CSS en WordPress.",
    theme: "convenios",
    image: "/Convenios.webp",
    demoUrl: "https://consultoradeasesoriaempresarialjb.com/convenios/",
  },
  {
    id: "verdece",
    name: "Verdece",
    type: "SITIO CORPORATIVO",
    organization: "Verdece S.A.C.",
    description:
      "Landing page para Verdece, desarrollada en WordPress con HTML, CSS y JavaScript.",
    contribution:
      "Diseñé la página principal (index), el encabezado y el pie de página. El sitio se realizó en equipo.",
    collaborators: [
      { name: "JesusWebTV", url: "https://github.com/JesusWebTV" },
      { name: "AriannaHC", url: "https://github.com/AriannaHC" },
    ],
    theme: "verdece",
    image: "/Verdece.webp",
    demoUrl: "https://verdecesac.com/",
  },
  {
    id: "portafolio-jb",
    name: "Portafolio web JB",
    type: "PORTAFOLIO WEB",
    organization: "Consultora de Asesoría Empresarial JB",
    description:
      "Portafolio web de la consultora JB que muestra proyectos de los colaboradores del área web, desarrollado con React y Tailwind CSS.",
    contribution:
      "Diseñé e implementé casi toda la interfaz en React. En la sección de proyectos, mi aporte fue el diseño y la estructura, no los proyectos publicados por mis compañeros.",
    creditNote:
      "La sección «Confiabilidad técnica / Ingeniería de primer nivel» fue realizada por bktmatjv. Cada proyecto publicado en el portafolio conserva la autoría de quien lo creó.",
    collaborators: [
      {
        name: "bktmatjv",
        url: "https://github.com/bktmatjv",
        contribution: "Sección de confiabilidad técnica y mejoras de diseño.",
      },
      {
        name: "MariaFernandaFernandezAlva",
        url: "https://github.com/MariaFernandaFernandezAlva",
        contribution: "Mejoras de diseño.",
      },
    ],
    theme: "portafolio",
    image: "/portafolioJB.webp",
    demoUrl:
      "https://portafolioweb.consultoradeasesoriaempresarialjb.com/#inicio",
  },
  {
    id: "aprende-jugando",
    name: "Aprende Jugando",
    type: "LANDING PAGE",
    organization: "Aprende Jugando",
    description:
      "Landing para una empresa de libros virtuales infantiles, desarrollada con React y Tailwind CSS.",
    theme: "aprende",
    image: "/AprendeJugando.webp",
    demoUrl: "https://aprende-jugando-kits-educativos.vercel.app/",
  },
  {
    id: "ChefAi",
    name: "ChefAi - chatbot para la cocina",
    type: "Chatbot Personal",
    organization: "Propia",
    description:
      "Chatbot que sugiere recetas con tus ingredientes y ayuda a crear listas de compras. Desarrollado con React, FastAPI y Supabase.",
    theme: "chefai",
    image: "/chefAi.webp",
    demoUrl: "https://chef-ai-lovat.vercel.app/",
  },
];
