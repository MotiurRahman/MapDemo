var Map = require('ti.map');
var win = Ti.UI.createWindow({

});

var mapview = Map.createView({
	mapType : Map.NORMAL_TYPE,
	animate : true,
	regionFit : true,
	userLocation : true,
	width : '85%',
	height : 200,
	top : 10,
	borderColor : 'red',
	borderWidth : 2,
});

win.add(mapview);

if (Ti.Geolocation.locationServicesEnabled) {
	Ti.Geolocation.purpose = 'Get Current Location';
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.distanceFilter = 10;
	Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

	Ti.Geolocation.addEventListener('location', function(e) {
		if (e.error) {
			alert('Error: ' + e.error);
		} else {
			var Map = require('ti.map');
			mapview.setRegion({
				latitude : e.coords.latitude,
				longitude : e.coords.longitude,
				latitudeDelta : 0.09,
				longitudeDelta : 0.09

			});

			mapview.addAnnotation({
				latitude : e.coords.latitude,
				longitude : e.coords.longitude,
				title : "current location",
				subtitle : 'Mountain View, CA',
				pincolor : Ti.Map.ANNOTATION_RED,
				myid : 1 // Custom property to uniquely identify this annotation.
			});

		}
	});
} else {
	alert('Please enable location services');
}

win.open();
