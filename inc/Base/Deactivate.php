<?php

/**
 * @package BpvmUmvPlugin
 */

namespace BpvmUmv\Inc\Base;

class Deactivate
{

  public static function deactivate()
  {
    flush_rewrite_rules();
  }
}