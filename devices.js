$(function(){
  $('.cd-screen').each(function(){
    var _this = this;
    if($(_this).hasClass('cd-smart-loader')){
      if(isSlideShow(_this)){
        $('> :gt(0)', _this).hide();
      }
      $('> :first-child',_this).each(function(){
        handleLoadBinding(this);
      });
    }
    else{
      callSlideShow(_this);
    }
  });

  function isSlideShow(_self){
    return $(_self).children().length > 1 && ! $(_self).hasClass('cd-no-slideshow');
  }

  function callSlideShow(_self){
    if(isSlideShow(_self)){
      var pageSpeed = getOptionalData(_self, 'page-speed', 5000);
      var fadeSpeed = getOptionalData(_self, 'fade-speed', 1000);
      $('> :gt(0)', _self).hide();
      if ( ! $(_self).hasClass('cd-smart-loader')) {
        $('> :eq(0)', _self).css('display', 'block');
      }
      setInterval(function(){$('> :first-child',_self).fadeOut(fadeSpeed).next().fadeIn(fadeSpeed).end().appendTo(_self);}, pageSpeed);
    }
  }

  function handleLoadBinding(_self){
    $(_self).on('load', handleLoad);
    if (_self.complete) {
      $(_self).off('load', handleLoad);
      handleLoad.call(_self);
    }
  }

  function handleLoad(){
    var loadSpeed = getOptionalData($(this).parent('.cd-smart-loader'), 'load-in-speed', 250);
    $(this).fadeIn(loadSpeed);
    callSlideShow($(this).parent()[0]);
  }

  function getOptionalData(saveThis, data, defaultValue){
    if ($(saveThis).attr('data-' + data)) {
      return $(saveThis).data(data);
    }
    return defaultValue;
  }
});
