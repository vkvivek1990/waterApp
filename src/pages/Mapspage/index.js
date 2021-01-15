import React from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';
import AutoCompleteContent from '../../components/Googlemaps/Standalonesearchbox';
import mockData from './mockData.json';
import './style.scss';
import { chunk, isEmpty } from 'lodash';

const containerStyle = {    width: '100%', height: '100vh'  };
const center = {    lat: 11.1271, lng: 78.6569  };

export default class Mapspage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            travelMode: 'DRIVING',    
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
            })
        }
    }

    Loadgooglemap=(params, indxId)=>{

        let prms = params, customStyle= { width: '100%', height: '400px'};
        let centerPos = {    lat: 11.1271, lng: 78.6569  }, sourcePos = "", destinationPos = "";
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

        return <React.Fragment>
            <GoogleMap id={'direction-example'+indxId} mapContainerStyle={ customStyle } zoom={10} center={ centerPos } onClick={this.onMapClick} onLoad={ map => { console.log('DirectionsRenderer onLoad map: ', map)}} onUnmount={map => { console.log('DirectionsRenderer onUnmount map: ', map) }}>
                {   sourcePos && <Marker onLoad={onLoad} position={sourcePos} />    }
                {   sourcePos && <Marker onLoad={onLoad} position={destinationPos} />   }
                
            </GoogleMap>
        </React.Fragment>
    }

  render() {
        let sT = this.state;  

    return (
        <div className="maps-Container">
            <div className="containerBlock">
                <div className="contentBlock">
                    <div className="mapsBlock">
                        <LoadScript googleMapsApiKey="AIzaSyBMDAZA6d7NLcxPy9FLz1-4-mziC1HO9Ko">
                        {
                            sT.mapLists && sT.mapLists.length && sT.mapLists.map((pDatas, pIndx)=>{
                                return <div className="row margin_0" key={pIndx}>
                                        {
                                            pDatas && pDatas.length && pDatas.map((cData, cIndx)=>{
                                                return <div className="col-md-4 padding_0" key={cIndx}>
                                                        <div className={'map-container '+ pIndx + " - "+ cIndx}>
                                                            { this.Loadgooglemap(cData, pIndx+"-"+cIndx) }
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