window.prize = false;
var isSpinning = false, slot,
  updateSlot = function (id,result) { 
    setTimeout(function () {
      $('#slot-'+id).attr('data-result',result).removeClass('spinning');
      if (id === 2) {
        isSpinning = false;
        showResult();
      }
    }, 4000-( 1500/(id+1) ) );
  },
  showResult = function () {
    var prize = window.prize, ret = "You've won a ";
    switch (prize) {
      case 'tea':
      ret += "cup of Tea!";
      break;
      case 'espresso':
      ret += "shot of Espresso!";
      break;
      case 'coffee':
      ret += "cup of Coffee!";
      break;
      default:
      ret = false;
    }
    if (ret) {
      $('#results .dots').html('<marquee scrollamount="10" behavior="alternate">' + ret + '</marquee>');
    } else {
      $('#results .dots').html('<p>Not a Winner :(</p>');
    }
    
  };

$('#button').click(function () {
  if (isSpinning) return;
  isSpinning = true;
  var output = SlotMachine.showMeTheMoney(),
    results = output.results;
  window.prize = output.won;

  $('#results .dots').html('<p>Good Luck!</p>');

  for (var i=0;i<3;i++) {
    $('#slot-'+i).addClass('spinning');
    updateSlot(i,results[i]);
  }
}).mousedown(function () {
  $(this).addClass('active');
}).mouseup(function () {
  $(this).removeClass('active');
});