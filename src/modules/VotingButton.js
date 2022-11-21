import $ from "jquery"
class VotingButton {
  //1. INITALIZATION
  constructor() {
    if ($(".bwl_pvm_container").length == 0) return

    // Cache elements.
    this.bwlPvmContainer = $(".bwl_pvm_container")
    this.pvmLikeBtn = this.bwlPvmContainer.find(".btn_like")
    this.pvmDislikeBtn = this.bwlPvmContainer.find(".btn_dislike")
    this.bwlPvmFeedbackForm = $(".bwl_pvm_feedback_form")
    this.initFeedbackForm()
    this.events()
    this.tipsyTooltip()
    this.bpvmFilterVbox()
  }

  //2. EVENTS.
  events() {
    this.pvmLikeBtn.on("click", this.cbCountVote.bind(this))
    this.pvmDislikeBtn.on("click", this.cbCountVote.bind(this))
    this.bwlPvmFeedbackForm.on("submit", this.cbFeedbackForm.bind(this))
  }

  //3. FUNCTIONS/ACTIONS.

  cbCountVote(e) {
    var $this = $(e.target.closest("div"))
    var $voteStatus = $this.attr("class") === "btn_like" ? 1 : 0

    var $parentSection = $this.closest("section")
    var $postId = $this.attr("post_id")
    var $bpvmUniqueId = $this.attr("bpvm_unique_id")
    var $statisticsContainer = $("#stat-cnt-" + $bpvmUniqueId)

    $parentSection.addClass("pvm_overlay")
    $("#pvm_btn_container_" + $bpvmUniqueId).append('<div class="msg_container">' + pvm_wait_msg + "</div>")

    this.pvmCountVote($statisticsContainer, $voteStatus, $postId, $bpvmUniqueId, $parentSection)
  }

  // Vote count ajax request.
  pvmCountVote($statisticsContainer, $voteStatus, $postId, $bpvmUniqueId, $parentSection) {
    var msg_icon = '<span class="fa fa-info-circle"></span>'
    var tfa_status,
      tfa_vis = "",
      tfa_vie = ""

    if ($(".pvm_dynamic_sort_wrapper").length > 0) {
      var $pvm_dynamic_sort_wrapper = $(".pvm_dynamic_sort_wrapper"),
        tfa_status = 1,
        tfa_vis = $pvm_dynamic_sort_wrapper.data("start"),
        tfa_vie = $pvm_dynamic_sort_wrapper.data("end")
    }

    $.ajax({
      url: ajaxurl,
      type: "POST",
      dataType: "JSON",
      data: {
        action: "bwl_pvm_add_rating", // action will be the function name
        count_vote: true,
        post_id: $postId,
        vote_status: $voteStatus,
        tfa: tfa_status,
        tfa_vis: tfa_vis,
        tfa_vie: tfa_vie,
      },
      success: (data) => {
        $parentSection.removeClass("pvm_overlay")

        if (data.status == 1) {
          $statisticsContainer.find(".total-vote-counter span").html(data.total_vote_counter)
          $statisticsContainer.find(".like-count-container span").html(data.like_vote_counter)
          $statisticsContainer.find(".dislike-count-container span").html(data.dislike_vote_counter)

          $statisticsContainer.find(".like_percentage").attr("style", "width:" + data.like_percentage + "%")
          $statisticsContainer.find(".dislike_percentage").attr("style", "width:" + data.dislike_percentage + "%")

          if ($statisticsContainer.hasClass("vcc-subtractor")) {
            var $this = $statisticsContainer

            $this.find(".total-vote-counter span").html($this.find(".like-count-container span").text() - $this.find(".dislike-count-container span").text())
          }
        }

        if ($voteStatus == 0 && data.status == 1 && pvm_disable_feedback_status == 0 && $("#pvm_feedback_form_" + $bpvmUniqueId).length == 1) {
          $("#pvm_feedback_form_" + $bpvmUniqueId).slideDown("slow", function () {
            var form_field_container = $("#pvm_feedback_form_" + $bpvmUniqueId + " .bwl_pvm_feedback_form"),
              feedback_message_box = form_field_container.find(".feedback_message_box"),
              captcha = form_field_container.find("#captcha"),
              all_fields = $([]).add(feedback_message_box).add(captcha)

            all_fields.removeAttr("disabled").removeClass("bwl_pvm_feedback_disabled_field").val("")

            form_field_container.find("input[type=submit]").removeAttr("disabled")
          })
        }

        $("#pvm_btn_container_" + $bpvmUniqueId)
          .find('div[class*="btn_"]')
          .hide()
        $("#pvm_btn_container_" + $bpvmUniqueId)
          .find(".msg_container")
          .html(msg_icon + " " + data.msg)

        /*--- Attach Tooltip on Share bUtton ------*/

        if ($(".btn-share").length > 0 && pvm_tipsy_status == 1) {
          setTimeout(() => {
            $(".btn-share").tipsy({ fade: true, gravity: "n" })
          }, 100)

          // Custom Share Link
          // @since: version 1.1.2

          $(".pvm_share").on("click", () => {
            var bwl_bpvm_share_btn = window.open($(this).prop("href"), "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600")
            if (window.focus) {
              bwl_bpvm_share_btn.focus()
            }
            return false
          })
        }
      },
      error: (xhr, textStatus, e) => {
        $parentSection.removeClass("pvm_overlay")
        $("#pvm_btn_container_" + $bpvmUniqueId).html('<div class="msg_container"> ' + msg_icon + " Sorry! We are unable to collect your vote!</div>")
        return
      },
    })
  }

