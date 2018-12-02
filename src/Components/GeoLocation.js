
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

var clientId = "PAPO1BILOJMRUU3S1ZHX2HXIAM4MVOPZTP0OKGFNXEZJDJ4Z";
var secretId = "4CA52KHSLVVXFN1DY0LF1LEP5HDYRPNIWOI0Q4FIU4R4C2MH";




export default class GeoLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coords: null,
      client_address: [],
    };
  }

  componentDidMount() {
    this.setPosition();
  }

  checkstate = () => {
    console.log(this.state);
  }


  showlocation = () => {
    const { coords, client_address } = this.state
    // console.log(coords.latitude, coords.longitude)
    fetch('https://api.foursquare.com/v2/venues/search?client_id=' + clientId + '&client_secret=' + secretId + '&v=20180323&limit=1&ll=' + coords.latitude + "," + coords.longitude)
      .then((response) => {
        return response.json();
      }).then((data) => {
        // console.log(data);
        fetch('https://api.foursquare.com/v2/venues/' + data.response.venues[0].id + '?client_id=' + clientId + '&client_secret=' + secretId + '&v=20180323&limit=1&ll=' + coords.latitude + "," + coords.longitude)
          .then((res) => { return res.json(); })
          .then((address) => {
            // console.log(address);
            client_address.push(address.response.venue.location);
            localStorage.setItem('client_address', JSON.stringify(client_address));
            // document.getElementById('set_location_btn').style.display = "none";
            // document.getElementById('map').style.display = "none";
            // document.getElementById('sucess_para').style.display = "block";
          })
      })
      .catch(function (error) {
        console.log(error.type)
        console.log(error.detail)
      });
  }


  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ coords: position.coords })
    });
  }

  updateCoords = ({ latitude, longitude }) => {
    this.setState({ coords: { latitude, longitude } })
  }

  render() {
    const { coords } = this.state;

    return (<div>
      <div style={{ margin: "60px" }} >
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Police Dashboard</h2>
        {coords &&
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            coords={coords}
            updateCoords={this.updateCoords}
          />
        }
      </div>

      {/* <button onClick={this.checkstate}>CHECK STATE</button> */}
      <h5 style={{ display: "none" }} id="sucess_para">your location has been successfully submitted</h5>
      {/* <button onClick={this.showlocation} id="set_location_btn">Set Location</button>
      <button onClick={this.showlocation} id="set_location_btn"></button> */}

    </div>)
  }

}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >
    {props.isMarkerShown &&
      <Marker
        position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
        draggable={true}
        onDragEnd={position => {
          props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
          // console.log(position.latLng.lat(), position.latLng.lng())
        }}
      />}
  </GoogleMap>
))





















///////////////////old map


// export default class GeoLocation extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       url: 'https://image.maps.api.here.com/mia/1.6/mapview?w=600&h=300&z=10&t=5&poitxs=16&poitxc=black&poifc=yellow',
//       points: [],

//     }
//   }

//   // Helper function to format list of points

//   getPOIList() {
//     if (this.state.points.length > 0) {
//       let param = '&poi=';
//       for (var poi in this.state.points) {
//         param += poi.latitude + ',' + poi.longitude;
//       }
//       return param;
//     }

//     return '';
//   }


//   componentDidMount() {
//     this.setPosition();
//   }

//   checkstate = () => {
//     console.log(this.state);
//   }


//   showlocation = () => {
//     const { coords, client_address } = this.state
//     // console.log(coords.latitude, coords.longitude)
//     fetch('https://api.foursquare.com/v2/venues/search?client_id=' + clientId + '&client_secret=' + secretId + '&v=20180323&limit=1&ll=' + coords.latitude + "," + coords.longitude)
//       .then((response) => {
//         return response.json();
//       }).then((data) => {
//         // console.log(data);
//         fetch('https://api.foursquare.com/v2/venues/' + data.response.venues[0].id + '?client_id=' + clientId + '&client_secret=' + secretId + '&v=20180323&limit=1&ll=' + coords.latitude + "," + coords.longitude)
//           .then((res) => { return res.json(); })
//           .then((address) => {
//             // console.log(address);
//             client_address.push(address.response.venue.location);
//             localStorage.setItem('client_address', JSON.stringify(client_address));
//             // document.getElementById('set_location_btn').style.display = "none";
//             // document.getElementById('map').style.display = "none";
//             // document.getElementById('sucess_para').style.display = "block";
//           })
//       })
//       .catch(function (error) {
//         console.log(error.type)
//         console.log(error.detail)
//       });
//   }


//   setPosition() {
//     navigator.geolocation.getCurrentPosition(position => {
//       this.setState({ coords: position.coords })
//     });
//   }

//   updateCoords = ({ latitude, longitude }) => {
//     this.setState({ coords: { latitude, longitude } })
//   }

//   render() {
//     const { coords } = this.state;

//     return (<div>
//       <div style={{ margin: "60px" }} >
//         <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Police Dashboard</h2>
//         {coords &&
//           <MyMapComponent
//             isMarkerShown
//             googleMapURL={this.state.url
//               + '&app_id=' + this.props.app_id
//               + '&app_code=' + this.props.app_code
//               + this.getPOIList()
//             }
//             loadingElement={<div style={{ height: `100%` }} />}
//             containerElement={<div style={{ height: `100vh` }} />}
//             mapElement={<div style={{ height: `100%` }} />}
//             coords={coords}
//             updateCoords={this.updateCoords}
//           />
//         }
//       </div>

//       {/* <button onClick={this.checkstate}>CHECK STATE</button> */}
//       <h5 style={{ display: "none" }} id="sucess_para">your location has been successfully submitted</h5>
//       {/* <button onClick={this.showlocation} id="set_location_btn">Set Location</button>
//       <button onClick={this.showlocation} id="set_location_btn"></button> */}

//     </div>)
//   }

// }

// const MyMapComponent = withScriptjs(withGoogleMap((props) =>
//   <GoogleMap
//     defaultZoom={14}
//     center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
//   >
//     {props.isMarkerShown &&
//       <Marker
//         position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
//         draggable={true}
//         onDragEnd={position => {
//           props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
//           // console.log(position.latLng.lat(), position.latLng.lng())
//         }}
//       />}
//   </GoogleMap>
// ))


