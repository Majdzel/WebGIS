function mode() {
    let body = document.body;
    body.classList.toggle("dark-mode");
  }

require([
  'esri/Map',
  'esri/views/MapView',
  'dijit/from/Button'
],(Map,MapView,Button) => {
  
  const map1 = new Map({
    basemap: "topo"
  });

  const view = new MapView({
    map: map1,
    container: "divMap",
    zoom: 12,
    center: [25,52]
  });

  const zoomIn = new Button({
    onClick: () => {
      view.zoom = view.zoom + 1 ;
    }
  },"zoomIn");

  const zoomOut = new Button({

    onClick: () =>{
      view.zoom = view.zoom -1;
    }
  },"zoomOut");

});