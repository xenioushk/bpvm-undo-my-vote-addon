<?php

/**
 * @package BpvmUmv
 */

/**
 * Plugin Name:    Undo My Vote Addon
 * Plugin URI:        https://bluewindlab.net
 * Description:      This Addon allows your users to undo their submitted votes. This Addon automatically added a custom undo button to the voting box, so user can easily undo their vote. Also, admin users can limit the number of undo for the user's vote. 
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


// Started plugin from here.

if (class_exists('BpvmUmv\\Inc\\Init')) {
    add_action('plugins_loaded', 'BpvmUmv\Inc\Init::registerServices');
}