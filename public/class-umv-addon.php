<?php

class BPVM_umv
{

    const VERSION = BPVMUMV_ADDON_CURRENT_VERSION;

    protected $plugin_slug = 'bpvm-umv';

    protected static $instance = null;

    private function __construct()
    {

        $bpvm_umv_status = 0;

        $pvm_data = get_option('bwl_pvm_options');

        if (isset($pvm_data['bpvm_umv_status']) && $pvm_data['bpvm_umv_status'] == 1) {
            $bpvm_umv_status = 1;
        }

        if (class_exists('BWL_Pro_Voting_Manager') && BPVMUMV_PARENT_PLUGIN_INSTALLED_VERSION > '1.2.4' && $bpvm_umv_status == 1) {
            // Load public-facing style sheet and JavaScript.
            add_action('init', array($this, 'load_plugin_textdomain'));
            add_action('wp_enqueue_scripts', array($this, 'bpvm_umv_enqueue_scripts'));
            add_shortcode('bpvm_umv', array($this, 'cb_bpvm_umv'));
        }
    }


    public function get_plugin_slug()
    {
        return $this->plugin_slug;
    }

    public static function get_instance()
    {

        // If the single instance hasn't been set, set it now.
        if (null == self::$instance) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    public static function activate($network_wide)
    {

        if (function_exists('is_multisite') && is_multisite()) {

            if ($network_wide) {

                // Get all blog ids
                $blog_ids = self::get_blog_ids();

                foreach ($blog_ids as $blog_id) {

                    switch_to_blog($blog_id);
                    self::single_activate();
                }

                restore_current_blog();
            } else {
                self::single_activate();
            }
        } else {
            self::single_activate();
        }
    }

    public static function deactivate($network_wide)
    {

        if (function_exists('is_multisite') && is_multisite()) {

            if ($network_wide) {

                // Get all blog ids
                $blog_ids = self::get_blog_ids();

                foreach ($blog_ids as $blog_id) {

                    switch_to_blog($blog_id);
                    self::single_deactivate();
                }

                restore_current_blog();
            } else {
                self::single_deactivate();
            }
        } else {
            self::single_deactivate();
        }
    }

    public function activate_new_site($blog_id)
    {

        if (1 !== did_action('wpmu_new_blog')) {
            return;
        }

        switch_to_blog($blog_id);
        self::single_activate();
        restore_current_blog();
    }

    private static function get_blog_ids()
    {

        global $wpdb;

        // get an array of blog ids
        $sql = "SELECT blog_id FROM $wpdb->blogs
			WHERE archived = '0' AND spam = '0'
			AND deleted = '0'";

        return $wpdb->get_col($sql);
    }

    /**
     * Fired for each blog when the plugin is activated.
     *
     * @since    1.0.0
     */
    private static function single_activate()
    {
        // @TODO: Define activation functionality here
    }

    /**
     * Fired for each blog when the plugin is deactivated.
     *
     * @since    1.0.0
     */
    private static function single_deactivate()
    {
        // @TODO: Define deactivation functionality here
    }

    public function cb_bpvm_umv($atts)
    {

        $atts = shortcode_atts(array(
            'title' => esc_html__('Undo !', 'bpvm-umv'),
            'post_type' => '',
            'post_id' => 0,
            'bpvm_data_id' => '',
            'vote_type' => '',
            'vote_date' => '',
            'umv_max_count' => 2
        ), $atts);

        extract($atts);

        if ($post_id == 0) {

            return '';
        } else {

            $pvm_data = get_option('bwl_pvm_options');

            if (isset($pvm_data['bpvm_umv_max_count']) && is_numeric($pvm_data['bpvm_umv_max_count'])) {
                $umv_max_count = (int) ($pvm_data['bpvm_umv_max_count']);
            }
            return '<a href="#" class="bpvm_undo_vote" data-post_type="' . $post_type . '" data-post_id="' . $post_id . '" data-bpvm_data_id="' . $bpvm_data_id . '"data-votes="1" data-vote_type="' . $vote_type . '" data-vote_date="' . $vote_date . '" data-umv_max_count="' . $umv_max_count . '">' . $title . '</a>';
        }
    }

    /**
     * Load the plugin text domain for translation.
     *
     * @since    1.0.0
     */
    public function load_plugin_textdomain()
    {

        $domain = $this->plugin_slug;
        $locale = apply_filters('plugin_locale', get_locale(), $domain);

        load_textdomain($domain, trailingslashit(WP_LANG_DIR) . $domain . '/' . $domain . '-' . $locale . '.mo');
    }

    /**
     * Register and enqueues public-facing Scripts & Styles
     *
     * @since    1.0.0
     */
    public function bpvm_umv_enqueue_scripts()
    {

        wp_enqueue_style($this->plugin_slug . '-frontend', BPVMUMV_DIR . 'assets/styles/frontend.css',  [], self::VERSION);
        wp_enqueue_script($this->plugin_slug . '-frontend', BPVMUMV_DIR . 'assets/scripts/frontend.js',  ['jquery'], self::VERSION, TRUE);
    }
}
