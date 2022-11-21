/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/VotingButton.js":
/*!*************************************!*\
  !*** ./src/modules/VotingButton.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class VotingButton {
  //1. INITALIZATION
  constructor() {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(".bwl_pvm_container").length == 0) return;

    // Cache elements.
    this.bwlPvmContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".bwl_pvm_container");
    this.pvmLikeBtn = this.bwlPvmContainer.find(".btn_like");
    this.pvmDislikeBtn = this.bwlPvmContainer.find(".btn_dislike");
    this.bwlPvmFeedbackForm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".bwl_pvm_feedback_form");
    this.initFeedbackForm();
    this.events();
    this.tipsyTooltip();
    this.bpvmFilterVbox();
  }

  //2. EVENTS.
  events() {
    this.pvmLikeBtn.on("click", this.cbCountVote.bind(this));
    this.pvmDislikeBtn.on("click", this.cbCountVote.bind(this));
    this.bwlPvmFeedbackForm.on("submit", this.cbFeedbackForm.bind(this));
  }

  //3. FUNCTIONS/ACTIONS.

  cbCountVote(e) {
    var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target.closest("div"));
    var $voteStatus = $this.attr("class") === "btn_like" ? 1 : 0;
    var $parentSection = $this.closest("section");
    var $postId = $this.attr("post_id");
    var $bpvmUniqueId = $this.attr("bpvm_unique_id");
    var $statisticsContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#stat-cnt-" + $bpvmUniqueId);
    $parentSection.addClass("pvm_overlay");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#pvm_btn_container_" + $bpvmUniqueId).append('<div class="msg_container">' + pvm_wait_msg + "</div>");
    this.pvmCountVote($statisticsContainer, $voteStatus, $postId, $bpvmUniqueId, $parentSection);
  }

  // Vote count ajax request.
  pvmCountVote($statisticsContainer, $voteStatus, $postId, $bpvmUniqueId, $parentSection) {
    var msg_icon = '<span class="fa fa-info-circle"></span>';
    var tfa_status,
      tfa_vis = "",
      tfa_vie = "";
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(".pvm_dynamic_sort_wrapper").length > 0) {
      var $pvm_dynamic_sort_wrapper = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".pvm_dynamic_sort_wrapper"),
        tfa_status = 1,
        tfa_vis = $pvm_dynamic_sort_wrapper.data("start"),
        tfa_vie = $pvm_dynamic_sort_wrapper.data("end");
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      url: ajaxurl,
      type: "POST",
      dataType: "JSON",
      data: {
        action: "bwl_pvm_add_rating",
        // action will be the function name
        count_vote: true,
        post_id: $postId,
        vote_status: $voteStatus,
        tfa: tfa_status,
        tfa_vis: tfa_vis,
        tfa_vie: tfa_vie
      },
      success: data => {
        $parentSection.removeClass("pvm_overlay");
        if (data.status == 1) {
          $statisticsContainer.find(".total-vote-counter span").html(data.total_vote_counter);
          $statisticsContainer.find(".like-count-container span").html(data.like_vote_counter);
          $statisticsContainer.find(".dislike-count-container span").html(data.dislike_vote_counter);
          $statisticsContainer.find(".like_percentage").attr("style", "width:" + data.like_percentage + "%");
          $statisticsContainer.find(".dislike_percentage").attr("style", "width:" + data.dislike_percentage + "%");
          if ($statisticsContainer.hasClass("vcc-subtractor")) {
            var $this = $statisticsContainer;
            $this.find(".total-vote-counter span").html($this.find(".like-count-container span").text() - $this.find(".dislike-count-container span").text());
          }
        }
        if ($voteStatus == 0 && data.status == 1 && pvm_disable_feedback_status == 0 && jquery__WEBPACK_IMPORTED_MODULE_0___default()("#pvm_feedback_form_" + $bpvmUniqueId).length == 1) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()("#pvm_feedback_form_" + $bpvmUniqueId).slideDown("slow", function () {
            var form_field_container = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#pvm_feedback_form_" + $bpvmUniqueId + " .bwl_pvm_feedback_form"),
              feedback_message_box = form_field_container.find(".feedback_message_box"),
              captcha = form_field_container.find("#captcha"),
              all_fields = jquery__WEBPACK_IMPORTED_MODULE_0___default()([]).add(feedback_message_box).add(captcha);
            all_fields.removeAttr("disabled").removeClass("bwl_pvm_feedback_disabled_field").val("");
            form_field_container.find("input[type=submit]").removeAttr("disabled");
          });
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()("#pvm_btn_container_" + $bpvmUniqueId).find('div[class*="btn_"]').hide();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()("#pvm_btn_container_" + $bpvmUniqueId).find(".msg_container").html(msg_icon + " " + data.msg);

        /*--- Attach Tooltip on Share bUtton ------*/

        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(".btn-share").length > 0 && pvm_tipsy_status == 1) {
          setTimeout(() => {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(".btn-share").tipsy({
              fade: true,
              gravity: "n"
            });
          }, 100);

          // Custom Share Link
          // @since: version 1.1.2

          jquery__WEBPACK_IMPORTED_MODULE_0___default()(".pvm_share").on("click", () => {
            var bwl_bpvm_share_btn = window.open(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prop("href"), "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600");
            if (window.focus) {
              bwl_bpvm_share_btn.focus();
            }
            return false;
          });
        }
      },
      error: (xhr, textStatus, e) => {
        $parentSection.removeClass("pvm_overlay");
        jquery__WEBPACK_IMPORTED_MODULE_0___default()("#pvm_btn_container_" + $bpvmUniqueId).html('<div class="msg_container"> ' + msg_icon + " Sorry! We are unable to collect your vote!</div>");
        return;
      }
    });
  }

  // Initialize Feedback Form

  initFeedbackForm() {
    this.bwlPvmFeedbackForm.find("textarea,.captcha").val("");
  }

  // Feedback Form.

  cbFeedbackForm(e) {
    e.preventDefault();
    var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target);
    var feedbackFormButton = $this.find("#submit"),
      feedbackFormId = feedbackFormButton.attr("bwl_pvm_feedback_form_id"),
      feedbackFormContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + feedbackFormId),
      feedbackFormFields = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + feedbackFormId + " .bwl_pvm_feedback_form");
    var feedbackFormErrorBox = feedbackFormContainer.find(".bwl_pro_form_error_message_box"),
      feedbackFormMessageBox = feedbackFormContainer.find("#feedback_message"),
      feedbackCaptchaStatus = feedbackFormContainer.find("#captcha_status");
    if (feedbackCaptchaStatus.val() == 1) {
      var num1 = feedbackFormContainer.find("#num1");
      var num2 = feedbackFormContainer.find("#num2");
      var captcha = feedbackFormContainer.find("#captcha");
      var all_fields = jquery__WEBPACK_IMPORTED_MODULE_0___default()([]).add(feedbackFormMessageBox).add(captcha);
    } else {
      var all_fields = jquery__WEBPACK_IMPORTED_MODULE_0___default()([]).add(feedbackFormMessageBox);
    }
    var bValid = true,
      feedback_message_bValid,
      captcha_bValid,
      required_field_msg = "",
      ok_border = "border: 1px solid #EEEEEE",
      error_border = "border: 1px solid #E63F37";
    if (feedbackFormMessageBox.val().trim().length < 3) {
      feedback_message_bValid = false;
      feedbackFormMessageBox.attr("style", error_border);
      required_field_msg += " " + err_feedback_msg + "<br />";
    } else {
      feedback_message_bValid = true;
      feedbackFormMessageBox.attr("style", ok_border);
      required_field_msg += "";
    }
    bValid = bValid && feedback_message_bValid;
    if (feedbackCaptchaStatus.val() == 1) {
      if (parseInt(num1.val().trim()) + parseInt(num2.val().trim()) != parseInt(captcha.val().trim())) {
        captcha_bValid = false;
        captcha.attr("style", error_border);
        required_field_msg += " " + err_pvm_captcha;
      } else {
        captcha_bValid = true;
        captcha.attr("style", ok_border);
        required_field_msg += "";
      }
      bValid = bValid && captcha_bValid;
    }

    //Alert Message Box For Required Fields.

    if (bValid == false) {
      feedbackFormErrorBox.html("").addClass("bwl-form-error-box").html(required_field_msg).slideDown("slow");
    }
    if (bValid == true) {
      all_fields.attr("style", ok_border);
      all_fields.addClass("bwl_pvm_feedback_disabled_field").attr("disabled", "disabled");
      feedbackFormButton.addClass("bwl_pvm_feedback_disabled_field").attr("disabled", "disabled");
      feedbackFormErrorBox.html("").removeClass("bwl-form-error-box").addClass("bwl-form-wait-box").html(pvm_wait_msg).slideDown("slow");
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        url: ajaxurl,
        type: "POST",
        dataType: "JSON",
        data: {
          action: "bwl_pvm_save_post_data",
          // action will be the function name,
          feedback_message_box: feedbackFormMessageBox.val(),
          post_id: feedbackFormButton.attr("post_id"),
          post_type: feedbackFormFields.find("#post_type").val(),
          name_of_nonce_field: feedbackFormFields.find("#name_of_nonce_field").val()
        },
        success: data => {
          if (data.pvm_feedback_status == 1) {
            //Reload For New Number.

            if (feedbackCaptchaStatus.val() == 1) {
              num1.val(this.randomNum(5));
              num2.val(this.randomNum(9));
            }
            feedbackFormErrorBox.removeClass("bwl-form-wait-box").html("").html(pvm_feedback_thanks_msg).addClass("bwl-form-success-box").delay(3000).slideUp("slow", function () {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + feedbackFormId).slideUp("slow", function () {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).remove();
              });
            });
            this.initFeedbackForm();
          } else {
            feedbackFormErrorBox.removeClass("bwl-form-wait-box").html("").html(pvm_unable_feedback_msg).addClass("bwl-form-error-box").delay(3000).slideUp("slow");
            all_fields.removeAttr("disabled").removeClass("bwl_pvm_feedback_disabled_field");
            feedbackFormButton.removeAttr("disabled").removeClass("bwl_pvm_feedback_disabled_field");
          }
        },
        error: function (xhr, textStatus, e) {
          feedbackFormErrorBox.removeClass("bwl-form-wait-box").html("").html(pvm_unable_feedback_msg).addClass("bwl-form-error-box").delay(3000).slideUp("slow");
          all_fields.removeAttr("disabled").removeClass("bwl_pvm_feedback_disabled_field");
          feedbackFormButton.removeAttr("disabled").removeClass("bwl_pvm_feedback_disabled_field");
        }
      });
    }
    return false;
  }

  // Voting Filter Box.

  bpvmFilterVbox() {
    var $bpvmFilterVbox = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".bpvm_filter_vbox");
    if ($bpvmFilterVbox.length == 0) return false;
    $bpvmFilterVbox.each(function () {
      var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      $this.find(".stat-cnt").remove();
      $this.find(".btn_like, .btn_dislike").on("click", function () {
        $this.find(".pvm_btn_container").css({
          width: "100%"
        }).attr("data-class", "bpvm_filter_vbox");
        $this.removeClass("bpvm_filter_vbox");
      });
    });
  }

  //4. Helper Function.

  tipsyTooltip() {
    this.pvmLikeBtn.tipsy({
      fade: true,
      gravity: "s"
    });
    this.pvmDislikeBtn.tipsy({
      fade: true,
      gravity: "n"
    });
  }
  randomNum(maxNum) {
    return Math.floor(Math.random() * maxNum + 1); //return a number between 1 - 10
  }
}

