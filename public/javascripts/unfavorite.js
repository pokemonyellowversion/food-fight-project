// jQuery
$(document).ready(function(){
  $('#cards').on('click', 'div.col.s12.m4', function(evt) {
    var bizId = $(this).find('a').attr('biz-id');
    $(this).remove();
    $.ajax({
      url: '/api/delete/' + bizId,
      type: "DELETE",
      data: bizId,
      success: function(data, textStatus, jqXHR) {
        console.log(textStatus);
      },
      error: function (jqXHR, textStatus, error) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(error);
      }
    });
  });
});
