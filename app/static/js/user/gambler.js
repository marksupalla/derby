
(function(){
  'use strict';

  $(document).ready(function(){
    $('.info').click(delItem);
  });

  function delItem(){
    var id    = $(this).closest('.gambler').attr('data-gambler-id'),
        asset = $(this).children('.name').text(),
        type  = 'delete',
        url   = '/gamblers/' + id + '/assets/' + asset;
    console.log(url);

    $.ajax({url:url, type:type, dataType:'json', success:function(data){
    }});
  }
})();

