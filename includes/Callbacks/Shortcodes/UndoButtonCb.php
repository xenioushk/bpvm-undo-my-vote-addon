<?php

namespace UMVADDON\Callbacks\Shortcodes;

use UMVADDON\Helpers\PluginConstants;

/**
 * Class BreadcrumbCb
 * Handles Breadcrumb shortcode.
 *
 * @package UMVADDON
 * @since: 1.0.0
 * @author: Mahbub Alam Khan
 */
class UndoButtonCb {

	/**
	 * Get the output.
	 *
	 * @param array $atts Attributes.
	 *
	 * @return string
	 */
	public function get_the_output( $atts ) {

		$atts = shortcode_atts(
			[
				'title'         => esc_html__( 'Undo !', 'bpvm-umv' ),
				'post_type'     => '',
				'post_id'       => 0,
				'bpvm_data_id'  => '',
				'vote_type'     => '',
				'vote_date'     => '',
				'umv_max_count' => 2,
			], $atts
		);

		extract( $atts ); //phpcs:ignore

		if ( $post_id == 0 ) {

			return '';
		} else {

			$pvm_data = PluginConstants::$plugin_options;

			if ( isset( $pvm_data['bpvm_umv_max_count'] ) && is_numeric( $pvm_data['bpvm_umv_max_count'] ) ) {
					$umv_max_count = (int) ( $pvm_data['bpvm_umv_max_count'] );
			}
			return '<a href="#" class="bpvm_undo_vote" data-post_type="' . $post_type . '" data-post_id="' . $post_id . '" data-bpvm_data_id="' . $bpvm_data_id . '"data-votes="1" data-vote_type="' . $vote_type . '" data-vote_date="' . $vote_date . '" data-umv_max_count="' . $umv_max_count . '">' . $title . '</a>';
		}
	}
}
