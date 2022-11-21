<?php


/**
 * @package BpvmUmvPlugin
 */

namespace BpvmUmv\Inc\Base;

class Activate
{
  public static function activate()
  {
    flush_rewrite_rules();
  }
}