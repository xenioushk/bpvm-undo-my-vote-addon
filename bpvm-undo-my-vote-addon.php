<?php

/**
 * Plugin Name:     Undo My Vote Addon For BWL Pro Voting Manager
 * Plugin URI:        https://codecanyon.net/item/undo-my-vote-addon-for-bwl-pro-voting-manager/32986128
 * Description:      This addon enhances user engagement by providing an 'Undo' feature, allowing your users to retract their previously submitted votes. It seamlessly integrates into the voting interface, automatically incorporating a custom 'Undo' button within the voting box. This empowers users with the convenience of reversing their vote decisions effortlessly. Additionally, administrators have the flexibility to set limits on the number of times a user can undo their vote, providing fine-grained control over the voting process to suit their specific requirements.
 * Author:             Mahbub Alam Khan
 * Version:            2.0.0
 * Author URI:       https://codecanyon.net/user/xenioushk
 * WP Requires at least: 6.0+
 * Text Domain: bpvm-umv
 * Domain Path: /lang/
 *
 * @package   UMVADDON
 * @author    Mahbub Alam Khan
 * @license   GPL-2.0+
 * @link      https://codecanyon.net/user/xenioushk
 * @copyright 2025 BlueWindLab
 */

namespace UMVADDON;

// security check.
defined( 'ABSPATH' ) || die( 'Unauthorized access' );

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
}

// Load the plugin constants
if ( file_exists( __DIR__ . '/includes/Helpers/DependencyManager.php' ) ) {
	require_once __DIR__ . '/includes/Helpers/DependencyManager.php';
	Helpers\DependencyManager::register();
}

use UMVADDON\Base\Activate;
use UMVADDON\Base\Deactivate;

/**
 * Function to handle the activation of the plugin.
 *
 * @return void
 */
 function activate_plugin() { // phpcs:ignore
	$activate = new Activate();
	$activate->activate();
}

/**
 * Function to handle the deactivation of the plugin.
 *
 * @return void
 */
 function deactivate_plugin() { // phpcs:ignore
	Deactivate::deactivate();
}

register_activation_hook( __FILE__, __NAMESPACE__ . '\\activate_plugin' );
register_deactivation_hook( __FILE__, __NAMESPACE__ . '\\deactivate_plugin' );

/**
 * Function to handle the initialization of the plugin.
 *
 * @return void
 */
function init_recap_addon() {

	// Check if the parent plugin installed.
	if ( ! class_exists( 'BPVMWP\\Init' ) ) {
		add_action( 'admin_notices', [ Helpers\DependencyManager::class, 'notice_missing_main_plugin' ] );
		return;
	}

	// Check parent plugin activation status.
	if ( ! ( Helpers\DependencyManager::get_product_activation_status() ) ) {
		add_action( 'admin_notices', [ Helpers\DependencyManager::class, 'notice_missing_purchase_verification' ] );
		return;
	}

	if ( class_exists( 'UMVADDON\\Init' ) ) {

		// Check the required minimum version of the parent plugin.
		if ( ! ( Helpers\DependencyManager::check_minimum_version_requirement_status() ) ) {
			add_action( 'admin_notices', [ Helpers\DependencyManager::class, 'notice_min_version_main_plugin' ] );
			return;
		}

		// Initialize the plugin.
		Init::register_services();
	}
}

add_action( 'init', __NAMESPACE__ . '\\init_recap_addon' );

return;

define( 'BPVMUMV_PARENT_PLUGIN_INSTALLED_VERSION', get_option( 'bwl_pvm_plugin_version' ) );
define( 'BPVMUMV_ADDON_PARENT_PLUGIN_TITLE', 'BWL Pro Voting Manager' );
define( 'BPVMUMV_ADDON_TITLE', 'Undo My Vote Addon For BWL Pro Voting Manager' );
define( 'BPVMUMV_PARENT_PLUGIN_REQUIRED_VERSION', '1.3.0' ); // change plugin required version in here.
define( 'BPVMUMV_ADDON_CURRENT_VERSION', '1.0.7' ); // change plugin current version in here.

define( 'BPVMUMV_ADDON_ROOT_FILE', 'bpvm-undo-my-vote-addon.php' ); // use for the meta info.

define( 'BPVMUMV_PATH', plugin_dir_path( __FILE__ ) );
define( 'BPVMUMV_DIR', plugins_url() . '/bpvm-undo-my-vote-addon/' );
define( 'BPVMUMV_UPDATER_SLUG', plugin_basename( __FILE__ ) );
define( 'BPVMUMV_CC_ID', '32986128' );
define( 'BPVMUMV_INSTALLATION_TAG', 'umv_bpvm_installation_' . str_replace( '.', '_', BPVMUMV_ADDON_CURRENT_VERSION ) );

require_once BPVMUMV_PATH . 'includes/public/class-umv-addon.php';

register_activation_hook( __FILE__, [ 'BPVM_umv', 'activate' ] );
register_deactivation_hook( __FILE__, [ 'BPVM_umv', 'deactivate' ] );

add_action( 'plugins_loaded', [ 'BPVM_umv', 'get_instance' ] );

if ( is_admin() ) {
    include_once plugin_dir_path( __FILE__ ) . 'includes/admin/class-umv-addon-admin.php';
    add_action( 'plugins_loaded', [ 'BPVM_Umv_Admin', 'get_instance' ] );
}
