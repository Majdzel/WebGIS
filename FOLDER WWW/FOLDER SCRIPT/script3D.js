function mode() {
    let body = document.body;
    body.classList.toggle("dark-mode");
  }

require([
  'esri/Map',
  'esri/views/SceneView'
],(Map,SceneView)=>{
  
  const map1 = new Map({
    basemap: "topo"
  });

  const view = new SceneView({
    map: map1,
    container: "divMap",
    zoom: 12,
    center: [25,52]
  });

});