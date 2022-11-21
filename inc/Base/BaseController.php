<?php

/**
 * @package CaseStudyPlugin
 */

namespace BpvmUmv\Inc\Base;


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

    $this->api_version = "bpvm/v1";
    $this->plugin_name = 'Undo My Vote Addon For BWL Pro Voting Manager';
    $this->plugin_version = '1.0.1';
    $this->plugin_slug = "bpvm-umv";

    $this->plugin_dependency = [
      [
        'title' => 'BWL Pro Voting Manager',
        'minimum_ver' => '1.2.6',
        'current_ver' => get_option('bwl_pvm_plugin_version')
      ]
    ];

    $this->plugin_path = plugin_dir_path(dirname(__FILE__, 2));
    $this->plugin_url = plugin_dir_url(dirname(__FILE__, 2));
    $this->plugin = plugin_basename(dirname(__FILE__, 3)) . '/bpvm-undo-my-vote-addonphp';
    $this->default_scripts_dependency = "jquery";
  }
}