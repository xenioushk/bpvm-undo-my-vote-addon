<?php

/**
 * @package CaseStudyPlugin
 */

namespace BpvmUmv\Inc\Base;

class PluginInfo
{

  public static $pluginName =  'Undo My Vote Addon';
  public static $pluginVersion = '1.0.1';
  public static $parentPlugin = 'BWL Pro Voting Manager';
  public static $parentPluginUrl = 'https://1.envato.market/bpvm-wp';
  public static $parentPluginReqVer = '1.2.6';

  public static function getParentPluginCurrentVersion()
  {
    return \get_option('bwl_pvm_plugin_version') ?? '1.0.0';
  }

  public static function getAddonActivationStatus()
  {
    $pvm_data = get_option('bwl_pvm_options');
    return $pvm_data['bpvm_umv_status'] ?? 0;
  }

  public static function getRequiredPluginInstallationStatus()
  {

    $status = 1; // Assume all the required plugin installed.

    // Now, first check if the parent plugin class exist.
    // Next, check the required version no of parent plugin.

    if (!class_exists('BWL_Pro_Voting_Manager') || version_compare(self::getParentPluginCurrentVersion(), self::$parentPluginReqVer, '<') || self::getAddonActivationStatus() == 0) {
      $status = 0;
    }

    return $status;
  }
}