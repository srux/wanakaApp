var center ={lat:-44.6988261,lng:169.1655366};
var map = L.map('map').setView(center,11);
var directionsLayerGroup = L.layerGroup().addTo(map);
var directionsService;
var services = [
	{
		latlng:{lat:-44.6537162,lng:168.8022141},
		description:'Mt Aspiring',
		icon:'assets/mountain-summit.svg'
	},
	{
		latlng:{lat:-45.1196851,lng:169.0258232},
		description:'Cromwell',
		icon:'assets/cromwell.svg'
	},
	{
		latlng:{lat:-44.5862601,lng:167.6231734},
		description:'Milford Sounds',
		icon:'assets/mountain-summit.svg'
	},
	{
		latlng:{lat:-45.0244532,lng:168.6743453},
		description:'Queenstown',
		icon:'assets/queenstown.png'
	},
	{
		latlng:{lat:-44.8715702,lng:168.947457},
		description:'Cardrona Alpine Resort',
		icon:'assets/alpine.svg'
	},
	{

		latlng:{lat:-44.8814997,lng:169.0014808},
		description:'Horse Ride',
		icon:'assets/horse-riding.svg'
	},
	{

		latlng:{lat:-44.690004,lng:169.132042},
		description:'Lake Cruise',
		icon:'assets/boat.svg'
	},

	{
		latlng:{lat:-44.7284992,lng:169.2378844},
		description:'Airport',
		icon:'assets/airport.svg'
	},
	{
		latlng:{lat:-44.7060755,lng:169.1847088},
		description:'Puzzling World',
		icon:'assets/jigsaws.svg'
	}
];
var chosenPoints=[];


L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGhhbHl4OTAiLCJhIjoiY2o2YjdrZHRlMWJmYjJybDd2cW1rYnVnNSJ9.j_DQLfixHfhioVjH6qmqkw').addTo(map);
var serviceGroup = L.layerGroup();
_(services).each(function(service){

	var serviceIcon = L.icon({
		iconUrl: service.icon,
		iconSize: [30,30]
    });
    
	var marker = L.marker(service.latlng,{icon:serviceIcon}).addTo(map);
	marker.on('click',function(e){
		chosenPoints.push(e.latlng);
        drawPath();
        
    });

});

//googlemaps directions
function initMap(){
	directionsService = new google.maps.DirectionsService;	
}

function drawPath(){

	if(chosenPoints.length>=2){
		var chosenPointsClone = chosenPoints.slice(0);
		var origin = chosenPointsClone.splice(0, 1).pop();
		var destination = chosenPointsClone.pop();
		var waypoints = _(chosenPointsClone).map(function(item){
			return {location:item,stopover: true};
        });

		var request = {
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          travelMode: 'DRIVING'
        };

		directionsService.route(request,function(response,status){

			directionsLayerGroup.clearLayers();
			
            var path = response.routes["0"].overview_path;
     

			//converting path to polyline
			var polyline = _(path).map(function(item){
                return {lat:item.lat(),lng:item.lng()};
                
            });
            

            // polyline.getLatLngs();

			L.polyline(polyline,{
				color:'tomato',
                weight:4,
                showMeasurements: true
            }).addTo(directionsLayerGroup);


            // .showMeasurements();
            
            // var iMeasurements = document.getElementsByClassName('.leaflet-measure-path-measurement > div').innerHTML;
            console.log('distance',document.getElementById("distance").innerHTML);
            
           
        });
        
        
	}

};	

function clearPath(){
	chosenPoints=[]
	directionsLayerGroup.clearLayers();

};	


$(function(){
	$('.clearBtn').on('click',function(e){
		clearPath();
	});
})


