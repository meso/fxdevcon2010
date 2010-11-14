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

$(function() {
  $(document).keydown(function(e) {
    if (e.keyCode == 39) {
      var p = next();
      socket.send(json({page: p}));
    } else if (e.keyCode == 37) {
      var p = previous();
      socket.send(json({page: p}));
    }
    return false;
  });

  function next() {
    var nowId = getNowId();
    var nextId = getNextId(nowId);
    var result = activate(nextId);
    if (result) {
      inactivate(nowId);
      return nextId;
    } else {
      return nowId;
    }
  }

  function previous() {
    var nowId = getNowId();
    var prevId = getPrevId(nowId);
    var result = activate(prevId);
    if (result) {
      inactivate(nowId);
      return prevId;
    } else  {
      return nowId;
    }
  }

  function inactivate(id) {
    $('#' + id).removeClass('active');
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

  function activate(id) {
    id = '#' + id;
    if ($(id).length) {
      $(id).addClass('active');
      return true;
    } else {
      return false;
    }
  }

});
