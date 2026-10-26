// Selección ilustrativa temporal. Conserva solo las herramientas que realmente manejas.
export const technologyGroups = [
  { name: 'Interfaz', description: 'Lo que se ve y se siente.', items: [
    { name: 'React', symbol: '⚛', detail: 'Componentes interactivos' },
    { name: 'JavaScript', symbol: 'JS', detail: 'Lógica para la web' },
    { name: 'HTML', symbol: '</>', detail: 'Estructura semántica' },
    { name: 'CSS', symbol: '#', detail: 'Diseño responsive' },
    { name: 'Tailwind CSS', symbol: '≈', detail: 'Estilos con utilidades' },
  ] },
  { name: 'Flujo de trabajo', description: 'Del boceto a la entrega.', items: [
    { name: 'Git', symbol: '⑂', detail: 'Control de versiones' },
    { name: 'GitHub', symbol: '⌘', detail: 'Repositorios y colaboración' },
    { name: 'Vite', symbol: 'ϟ', detail: 'Desarrollo frontend' },
  ] },
]
