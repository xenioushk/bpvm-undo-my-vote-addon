<?php

/**
 * @package CaseStudyPlugin
 */

namespace Inc\Pages;

use Inc\Base\Helpers;
use \Inc\Base\BaseController;

class CustomTheme extends BaseController
{
  public $customColumns;

  public function register()
  {

    add_action('wp_head', [$this, 'addCustomTheme']);
  }
  public function addCustomTheme()
  {

    $pvm_data = Helpers::getPluginOptionsData();

    /*-----  Default Settings -----*/
    // Background colors of voting icon introduced in version 1.1.1

    $pvm_like_thumb_color = '#1E73BE';
    $pvm_like_thumb_bg_color = '#FFFFFF';

    $pvm_like_thumb_hover_color = '#1E73BE';
    $pvm_like_thumb_hover_bg_color = '#F2F2F2';

    $pvm_dislike_thumb_color = '#FF4828';
    $pvm_dislike_thumb_bg_color = '#FFFFFF';

    $pvm_dislike_thumb_hover_color = '#FF4828';
    $pvm_dislike_thumb_hover_bg_color = '#F2F2F2';


    $pvm_like_bar_color = '#1E73BE';
    $pvm_dislike_bar_color = '#FF4828';

    $custom_theme = '<style type="text/css">';


    // Like Button Thumb Color.

    if (isset($pvm_data['pvm_like_thumb_color']) && $pvm_data['pvm_like_thumb_color'] != "") {

      $pvm_like_thumb_color = isset($pvm_data['pvm_like_thumb_color']) ?  $pvm_data['pvm_like_thumb_color'] : $pvm_like_thumb_color;
      $pvm_like_thumb_bg_color = isset($pvm_data['pvm_like_thumb_bg_color']) ?  $pvm_data['pvm_like_thumb_bg_color'] : $pvm_like_thumb_bg_color;
      $pvm_like_thumb_hover_color = isset($pvm_data['pvm_like_thumb_hover_color']) ?  $pvm_data['pvm_like_thumb_hover_color'] : $pvm_like_thumb_hover_color;
      $pvm_like_thumb_hover_bg_color = isset($pvm_data['pvm_like_thumb_hover_bg_color']) ?  $pvm_data['pvm_like_thumb_hover_bg_color'] : $pvm_like_thumb_hover_bg_color;
    }



    $custom_theme .= ".btn_like{ color: $pvm_like_thumb_color !important; background-color: $pvm_like_thumb_bg_color !important;}";
    $custom_theme .= '.btn_like:hover{ background-color: ' . $pvm_like_thumb_hover_bg_color . ' !important;}';
    $custom_theme .= '.icon_like_color{ color: ' . $pvm_like_thumb_color . ' !important;}';
    $custom_theme .= '.btn_like:hover .icon_like_color{ color: ' . $pvm_like_thumb_hover_color . ' !important;}';

    // Dislike Button Thumb Color.

    if (isset($pvm_data['pvm_dislike_thumb_color']) && $pvm_data['pvm_dislike_thumb_color'] != "") {

      $pvm_dislike_thumb_color = isset($pvm_data['pvm_dislike_thumb_color']) ? $pvm_data['pvm_dislike_thumb_color'] : $pvm_dislike_thumb_color;
      $pvm_dislike_thumb_bg_color = isset($pvm_data['pvm_dislike_thumb_bg_color']) ? $pvm_data['pvm_dislike_thumb_bg_color'] : $pvm_dislike_thumb_bg_color;
      $pvm_dislike_thumb_hover_color = isset($pvm_data['pvm_dislike_thumb_hover_color']) ? $pvm_data['pvm_dislike_thumb_hover_color'] : $pvm_dislike_thumb_hover_color;
      $pvm_dislike_thumb_hover_bg_color = isset($pvm_data['pvm_dislike_thumb_hover_bg_color']) ? $pvm_data['pvm_dislike_thumb_hover_bg_color'] : $pvm_dislike_thumb_hover_bg_color;
    }


    $custom_theme .= '.btn_dislike{ color: ' . $pvm_dislike_thumb_color . ' !important; background-color: ' . $pvm_dislike_thumb_bg_color . ' !important;}';
    $custom_theme .= '.btn_dislike:hover{ background-color: ' . $pvm_dislike_thumb_hover_bg_color . ' !important;}';
    $custom_theme .= '.icon_dislike_color{ color: ' . $pvm_dislike_thumb_color . '  !important;}';
    $custom_theme .= '.btn_dislike:hover .icon_dislike_color{ color: ' . $pvm_dislike_thumb_hover_color . ' !important;}';


    // Like Bar Color.

    if (isset($pvm_data['pvm_like_bar_color']) && $pvm_data['pvm_like_bar_color'] != "") {

      $pvm_like_bar_color = $pvm_data['pvm_like_bar_color'];
    }

    $custom_theme .= '.bg-green{ background-color: ' . $pvm_like_bar_color . ' !important;}';

    // Dislike Bar Color.

    if (isset($pvm_data['pvm_dislike_bar_color']) && $pvm_data['pvm_dislike_bar_color'] != "") {
      $pvm_dislike_bar_color = $pvm_data['pvm_dislike_bar_color'];
    }

    $custom_theme .= '.bg-red{ background-color: ' . $pvm_dislike_bar_color . ' !important;}';


    /*----- Tipsy -----*/

    $pvm_tipsy_bg = "#000000";
    $pvm_tipsy_text_color = "#FFFFFF";

    if (isset($pvm_data['pvm_tipsy_bg']) && $pvm_data['pvm_tipsy_bg'] != "") {
      $pvm_tipsy_bg = $pvm_data['pvm_tipsy_bg'];
    }

    if (isset($pvm_data['pvm_tipsy_text_color']) && $pvm_data['pvm_tipsy_text_color'] != "") {
      $pvm_tipsy_text_color = $pvm_data['pvm_tipsy_text_color'];
    }

    $custom_theme .= '.tipsy-inner{ background: ' . $pvm_tipsy_bg . '; color: ' . $pvm_tipsy_text_color . ';}';

    /*----- Custom CSS -----*/

    $pvm_custom_css = "";

    if (isset($pvm_data['pvm_custom_css']) && $pvm_data['pvm_custom_css'] != "") {
      $pvm_custom_css = $pvm_data['pvm_custom_css'];
    }

    $custom_theme .= $pvm_custom_css;


    $custom_theme .= '</style>';


    echo $custom_theme;
  }
}