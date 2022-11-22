<?php


/**
 * @package BpvmUmv
 */

namespace BpvmUmv\Inc\Shortcodes;

use BpvmUmv\Inc\Api\ShortcodeApi;
use BpvmUmv\Inc\Base\BaseController;
use BpvmUmv\Inc\Api\Callbacks\ShortcodesCallback;

class Shortcodes extends BaseController
{

  public $shortcodes;

  public $callbacks;

  public function register()
  {

    $this->shortcodes = new ShortcodeApi();
    $this->callbacks = new ShortcodesCallback();

    $shortcodes = [
      [
        'tag' => 'bpvm_umv',
        'callback' => [$this->callbacks, 'cb_bpvm_umv']
      ]
    ];

    $this->shortcodes->addShortcodes($shortcodes)->register();
  }
}