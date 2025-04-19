<?php
namespace UMVADDON\Base;

/**
 * Class for plucin activation.
 *
 * @since: 1.1.0
 * @package UMVADDON
 */
class Activate {

	/**
	 * Activate the plugin.
	 */
	public function activate() { // phpcs:ignore
		flush_rewrite_rules();
	}
}
