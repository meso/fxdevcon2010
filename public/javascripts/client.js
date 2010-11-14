var socket = new io.Socket('localhost'),
    json = JSON.stringify;

socket.connect();
socket.on('message', function(message) {
  var data = JSON.parse(message);
  console.log(message);
  if (data.count) {
    $('#count').text(data.count);
  }
  if (data.page) {
    show(data.page);
  }
});

function show(p) {
  $('.slide').removeClass('active');
  $('#' + p).addClass('active');
}
