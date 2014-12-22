$(function(){
  $('.cd-slideshow').each(function(){
    var $this = this;
    var pageSpeed = ifDataExists($this, 'page-speed', 5000);
    var fadeSpeed = ifDataExists($this, 'fade-speed', 1000);
    $('> :gt(0)', $this).hide();
    if (!$('> :eq(0)', $this).hasClass('cd-loader')) {
      $('> :eq(0)', $this).css('display', 'block');
    }
    setInterval(function(){$('> :first-child',$this).fadeOut(fadeSpeed).next().fadeIn(fadeSpeed).end().appendTo($this);}, pageSpeed);
  })

  $(".cd-loader").each(function() {
    var $this = $(this);
    $this.on("load", handleLoad);
    if (this.complete) {
        $this.off("load", handleLoad);
        handleLoad.call(this);
    }
  });

  function handleLoad(){
    var loadSpeed = ifDataExists(this, 'load-speed', 750);
    $(this).fadeIn(loadSpeed);
  }

  function ifDataExists(saveThis, data, defaultValue){
    if ($(saveThis).attr('data-' + data)) {
      return $(saveThis).data(data);
    }
    return defaultValue;
  }
});
