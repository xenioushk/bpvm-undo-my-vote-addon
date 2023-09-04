<?php

class BPVM_Umv_Admin
{

    protected static $instance = null;
    protected $plugin_screen_hook_suffix = null;
    public $plugin_slug;

    private function __construct()
    {

        if (
            !class_exists('BWL_Pro_Voting_Manager') ||
            BPVMUMV_PARENT_PLUGIN_INSTALLED_VERSION < BPVMUMV_PARENT_PLUGIN_INSTALLED_VERSION
        ) {
            add_action('admin_notices', [$this, 'umv_version_update_admin_notice']);
            return false;
        }

        // Start Plugin Admin Panel Code.

        $plugin = BPVM_umv::get_instance();
        $this->plugin_slug = $plugin->get_plugin_slug();
        $this->includeFiles();
    }

    public static function get_instance()
    {

        // If the single instance hasn't been set, set it now.
        if (null == self::$instance) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    public function umv_version_update_admin_notice()
    {

        echo '<div class="updated"><p>You need to download & install '
            . '<b><a href="https://1.envato.market/bpvm-wp" target="_blank">' . BPVMUMV_ADDON_PARENT_PLUGIN_TITLE . ' ( Minimum Version ' . BPVMUMV_PARENT_PLUGIN_REQUIRED_VERSION . ' )</a></b> '
            . 'to use <b>' . BPVMUMV_ADDON_TITLE . '</b>.</p></div>';
    }

    public function enqueue_scripts()
    {
        wp_register_script($this->plugin_slug . '-admin', BPVMUMV_DIR . 'assets/scripts/admin.js', ['jquery'], BPVMUMV_ADDON_CURRENT_VERSION, TRUE);
        wp_localize_script(
            $this->plugin_slug . '-admin',
            'umvBpvmAdminData',
            [
                'installation' => get_option(BPVMUMV_INSTALLATION_TAG)
            ]
        );
    }

    public function includeFiles()
    {
        if (is_admin()) {

            include_once BPVMUMV_PATH . 'includes/autoupdater/WpAutoUpdater.php';
            include_once BPVMUMV_PATH . 'includes/autoupdater/installer.php';
            include_once BPVMUMV_PATH . 'includes/autoupdater/updater.php';
        }
    }
}
