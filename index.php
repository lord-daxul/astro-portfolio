<?php
/**
 * Plantilla mínima para modo headless.
 *
 * @package Daxul_Astro_Theme
 */

declare(strict_types=1);

get_header();
?>

<main id="primary" class="site-main">
	<?php
	if ( have_posts() ) :
		while ( have_posts() ) :
			the_post();
			the_content();
		endwhile;
	else :
		?>
		<p><?php esc_html_e( 'This site uses a headless API. Visit the Astro frontend or query the GraphQL endpoint.', 'daxul-astro-theme' ); ?></p>
		<?php
	endif;
	?>
</main>

<?php
get_footer();
