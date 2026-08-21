# vh.dev

Portafolio personal de [Vicente Herrera](https://github.com/bulletformyvalentinefan) — Backend Developer.

Sitio estático minimalista en blanco y negro con enfoque editorial: filas de proyectos, tipografías Inter + JetBrains Mono y soporte de tema claro/oscuro.

## Stack

- HTML5, CSS3 (variables, `clamp`, `backdrop-filter`) y JavaScript vanilla
- Sin frameworks ni dependencias de build
- Tipografías: [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

## Características

- Tema claro/oscuro con persistencia en `localStorage` y detección de preferencia del sistema
- Header sticky con blur (`backdrop-filter`)
- Diseño responsive (móvil / tablet / escritorio)
- Accesibilidad: `focus-visible` y respeto a `prefers-reduced-motion`

## Ejecutar localmente

Abre `index.html` en el navegador o sirve la carpeta con un servidor estático:

```sh
npx serve .
```

## Estructura

```
index.html     # Contenido y estructura
style.css      # Estilos (variables de tema, layout, responsive)
script.js      # Toggle de tema claro/oscuro
```

## Autor

- GitHub: [@bulletformyvalentinefan](https://github.com/bulletformyvalentinefan)
- LinkedIn: [vicente-herrera-solis](https://www.linkedin.com/in/vicente-herrera-solis)
