import React from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from "react-google-maps";
import mockData from './mockData.json';
import { chunk, isEmpty } from 'lodash';
import './style.scss';
import Icons from '../../components/Icons'; 

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
      let pR = this.props, sourceDet = null, destinationDet = null, vehiclePos = null;
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
        if(pR.allData.vehicleDetails && pR.allData.vehicleDetails.lat && pR.allData.vehicleDetails.lng) {
          vehiclePos = {};
          vehiclePos.lat = Number(pR.allData.vehicleDetails.lat);
          vehiclePos.lng = Number(pR.allData.vehicleDetails.lng);
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
            vehiclePos: vehiclePos,
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
    {props.vehiclePos && <Marker position={ props.vehiclePos } />}
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
    //let newObj = {};
    if(jsonData && jsonData.totMaps && jsonData.totMaps.length) {
        jsonData.totMaps.map((data, indx)=> {
          data.uId = indx+1;
          return data;
        });
        let tMps = jsonData.totMaps;
     //   let setPerCnt = Math.floor(tMps.length/3);             
        let newArr = chunk(tMps, 2);
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
            <p><strong>Shipment Details</strong></p>
            <div className="mapsBlock map-container">
              {
                sT.mapLists && sT.mapLists.length && sT.mapLists.map((pDatas, pIndx)=>{
                  return <div className="rowClass margin_0" key={ pIndx }>
                          {
                              pDatas && pDatas.length && pDatas.map((cData, cIndx)=>{
                                  let bgColor = "#eee";
                                  if(cData && cData.iconColor) {
                                    bgColor = cData.iconColor;
                                  }
                                  return <div className="colClass padding_0" key={ cIndx } >
                                            <div className={'map-container '+ pIndx + " - "+ cIndx}>
                                              <p className="mapHeadLevel level_1"><span className="text-left">Shipment { cData.uId }</span> <span className="iconwithText text-right float-right"><span className="icon" style={{background: bgColor }}><Icons>local_shipping</Icons></span><span className="iconTxt">{ cData.vehicleStatus }</span></span></p>
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

