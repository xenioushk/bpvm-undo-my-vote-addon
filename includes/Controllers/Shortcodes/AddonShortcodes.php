<?php

namespace UMVADDON\Controllers\Shortcodes;

use Xenioushk\BwlPluginApi\Api\Shortcodes\ShortcodesApi;
use UMVADDON\Callbacks\Shortcodes\UndoButtonCb;
/**
 * Class for Addon shortcodes.
 *
 * @since: 1.1.0
 * @package UMVADDON
 */
class AddonShortcodes {

    /**
	 * Register shortcode.
	 */
    public function register() {
        // Initialize API.
        $shortcodes_api = new ShortcodesApi();

        // Initialize callbacks.
        $undo_button_cb = new UndoButtonCb();

        // All Shortcodes.
        $shortcodes = [
            [
                'tag'      => 'bpvm_umv',
                'callback' => [ $undo_button_cb, 'get_the_output' ],
            ],
        ];

        $shortcodes_api->add_shortcodes( $shortcodes )->register();
    }
}
