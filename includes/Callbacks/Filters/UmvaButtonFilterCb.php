<?php
namespace UMVADDON\Callbacks\Filters;

/**
 * Class for registering recaptcha overlay actions.
 *
 * @package UMVADDON
 * @since: 1.0.0
 * @author: Mahbub Alam Khan
 */
class UmvaButtonFilterCb {

	/**
	 * Get the layout for the recaptcha overlay.
	 *
	 * @param array $data The data to be used in the layout.
	 */
	public function get_the_layout( $data ) {

		if ( ! UMVADDON_BUTTON_STATUS ) {
			return '';
		}
		global $post;
		$title        = $data['title'] ?? esc_html__( 'Undo!', 'bpvm-umv' );
		$post_id      = $data['post_id'] ?? $post->ID;
		$post_type    = $data['post_type'] ?? get_post_type();
		$date         = date( 'Y-m-d H:i:s' );
		$bpvm_data_id = $data['bpvm_data_id'];
		$vote_type    = $data['vote_type'];

		return do_shortcode( sprintf(
			'[bpvm_umv title="%s" post_type="%s" post_id="%d" bpvm_data_id="%d" votes="1" vote_type="%d" vote_date="%s"]',
			$title,
			$post_type,
			$post_id,
			$bpvm_data_id,
			$vote_type,
			$date
		) );
	}
}
