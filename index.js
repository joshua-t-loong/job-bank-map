mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHVhLWxvb25nIiwiYSI6ImNqMm01ODQ4cTAwc28ycW93ZGV1cWR5amIifQ.ZxuCP_hBIHqxPUon6vX7jg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-96, 60],
    zoom: 3,
});



$("#search-input").keypress(function(e) {
     if (e.which == 13) {
          requestData($("#search-input").val());
          return false;
     }
});

function requestData(noc)
{
  map.removeLayer("points");
  $.get("http://stage.lmi-explore-imt.ca/lmiws-api/job/jbws/ct/noc?id=" + noc, function(data){drawData(data)});
}

function drawData(dataUncompressed)
{

  var jobData = [], data = JSON.parse(dataUncompressed);
  for(var i in data)
  {
    var coordinates = data[i]["x"],
      x = Number(coordinates.substr(10)),
      y = Number(coordinates.substr(0, 9));
    // town = getTownName (x, y);
    jobdata[i] = {
      "type": "Feature",
      "geometry": {
          "type": "Point",
          "coordinates": [x, y]
        },
        "properties": {
            "title": data[i]["c"],
            "icon": "marker",
            "description": "<strong>This town has " + data[i]["c"] + " job posting(s).</strong> <p>Visit the <a href=https://www.jobbank.gc.ca/jobsearch/jobsearch?cty=" + data[i]["k"]+ "&wid=px&sort=M#results-list-content target=_blank>Job Bank site</a> for full posting information </p>"
        }
    }
  }

  map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": {
          "type": "geojson",
          "data": {
              "type": "FeatureCollection",
              "features": jobdata
          }
      },
      "layout": {
          "icon-image": "{icon}-15",
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
      }
    });

  console.log("Hello");
}

map.on('load', function () {
  var xhr = new XMLHttpRequest();
  var jobdata = [];
  xhr.onreadystatechange = function(){
  if (xhr.readyState==4 && xhr.status==200)
  {
    var data = JSON.parse(xhr.responseText);
    console.log(data);

    for(var i in data)
    {
      var coordinates = data[i]["x"],
        x = Number(coordinates.substr(10)),
        y = Number(coordinates.substr(0, 9));
      // town = getTownName (x, y);
      jobdata[i] = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [x, y]
          },
          "properties": {
              "title": data[i]["c"],
              "icon": "marker",
              "description": "<strong>This town has " + data[i]["c"] + " job posting(s).</strong> <p>Visit the <a href=https://www.jobbank.gc.ca/jobsearch/jobsearch?cty=" + data[i]["k"]+ "&wid=px&sort=M#results-list-content target=_blank>Job Bank site</a> for full posting information </p>"
          }
      }
    }

    map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": jobdata
            }
        },
        "layout": {
            "icon-image": "{icon}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }
      });

    }
    else{
      console.log("error");
    }
  }
  xhr.open('GET','http://stage.lmi-explore-imt.ca/lmiws-api/job/jbws/ct' ,true);
  xhr.send();
});

map.on('click', 'points', function (e) {
 new mapboxgl.Popup()
     .setLngLat(e.features[0].geometry.coordinates)
     .setHTML(e.features[0].properties.description)
     .addTo(map);
 });

 // Change the cursor to a pointer when the mouse is over the places layer.
 map.on('mouseenter', 'points', function () {
     map.getCanvas().style.cursor = 'pointer';
 });

 // Change it back to a pointer when it leaves.
 map.on('mouseleave', 'points', function () {
     map.getCanvas().style.cursor = '';
 });
