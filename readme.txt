=== Daxul Astro Theme ===
Contributors: rauldavid
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Tags: headless, graphql, wpgraphql, portfolio, api

Tema headless mínimo, pensado para usar WordPress como CMS y consumir contenido desde WPGraphQL (por ejemplo, con Astro).

Sitio: https://rauldavid.com
Correo: raul_davids@hotmail.com

== Descripción ==

- Tema sin estilos front (el frontend lo sirve Astro u otro cliente).
- CPT `portfolio` (slug `portfolio`) expuesto a WPGraphQL si el plugin está activo.
- Taxonomías para `portfolio`:
  - `portfolio_category` (jerárquica).
  - `tech` (tipo etiquetas / tags, no jerárquica).
- Tamaños de imagen útiles (registrados con `add_image_size`):
  - `daxul_portfolio_card`: 800x600 recortada.
  - `daxul_portfolio_hero`: 1920x1080 recortada.

== Instalación ==

1. Copia la carpeta `daxul-astro-theme` a `wp-content/themes/`.
2. Activa el tema en Apariencia → Temas.
3. (Recomendado) Instala y activa WPGraphQL.
4. En Ajustes → Enlaces permanentes, guarda una vez para regenerar reglas si cambiaste slugs o taxonomías.

== Uso ==

- Crea entradas en Portfolio (CPT: `portfolio`).
- Asigna Categorías y Tech desde el editor.
- Consume datos desde WPGraphQL en tu frontend.

== Captura ==

Para que WordPress muestre la miniatura del tema en Apariencia → Temas, agrega un archivo:

- `screenshot.png` en la raíz del tema (junto a `functions.php` y `style.css`)
- Tamaño recomendado: 1200x900 (4:3)

== Traducciones ==

Text Domain: `daxul-astro-theme`
Path: `languages/`

El tema incluye un archivo POT base en `languages/daxul-astro-theme.pot`.
