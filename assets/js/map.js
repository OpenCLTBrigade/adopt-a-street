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
    this.selectionLayer = L.mapbox.featureLayer().setZIndex(1).addTo(map);
    this.highlightLayer = L.mapbox.featureLayer().setZIndex(2).addTo(map);
    this.streetLayer = L.mapbox.featureLayer().setZIndex(3).addTo(map);
    this.selection = [];
    this.selectionTotalMiles = 0;

    this.data = [];
    this.infoDiv = infoDiv;

    this.highlightProps = {
        stroke: "#1010ff",
        'stroke-opacity': 0.30,
        'stroke-width': 10
    };

    this.selectionProps = {
        stroke: "#10ff10",
        'stroke-opacity': 0.30,
        'stroke-width': 10
    };

    var self = this;
    this.streetLayer.on('mouseover', function(ev){ return self.onmouseover(ev); });
    this.streetLayer.on('mouseout', function(ev){ return self.onmouseout(ev); });
    this.streetLayer.on('click', function(ev){ return self.onclick(ev); });

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
                data: it.properties,
                stroke: (it.properties.FY_REPORTE ? "#f47a00" : "#cc0052"),
                'stroke-opacity': 0.25,
                'stroke-width': 8
            }
        });
    }
    this.streetLayer.setGeoJSON(out);
};

Adoptable.prototype.showSelection = function(){
    this.selectionLayer.setGeoJSON(this.selection);
    var miles = 0;
    for(var i = 0; i < this.selection.length; i++){
        miles += this.selection[i].properties.data.TOT_MIa;
    }
    
    this.selectionTotalMiles = miles.toFixed(2);
}

function describeStreetPart(data){
    try {
        return (data.WHOLESTNAM +
                " (between " + data.BEG_DESC + " and " + data.END_DESC + ", " +
                data.TOT_MIa + "mi)");
    } catch(e) {
        return "ERROR"
    }
}

Adoptable.prototype.onmouseover = function(ev){
    if(ev.layer.feature){
        $(this.infoDiv).text(describeStreetPart(ev.layer.feature.properties.data));
        this.highlightLayer.setGeoJSON($.extend(
            true, {},
            ev.layer.feature,
            {properties: this.highlightProps}
        ));
    }
}

Adoptable.prototype.onmouseout = function(ev){
    this.highlightLayer.setGeoJSON([]);
    $(this.infoDiv).text(this.selection.length + " street parts selected, totaling " + this.selectionTotalMiles + "mi");
};

Adoptable.prototype.onclick = function(ev){
    console.log('click', ev);
    var feature = ev.layer.feature;
    for(var i = 0; i < this.selection.length; i++){
        if(feature.properties.data.OBJECTID == this.selection[i].properties.data.OBJECTID){
            this.selection.splice(i, 1);
            this.showSelection();
            return;
        }
    }
    this.selection.push($.extend(
        true, {},
        feature,
        {properties: this.selectionProps}
    ));
    this.highlightLayer.setGeoJSON([]);
    this.showSelection();
}

initMap();