/* harmony default export */ __webpack_exports__["default"] = (VotingButton);

/***/ }),

/***/ "./src/modules/vendors/jquery.tipsy.js":
/*!*********************************************!*\
  !*** ./src/modules/vendors/jquery.tipsy.js ***!
  \*********************************************/
/***/ (function() {

// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

(function ($) {
  function maybeCall(thing, ctx) {
    return typeof thing == 'function' ? thing.call(ctx) : thing;
  }
  ;
  function isElementInDOM(ele) {
    while (ele = ele.parentNode) {
      if (ele == document) return true;
    }
    return false;
  }
  ;
  function Tipsy(element, options) {
    this.$element = $(element);
    this.options = options;
    this.enabled = true;
    this.fixTitle();
  }
  ;
  Tipsy.prototype = {
    show: function () {
      var title = this.getTitle();
      if (title && this.enabled) {
        var $tip = this.tip();
        $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
        $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
        $tip.remove().css({
          top: 0,
          left: 0,
          visibility: 'hidden',
          display: 'block'
        }).prependTo(document.body);
        var pos = $.extend({}, this.$element.offset(), {
          width: this.$element[0].offsetWidth,
          height: this.$element[0].offsetHeight
        });
        var actualWidth = $tip[0].offsetWidth,
          actualHeight = $tip[0].offsetHeight,
          gravity = maybeCall(this.options.gravity, this.$element[0]);
        var tp;
        switch (gravity.charAt(0)) {
          case 'n':
            tp = {
              top: pos.top + pos.height + this.options.offset,
              left: pos.left + pos.width / 2 - actualWidth / 2
            };
            break;
          case 's':
            tp = {
              top: pos.top - actualHeight - this.options.offset,
              left: pos.left + pos.width / 2 - actualWidth / 2
            };
            break;
          case 'e':
            tp = {
              top: pos.top + pos.height / 2 - actualHeight / 2,
              left: pos.left - actualWidth - this.options.offset
            };
            break;
          case 'w':
            tp = {
              top: pos.top + pos.height / 2 - actualHeight / 2,
              left: pos.left + pos.width + this.options.offset
            };
            break;
        }
        if (gravity.length == 2) {
          if (gravity.charAt(1) == 'w') {
            tp.left = pos.left + pos.width / 2 - 15;
          } else {
            tp.left = pos.left + pos.width / 2 - actualWidth + 15;
          }
        }
        $tip.css(tp).addClass('tipsy-' + gravity);
        $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
        if (this.options.className) {
          $tip.addClass(maybeCall(this.options.className, this.$element[0]));
        }
        if (this.options.fade) {
          $tip.stop().css({
            opacity: 0,
            display: 'block',
            visibility: 'visible'
          }).animate({
            opacity: this.options.opacity
          });
        } else {
          $tip.css({
            visibility: 'visible',
            opacity: this.options.opacity
          });
        }
      }
    },
    hide: function () {
      if (this.options.fade) {
        this.tip().stop().fadeOut(function () {
          $(this).remove();
        });
      } else {
        this.tip().remove();
      }
    },
    fixTitle: function () {
      var $e = this.$element;
      if ($e.attr('title') || typeof $e.attr('original-title') != 'string') {
        $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
      }
    },
    getTitle: function () {
      var title,
        $e = this.$element,
        o = this.options;
      this.fixTitle();
      var title,
        o = this.options;
      if (typeof o.title == 'string') {
        title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
      } else if (typeof o.title == 'function') {
        title = o.title.call($e[0]);
      }
      title = ('' + title).replace(/(^\s*|\s*$)/, "");
      return title || o.fallback;
    },
    tip: function () {
      if (!this.$tip) {
        this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
        this.$tip.data('tipsy-pointee', this.$element[0]);
      }
      return this.$tip;
    },
    validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide();
        this.$element = null;
        this.options = null;
      }
    },
    enable: function () {
      this.enabled = true;
    },
    disable: function () {
      this.enabled = false;
    },
    toggleEnabled: function () {
      this.enabled = !this.enabled;
    }
  };
  $.fn.tipsy = function (options) {
    if (options === true) {
      return this.data('tipsy');
    } else if (typeof options == 'string') {
      var tipsy = this.data('tipsy');
      if (tipsy) tipsy[options]();
      return this;
    }
    options = $.extend({}, $.fn.tipsy.defaults, options);
    function get(ele) {
      var tipsy = $.data(ele, 'tipsy');
      if (!tipsy) {
        tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
        $.data(ele, 'tipsy', tipsy);
      }
      return tipsy;
    }
    function enter() {
      var tipsy = get(this);
      tipsy.hoverState = 'in';
      if (options.delayIn == 0) {
        tipsy.show();
      } else {
        tipsy.fixTitle();
        setTimeout(function () {
          if (tipsy.hoverState == 'in') tipsy.show();
        }, options.delayIn);
      }
    }
    ;
    function leave() {
      var tipsy = get(this);
      tipsy.hoverState = 'out';
      if (options.delayOut == 0) {
        tipsy.hide();
      } else {
        setTimeout(function () {
          if (tipsy.hoverState == 'out') tipsy.hide();
        }, options.delayOut);
      }
    }
    ;
    if (!options.live) this.each(function () {
      get(this);
    });
    if (options.trigger != 'manual') {
      var binder = options.live ? 'live' : 'bind',
        eventIn = options.trigger == 'hover' ? 'mouseenter' : 'focus',
        eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
      this[binder](eventIn, enter)[binder](eventOut, leave);
    }
    return this;
  };
  $.fn.tipsy.defaults = {
    className: null,
    delayIn: 0,
    delayOut: 0,
    fade: false,
    fallback: '',
    gravity: 'n',
    html: false,
    live: false,
    offset: 0,
    opacity: 0.8,
    title: 'title',
    trigger: 'hover'
  };
  $.fn.tipsy.revalidate = function () {
    $('.tipsy').each(function () {
      var pointee = $.data(this, 'tipsy-pointee');
      if (!pointee || !isElementInDOM(pointee)) {
        $(this).remove();
      }
    });
  };

  // Overwrite this method to provide options on a per-element basis.
  // For example, you could store the gravity in a 'tipsy-gravity' attribute:
  // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
  // (remember - do not modify 'options' in place!)
  $.fn.tipsy.elementOptions = function (ele, options) {
    return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
  };
  $.fn.tipsy.autoNS = function () {
    return $(this).offset().top > $(document).scrollTop() + $(window).height() / 2 ? 's' : 'n';
  };
  $.fn.tipsy.autoWE = function () {
    return $(this).offset().left > $(document).scrollLeft() + $(window).width() / 2 ? 'e' : 'w';
  };

  /**
   * yields a closure of the supplied parameters, producing a function that takes
   * no arguments and is suitable for use as an autogravity function like so:
   *
   * @param margin (int) - distance from the viewable region edge that an
   *        element should be before setting its tooltip's gravity to be away
   *        from that edge.
   * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
   *        if there are no viewable region edges effecting the tooltip's
   *        gravity. It will try to vary from this minimally, for example,
   *        if 'sw' is preferred and an element is near the right viewable 
   *        region edge, but not the top edge, it will set the gravity for
   *        that element's tooltip to be 'se', preserving the southern
   *        component.
   */
  $.fn.tipsy.autoBounds = function (margin, prefer) {
    return function () {
      var dir = {
          ns: prefer[0],
          ew: prefer.length > 1 ? prefer[1] : false
        },
        boundTop = $(document).scrollTop() + margin,
        boundLeft = $(document).scrollLeft() + margin,
        $this = $(this);
      if ($this.offset().top < boundTop) dir.ns = 'n';
      if ($this.offset().left < boundLeft) dir.ew = 'w';
      if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
      if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';
      return dir.ns + (dir.ew ? dir.ew : '');
    };
  };
})(jQuery);

/***/ }),

/***/ "./src/styles/frontend.scss":
/*!**********************************!*\
  !*** ./src/styles/frontend.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_frontend_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/frontend.scss */ "./src/styles/frontend.scss");
/* harmony import */ var _modules_vendors_jquery_tipsy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/vendors/jquery.tipsy.js */ "./src/modules/vendors/jquery.tipsy.js");
/* harmony import */ var _modules_vendors_jquery_tipsy_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_vendors_jquery_tipsy_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_VotingButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/VotingButton */ "./src/modules/VotingButton.js");
// Stylesheets.

// import CaseStudies from "./modules/CaseStudies"

// new CaseStudies()


new _modules_VotingButton__WEBPACK_IMPORTED_MODULE_2__["default"]();
}();
/******/ })()
;
//# sourceMappingURL=frontend.js.map