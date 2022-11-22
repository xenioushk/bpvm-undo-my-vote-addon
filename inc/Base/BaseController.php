<?php

/**
 * @package BpvmUmv
 */

namespace BpvmUmv\Inc\Base;

use BpvmUmv\Inc\Base\PluginInfo;


class BaseController extends Helpers

{

  public $api_version;
  public $plugin_version;
  public $plugin_name;
  public $plugin_slug;
  public $plugin_path; // plugin relative url. (use for template or files.)
  public $plugin_url; // plugin absolute url (use for style)
  public $plugin; // plugin base file path.

  public $plugin_dependency = [];

  public $default_scripts_dependency;

  public function __construct()
  {

    $this->plugin_name = PluginInfo::$pluginName;
    $this->plugin_version = PluginInfo::$pluginVersion;
    $this->plugin_slug = PluginInfo::$pluginSlug; // Use for translation.

    $this->plugin_path = plugin_dir_path(dirname(__FILE__, 2));
    $this->plugin_url = plugin_dir_url(dirname(__FILE__, 2));
    $this->plugin = plugin_basename(dirname(__FILE__, 3)) . '/bpvm-undo-my-vote-addonphp';
    $this->default_scripts_dependency = "jquery";
  }
}