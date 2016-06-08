$(function(){
  $('#search-term').submit(function(event){
    event.preventDefault();
    var searchTerm = $('#query').val();
    search(searchTerm);
  });
  //get json from youtube API
  function getRequest(searchTerm){
      var params = {
        part: 'snippet',
        key: "AIzaSyACkq-FMWJeHSGEVojpR-hqrawwiPmS310",
        q: searchTerm,
        r: "json"
      };
        url = "https://www.googleapis.com/youtube/v3/search";
  $.getJSON(url, params, function(data){
    console.log(data);
    showResults(data);
  }
 )};
//appends video links to html
  function showResults(results){
  var html = "";
  $.each(results.items, function(index,video){
    console.log(video.snippet);
    html += "<div class='row'>"
    html += "<div class='image'><img class='thumbnail' src=" + video.snippet.thumbnails.high.url + "></div>"
    html += "<div class='content'><a class='link' href= 'http://youtube.com/v/" + video.id.videoId + "' target= '_new' >"
    html += '<p>'+ video.snippet.title + '</p></a></hr>'
    html += '<p class= "description">' + video.snippet.description + '</p></div></div>'   
  });
  $('#search-results').html(html);
  }
  

function search(searchKey) { 
  var request = gapi.client.youtube.search.list({
    q: searchKey,
    part: 'snippet'
  });
  request.execute(function(response) {
   console.log(response);
   showResults(response);
  });
 }
});
// Search for a specified string through google API page
function APIready(){
  gapi.client.setApiKey('AIzaSyACkq-FMWJeHSGEVojpR-hqrawwiPmS310');
  gapi.client.load('youtube', 'v3', function() {
        });
  }

