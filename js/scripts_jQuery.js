// Wait for the document to load before executing the code
$(document).ready(function() {
  // When hovering over the dropdown menu, show the modal
  $('#dropdown').hover(function() {
    $('#dropdown-content').css('display', 'block');
  }, function() {
    $('#dropdown-content').css('display', 'none');
  });
});

