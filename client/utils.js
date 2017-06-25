function showToast(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.textContent = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

module.exports = function() {
  return  {
    showToast,
  }
}();
