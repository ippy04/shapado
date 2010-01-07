
$(document).ready(function() {
  $("form.vote_form button").live("click", function(event) {
    var btn_name = $(this).attr("name")
    var form = $(this).parents("form");
    $.post(form.attr("action"), form.serialize()+"&"+btn_name+"=1", function(data){
      if(data.status == "ok"){
        form.find(".votes_average").text(data.average)
        if(data.vote_type == "vote_down") {
          form.find("button[name=vote_down] img").attr("src", "/images/vote_down.png")
          form.find("button[name=vote_up] img").attr("src", "/images/to_vote_up.png")
        } else {
          form.find("button[name=vote_up] img").attr("src", "/images/vote_up.png")
          form.find("button[name=vote_down] img").attr("src", "/images/to_vote_down.png")
        }

        showMessage(data.message, "notice")
      } else {
        showMessage(data.message, "error")
      }
    }, "json");
    return false;
  });

  $("form.nestedAnswerForm").hide();
  $("form.flag_form").hide();
  $("#add_comment_form").hide();

  $(".addNestedAnswer").click(function() {
    var controls = $(this).parents(".controls")
    controls.find(".forms form.flag_form").slideUp();
    controls.find("form.nestedAnswerForm").slideToggle();
    return false;
  });


  $(".flag_form .cancel").live("click", function() {
    $(this).parents(".flag_form").slideUp();
    return false;
  });

  $(".flag-link").live("click", function() {
    var controls = $(this).parents(".controls")
    controls.find(".forms form.nestedAnswerForm").slideUp();
    controls.find(".forms .flag_form").slideToggle();
    return false;
  });

  $("#question_flag_link").click(function() {
    $("#add_comment_form").slideUp();
    $("#question_flag_form").slideToggle();
    return false;
  });

  $("#add_comment_link").click(function() {
    var controls = $(this).parents(".controls")
    controls.find(".forms form.nestedAnswerForm").slideUp();
    controls.find(".forms .flag_form").slideUp();
    $("#add_comment_form").slideToggle();
    return false;
  });
});

