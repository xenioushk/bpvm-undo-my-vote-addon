<?php
namespace UMVADDON\Controllers\Filters;

use Xenioushk\BwlPluginApi\Api\Filters\FiltersApi;
use UMVADDON\Callbacks\Filters\UmvaButtonFilterCb;

/**
 * Class for registering the recaptcha overlay actions.
 *
 * @since: 1.1.0
 * @package UMVADDON
 */
class UmvaFilters {

    /**
	 * Register filters.
	 */
    public function register() {

        // Initialize API.
        $filters_api = new FiltersApi();

        // Initialize callbacks.
        $umva_button_filter_cb = new UmvaButtonFilterCb();

        $filters = [
            [
                'tag'      => 'umva_button_filter',
                'callback' => [ $umva_button_filter_cb, 'get_the_layout' ],
            ],

        ];

        $filters_api->add_filters( $filters )->register();
    }
}
