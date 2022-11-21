/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/UndoVotingButton.js":
/*!*****************************************!*\
  !*** ./src/modules/UndoVotingButton.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class UndoVotingButton {
  //1. INITALIZATION
  constructor() {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(".bwl_pvm_container").length == 0) return;

    // Read the cookie
    var $bpvm_umv_count = this.umv_getCookie("bpvm_umv");
    if ($bpvm_umv_count == null) {
      this.umv_setCookie("bpvm_umv", "1", "1");
    }

    // Cache elements.
    this.events();
  }

  //2. EVENTS.
  events() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on("click", ".bpvm_undo_vote", this.cbUndoMyVote.bind(this));
  }

  //3. FUNCTIONS/ACTIONS.

  cbUndoMyVote(e) {
    e.preventDefault();
    var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target),
      $bpvm_umv_count = this.umv_getCookie("bpvm_umv"),
      $umv_max_count = $this.data("umv_max_count");
    if ($bpvm_umv_count > $umv_max_count) {
      alert("WARNING: You are allowed to UNDO " + $umv_max_count + " votes in a day!");
      return false;
    }
    this.umv_setCookie("bpvm_umv", parseInt($bpvm_umv_count) + parseInt(1, 10), "1");
    var $bpvm_data_id = $this.data("bpvm_data_id"),
      $post_id = $this.data("post_id"),
      $post_type = $this.data("post_type"),
      $vote_type = $this.data("vote_type"),
      $vote_date = $this.data("vote_date"),
      bpvm_btn_like = $this.closest("section").find(".btn_like"),
      bpvm_unique_id = bpvm_btn_like.attr("bpvm_unique_id"),
      post_id = bpvm_btn_like.attr("post_id");
    var $pvm_btn_container = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#pvm_btn_container_" + bpvm_unique_id),
      $bwl_pvm_container = $pvm_btn_container.parent("section"),
      $pvm_stat_cnt = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#stat-cnt-" + bpvm_unique_id),
      $pvm_total_vote_counter = $pvm_stat_cnt.find(".total-vote-counter"),
      $pvm_total_dislike_counter = $pvm_stat_cnt.find(".dislike-count-container"),
      $pvm_total_like_counter = $pvm_stat_cnt.find(".like-count-container"),
      $pvm_result_percentage_status = $pvm_stat_cnt.data("result_percentage");
    $bwl_pvm_container.addClass("pvm_overlay");
    $pvm_btn_container.find(".msg_container").remove();
    $pvm_btn_container.find('div[class*="btn_"]').show();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#pvm_feedback_form_" + bpvm_unique_id).slideUp();
    var bpvm_data_array = new Array(),
      bpvm_data_stack = new Array();
    bpvm_data_array = [$bpvm_data_id, 1, $vote_type, $vote_date];
    bpvm_data_stack.push(bpvm_data_array);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().when(this.bpvm_remove_data($post_type, $post_id, bpvm_data_stack)).done(function (response_data) {
      var $up_total_likes = response_data.total_likes,
        $up_total_dislikes = response_data.total_dislikes,
        $up_total_votes = parseInt($up_total_likes, 10) + parseInt($up_total_dislikes, 10);
      if ($pvm_result_percentage_status == 1) {
        $up_total_likes = this.umv_percentage_calculator($up_total_likes, $up_total_votes);
        $up_total_dislikes = 100 - $up_total_likes;
        $up_total_likes = $up_total_likes + "%";
        $up_total_dislikes = $up_total_dislikes + "%";
      }
      $pvm_total_like_counter.find("span").html($up_total_likes);
      $pvm_total_dislike_counter.find("span").html($up_total_dislikes);
      $pvm_total_vote_counter.find("span").html($up_total_votes);
      $bwl_pvm_container.removeClass("pvm_overlay");
    });
  }

  //4. Helper Function.

  bpvm_remove_data(post_type, post_id, bpvm_data_stack) {
    var tfa_status,
      tfa_vis = "",
      tfa_vie = "";
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(".pvm_dynamic_sort_wrapper").length > 0) {
      var $pvm_dynamic_sort_wrapper = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".pvm_dynamic_sort_wrapper"),
        tfa_status = 1,
        tfa_vis = $pvm_dynamic_sort_wrapper.data("start"),
        tfa_vie = $pvm_dynamic_sort_wrapper.data("end");
    }
    return jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      type: "POST",
      url: ajaxurl + "?action=bpvm_delete_vote_data",
      data: {
        post_type: post_type,
        post_id: post_id,
        bpvm_data_stack: bpvm_data_stack,
        bpvm_undo_vote: 1,
        tfa: tfa_status,
        tfa_vis: tfa_vis,
        tfa_vie: tfa_vie
      },
      dataType: "JSON"
    });
  }
  umv_setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
  }
  umv_getCookie(key) {
    var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return keyValue ? keyValue[2] : null;
  }
  umv_eraseCookie(key) {
    this.umv_setCookie(key, null, "1");
  }
  umv_percentage_calculator(partialValue, totalValue) {
    return Math.ceil(100 * partialValue / totalValue, 10);
  }
}
/* harmony default export */ __webpack_exports__["default"] = (UndoVotingButton);

/***/ }),

/***/ "./src/styles/frontend.scss":
/*!**********************************!*\
  !*** ./src/styles/frontend.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_frontend_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/frontend.scss */ "./src/styles/frontend.scss");
/* harmony import */ var _modules_UndoVotingButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/UndoVotingButton */ "./src/modules/UndoVotingButton.js");
// Stylesheets.


// Scripts.

new _modules_UndoVotingButton__WEBPACK_IMPORTED_MODULE_1__["default"]();
}();
/******/ })()
;
//# sourceMappingURL=frontend.js.map