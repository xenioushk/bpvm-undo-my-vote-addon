<?php

namespace UMVADDON\Callbacks\Shortcodes;

use UMVADDON\Helpers\PluginConstants;

/**
 * Class for handling the Undo button shortcode.
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

		if ( ! $post_id ) {
			return '';
		} else {

			$options = PluginConstants::$plugin_options;

			$umv_max_count = intval( $options['bpvm_umv_max_count'] ?? $umv_max_count ) > 0
			? intval( $options['bpvm_umv_max_count'] )
			: $umv_max_count;

			$undo_btn = sprintf(
                '<a href="#" class="bpvm_undo_vote" data-post_type="%s" data-post_id="%d" data-bpvm_data_id="%s" data-votes="1" data-vote_type="%s" data-vote_date="%s" data-umv_max_count="%d">%s</a>',
                esc_attr( $post_type ),
                intval( $post_id ),
                esc_attr( $bpvm_data_id ),
                esc_attr( $vote_type ),
                esc_attr( $vote_date ),
                $umv_max_count,
                esc_html( $title )
			);
			return $undo_btn;
		}
	}
}