  // Initialize Feedback Form

  initFeedbackForm() {
    this.bwlPvmFeedbackForm.find("textarea,.captcha").val("")
  }

  // Feedback Form.

  cbFeedbackForm(e) {
    e.preventDefault()

    var $this = $(e.target)

    var feedbackFormButton = $this.find("#submit"),
      feedbackFormId = feedbackFormButton.attr("bwl_pvm_feedback_form_id"),
      feedbackFormContainer = $("#" + feedbackFormId),
      feedbackFormFields = $("#" + feedbackFormId + " .bwl_pvm_feedback_form")

    var feedbackFormErrorBox = feedbackFormContainer.find(".bwl_pro_form_error_message_box"),
      feedbackFormMessageBox = feedbackFormContainer.find("#feedback_message"),
      feedbackCaptchaStatus = feedbackFormContainer.find("#captcha_status")

    if (feedbackCaptchaStatus.val() == 1) {
      var num1 = feedbackFormContainer.find("#num1")
      var num2 = feedbackFormContainer.find("#num2")
      var captcha = feedbackFormContainer.find("#captcha")
      var all_fields = $([]).add(feedbackFormMessageBox).add(captcha)
    } else {
      var all_fields = $([]).add(feedbackFormMessageBox)
    }

    var bValid = true,
      feedback_message_bValid,
      captcha_bValid,
      required_field_msg = "",
      ok_border = "border: 1px solid #EEEEEE",
      error_border = "border: 1px solid #E63F37"

    if (feedbackFormMessageBox.val().trim().length < 3) {
      feedback_message_bValid = false
      feedbackFormMessageBox.attr("style", error_border)
      required_field_msg += " " + err_feedback_msg + "<br />"
    } else {
      feedback_message_bValid = true
      feedbackFormMessageBox.attr("style", ok_border)
      required_field_msg += ""
    }

    bValid = bValid && feedback_message_bValid

    if (feedbackCaptchaStatus.val() == 1) {
      if (parseInt(num1.val().trim()) + parseInt(num2.val().trim()) != parseInt(captcha.val().trim())) {
        captcha_bValid = false
        captcha.attr("style", error_border)
        required_field_msg += " " + err_pvm_captcha
      } else {
        captcha_bValid = true
        captcha.attr("style", ok_border)
        required_field_msg += ""
      }

      bValid = bValid && captcha_bValid
    }

    //Alert Message Box For Required Fields.

    if (bValid == false) {
      feedbackFormErrorBox.html("").addClass("bwl-form-error-box").html(required_field_msg).slideDown("slow")
    }

    if (bValid == true) {
      all_fields.attr("style", ok_border)
      all_fields.addClass("bwl_pvm_feedback_disabled_field").attr("disabled", "disabled")
      feedbackFormButton.addClass("bwl_pvm_feedback_disabled_field").attr("disabled", "disabled")
      feedbackFormErrorBox.html("").removeClass("bwl-form-error-box").addClass("bwl-form-wait-box").html(pvm_wait_msg).slideDown("slow")

      $.ajax({
        url: ajaxurl,
        type: "POST",
        dataType: "JSON",
        data: {
          action: "bwl_pvm_save_post_data", // action will be the function name,
          feedback_message_box: feedbackFormMessageBox.val(),
          post_id: feedbackFormButton.attr("post_id"),
          post_type: feedbackFormFields.find("#post_type").val(),
          name_of_nonce_field: feedbackFormFields.find("#name_of_nonce_field").val(),
        },
        success: (data) => {
          if (data.pvm_feedback_status == 1) {
            //Reload For New Number.

            if (feedbackCaptchaStatus.val() == 1) {
              num1.val(this.randomNum(5))
              num2.val(this.randomNum(9))
            }

            feedbackFormErrorBox
              .removeClass("bwl-form-wait-box")
              .html("")
              .html(pvm_feedback_thanks_msg)
              .addClass("bwl-form-success-box")
              .delay(3000)
              .slideUp("slow", function () {
                $("#" + feedbackFormId).slideUp("slow", function () {
                  $(this).remove()
                })
              })
            this.initFeedbackForm()
          } else {
            feedbackFormErrorBox.removeClass("bwl-form-wait-box").html("").html(pvm_unable_feedback_msg).addClass("bwl-form-error-box").delay(3000).slideUp("slow")
            all_fields.removeAttr("disabled").removeClass("bwl_pvm_feedback_disabled_field")
            feedbackFormButton.removeAttr("disabled").removeClass("bwl_pvm_feedback_disabled_field")
          }
        },
        error: function (xhr, textStatus, e) {
          feedbackFormErrorBox.removeClass("bwl-form-wait-box").html("").html(pvm_unable_feedback_msg).addClass("bwl-form-error-box").delay(3000).slideUp("slow")
          all_fields.removeAttr("disabled").removeClass("bwl_pvm_feedback_disabled_field")
          feedbackFormButton.removeAttr("disabled").removeClass("bwl_pvm_feedback_disabled_field")
        },
      })
    }

    return false
  }

  // Voting Filter Box.

  bpvmFilterVbox() {
    var $bpvmFilterVbox = $(".bpvm_filter_vbox")

    if ($bpvmFilterVbox.length == 0) return false

    $bpvmFilterVbox.each(function () {
      var $this = $(this)

      $this.find(".stat-cnt").remove()

      $this.find(".btn_like, .btn_dislike").on("click", function () {
        $this
          .find(".pvm_btn_container")
          .css({
            width: "100%",
          })
          .attr("data-class", "bpvm_filter_vbox")

        $this.removeClass("bpvm_filter_vbox")
      })
    })
  }

  //4. Helper Function.

  tipsyTooltip() {
    this.pvmLikeBtn.tipsy({ fade: true, gravity: "s" })
    this.pvmDislikeBtn.tipsy({ fade: true, gravity: "n" })
  }
  randomNum(maxNum) {
    return Math.floor(Math.random() * maxNum + 1) //return a number between 1 - 10
  }
}

export default VotingButton
