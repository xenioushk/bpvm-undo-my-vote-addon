<?php

/**
 * @package BpvmUmvPlugin
 */

/**
 * Plugin Name:    Undo My Vote Addon For BWL Pro Voting Manager
 * Plugin URI:        https://bluewindlab.net
 * Description:      This Addon allows your users to undo their submitted vote. This addon automatically added a custom undo button to the voting box, so user can easily undo their vote. Also, admin users can limit the number of undo for the users vote. 
 * Author: Md Mahbub Alam Khan
 * Version: 1.0.0
 * Author URI: https://bluewindlab.net
 * WP Requires at least: 4.8+
 * Text Domain: bpvm-umv
 */


// security check.
defined('ABSPATH') or die("Unauthorized access");

if (file_exists(dirname(__FILE__) . '/vendor/autoload.php')) {
    require_once dirname(__FILE__) . '/vendor/autoload.php';
}

use Inc\Base\Activate;
use Inc\Base\Deactivate;

function bpvmUmvActivePlugin()
{
    Activate::activate();
}

register_activation_hook(__FILE__, 'bpvmUmvActivePlugin');

function bpvmUmvDeactivePlugin()
{
    Deactivate::deactivate();
}
register_activation_hook(__FILE__, 'bpvmUmvDeactivePlugin');

if (class_exists('Inc\\Init')) {
    Inc\Init::registerServices();
}


return 1;

/* ----------------------------------------------------------------------------*
 * Public-Facing Functionality
 * ---------------------------------------------------------------------------- */

//Version Define For Parent Plugin And Addon.
// @Since: 1.0.1

define('BPVMUMV_PARENT_PLUGIN_INSTALLED_VERSION', get_option('bwl_pvm_plugin_version'));
define('BPVMUMV_ADDON_PARENT_PLUGIN_TITLE', 'BWL Pro Voting Manager');
define('BPVMUMV_ADDON_TITLE', 'Undo My Vote Addon For BWL Pro Voting Manager');
define('BPVMUMV_PARENT_PLUGIN_REQUIRED_VERSION', '1.2.6'); // change plugin required version in here.
define('BPVMUMV_ADDON_CURRENT_VERSION', '1.0.0'); // change plugin current version in here.

define('BPVMUMV_DIR', plugin_dir_path(__FILE__));

require_once(BPVMUMV_DIR . 'public/class-umv-addon.php');

register_activation_hook(__FILE__, array('BPVM_umv', 'activate'));
register_deactivation_hook(__FILE__, array('BPVM_umv', 'deactivate'));

add_action('plugins_loaded', array('BPVM_umv', 'get_instance'));

if (is_admin()) {

    require_once(plugin_dir_path(__FILE__) . 'admin/class-umv-addon-admin.php');
    add_action('plugins_loaded', array('BPVM_Umv_Admin', 'get_instance'));
}