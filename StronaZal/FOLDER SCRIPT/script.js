require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/widgets/BasemapGallery',
    'esri/widgets/Expand',
    'esri/widgets/AreaMeasurement2D',
    'esri/widgets/DistanceMeasurement2D',
    'esri/widgets/LayerList',
    'esri/widgets/Legend',
    'esri/widgets/Search',
    'esri/widgets/Popup'
  ], (Map, MapView,FeatureLayer,BasemapGallery,Expand,AreaMeasurement2D,DistanceMeasurement2D,LayerList,Legend,Search,Popup)=>{

    const f1 = new FeatureLayer({
      portalItem :{
        id: "5b2147101b7746ee8d3ce41af94894c4"
      }
    });
    const map1 = new Map({
      basemap: "topo-vector",
  
    });
    const view = new MapView({
      map: map1,
      container: "mapDiv",
      zoom: 5,
      center:[84, 33]
    });
    const basemapGalleryWg = new BasemapGallery({
      view: view
    });   
    const measurementWg = new AreaMeasurement2D({
      view: view
    })
    const distanceWg = new DistanceMeasurement2D({
        view: view
    })
    const LayerListWg = new LayerList({
      view: view
    })
    const searchWg = new Search({
      view: view,
      allPlaceholder: "Nazwa szczytu",
      includeDefaultSources: false,
      sources: [{
        layer: f1,
        searchFields: ["name"],
        suggestionTemplate: "{name}",
        exactMatch: false,
        outFields: ["*"],
        placeholder: "Nazwa szczytu: ",
        name: "Szczyty",
        zoomScale: 100000,     
      }]
    });
    const exp1 = new Expand({
      view: view,
      content: basemapGalleryWg
    });
    const exp2 = new Expand({
      view: view,
      content: distanceWg
    });
    const exp3 = new Expand({
      view: view,
      content: measurementWg
    });
    const exp4 = new Expand({
      view: view,
      content: LayerListWg,
    });
    const legend = new Legend({
      view: view,
      layerInfos: [
        {
          layer: f1,
          title: "Szczyty"
        }
      ]
    });


   
    
    map1.add(f1)
    view.ui.add(searchWg, "top-right");
    view.ui.add(exp1, {position: "top-right"});
    view.ui.add(exp4, {position: "top-right"});
    view.ui.add(exp2, {position: "top-right"});
    view.ui.add(exp3, {position: "top-right"});
    view.ui.add(legend, "bottom-right");
  });