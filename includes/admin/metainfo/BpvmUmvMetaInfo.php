<?php

// This class displays options panel, addons, documentation links below the plugin information.

class BpvmUmvMetaInfo
{

  public function __construct()
  {
    add_filter('plugin_row_meta', [$this, 'cbAdditionalMetaLinks'], null, 2);
  }

  public function cbAdditionalMetaLinks($links, $file)
  {

    if (strpos($file, BPVMUMV_ADDON_ROOT_FILE) !== false && is_plugin_active($file)) {

      // nt = 1 // new tab.

      $additionalLinks = [

        [
          'title' => esc_html__("Options Panel", "bpvm-umv"),
          'url' => get_admin_url() . 'admin.php?page=bwl-pvm_option_panel#bpvm_umv_options',
        ],
        [
          'title' => esc_html__("Docs", "bpvm-umv"),
          'url' => 'https://xenioushk.github.io/docs-plugins-addon/bpvm-addon/uvm/index.html',
          'nt' => 1
        ],
        [
          'title' =>  '<span class="dashicons dashicons-editor-help"></span>' . esc_html__("Support", "bpvm-umv"),
          'url' => "https://codecanyon.net/item/undo-my-vote-addon-for-bwl-pro-voting-manager/32986128/support",
          'nt' => 1
        ],
        [
          'title' => '<span class="dashicons dashicons-youtube"></span>' . esc_html__("Tutorials", "bpvm-umv"),
          'url' => BPVM_YOUTUBE_PLAYLIST,
          'nt' => 1
        ]

      ];

      $new_links = [];

      foreach ($additionalLinks as $alData) {

        $newTab = isset($alData['nt']) ? 'target="_blank"' : "";
        $class = isset($alData['class']) ? 'class="' . $alData['class'] . '"' : "";

        $new_links[] =  '<a href="' . esc_url($alData['url']) . '"  ' . $newTab . '  ' . $class . '>' . $alData['title'] . '</a>';
      }

      $links = array_merge($links, $new_links);
    }

    return $links;
  }
}

new BpvmUmvMetaInfo();
