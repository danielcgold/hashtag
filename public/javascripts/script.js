var photo = photo || {};

photo.url;
photo.tags = [];

var app = new Clarifai.App(
  'f8TMlRZodSS0TS0eWF6c13i1HbtlFytlrdOqjnGm',
  'gP_LYIoXx9x2dj0r_FoHCTs8wSx6l339XkV_wlmQ'
);

photo.requestClarifaiPrediction = function(input) {
  app.models.predict(Clarifai.GENERAL_MODEL, input).then(
    function(response) {
      $('.error').addClass('hidden');

      $.each(response.data.outputs[0].data.concepts , function(key, value) {
        photo.tags.push('<span class="hashtag">#' + value.name.replace(/\s+/g, '-') + '</span>');
      });

      $('.loading').addClass('hidden');
      $('.tagging-content').removeClass('hidden');
      $('.photo-tags').html(photo.tags);
      $('.tagging-content').append('<img src="' + input + '">');
    },
    function(err) {
      $('.error').removeClass('hidden');
    }
  );
};

photo.getPhotoURL = function() {
  photo.url = $('input').val();
};

photo.addText = function(word) {
  $('textarea').val($('textarea').val() + word);
};

photo.closerError = function() {
  $('.error').addClass('hidden');
  $('.loading').addClass('hidden');
}

$(function(){
  $('button').on('click', function(){
    $('.loading').removeClass('hidden');
    photo.getPhotoURL();
    photo.requestClarifaiPrediction(photo.url);
  });

  $(document).on('click', '.hashtag', function(){
    photo.addText($(this).text() + ' ');
  });

  $('.close-error').on('click', function(){
    photo.closerError();
  });
});
