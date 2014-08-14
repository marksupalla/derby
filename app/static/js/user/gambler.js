
(function(){
  'use strict';

  $(document).ready(function(){
    $('.info').click(delItem);
  });

function delItem(){
    var id = $(this).closest('.gambler').attr('data-gambler-id'),
     asset = $(this).children('.name').text();
    console.log(id, asset);
}
})();

