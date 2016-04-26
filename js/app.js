/*
  Please add all Javascript code to this file.
*/

// $('.closePopUp').hide;
var sourceOptions = $("#source-options")
// console.log(sourceOptions);

//if sourceoptions equal the following values designate the prospective url
sourceOptions.on('click', 'li', function(e){
  e = this;
  var item = $(this).text();
  var urlApi = '';
  // console.log(item, urlApi);
  if (item === 'Mashable'){
    urlApi = 'http://feedr-api.wdidc.org/mashable.json';
  } else if (item === 'Reddit') {
    urlApi = 'https://www.reddit.com/top.json';
  }
  else if (item === 'Digg'){
    urlApi = 'http://feedr-api.wdidc.org/digg.json';
  };

  $.ajax({
          url: urlApi,
          method: 'GET',
          dataType: 'json', //<== cross domain READ up on JSONP
          success: function(response){
            response.source = item;
            postData(response);
          },
          error: function(error){
            console.log(error);
          }

  });
});




  function postData (response){
    $('#main').empty();
    if (response.source === 'Reddit'){
      var info = response.data.children;
      for(var i = 0; i < info.length; i ++){
        var image = info[i].data.thumbnail;
        var url = info[i].data.url;
        var upvotes = info[i].data.ups;
        var title = info[i].data.title;
        var author = info[i].data.author;

        var articleEntry = {
          title: title,
          image: image,
          url: url,
          upvotes: upvotes,
          author: author
        };

        addEntry(articleEntry);
      }

    }
    else if (response.source === 'Mashable') {
      var info = response.new;
      for(var i = 0; i < info.length; i ++){
        var image = info[i].feature_image;
        var url = info[i].link;
        var upvotes = info[i].shares.total;
        var title = info[i].title;
        var author = info[i].author;

        var articleEntry = {
          title: title,
          image: image,
          url: url,
          upvotes: upvotes,
          author: author
        };

        addEntry(articleEntry);
      }
    }
    else if (response.source === 'Digg') {
      var info = response.data.feed;
      for(var i = 0; i < info.length; i ++){
        var image = info[i].content.media.images[0].url;
        var url = info[i].content.original_url;
        var upvotes = info[i].diggs.count;
        var title = info[i].content.title_alt;
        var author = info[i].content.author;

        var articleEntry = {
          title: title,
          image: image,
          url: url,
          upvotes: upvotes,
          author: author
        };

        addEntry(articleEntry);
      }

    }

      function addEntry(entry){
        var source   = $("#article-template").html();
        var template = Handlebars.compile(source);
        var $body = $("#main");

        $body.append(template(entry));

      }
    }
