var builder = require('xmlbuilder');
var moment = require("moment");
var createGPX = function(segments) {
    var obj = {
	gpx:{
	    trk:{
		"#list":[]
	    }
	}
    };
    segments.forEach(function(segment) {
	var seg = {
	    trkseg: {
		"#list":[]
	    }
	};
	segment.forEach(function(tp) {
	    var point = {
		trkpt:{
		    "@lat":tp.lat.toString(), 
		    "@lon":tp.lon.toString(), 
		    time:{"#text":moment(tp.timestamp).format("YYYY-MM-DDTHH:mm:ssZ")},
		}};
	    seg.trkseg["#list"].push(point);
	});
	if (seg.trkseg["#list"].length > 0) {
	    obj.gpx.trk["#list"].push(seg);
	}
    });
    if (obj.gpx.trk["#list"].length > 0) { 	
	return builder.create(obj).end();
    }
    return new Error("No segments");
};
module.exports = createGPX;
