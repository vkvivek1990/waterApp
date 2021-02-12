import React from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from "react-google-maps";
import mockData from './mockData.json';
import { chunk, isEmpty } from 'lodash';
import './style.scss';
import Icons from '../../components/Icons'; 
//import * from '../../assets/vehicle_images';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('../../assets/vehicle_images', '')] = r(item); });
  return images;
 // return r.keys().map(r);
}

const images = importAll(require.context('../../assets/vehicle_images', false, /\.(png|jpe?g|svg)$/));

console.log(images);

const directionServiceFunctionCall = (props)=>{
  let pR = props, sourceDet = null, destinationDet = null, vehiclePos = null;
  console.log(props.allData);
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
      vehiclePos.titleTxt = pR.allData.vehicleDetails.address;
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
      return {
        directions: result, 
        vehiclePos: vehiclePos,
      }
      // this.setState({
      //   directions: result,
      //   vehiclePos: vehiclePos,
      // });
    } else {
      console.error(`error fetching directions ${result}`);
    }
  });
}


const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMDAZA6d7NLcxPy9FLz1-4-mziC1HO9Ko&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `120px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() { 
      console.log(this.props);
    }, 
    componentDidUpdate(prevProps, prevState) {
      console.log(this.props);
      console.log(prevProps);
      console.log(prevState);
      if(prevProps.allData.uId!==this.props.allData.uId) {
      }
      // let dd = directionServiceFunctionCall(this.props);
      // // if( dd && dd.directions && dd.vehiclePos) {
      // //   this.setState({
      // //     directions: dd.directions, 
      // //     vehiclePos: dd.vehiclePos,
      // //   });
      // // }
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
          vehiclePos.titleTxt = pR.allData.vehicleDetails.address;
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
    componentWillMount() {
      //let dd = directionServiceFunctionCall(this.props);
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
          vehiclePos.titleTxt = pR.allData.vehicleDetails.address;
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
      // if( dd && dd.directions && dd.vehiclePos) {
      //   this.setState({
      //     directions: dd.directions, 
      //     vehiclePos: dd.vehiclePos,
      //   });
      // }
    },
    componentWillReceiveProps(nextProps) {
      
    }
  })
)(
  props =>
  <GoogleMap defaultZoom={8} defaultCenter={ new window.google.maps.LatLng(11.1271, 78.6569) } >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    { props.vehiclePos && <Marker position={ props.vehiclePos } title={props.vehiclePos.titleTxt} icon={images['./07.png'].default} />}
  </GoogleMap>
);

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapClicked: false,
      mapClickedData: null,
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
        let tMps = jsonData.totMaps, 
            oDts = jsonData.overViewDatas;

     //   let setPerCnt = Math.floor(tMps.length/3);             
        let newArr = chunk(tMps, 2);
        
        console.log(newArr);
        this.setState({
            mapLists: newArr,
            allMapDt: tMps,
            oViewDt: oDts,
        });
    }
}

mapClicked=(datas)=>{
  console.log(datas);
  this.setState({
    mapClicked: true,
    mapClickedData: datas,
  });
}


  render() {
    let sT = this.state;
    
    return (
    <React.Fragment>
    
    <div className="maps-Container">
    <div className={`containerBlock ${ sT.mapClicked ? 'mapClicked' : 'notClicked' }`}>
        <div className="contentBlock">
          <div className="allBody">
          <div className="mapsContainer">
            <p className="shipmentClass"><strong>Shipment Details</strong></p>
            <div className="mapsBlock map-container">
              {
                sT.mapLists && sT.mapLists.length && sT.mapLists.map((pDatas, pIndx)=>{
                  return <div className="rowClass margin_0 text-555" key={ pIndx }>
                          {
                              pDatas && pDatas.length && pDatas.map((cData, cIndx)=>{
                                  let bgColor = "#eee";
                                  if(cData && cData.iconColor) {
                                    bgColor = cData.iconColor;
                                  }
                                  return <div className="colClass padding_0" key={ cIndx } >
                                            <div className={'map-container '+ pIndx + " - "+ cIndx}>
                                              <p className="mapHeadLevel level_1" onClick={()=>this.mapClicked(cData)}><span className="text-left">Shipment { cData.uId }</span> <span className="iconwithText text-right float-right"><span className="icon" style={{background: bgColor }}><Icons>local_shipping</Icons></span><span className="iconTxt">{ cData.vehicleStatus }</span></span></p>
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
          {
            sT.mapClicked && sT.mapClickedData && 
            <div className="rightSideBar">
              <div className="shipmentCont">
                <div className="shipmentContainer">
                  <div className="shipmentBlock">
                    <div className="headLevel_1">
                      {/* <p className="background-4599f3"> Shipment { sT.mapClickedData.uId }</p> */}
                      <p className="mapHeadLevel level_1 background-4599f3" ><span className="text-left">Shipment { sT.mapClickedData.uId }</span> <span className="iconwithText text-right float-right font-12 "><span className="icon"><Icons>local_shipping</Icons></span><span className="iconTxt">{ sT.mapClickedData.vehicleStatus }</span></span></p>
                    </div>
                    <div className="mapBlock">
                      <MapWithADirectionsRenderer allData={sT.mapClickedData} />
                    </div>              
                    
                  </div>
                </div>
              </div>
            </div>
          }
          </div>

            <div className="row">
              <div className="col-md-3">
                <div className="boxes box1">
                  <div className="subHeadLevel">
                  <div className="d-flex">
                    <div className="flexD-1">
                    <p className="boxHead"><strong>Driver Details</strong></p>
                    </div>
                    <div className="flexD-1">
                    <p className="text-right text-upper makeHyperLinkColor cursor-pointer text-underLine">View All Details</p>
                    </div>
                  </div>
                  </div>
                  <div className="driverList">
                    {
                      sT.allMapDt && sT.allMapDt.length && sT.allMapDt.map((data, indx)=>{
                        let drCont = "";
                        if(data && data.driverDetails) {
                          drCont = data.driverDetails;
                        }
                        return <React.Fragment>
                          { drCont && 
                        <div className="driverContainer">
                        <div className="d-flex">
                          <div className="flexD-1">
                            <div className="d-flex">
                              {
                                drCont && drCont.driverImg && <span className="imgClass"> <img src={drCont.driverImg} alt="driver" /></span>
                              }
                              <p className="font-14">
                                <span className="driverName"><strong>{ drCont.name } </strong></span><br />
                                <span className=""><span className="font-16"><Icons className="font-16">directions_bus</Icons></span>{ drCont.vehicleNo }</span><br />
                                <span className=""><span className="font-16"><Icons className="font-16">phone</Icons></span>{ drCont.mobileNo }</span>
                              </p>
                              <p><span className=""></span></p>
                            </div>
                          </div>
                          <div className="flexD-1">
                            <p className="text-right makeHyperLinkColor cursor-pointer text-underLine font-14">More Details</p>
                          </div>
                        </div>
                      </div>
                      }
                      </React.Fragment>
                      })
                    }
                      
                    </div>
                </div>
                
              </div>
              <div className="col-md-3">
                <div className="boxes box2">
                  <div className="subHeadLevel">
                    <div className="d-flex">
                      <div className="flexD-1">
                        <p className="boxHead"><strong>Over View</strong></p>
                      </div>
                      <div className="flexD-1">
                        <p className="text-right"><strong>January 2021</strong></p>
                      </div>
                    </div>
                  </div>

                  <div className="overViewBlock">
                    <div className="overViewContainer">
                      {
                        sT.oViewDt && sT.oViewDt.length && sT.oViewDt.map((data, indx)=>{
                          return <div className="overViewCont">
                                  <div className="d-flex">
                                    <div className="flexD-1">
                                      <p className="d-flex padding-10 margin-10 overvievPara"><span className={`borderRadius-6 padding-20 background-${data.iconColor}`}><Icons className="vmiddle font-35">{data.icon}</Icons></span>
                                      <span className="">{data.count}</span><br/>
                                      <span className="">{data.status}</span>
                                      </p>
                                    </div>
                                  </div>
                            </div>;
                        })
                      }
                    </div>
                  </div>

                </div>
                
              </div>
              <div className="col-md-6">
                <div className="boxes box3">
                  <div className="subHeadLevel">
                    <div className="d-flex">
                      <div className="flexD-1">
                        <p className="boxHead"><strong>Trip Details</strong></p>
                      </div>
                      <div className="flexD-1">
                        <p className="text-right text-upper text-underLine text-21a9e4">View All Details</p>
                      </div>
                    </div>
                  </div>
                  <div className="orderDetailsList">
                    {
                      sT.allMapDt && sT.allMapDt.length && sT.allMapDt.map((pDatas, pIndx)=>{
                        return <div className="orderLists">
                                <div className="allOrders">
                                  <div className="subHead2Block">
                                    <p className="subHeadLevel2"><strong>Order Number / Track Number</strong></p>  
                                  </div>
                                  <div className="d-flex">
                                    {
                                      pDatas.tripDetails && pDatas.tripDetails.length && pDatas.tripDetails.map((cData, cIndx)=>{
                                        return cData.display && <div className="timeBlock flexD-1">
                                                  <p className="label" style={{"color": cData.labelColor}}>{ cData.label }</p>
                                                  <p className="value"><span className="iconCont" style={{"color": cData.labelColor}}><Icons>{ cData.icon }</Icons></span> { cData.value }</p>
                                              </div>
                                      })
                                    }
                                  </div>
                                  {
                                    pDatas.driverDetails &&
                                    <div className="driverInfo">
                                      <p className="driverDetails mb-0">Driver Details</p>
                                      <div className="d-flex driverDet">
                                        <div className="flexD-1">
                                          { pDatas.driverDetails.name && <p><span className="vmiddle"><Icons className="font-16">person</Icons></span> { pDatas.driverDetails.name }</p> }                                   
                                        </div>
                                        <div className="flexD-1">
                                          { pDatas.driverDetails.mobileNo && <p><span className="vmiddle"><Icons className="font-16">call</Icons></span>{ pDatas.driverDetails.mobileNo }</p> }                                   
                                        </div>
                                        <div className="flexD-1 text-right">
                                          <p>More Details</p>
                                        </div>
                                        
                                      </div>
                                    </div>
                                  }
                                </div>
                              </div>
                      })
                    }
                    
                  </div>
                </div>
                
              </div>
            </div>
        </div>
    </div>
    </div>
    </React.Fragment>
    )
  } 

}

