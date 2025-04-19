<?php
namespace UMVADDON\Helpers;

/**
 * Class for plugin constants.
 *
 * @package UMVADDON
 */
class PluginConstants {

		/**
         * Static property to hold plugin options.
         *
         * @var array
         */
	public static $plugin_options = [];

	/**
	 * Initialize the plugin options.
	 */
	public static function init() {

		self::$plugin_options = get_option( 'bwl_pvm_options' );
	}

		/**
         * Get the relative path to the plugin root.
         *
         * @return string
         * @example wp-content/plugins/<plugin-name>/
         */
	public static function get_plugin_path(): string {
		return dirname( dirname( __DIR__ ) ) . '/';
	}


    /**
     * Get the plugin URL.
     *
     * @return string
     * @example http://appealwp.local/wp-content/plugins/<plugin-name>/
     */
	public static function get_plugin_url(): string {
		return plugin_dir_url( self::get_plugin_path() . UMVADDON_PLUGIN_ROOT_FILE );
	}

	/**
	 * Register the plugin constants.
	 */
	public static function register() {
		self::init();
		self::set_paths_constants();
		self::set_base_constants();
		self::set_assets_constants();
		self::set_updater_constants();
		self::set_product_info_constants();
	}

	/**
	 * Set the plugin base constants.
     *
	 * @example: $plugin_data = get_plugin_data( UMVADDON_PLUGIN_DIR . '/' . UMVADDON_PLUGIN_ROOT_FILE );
	 * echo '<pre>';
	 * print_r( $plugin_data );
	 * echo '</pre>';
	 * @example_param: Name,PluginURI,Description,Author,Version,AuthorURI,RequiresAtLeast,TestedUpTo,TextDomain,DomainPath
	 */
	private static function set_base_constants() {
		// This is super important to check if the get_plugin_data function is already loaded or not.
		if ( ! function_exists( 'get_plugin_data' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		$plugin_data = get_plugin_data( UMVADDON_PLUGIN_DIR . UMVADDON_PLUGIN_ROOT_FILE );

		define( 'UMVADDON_PLUGIN_VERSION', $plugin_data['Version'] ?? '1.0.0' );
		define( 'UMVADDON_PLUGIN_TITLE', $plugin_data['Name'] ?? 'Undo My Vote Addon For BWL Pro Voting Manager' );
		define( 'UMVADDON_TRANSLATION_DIR', $plugin_data['DomainPath'] ?? '/lang/' );
		define( 'UMVADDON_TEXT_DOMAIN', $plugin_data['TextDomain'] ?? '' );

		define( 'UMVADDON_PLUGIN_FOLDER', 'bpvm-undo-my-vote-addon' );
		define( 'UMVADDON_PLUGIN_CURRENT_VERSION', UMVADDON_PLUGIN_VERSION );

	}

	/**
	 * Set the plugin paths constants.
	 */
	private static function set_paths_constants() {
		define( 'UMVADDON_PLUGIN_ROOT_FILE', 'bpvm-undo-my-vote-addon.php' );
		define( 'UMVADDON_PLUGIN_DIR', self::get_plugin_path() );
		define( 'UMVADDON_PLUGIN_FILE_PATH', UMVADDON_PLUGIN_DIR );
		define( 'UMVADDON_PLUGIN_URL', self::get_plugin_url() );
	}

	/**
	 * Set the plugin assets constants.
	 */
	private static function set_assets_constants() {
		define( 'UMVADDON_PLUGIN_STYLES_ASSETS_DIR', UMVADDON_PLUGIN_URL . 'assets/styles/' );
		define( 'UMVADDON_PLUGIN_SCRIPTS_ASSETS_DIR', UMVADDON_PLUGIN_URL . 'assets/scripts/' );
		define( 'UMVADDON_PLUGIN_LIBS_DIR', UMVADDON_PLUGIN_URL . 'libs/' );
	}

	/**
	 * Set the updater constants.
	 */
	private static function set_updater_constants() {

		// Only change the slug.
		$slug        = 'bpvm/notifier_umv.php';
		$updater_url = "https://projects.bluewindlab.net/wpplugin/zipped/plugins/{$slug}";

		define( 'UMVADDON_PLUGIN_UPDATER_URL', $updater_url ); // phpcs:ignore
		define( 'UMVADDON_PLUGIN_UPDATER_SLUG', UMVADDON_PLUGIN_FOLDER . '/' . UMVADDON_PLUGIN_ROOT_FILE ); // phpcs:ignore
		define( 'UMVADDON_PLUGIN_PATH', UMVADDON_PLUGIN_DIR );
	}

	/**
	 * Set the product info constants.
	 */
	private static function set_product_info_constants() {
		define( 'UMVADDON_PRODUCT_ID', '32986128' ); // Plugin codecanyon/themeforest Id.
		define( 'UMVADDON_PRODUCT_INSTALLATION_TAG', 'umv_bpvm_installation_' . str_replace( '.', '_', UMVADDON_PLUGIN_VERSION ) );
	}
}
