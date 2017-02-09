// jQuery
$(document).ready(function(){
  $('#favorite').click(function(e) {
    e.preventDefault();
    var biz = results.find( biz => biz.yelp_id === $('#favorite').attr('biz-id'));
    console.log(biz);
    $.ajax({
      url: '/api/biz',
      type: "POST", // or GET
      data: biz,
      success: function(data, textStatus, jqXHR) {
        console.log(data);
      },
      error: function (jqXHR, textStatus, error) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(error);
      }
    });
  });
});

