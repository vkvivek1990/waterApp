import React from 'react';
import {compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker,
  //Polyline
  //Rectangle
} from "react-google-maps";

import AutoCompleteContent from '../../components/Googlemaps/Standalonesearchbox';
import mockData from './mockData.json';
import './style.scss';
import { chunk, isEmpty } from 'lodash';


const MapBox = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMDAZA6d7NLcxPy9FLz1-4-mziC1HO9Ko&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100vh` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
      componentDidMount() {
  
      },
      componentWillReceiveProps(nextProps) {
        if(nextProps.route_directions || nextProps.routeIndex !== this.state.routeIndex) {
          const DirectionsService = new window.google.maps.DirectionsService();
          let waypoints = [];
          if(nextProps.waypoints && nextProps.waypoints.length) {
            for(var i=0; i<nextProps.waypoints.length;i++) {
              let waypoint = {};
              waypoint.location = new window.google.maps.LatLng(nextProps.waypoints[i].lat,nextProps.waypoints[i].lng);
              waypoint.stopover = true;
              waypoints.push(waypoint);
            }
          }
          if('startLat' in nextProps.route_directions && 'destLat' in nextProps.route_directions){
            DirectionsService.route({
              origin: new window.google.maps.LatLng(nextProps.route_directions.startLat, nextProps.route_directions.startLng),
              destination: new window.google.maps.LatLng(nextProps.route_directions.destLat, nextProps.route_directions.destLng),
              travelMode: window.google.maps.TravelMode.DRIVING,
              provideRouteAlternatives: true,
              optimizeWaypoints:true,
              waypoints: waypoints,
            }, (result, status) => {
              //console.log(nextProps.route_directions);
              if (status === window.google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: result,
                  routeIndex:nextProps.routeIndex,
                  showDirection:true,
                  showMarker:false,
                  //bounds:viewRouteBoxes
                },()=>{
                  this.state.handleRoutes(this.state)
                });
              } else {
                console.error(`error fetching directions ${result}`);
                this.setState({
                  directions: result,
                },()=>{
                  this.state.handleRoutes("")
                });
              }
            });
          }
        }
      },
    })
  )(props =>
   
    <GoogleMap zoom={props.zoom} center={props.center}
      //ref={props.onMapMounted}
    >
      {props.showMarker && <Marker position={props.markerPosition} />}
      {props.showDirection ? <DirectionsRenderer directions={props.directions} 
        routeIndex={props.routeIndex}/> : null}
      
      {/* {props.traceData && <Marker position={props.traceData[0]} />}
  
      {props.traceData && <Marker position={props.traceData[props.traceData.length - 1]} />}
  
      <Polyline path={props.traceData} 
        options={{
          strokeColor: "#009900",
          strokeOpacity: 1.0,
          strokeWeight: 2,
          geodesic: true
      }}></Polyline> */}
        {/* <Rectangle bounds={props.bounds} editable={false} ></Rectangle> */}
    </GoogleMap>
  );  

const containerStyle = {    width: '100%', height: '100vh'  };
const center = {    lat: 11.1271, lng: 78.6569  };

export default class Mapspage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            travelMode: 'DRIVING',  
            response: null,  
        }
        this.directionsCallback = this.directionsCallback.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.onMapLoaded = this.onMapLoaded.bind(this);
    }

    onMapClick (...args) {
        console.log('onClick args: ', args)
    }

    directionsCallback (response) {
        console.log(response);
        if (response !== null) {
          if (response.status === 'OK') {
            this.setState(() => ({  response }));
          } else {
            console.log('response: ', response)
          }
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

//        console.log(new window.google.maps.LatLng(41.8525800, -87.6514100));
    }


    onMapLoaded=(map)=>{
        console.log(map);
    }


    loadGoogleMap=(params, indxId)=>{

        let prms = params, customStyle= { width: '100%', height: '400px'}, sT = this.state;
        let centerPos = {    lat: 11.1271, lng: 78.6569  }, sourcePos = null, destinationPos = null;
        if(prms && !isEmpty(prms.centerPosition)) {   
            centerPos = { lat: Number(prms.centerPosition.lat), lng: Number(prms.centerPosition.lng) };
        }

        if(prms && !isEmpty(prms.sourceDetails)) {
            sourcePos = {
                lat: Number(prms.sourceDetails.lat),
                lng: Number(prms.sourceDetails.lng),
            }
        }

        if(prms && !isEmpty(prms.destinationDetails)) {
            destinationPos = {
                lat: Number(prms.destinationDetails.lat),
                lng: Number(prms.destinationDetails.lng),
            }
        }

        const onLoad = marker => {
            console.log('marker: ', marker);
        }

        const onMapLoaded = map => {
            const bounds = new window.google.maps.LatLngBounds();
            map.fitBounds(bounds);
            map.setMap(null)
        }

        return <React.Fragment>
            {/* center={ centerPos } */}
            {/* console.log('DirectionsRenderer onLoad map: ', map)} */}
            <GoogleMap id={'direction-example'+indxId} mapContainerStyle={ customStyle } zoom={10}  onClick={this.onMapClick} onLoad={ map => { onMapLoaded(map)  }} 
            onUnmount={map => { console.log('DirectionsRenderer onUnmount map: ', map) }}>
                {   sourcePos && <Marker onLoad={onLoad} position={sourcePos} />    }
                {   destinationPos && <Marker onLoad={onLoad} position={destinationPos} />   }
                
                ( destinationPos && sourcePos !== '' ) && (
                <DirectionsService options={{ 
                    destination: destinationPos,
                    origin: sourcePos,
                    travelMode: sT.travelMode 
                }} callback={ this.directionsCallback } 
                  onLoad={directionsService => {
					  console.log('DirectionsService onLoad directionsService: ', directionsService)
                  }}
				  onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                  }}
                />
              )

              {
                sT.response !== null && (
                <DirectionsRenderer options={{ directions: sT.response }} onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                  }} onUnmount={directionsRenderer => {
                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  }}
                />
              )
            }
            </GoogleMap>
        </React.Fragment>
    }



  render() {
        let sT = this.state;  

    return (
        <div className="maps-Container">
            <div className="containerBlock">
                <div className="contentBlock">
                    <div className="mapsBlock map-container">
                        <LoadScript googleMapsApiKey="AIzaSyBMDAZA6d7NLcxPy9FLz1-4-mziC1HO9Ko">
                        {
                            sT.mapLists && sT.mapLists.length && sT.mapLists.map((pDatas, pIndx)=>{
                                return <div className="row margin_0" key={ pIndx }>
                                        {
                                            pDatas && pDatas.length && pDatas.map((cData, cIndx)=>{
                                                return <div className="col-md-4 padding_0" key={cIndx}>
                                                        <div className={'map-container '+ pIndx + " - "+ cIndx}>
                                                            { this.loadGoogleMap(cData, pIndx+"-"+cIndx) }
                                                        </div>
                                                    {/* <p>{pIndx+ " -  "+ cIndx}</p> */}
                                                </div>
                                            })   
                                        }
                                        
                                    </div>
                            })
                        }
                        </LoadScript>
                    </div>
                </div>

            </div>

        </div>
    )
  }
}