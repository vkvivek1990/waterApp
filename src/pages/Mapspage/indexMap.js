import React from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, } from "react-google-maps";
import mockData from './mockData.json';
import { chunk, isEmpty } from 'lodash';
import './style.scss';

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMDAZA6d7NLcxPy9FLz1-4-mziC1HO9Ko&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `200px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() { 
      //console.log(props);
    }, 
    componentWillMount() {
      let pR = this.props, sourceDet = null, destinationDet = null;
      console.log(this.props.allData);
      if(pR && pR.allData) {
        if(pR.allData.sourceDetails && pR.allData.sourceDetails.lat && pR.allData.sourceDetails.lng) {
          sourceDet = {};
          sourceDet.lat = Number(pR.allData.sourceDetails.lat);
          sourceDet.lng = Number(pR.allData.sourceDetails.lng);
        }
        if(pR.allData.destinationDetails && pR.allData.destinationDetails.lat && pR.allData.destinationDetails.lng) {
          destinationDet = {};
          destinationDet.lat = Number(pR.allData.destinationDetails.lat);
          destinationDet.lng = Number(pR.allData.destinationDetails.lng);
        }

      }
      const DirectionsService = new window.google.maps.DirectionsService();
      
      sourceDet && destinationDet &&
      DirectionsService.route({
        origin: new window.google.maps.LatLng(sourceDet.lat, sourceDet.lng),
        destination: new window.google.maps.LatLng(destinationDet.lat, destinationDet.lng),
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    },
    componentWillReceiveProps(nextProps) {
      
    }
  })
)(
  props =>
   
  <GoogleMap defaultZoom={8} defaultCenter={ new window.google.maps.LatLng(11.1271, 78.6569) } >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  componentDidMount() {
    let jsonData = mockData;
    console.log(jsonData);
    let newObj = {};
    if(jsonData && jsonData.totMaps && jsonData.totMaps.length) {
        let tMps = jsonData.totMaps;
        let setPerCnt = Math.floor(tMps.length/3);             
        let newArr = chunk(tMps, setPerCnt);
        console.log(newArr);
        this.setState({
            mapLists: newArr,
        });
    }
}


  render() {
    let sT = this.state;
    
    return (
    <React.Fragment>
    
    <div className="maps-Container">
    <div className="containerBlock">
        <div className="contentBlock">
            <div className="mapsBlock map-container">
              {
                sT.mapLists && sT.mapLists.length && sT.mapLists.map((pDatas, pIndx)=>{
                  return <div className="row margin_0" key={ pIndx }>
                          {
                              pDatas && pDatas.length && pDatas.map((cData, cIndx)=>{
                                  
                                  return <div className="col-md-4 padding_0" key={cIndx}>
                                            
                                            <div className={'map-container '+ pIndx + " - "+ cIndx}>
                                              <p className="mapHeadLevel level_1">Shipment {cIndx + 1 } </p>
                                              <div className="mapBlock">
                                                <MapWithADirectionsRenderer allData={cData} />
                                              </div>
                                            </div>
                                          </div>
                              })
                          }
                          </div>
                })
              }
            </div>
        </div>
    </div>
    </div>
    </React.Fragment>

    )

  } 

}

