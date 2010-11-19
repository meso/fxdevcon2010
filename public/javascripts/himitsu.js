$(function() {
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

});
