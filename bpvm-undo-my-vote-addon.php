<?php

/**
 * Plugin Name:     Undo My Vote Addon For BWL Pro Voting Manager
 * Plugin URI:        https://bluewindlab.net/portfolio/undo-my-vote-addon-for-bwl-pro-voting-manager/
 * Description:      This Addon allows your users to undo their submitted vote. This addon automatically added a custom undo button to the voting box, so user can easily undo their vote. Also, admin users can limit the number of undo for the users vote. 
 * Author:             Mahbub Alam Khan
 * Version:            1.0.3
 * Author URI:       https://codecanyon.net/item/undo-my-vote-addon-for-bwl-pro-voting-manager/32986128
 * WP Requires at least: 6.0+
 * Text Domain: bpvm-umv
 */
// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

define('BPVMUMV_PARENT_PLUGIN_INSTALLED_VERSION', get_option('bwl_pvm_plugin_version'));
define('BPVMUMV_ADDON_PARENT_PLUGIN_TITLE', 'BWL Pro Voting Manager');
define('BPVMUMV_ADDON_TITLE', 'Undo My Vote Addon For BWL Pro Voting Manager');
define('BPVMUMV_PARENT_PLUGIN_REQUIRED_VERSION', '1.3.0'); // change plugin required version in here.
define('BPVMUMV_ADDON_CURRENT_VERSION', '1.0.3'); // change plugin current version in here.

define('BPVMUMV_PATH', plugin_dir_path(__FILE__));
define("BPVMUMV_DIR", plugins_url() . '/bpvm-undo-my-vote-addon/');
define("BPVMUMV_UPDATER_SLUG", plugin_basename(__FILE__));
define("BPVMUMV_CC_ID", "32986128");
define("BPVMUMV_INSTALLATION_TAG", "umv_bpvm_installation_" . str_replace('.', '_', BPVMUMV_ADDON_CURRENT_VERSION));

require_once(BPVMUMV_PATH . 'includes/public/class-umv-addon.php');

register_activation_hook(__FILE__, ['BPVM_umv', 'activate']);
register_deactivation_hook(__FILE__, ['BPVM_umv', 'deactivate']);

add_action('plugins_loaded', ['BPVM_umv', 'get_instance']);

if (is_admin()) {
    require_once(plugin_dir_path(__FILE__) . 'includes/admin/class-umv-addon-admin.php');
    add_action('plugins_loaded', ['BPVM_Umv_Admin', 'get_instance']);
}
