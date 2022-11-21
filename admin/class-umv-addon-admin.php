<?php

class BPVM_Umv_Admin
{

    protected static $instance = null;
    protected $plugin_screen_hook_suffix = null;

    private function __construct()
    {

        if (!class_exists('BWL_Pro_Voting_Manager') || BPVMUMV_PARENT_PLUGIN_INSTALLED_VERSION < '1.2.5') {
            add_action('admin_notices', array($this, 'umv_version_update_admin_notice'));
            return false;
        }

        // Start Plugin Admin Panel Code.

        $plugin = BPVM_umv::get_instance();
        $this->plugin_slug = $plugin->get_plugin_slug();
    }

    public static function get_instance()
    {

        // If the single instance hasn't been set, set it now.
        if (null == self::$instance) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    //Version Manager:  Update Checking

    public function umv_version_update_admin_notice()
    {

        echo '<div class="updated"><p>You need to download & install '
            . '<b><a href="https://1.envato.market/bpvm-wp" target="_blank">' . BPVMUMV_ADDON_PARENT_PLUGIN_TITLE . ' ( Minimum Version ' . BPVMUMV_PARENT_PLUGIN_REQUIRED_VERSION . ' )</a></b> '
            . 'to use <b>' . BPVMUMV_ADDON_TITLE . '</b>.</p></div>';
    }
}