# Información del Proyecto: daxulfolio

## Descripción General
Portafolio personal headless que separa el CMS (WordPress) del frontend (Astro), desplegado en Cloudflare Pages para máximo rendimiento y seguridad.

## Propósito
Mostrar proyectos, habilidades y experiencia profesional mediante un sitio estático rápido, seguro y fácil de mantener, donde el contenido se gestiona en WordPress y se publica automáticamente via API.

## Arquitectura
- **CMS (Headless)**: WordPress + WPGraphQL
  - Gestión de contenido: posts, proyectos, páginas
  - API GraphQL para consulta de datos
- **Frontend**: Astro 6.x
  - Generación de sitio estático (SSG)
  - Hidratación parcial (islas) solo donde se necesita interactividad
  - TailwindCSS 4 para estilos
- **Despliegue**: Cloudflare Pages
  - Build automático desde GitHub
  - Edge network global
  - Functions/Workers para lógica serverless si se requiere
- **Control de versiones**: GitHub

## Flujo de Trabajo
1. Crear/editar contenido en WordPress (posts, proyectos, etc.)
2. WPGraphQL expone los datos via endpoint GraphQL
3. En build time, Astro consulta la API y genera HTML estático
4. Cloudflare Pages despliega el sitio generado en `dist/`
5. Sitio servido desde CDN global con latencia mínima

## Tecnologías Clave
| Capa | Tecnología | Versión |
|------|------------|---------|
| Runtime | Node.js | >=22.12.0 |
| Framework | Astro | ^6.1.7 |
| Estilos | TailwindCSS | ^4.2.2 |
| Despliegue | @astrojs/cloudflare | ^13.1.10 |
| Tipos/Dev | Wrangler | ^4.83.0 |

## Variables de Entorno Requeridas
- `PUBLIC_WORDPRESS_GRAPHQL_URL`: Endpoint GraphQL de WordPress

## Comandos Principales
```bash
npm install      # Instalar dependencias
npm run dev      # Desarrollo local (astro dev)
npm run build    # Build de producción (astro build)
npm run preview  # Vista previa del build
```

## Internacionalización
Soporte multiidioma mediante archivos `.po`/.`pot` en `/languages` (español configurado).

## Resiliencia
Si WordPress no responde durante el build, el sitio compila igualmente mostrando el portfolio vacío temporalmente, evitando despliegues fallidos.