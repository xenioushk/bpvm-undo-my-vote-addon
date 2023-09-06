<?php

/**
 * Plugin Name:     Undo My Vote Addon For BWL Pro Voting Manager
 * Plugin URI:        https://bluewindlab.net/portfolio/undo-my-vote-addon-for-bwl-pro-voting-manager/
 * Description:      This addon enhances user engagement by providing an 'Undo' feature, allowing your users to retract their previously submitted votes. It seamlessly integrates into the voting interface, automatically incorporating a custom 'Undo' button within the voting box. This empowers users with the convenience of reversing their vote decisions effortlessly. Additionally, administrators have the flexibility to set limits on the number of times a user can undo their vote, providing fine-grained control over the voting process to suit their specific requirements.
 * Author:             Mahbub Alam Khan
 * Version:            1.0.4
 * Author URI:       https://codecanyon.net/item/undo-my-vote-addon-for-bwl-pro-voting-manager/32986128
 * WP Requires at least: 6.0+
 * Text Domain: bpvm-umv
 * Domain Path: /languages/
 * 
 * 
 * @package Undo My Vote Addon For BWL Pro Voting Manager
 * @author Mahbub Alam Khan
 * @license GPL-2.0+
 * @link https://bluewindlab.net
 * @copyright 2023 BlueWindLab
 * 
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

define('BPVMUMV_PARENT_PLUGIN_INSTALLED_VERSION', get_option('bwl_pvm_plugin_version'));
define('BPVMUMV_ADDON_PARENT_PLUGIN_TITLE', 'BWL Pro Voting Manager');
define('BPVMUMV_ADDON_TITLE', 'Undo My Vote Addon For BWL Pro Voting Manager');
define('BPVMUMV_PARENT_PLUGIN_REQUIRED_VERSION', '1.3.0'); // change plugin required version in here.
define('BPVMUMV_ADDON_CURRENT_VERSION', '1.0.4'); // change plugin current version in here.

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
