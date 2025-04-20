<?php
namespace UMVADDON\Controllers\PluginMeta;

/**
 * Class displays options panel, addons, documentation links below the plugin information.
 *
 * @since: 1.1.0
 * @package UMVADDON
 */
class MetaInfo {

	/**
	 * Register filters.
	 */
	public function register() {
		add_filter( 'plugin_row_meta', [ $this, 'get_meta_links' ], null, 2 );
	}

	/**
     * Filters the plugin action links.
     *
     * @param array  $links An array of plugin action links.
     * @param string $file  The path to the plugin file.
     *
     * @return array Filtered array of plugin action links.
     */
	public function get_meta_links( $links, $file ) {

		if ( strpos( $file, UMVADDON_PLUGIN_ROOT_FILE ) !== false && is_plugin_active( $file ) ) {

			// nt = 1 // new tab.
			$additional_links = [
				[
					'title' => esc_html__( 'Options Panel', 'bpvm-umv' ),
					'url'   => admin_url( 'admin.php?page=bwl-pvm_option_panel#bpvm_umv_options' ), //phpcs:ignore
				],
				[
					'title' => esc_html__( 'Docs', 'bpvm-umv' ),
					'url'   => 'https://xenioushk.github.io/docs-plugins-addon/bpvm-addon/umva/index.html',
					'nt'    => 1,
				],
				[
					'title' => esc_html__( 'Support', 'bpvm-umv' ),
					'url'   => 'https://codecanyon.net/item/undo-my-vote-addon-for-bwl-pro-voting-manager/32986128/support',
					'nt'    => 1,
				],

			];

			$new_links = [];

			foreach ( $additional_links as $link ) {

				$new_tab = isset( $link['nt'] ) ? 'target="_blank"' : '';
				$class   = isset( $link['class'] ) ? 'class="' . $link['class'] . '"' : '';

				$url   = esc_url( $link['url'] );
				$title = $link['title'];

				$new_links[] = "<a href='{$url}' {$new_tab} {$class}>{$title}</a>";
			}

			$links = array_merge( $links, $new_links );
		}

		return $links;
	}
}
