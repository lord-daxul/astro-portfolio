# daxulfolio

Este es mi proyecto de portafolio personal, construido con WordPress en modo headless y Astro para el frontend, con despliegue en Cloudflare Pages.

## Stack

- WordPress + WPGraphQL
- Astro
- Cloudflare Pages
- GitHub para control de versiones

## Requisitos

- Node 22.12.0 o superior
- Una instancia de WordPress con WPGraphQL activo

## Desarrollo local

```bash
npm install
npm run dev
```

Copia `.env.example` a `.env` y define al menos `PUBLIC_WORDPRESS_GRAPHQL_URL`.

## Build

```bash
npm run build
```

## Despliegue

1. Sube este repositorio a GitHub.
2. Conecta el repo en Cloudflare Pages.
3. Configura:
   - Build command: npm run build
   - Output directory: dist
   - Node version: 22.12.0
4. Añade las variables de entorno necesarias en GitHub o Cloudflare Pages.

> Si WordPress no responde durante el build, el sitio puede compilar igualmente mostrando el portfolio vacío de forma temporal.
