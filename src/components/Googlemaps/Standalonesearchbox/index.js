import React from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, } from "react-google-maps";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

const PlacesWithStandaloneSearchBox = compose(
  withProps({ googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMDAZA6d7NLcxPy9FLz1-4-mziC1HO9Ko&v=3.exp&libraries=geometry,drawing,places", loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => { refs.searchBox = ref; },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          this.setState({ places, });
        },
      })
    },
  })
  ,
  withScriptjs)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox ref={props.onSearchBoxMounted} bounds={props.bounds} onPlacesChanged={props.onPlacesChanged}>
      <input type="text" placeholder="Customized your placeholder" style={{ boxSizing: `border-box`, border: `1px solid transparent`, width: `240px`, height: `32px`, padding: `0 12px`, borderRadius: `3px`, boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`, fontSize: `14px`, outline: `none`, textOverflow: `ellipses`, }} />
    </StandaloneSearchBox>
    <ol>
      { props.places.map(({ place_id, formatted_address, geometry: { location } }) => <li key={place_id}> {formatted_address} {" at "} ({location.lat()}, {location.lng()}) </li>) }
    </ol>
  </div>
);

export default class AutoCompleteContent extends React.Component{

    constructor(props) {
      super(props);
      this.handlePlaces = this.handlePlaces.bind(this);
    }
  
    handlePlaces=(placeVals)=>{
      //console.log(placeVals);
      this.props.placeVals(placeVals);
    } 

    render(){
        return (
            <PlacesWithStandaloneSearchBox placeholder={this.props.placeholder} value={this.props.value} change={this.props.change} name={this.props.name} placeVals={this.handlePlaces} focus={this.props.focus} item={this.props.item} disabled={this.props.disabled} module={this.props.module}> {this.props.children} </PlacesWithStandaloneSearchBox>
        )
    }
}
  