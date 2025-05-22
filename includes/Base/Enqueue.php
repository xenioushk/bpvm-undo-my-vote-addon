<?php
namespace UMVADDON\Base;

use UMVADDON\Helpers\PluginConstants;

/**
 * Class for registering the plugin scripts and styles.
 *
 * @package UMVADDON
 */
class Enqueue {

	/**
	 * Frontend script slug.
	 *
	 * @var string $frontend_script_slug
	 */
	private $frontend_script_slug;

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Frontend script slug.
		// This is required to hook the loclization texts.
		$this->frontend_script_slug = 'bpvm-umv-frontend';
	}

	/**
	 * Register the plugin scripts and styles loading actions.
	 */
	public function register() {

		// Enqueue scripts and styles.
		add_action( 'wp_enqueue_scripts', [ $this, 'get_the_styles' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'get_the_scripts' ] );
	}

	/**
	 * Load the plugin styles.
	 */
	public function get_the_styles() {

		wp_enqueue_style(
            $this->frontend_script_slug,
            UMVADDON_PLUGIN_STYLES_ASSETS_DIR . 'frontend.css',
            [],
            UMVADDON_PLUGIN_VERSION
		);
	}

	/**
	 * Load the plugin scripts.
	 */
	public function get_the_scripts() {

		// Register JS
		wp_enqueue_script(
            $this->frontend_script_slug,
            UMVADDON_PLUGIN_SCRIPTS_ASSETS_DIR . 'frontend.js',
            [ 'jquery' ],
            UMVADDON_PLUGIN_VERSION,
            true
		);

		// Load frontend variables used by the JS files.
		$this->get_the_localization_texts();
	}

	/**
	 * Load the localization texts.
	 */
	private function get_the_localization_texts() {

		// Localize scripts.
		// Frontend.
		// Access data: bpvmUmvaData.version

		$options = PluginConstants::$plugin_options;

		$default_max_count = 2;

		$umv_max_count = intval( $options['bpvm_umv_max_count'] ?? 2 ) > 0
			? intval( $options['bpvm_umv_max_count'] )
			: $default_max_count;

		// translators: %d: Number of votes a user is allowed to undo in a day.
		$umva_max_allowed_vote_msg = sprintf( esc_html__( 'WARNING: You are allowed to UNDO %d votes in a day!', 'bpvm-umv' ), $umv_max_count );
		wp_localize_script(
            $this->frontend_script_slug,
            'bpvmUmvaData',
            [
				'version'                   => UMVADDON_PLUGIN_VERSION,
				'umva_confirmation_msg'     => '❓' . esc_html__( 'Are you sure you want to remove your vote?', 'bpvm-umv' ),
				'umva_max_allowed_vote_msg' => $umva_max_allowed_vote_msg,
			]
		);
	}
}
