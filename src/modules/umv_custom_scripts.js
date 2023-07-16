;(function ($) {
  "use strict"

  function umv_setCookie(key, value, expiry) {
    var expires = new Date()
    expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000)
    document.cookie = key + "=" + value + ";expires=" + expires.toUTCString()
  }

  function umv_getCookie(key) {
    var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)")
    return keyValue ? keyValue[2] : null
  }

  function umv_eraseCookie(key) {
    umv_setCookie(key, null, "1")
  }

  $(function () {
    // Read the cookie
    var $bpvm_umv_count = umv_getCookie("bpvm_umv")

    if ($bpvm_umv_count == null) {
      umv_setCookie("bpvm_umv", "1", "1")
    }

    // Start Undo Vote Code

    $(document).on("click", ".bpvm_undo_vote", function () {
      var $this = $(this),
        $bpvm_umv_count = umv_getCookie("bpvm_umv"),
        $umv_max_count = $this.data("umv_max_count")

      if ($bpvm_umv_count > $umv_max_count) {
        alert("WARNING: You are allowed to UNDO " + $umv_max_count + " votes in a day!")
        return false
      }

      umv_setCookie("bpvm_umv", parseInt($bpvm_umv_count) + parseInt(1, 10), "1")

      function umv_percentage_calculator(partialValue, totalValue) {
        return Math.ceil((100 * partialValue) / totalValue, 10)
      }

      var $bpvm_data_id = $this.data("bpvm_data_id"),
        $post_id = $this.data("post_id"),
        $post_type = $this.data("post_type"),
        $vote_type = $this.data("vote_type"),
        $vote_date = $this.data("vote_date"),
        bpvm_btn_like = $this.closest("section").find(".btn_like"),
        bpvm_unique_id = bpvm_btn_like.attr("bpvm_unique_id"),
        post_id = bpvm_btn_like.attr("post_id")

      var $pvm_btn_container = $("#pvm_btn_container_" + bpvm_unique_id),
        $bwl_pvm_container = $pvm_btn_container.parent("section"),
        $pvm_stat_cnt = $("#stat-cnt-" + bpvm_unique_id),
        $pvm_total_vote_counter = $pvm_stat_cnt.find(".total-vote-counter"),
        $pvm_total_dislike_counter = $pvm_stat_cnt.find(".dislike-count-container"),
        $pvm_total_like_counter = $pvm_stat_cnt.find(".like-count-container"),
        $pvm_result_percentage_status = $pvm_stat_cnt.data("result_percentage")

      $bwl_pvm_container.addClass("pvm_overlay")

      $pvm_btn_container.find(".msg_container").remove()

      $pvm_btn_container.find('div[class*="btn_"]').show()
      $("#pvm_feedback_form_" + bpvm_unique_id).slideUp()

      var bpvm_data_array = new Array(),
        bpvm_data_stack = new Array()

      bpvm_data_array = [$bpvm_data_id, 1, $vote_type, $vote_date]
      bpvm_data_stack.push(bpvm_data_array)

      $.when(bpvm_remove_data($post_type, $post_id, bpvm_data_stack)).done(function (response_data) {
        var $up_total_likes = response_data.total_likes,
          $up_total_dislikes = response_data.total_dislikes,
          $up_total_votes = parseInt($up_total_likes, 10) + parseInt($up_total_dislikes, 10)

        if ($pvm_result_percentage_status == 1) {
          $up_total_likes = umv_percentage_calculator($up_total_likes, $up_total_votes)

          $up_total_dislikes = 100 - $up_total_likes

          $up_total_likes = $up_total_likes + "%"
          $up_total_dislikes = $up_total_dislikes + "%"
        }

        $pvm_total_like_counter.find("span").html($up_total_likes)

        $pvm_total_dislike_counter.find("span").html($up_total_dislikes)

        $pvm_total_vote_counter.find("span").html($up_total_votes)

        $bwl_pvm_container.removeClass("pvm_overlay")
      })

      return false
    })

    function bpvm_remove_data(post_type, post_id, bpvm_data_stack) {
      var tfa_status,
        tfa_vis = "",
        tfa_vie = ""

      if ($(".pvm_dynamic_sort_wrapper").length > 0) {
        var $pvm_dynamic_sort_wrapper = $(".pvm_dynamic_sort_wrapper"),
          tfa_status = 1,
          tfa_vis = $pvm_dynamic_sort_wrapper.data("start"),
          tfa_vie = $pvm_dynamic_sort_wrapper.data("end")
      }

      return $.ajax({
        type: "POST",
        url: ajaxurl + "?action=bpvm_delete_vote_data",
        data: {
          post_type: post_type,
          post_id: post_id,
          bpvm_data_stack: bpvm_data_stack,
          bpvm_undo_vote: 1,
          tfa: tfa_status,
          tfa_vis: tfa_vis,
          tfa_vie: tfa_vie,
        },
        dataType: "JSON",
      })
    }
  })
})(jQuery)
