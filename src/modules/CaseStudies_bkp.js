import $ from "jquery"
import axios from "axios"

class CaseStudies {
  //1. INITALIZATION
  constructor() {
    // Stop executing program if there is no "all_case_studies" ID
    if ($("#all_case_studies").length == 0) return

    this.allCaseStudies = $("#all_case_studies")
    this.csPagination = $("#cs_pagination")
    this.csPaginationLink = $(".page-numbers")
    this.caseStudyDropdown = $(".case_study_dropdown")
    this.caseStudies = $("#case_studies")

    this.events()
  }

  // 2. events.

  events() {
    // alert(this.csPaginationLink.length)
    $(document).on("click", "a.page-numbers", this._loadCaseStudies.bind(this)) // this refers to the class (".page-numbers")
    // $(document).on("click", "a.page-numbers", this._loadCaseStudies) // this refers to the class (".page-numbers")
    // $(document).on("click", ".page-numbers", this._loadCaseStudies.bind(this)) // this refers to the parent element.
    this.caseStudyDropdown.on("change", this._loadCaseStudiesDropdown.bind(this))
  }

  // 3. methods.

  _getParam(param) {
    return new URLSearchParams(window.location.search).get(param)
  }

  _loadCaseStudiesDropdown(e) {
    // console.log($(e.target))
    // console.log(event.target[event.target.selectedIndex])
    // console.log($(event.target[event.target.selectedIndex]).data("cat"))
    // console.log(event.target[event.target.selectedIndex])
    // console.log($(event.target[event.target.selectedIndex]).data("tax"))

    let $cat = $(e.target[e.target.selectedIndex]).data("cat")
    let $tax = $(e.target[e.target.selectedIndex]).data("tax")
    // alert(pmapiAdditionalData.pmapi_app_root)
    // return false

    // window.history.pushState("", "", "/case-studies")

    var $case_base_url = this.allCaseStudies.data("case_base_url")

    let $mod_url = $case_base_url + "?cat=" + $cat + "&tax=" + $tax

    if (typeof $cat == "undefined") {
      $mod_url = $case_base_url
    }
    window.history.pushState("", "", $mod_url)

    // call ajax in here.

    let params = new URLSearchParams()
    params.append("action", "load_more_posts")
    params.append("current_page", 1) // will make it dynamic later.

    if (this._getParam("tax")) {
      params.append("tax", this._getParam("tax")) // will make it dynamic later.
      params.append("cat", this._getParam("cat")) // will make it dynamic later.
    }

    if ($("#cs_pagination").length) {
      $("#cs_pagination").remove()
    }
    $("#case_studies").html("Loading....")
    axios.post(pmapiAdditionalData.pmapi_app_root + "/wp-admin/admin-ajax.php", params).then((res) => {
      $("#case_studies").html("").html(res.data.data)
    })
  }

  _loadCaseStudies(e) {
    e.preventDefault()
    var $this = $(e.target.closest("a.page-numbers"))

    var currentPageUrl = $this.attr("href")
    var pageNo = currentPageUrl.split("/")
    var nextPageNo = pageNo[pageNo.length - 2]
    window.history.pushState("", "", currentPageUrl)

    let params = new URLSearchParams()
    params.append("action", "load_more_posts")
    params.append("current_page", nextPageNo) // will make it dynamic later.

    if (this._getParam("tax")) {
      params.append("tax", this._getParam("tax")) // will make it dynamic later.
      params.append("cat", this._getParam("cat")) // will make it dynamic later.
    }
    this.csPagination.length ? this.csPagination.remove() : ""
    this.caseStudies.html("Loading....")
    window.scrollTo({ top: 0, behavior: "smooth" })
    axios.post(pmapiAdditionalData.pmapi_app_root + "/wp-admin/admin-ajax.php", params).then((res) => {
      this.caseStudies.html("").html(res.data.data)
    })
  }
}

export default CaseStudies
