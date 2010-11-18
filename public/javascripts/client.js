var socket = new io.Socket('sakura.mesolabs.com'),
    json = JSON.stringify,
    winWidth = window.innerWidth;

socket.connect();
socket.on('message', function(message) {
  var data = JSON.parse(message);
  if (data.count) {
    $('#count').text(data.count);
  }
  if (data.page) {
    if (data.next) {
      animateLeft(data.now, data.next);
    } else if (data.prev) {
      animateRight(data.now, data.prev);
    } else {
      show(data.page);
    }
  }
});

function show(p) {
  $('.slide').removeClass('active');
  $('#' + p).addClass('active');
}

function animateLeft(nowId, nextId) {
  $('#' + nowId).animate(
    {left: (winWidth * -1) + 'px'},
    500,
    function() { $(this).removeClass('active') });
  $('#' + nextId).css('left', winWidth).addClass('active').animate(
    {left: 0},
    500);
}

function animateRight(nowId, prevId) {
  $('#' + nowId).animate(
    {left: (winWidth * 1) + 'px'},
    500,
    function() { $(this).removeClass('active') });
  $('#' + prevId).css('left', -1 * winWidth).addClass('active').animate(
    {left: 0},
    500);
}

