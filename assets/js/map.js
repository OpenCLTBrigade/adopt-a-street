function initMap(){
    L.mapbox.accessToken = 'pk.eyJ1IjoiYnlyZCIsImEiOiJjaWVpM2JrYnEwMGk5czZtMTNlMjB2cHFoIn0.ZHXd1umkmcRlYxM_VZwdpA';
    var data_url = "data/Street_Adoption.json";

    var map = L.mapbox.map('map', 'mapbox.streets').setView([35.2356117,-80.8488496], 15);
    var infoDiv = document.getElementById('distance');
    new Adoptable(map, data_url, infoDiv);
}

function Point(lng, lat, props){
    return {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [lng, lat]
        },
        properties: props
    };
}

function LineString(points, props){
    return {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: points
        },
        properties: props
    };
}

function Adoptable(map, data_url, infoDiv){
    this.map = map;
    this.layer = L.mapbox.featureLayer().addTo(map);
    this.data = [];
    this.infoDiv = infoDiv;

    var self = this;
    this.layer.on('mouseover', function(ev){ return self.onmouseover(ev); });

    $.getJSON(data_url, function(data) {
        if(data.type != "FeatureCollection") {
            throw "failed to load adoptable map data";
        }
        $(this.infoDiv).text("Loaded map data.")
        self.data = data;
        self.showData();
    });
}

Adoptable.prototype.showData = function(){
    var out = [];
    var features = this.data.features;
    for(var i = 0; i < features.length; i++){
        var it = features[i];
        out.push({
            type: it.type,
            geometry: it.geometry,
            properties: {
                desc: it.properties.BEG_DESC,
                len_m: it.properties.TOT_MIa,
                stroke: (it.properties.FY_REPORTE ? "#f47a00" : "#cc0052"),
                'stroke-opacity': 0.25,
                'stroke-width': 8
            }
        });
    }
    this.layer.setGeoJSON(out);
};

Adoptable.prototype.onmouseover = function(ev){
    if(ev.layer.feature){
        $(this.infoDiv).text(ev.layer.feature.properties.desc + ": " + ev.layer.feature.properties.len_m + "km");
    }
}

initMap();
