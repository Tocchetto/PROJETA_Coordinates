//https://openweathermap.org/docs/hugemaps

mapApp.controller('mapController', function ($scope, $timeout){
	var aux = 0;
	var mymap = L.map('mapid').setView([-16.77, -63.85], 3);

  var polygon = new L.polygon([
        [0,0],
        [0,0],
        [0,0],
        [0,0]
    ]).addTo(mymap);

  var writtenPolygon = new L.polygon([
        [0,0],
        [0,0],
        [0,0],
        [0,0]
    ]).addTo(mymap);

  var polygonLimits = new L.polygon([
        [-50.1000000,-100.1000000],
        [27.9000000,-100.1000000],
        [27.9000000,-29.1000000],
        [-50.1000000, -29.1000000]],{
          color: 'red',
          fillColor: "transparent",
          weight: 0.4
        }
    ).addTo(mymap);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
     }).addTo(mymap);

  var drawnItems = new L.FeatureGroup();

  var drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnItems,
      poly: {
        allowIntersection: false
      }
    },
    draw: {
      polygon: {
        allowIntersection: false,
        showArea: true
      },
      polyline: false,
      circle: false,
      marker: false,
      rectangle: true,
      polygon: false,
    }
  });
  mymap.addControl(drawControl);

  mymap.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    console.log(layer);
    clearMap();
    var polygonLimits = new L.polygon([
        [-50.1000000,-100.1000000],
        [27.9000000,-100.1000000],
        [27.9000000,-29.1000000],
        [-50.1000000, -29.1000000]],{
          color: 'red',
          fillColor: "transparent",
          weight: 0.4
        }
    ).addTo(mymap);
    polygon = L.polygon([
        [layer._latlngs[0][0].lat, layer._latlngs[0][0].lng],
        [layer._latlngs[0][1].lat, layer._latlngs[0][1].lng],
        [layer._latlngs[0][2].lat, layer._latlngs[0][2].lng],
        [layer._latlngs[0][3].lat, layer._latlngs[0][3].lng]
    ]).addTo(mymap);
  	for(i=0;i<=layer._latlngs[0].length-1;i++)
    {
    	if(layer._latlngs[0][i].lat < -50.1 || layer._latlngs[0][i].lng < -100.1 || layer._latlngs[0][i].lat > 27.9 || layer._latlngs[0][i].lng > -29.1){
    		aux = 1;
        mymap.removeLayer(polygon);
    		alert("Você selecionou uma área indisponível")
    		break;
    	}
			console.log(i+': '+'[' + layer._latlngs[0][i].lat + ',' + layer._latlngs[0][i].lng +'],');
    }
    if(aux == 1){
    	$scope.latitudeCima = " ";
      $scope.latitudeBaixo = " ";
	    $scope.longitudeEsquerda = " ";
      $scope.longitudeDireita = " ";
	    $scope.$apply();
    	aux = 0;
    }else{
      $scope.latitudeCima = layer._latlngs[0][1].lat;
      $scope.latitudeBaixo = layer._latlngs[0][0].lat;
      $scope.longitudeEsquerda = layer._latlngs[0][0].lng;
      $scope.longitudeDireita = layer._latlngs[0][2].lng;
	    $scope.$apply();
    }
    
  });

  $scope.visualizeMap = function(){
    if($scope.latitudeBaixo < -50.1 || $scope.longitudeEsquerda < -100.1 || $scope.latitudeCima > 27.9 || $scope.longitudeDireita > -29.1){
      alert("Você selecionou uma área indisponível")
      $scope.clearCoordinates();
    }else
    {
      clearMap();
      var polygonLimits = new L.polygon([
          [-50.1000000,-100.1000000],
          [27.9000000,-100.1000000],
          [27.9000000,-29.1000000],
          [-50.1000000, -29.1000000]],{
            color: 'red',
            fillColor: "transparent",
            weight: 0.4
          }
      ).addTo(mymap);

      $scope.mapVis = 1;

      var writtenSQ = [
      [$scope.latitudeBaixo,$scope.longitudeEsquerda],
      [$scope.latitudeCima,$scope.longitudeEsquerda],
      [$scope.latitudeCima,$scope.longitudeDireita],
      [$scope.latitudeBaixo,$scope.longitudeDireita]];

      var writtenPolygon = L.polygon(writtenSQ).addTo(mymap);
    }
  }

  $scope.mapVis = 0;
  $scope.openMap = function(){
    $scope.clearCoordinates();
    clearMap();
    var polygonLimits = new L.polygon([
        [-50.1000000,-100.1000000],
        [27.9000000,-100.1000000],
        [27.9000000,-29.1000000],
        [-50.1000000, -29.1000000]],{
          color: 'red',
          fillColor: "transparent",
          weight: 0.4
        }
    ).addTo(mymap);

    $scope.mapVis = 1;
  }

  $scope.closeMap = function(){
    $scope.mapVis = 0;
  }

  $scope.clearCoordinates = function(){
    $scope.latitudeCima = " ";
    $scope.latitudeBaixo = " ";
    $scope.longitudeEsquerda = " ";
    $scope.longitudeDireita = " ";
  }

  function clearMap() {
    for(i in mymap._layers) {
      if(mymap._layers[i]._path != undefined) {
        try {
          mymap.removeLayer(mymap._layers[i]);
        }
        catch(e) {
          console.log("problem with " + e + mymap._layers[i]);
        }
      }
    }
  }

});