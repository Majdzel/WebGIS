require([
  'esri/Map',
  'esri/views/SceneView',
  'esri/layers/FeatureLayer',
  'esri/Graphic',
  'esri/layers/GraphicsLayer',
  'esri/renderers/SimpleRenderer',
  'esri/renderers/visualVariables/VisualVariable',
  'esri/renderers/visualVariables/SizeVariable',
  'esri/widgets/Legend',
  "esri/widgets/LayerList",

], (Map, SceneView,FeatureLayer,Graphic, GraphicsLayer, SimpleRenderer, VisualVariable, SizeVariable, Legend, LayerList)=>{

const f1 = new FeatureLayer({
    url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0"
});
const f2 = new FeatureLayer({
    url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0"
  
});

let g1 = new GraphicsLayer();

const map1 = new Map({
  basemap: "topo-vector",
  layers: [f2, g1]
});

const view = new SceneView({
  map: map1,
  container: "mapDiv",
  zoom: 5,
  center:[-100, 40]
});  

const legend = new Legend({
  view: view,
  layerInfos: [
    {
      layer: f2
    }
  ]
  
});

view.ui.add(legend, {position: "bottom-right"});

let query = f1.createQuery();
query.where = "MAGNITUDE > 3";
query.outFields =  ["*"];
query.returnGeometry = true;

f1.queryFeatures(query)
  .then(response => {
      console.log(response);
      getResults(response.features);
  })
  .catch(err => {
      console.log(err);
  })

const getResults = (features) => {
  let symbol = {
    type: 'simple-marker',
    size: 10,
    color: "red",
    style: "circle"
  };
  
  features.map(elem => {
    elem.symbol = symbol;
  });

  g1.addMany(features);

  const simpleRenderer ={
    type: 'simple',
    symbol: {
        type: 'point-3d',
        symbolLayers:[
          {
            type:'object',
            resource:{
              primitive: 'cylinder'
            },
            width: 25000
          }
        ]
        
    },
    visualVariables: [
      {
        type:"color",
        field:"MAGNITUDE",
        stops:[
          {
            value: 0.5 ,
            color:"green",
          },
          {
            value: 1.12998071359691,
            color:"yellow",
          },
          {
            value: 4.48,
            color:"red",
          }
        ]
      },
      {
        type: 'size',
        field: 'DEPTH',
        stops:[
          {
            value: -3.39,
            size: 20000
          },
          {
            value: 30.97,
            size: 120000
          }
        ]
      }
    ]

}
f2.renderer = simpleRenderer;
}
const layerlist = new LayerList({
    view: view,
  }); 
view.ui.add(layerlist, "bottom-left")
});