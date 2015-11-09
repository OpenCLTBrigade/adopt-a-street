function initMap(){
    L.mapbox.accessToken = 'pk.eyJ1IjoiYnlyZCIsImEiOiJjaWVpM2JrYnEwMGk5czZtMTNlMjB2cHFoIn0.ZHXd1umkmcRlYxM_VZwdpA';
    var data_url = "data/Street_Adoption.json";

    var map = L.mapbox.map('map', 'mapbox.streets').setView([35.2356117,-80.8488496], 15);
    var infoDiv = document.getElementById('distance');
    new Selection(map, infoDiv);
    new Adoptable(map, data_url, infoDiv);
}

function Selection(map, infoDiv){
    this.infoDiv = infoDiv;
    this.layer = L.mapbox.featureLayer().addTo(map);
    this.coordinates = [];
    this.pointProps = {
        "marker-color": "#ff8888"
    };
    this.lineProps = {
        "stroke": "#000",
        "stroke-opacity": 0.5,
        "stroke-width": 4
    };
    var self = this;
    map.on('click', function(){ self.onClick.apply(self, arguments); });
}

Selection.prototype.onClick = function(ev) {
    var c = ev.latlng;

    this.coordinates.push(c);

    if(this.coordinates.length == 2){
        this.displaySelectedLine();
        this.coordinates.length = 0;
    }else{
        var geojson = Point(c.lng, c.lat, this.pointProps);
        this.layer.setGeoJSON(geojson);
    }
};

Selection.prototype.displaySelectedLine = function(){
    var firstMarker = this.coordinates[0];
    var secondMarker = this.coordinates[1];
    var geojson = [
        Point(firstMarker.lng, firstMarker.lat, this.pointProps),
        Point(secondMarker.lng, secondMarker.lat, this.pointProps),
        LineString([[firstMarker.lng, firstMarker.lat],
              [secondMarker.lng, secondMarker.lat]],
             this.lineProps)
    ];

    this.layer.setGeoJSON(geojson);

    this.infoDiv.innerHTML = (firstMarker.distanceTo(secondMarker)).toFixed(0) + 'm';
};

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
