var socket = new io.Socket('sakura.mesolabs.com'),
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

$(function() {
  var winWidth = window.innerWidth;
  document.addEventListener('touchstart', start, false);
  document.addEventListener('touchmove', move, false);
  document.addEventListener('touchend', end, false);
  var startX, endX;
  function start() {
    startX = event.touches[0].pageX;
  }
  function move(e) {
    endX = event.touches[0].pageX;
  }
  function end(e) {
    if (endX - startX > 100) {
      previous();
    } else if (startX - endX > 100) {
      next();
    }
  }

  $(document).keydown(function(e) {
    if (e.keyCode == 39) {
      next();
    } else if (e.keyCode == 37) {
      previous();
    }
    return false;
  });

  function next() {
    var nowId = getNowId();
    var nextId = getNextId(nowId);
    if ($('#' + nextId).length) {
      socket.send(json(
        {page: nextId
        ,next: nextId
        ,now:  nowId}));
      animateLeft(nowId, nextId);
      return nextId;
    } else {
      return nowId;
    }
  }

  function previous() {
    var nowId = getNowId();
    var prevId = getPrevId(nowId);
    if ($('#' + prevId).length) {
      socket.send(json(
        {page: prevId
        ,prev: prevId
        ,now:  nowId}));
      animateRight(nowId, prevId);
      return prevId;
    } else {
      return nowId;
    }
  }

  function getNowId() {
    return $('.active').attr('id');
  }

  function getNextId(id) {
    var p = id.slice(4);
    p++;
    return 'page' + p;
  }

  function getPrevId(id) {
    var p = id.slice(4);
    p--;
    return 'page' + p;
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

});
