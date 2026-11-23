# vh.dev

Portafolio personal de [Vicente Herrera](https://github.com/bulletformyvalentinefan) — Cloud & Platform Engineer.

Sitio estático minimalista en blanco y negro con enfoque editorial: filas de proyectos, tipografías Inter + JetBrains Mono y soporte de tema claro/oscuro.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS 4
- Sin backend: contenido estático

## Características

- Tema claro/oscuro con persistencia en `localStorage` y detección de preferencia del sistema
- Header sticky con blur (`backdrop-filter`)
- Diseño responsive (móvil / tablet / escritorio)
- Accesibilidad: `focus-visible` y respeto a `prefers-reduced-motion`

## Ejecutar localmente

```sh
pnpm install
pnpm dev
```

Build de producción:

```sh
pnpm build
```

## Estructura

```
src/App.tsx                        # Layout, header, tema
src/components/PortfolioSections.tsx # Hero, proyectos, experiencia, stack, contacto
src/index.css                      # Estilos (variables de tema, layout, responsive)
```

## Autor

- GitHub: [@bulletformyvalentinefan](https://github.com/bulletformyvalentinefan)
- LinkedIn: [vicente-herrera-solis](https://www.linkedin.com/in/vicente-herrera-solis)
