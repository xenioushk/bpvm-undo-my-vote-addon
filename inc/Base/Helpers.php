<?php

/**
 * @package BpvmUmv
 */

namespace BpvmUmv\Inc\Base;

class Helpers
{

  public static function getPluginOptionsData()
  {
    return get_option('bwl_pvm_options');
  }

  // Get all the custom colums header for pro voting manager plugin.
  public static function getColumnCustomHeaders()
  {

    return [
      'pvm_like_votes_count' => esc_html__('Like', 'bwl-pro-voting-manager'),
      'pvm_dislike_votes_count' => esc_html__('Dislike', 'bwl-pro-voting-manager'),
      'pvm_feedback' => esc_html__('Feedback', 'bwl-pro-voting-manager'),
      'bwl_pvm_display_status' => __('Voting <br /> Status', 'bwl-pro-voting-manager')
    ];
  }

  public static function filterCustomPostTypes($available_bpvm_post_types)
  {

    $pvm_data = self::getPluginOptionsData();

    if (isset($available_bpvm_post_types) && sizeof($available_bpvm_post_types) > 0) {

      foreach ($available_bpvm_post_types as $post_type_key => $value) {

        $opt_post_type_key = "pvmpt_" . $post_type_key;

        if (isset($pvm_data[$opt_post_type_key]) && $pvm_data[$opt_post_type_key] != 1) {

          unset($available_bpvm_post_types[$post_type_key]);
        }
      }
    }

    return $available_bpvm_post_types;
  }

  public static function getAllPostTypes()
  {

    if (class_exists('TribeEvents')) {

      $bpvm_default_post_types = ['post' => 'post', 'tribe_events' => 'tribe_events'];
    } else {

      $bpvm_default_post_types = ['post' => 'post'];
    }

    $bpvm_custom_post_types = array_merge($bpvm_default_post_types, self::cleanupPostTypes());

    return $bpvm_custom_post_types;
  }

  public static function cleanupPostTypes()
  {

    $available_bpvm_post_types = get_post_types();

    $pvm_data = self::getPluginOptionsData();

    $removed_items = ['attachment', 'revision', 'nav_menu_item', 'product_variation', 'shop_order', 'shop_order_refund', 'shop_coupon', 'shop_webhook', 'bwl_kb'];


    if (class_exists('TribeEvents')) {

      $removed_items[] = 'tribe_venue';
      $removed_items[] = 'tribe_organizer';
    }

    foreach ($removed_items as $rm_post_types_key => $rm_post_types_vlaue) {

      foreach (array_keys($available_bpvm_post_types, $rm_post_types_vlaue) as $key) {
        unset($available_bpvm_post_types[$key]);
      }
    }

    if (class_exists('TribeEvents')) {

      $available_bpvm_post_types = array_merge(array('tribe_events' => 'tribe_events'), $available_bpvm_post_types);
    }

    if (isset($pvm_data['pvm_additional_cpt']) && $pvm_data['pvm_additional_cpt'] != "") {

      $pvm_additional_cpt = array();
      $get_pvm_additional_cpt = explode(',', $pvm_data['pvm_additional_cpt']);

      foreach ($get_pvm_additional_cpt as $key => $value) {

        $pvm_additional_cpt_id = trim($value);

        $pvm_additional_cpt[$pvm_additional_cpt_id] =  $pvm_additional_cpt_id;
      }

      if (is_array($pvm_additional_cpt) && sizeof($pvm_additional_cpt) > 0) {

        $available_bpvm_post_types = array_merge($pvm_additional_cpt, $available_bpvm_post_types);
      }
    }

    return $available_bpvm_post_types;
  }
}