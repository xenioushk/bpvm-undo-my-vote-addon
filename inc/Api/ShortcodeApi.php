<?php

/**
 * @package BpvmUmv
 */

namespace BpvmUmv\Inc\Api;

use BpvmUmv\Inc\Base\BaseController;

// ShortcodeApi interface class.

class ShortcodeApi extends BaseController
{

  public $shortcodes = [];

  public function addShortcodes(array $shortcodes)
  {
    $this->shortcodes = $shortcodes;
    return $this;
  }

  public function register()
  {
    if (!empty($this->shortcodes)) {

      foreach ($this->shortcodes as $shorcode) {
        \add_shortcode($shorcode['tag'], $shorcode['callback']);
      }
    }
  }
}