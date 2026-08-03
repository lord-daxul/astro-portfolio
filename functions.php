<?php
/**
 * Daxul Astro Theme — funciones principales.
 *
 * @package Daxul_Astro_Theme
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DAXUL_ASTRO_THEME_VERSION', '2.0.0' );

/**
 * Configuración del tema (headless-friendly).
 */
function daxul_astro_theme_setup(): void {
	load_theme_textdomain( 'daxul-astro-theme', get_template_directory() . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Tamaños útiles si generas URLs de imagen vía GraphQL.
	add_image_size( 'daxul_portfolio_card', 800, 600, true );
	add_image_size( 'daxul_portfolio_hero', 1920, 1080, true );
}
add_action( 'after_setup_theme', 'daxul_astro_theme_setup' );

/**
 * Registra el CPT Portfolio y lo expone a WPGraphQL cuando el plugin está activo.
 */
function daxul_astro_register_portfolio_cpt(): void {
	$labels = array(
		'name'                  => _x( 'Portfolio', 'post type general name', 'daxul-astro-theme' ),
		'singular_name'         => _x( 'Project', 'post type singular name', 'daxul-astro-theme' ),
		'menu_name'             => _x( 'Portfolio', 'admin menu', 'daxul-astro-theme' ),
		'name_admin_bar'        => _x( 'Project', 'add new on admin bar', 'daxul-astro-theme' ),
		'add_new'               => _x( 'Add New', 'portfolio', 'daxul-astro-theme' ),
		'add_new_item'          => __( 'Add Project', 'daxul-astro-theme' ),
		'new_item'              => __( 'New Project', 'daxul-astro-theme' ),
		'edit_item'             => __( 'Edit Project', 'daxul-astro-theme' ),
		'view_item'             => __( 'View Project', 'daxul-astro-theme' ),
		'all_items'             => __( 'All Projects', 'daxul-astro-theme' ),
		'search_items'          => __( 'Search Portfolio', 'daxul-astro-theme' ),
		'not_found'             => __( 'No projects found.', 'daxul-astro-theme' ),
		'not_found_in_trash'    => __( 'No projects found in Trash.', 'daxul-astro-theme' ),
		'featured_image'        => _x( 'Featured image', 'portfolio', 'daxul-astro-theme' ),
		'set_featured_image'    => _x( 'Set featured image', 'portfolio', 'daxul-astro-theme' ),
		'remove_featured_image' => _x( 'Remove featured image', 'portfolio', 'daxul-astro-theme' ),
		'use_featured_image'    => _x( 'Use as featured image', 'portfolio', 'daxul-astro-theme' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'portfolio' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 20,
		'menu_icon'          => 'dashicons-portfolio',
		'show_in_rest'       => true,
		'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'author', 'revisions', 'custom-fields' ),
	);

	if ( class_exists( 'WPGraphQL' ) ) {
		$args['show_in_graphql']       = true;
		$args['graphql_single_name']   = 'PortfolioItem';
		$args['graphql_plural_name']  = 'PortfolioItems';
	}

	register_post_type( 'portfolio', $args );
}
add_action( 'init', 'daxul_astro_register_portfolio_cpt', 5 );

/**
 * Taxonomía opcional para categorizar portfolio (útil en Astro con filtros).
 */
function daxul_astro_register_portfolio_taxonomy(): void {
	$labels = array(
		'name'              => _x( 'Portfolio Categories', 'taxonomy general name', 'daxul-astro-theme' ),
		'singular_name'     => _x( 'Portfolio Category', 'taxonomy singular name', 'daxul-astro-theme' ),
		'search_items'      => __( 'Search categories', 'daxul-astro-theme' ),
		'all_items'         => __( 'All categories', 'daxul-astro-theme' ),
		'parent_item'       => __( 'Parent category', 'daxul-astro-theme' ),
		'parent_item_colon' => __( 'Parent category:', 'daxul-astro-theme' ),
		'edit_item'         => __( 'Edit category', 'daxul-astro-theme' ),
		'update_item'       => __( 'Update category', 'daxul-astro-theme' ),
		'add_new_item'      => __( 'Add category', 'daxul-astro-theme' ),
		'new_item_name'     => __( 'New category name', 'daxul-astro-theme' ),
		'menu_name'         => __( 'Categories', 'daxul-astro-theme' ),
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => 'portfolio-category' ),
		'show_in_rest'      => true,
	);

	if ( class_exists( 'WPGraphQL' ) ) {
		$args['show_in_graphql']      = true;
		$args['graphql_single_name']  = 'PortfolioCategory';
		$args['graphql_plural_name'] = 'PortfolioCategories';
	}

	register_taxonomy( 'portfolio_category', array( 'portfolio' ), $args );
}
add_action( 'init', 'daxul_astro_register_portfolio_taxonomy', 6 );

function daxul_astro_register_portfolio_tech_taxonomy(): void {
	$labels = array(
		'name'                       => _x( 'Tech', 'taxonomy general name', 'daxul-astro-theme' ),
		'singular_name'              => _x( 'Tech', 'taxonomy singular name', 'daxul-astro-theme' ),
		'search_items'               => __( 'Search tech', 'daxul-astro-theme' ),
		'popular_items'              => __( 'Popular tech', 'daxul-astro-theme' ),
		'all_items'                  => __( 'All tech', 'daxul-astro-theme' ),
		'edit_item'                  => __( 'Edit tech', 'daxul-astro-theme' ),
		'update_item'                => __( 'Update tech', 'daxul-astro-theme' ),
		'add_new_item'               => __( 'Add tech', 'daxul-astro-theme' ),
		'new_item_name'              => __( 'New tech name', 'daxul-astro-theme' ),
		'separate_items_with_commas' => __( 'Separate tech with commas', 'daxul-astro-theme' ),
		'add_or_remove_items'        => __( 'Add or remove tech', 'daxul-astro-theme' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'daxul-astro-theme' ),
		'not_found'                  => __( 'No tech found.', 'daxul-astro-theme' ),
		'menu_name'                  => __( 'Tech', 'daxul-astro-theme' ),
	);

	$args = array(
		'hierarchical'          => false,
		'labels'                => $labels,
		'show_ui'               => true,
		'show_admin_column'     => true,
		'update_count_callback' => '_update_post_term_count',
		'query_var'             => true,
		'rewrite'               => array( 'slug' => 'tech' ),
		'show_in_rest'          => true,
	);

	if ( class_exists( 'WPGraphQL' ) ) {
		$args['show_in_graphql']      = true;
		$args['graphql_single_name']  = 'Tech';
		$args['graphql_plural_name'] = 'Techs';
	}

	register_taxonomy( 'tech', array( 'portfolio' ), $args );
}
add_action( 'init', 'daxul_astro_register_portfolio_tech_taxonomy', 7 );

/**
 * Tras activar el tema, `init` ya registró el CPT; solo regenera las reglas de URL.
 */
function daxul_astro_theme_activation(): void {
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'daxul_astro_theme_activation' );

/**
 * Sin estilos front del tema en cola (Astro es el front). Opcional: descomenta para depurar en WP.
 */
function daxul_astro_theme_assets(): void {
	// wp_enqueue_style( 'daxul-astro-theme', get_stylesheet_uri(), array(), DAXUL_ASTRO_THEME_VERSION );
}
add_action( 'wp_enqueue_scripts', 'daxul_astro_theme_assets' );
