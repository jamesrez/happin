
$(document).ready(() => {

  //=====CONNECT TO SOCKET=======
  let socket = io.connect();





//=======BUTTONS=======

  $('.newRequestBtn').click(() => {
    // $('.mapContainer').css('display', 'none');
    $('.requestFormContainer').css('display', 'flex');
    $('.requestForm').css('display', 'flex');
  });

  $('#newRequestSubmit').click(() => {
    let newRequestData = {
      title : $('#newRequestTitle').val(),
      body : $('#newRequestBody').val(),
      payout : $('#newRequestPay').val(),
    };
    socket.emit('New Request', newRequestData)
  });

  //Update Near Requests
  addNewRequest = (request) => {
    let newRequestClone = $('.request-prototype').clone(true);
    newRequestClone.addClass('request').removeClass('request-prototype');
    newRequestClone.find('#requestTitle').text(request.title);
    newRequestClone.find('#requestPayout').text('$'+request.payout);
    newRequestClone.appendTo('.requestsContainer');
  }

  //Socket Handlers
  socket.on('New Request', (d) => {
    addNewRequest(d);
  })

})
