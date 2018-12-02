import React, { Component } from "react";
import GeoLocation from "./Components//GeoLocation";
import './App.css'
import SignUpPage from "./Components/Signup";
import traffic from "./images/traffic.png"
import swal from 'sweetalert';
import { Content, Header, Navigation, Drawer, Layout, HeaderRow, Textfield, Footer, FooterDropDownSection, FooterLinkList, FooterSection } from 'react-mdl'
class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: "",
      lan: "",
      Venes: [],
      search: "",
      isPoliceLogin: false,
      id: "",
      pass: ""
    }
  };

  getData = (id, pass) => {
    // console.log("id=" + id, "pass=" + pass);
    if (id === "admin" && pass === "admin") {
      this.setState({ isPoliceLogin: true });
    }
    else {
      alert("please enter correct password")
    }
  }
  componentDidMount = () => {
    this.getLocation()
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(response => {
      // console.log(response.coords.latitude+','+response.coords.longitude);
      this.setState({
        lat: response.coords.latitude,
        lan: response.coords.longitude
      }, () => {
        this.getVeneus();
      });
    });
  }

  getVeneus = (query) => {

    var clientId = "PAPO1BILOJMRUU3S1ZHX2HXIAM4MVOPZTP0OKGFNXEZJDJ4Z";
    var secretId = "4CA52KHSLVVXFN1DY0LF1LEP5HDYRPNIWOI0Q4FIU4R4C2MH";

    fetch('https://api.foursquare.com/v2/venues/explore?ll=' + this.state.lat + "," + this.state.lan + '&client_id=' + clientId + '&client_secret=' + secretId + '&v=20182710' + '&' + query)
      .then((response) => {
        // console.log(response);
        return response.json();
      }).then((data) => {
        // console.log(data.response.groups[0].items);
        this.setState({ Venes: data.response.groups[0].items });
      })

  }

  meetReq(index) {
    console.log(index);
  }


  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position.coords);
          this.setState(prevState => ({
            currentLatLng: {
              ...prevState.currentLatLng,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }))
        }
      )
    } else {
      // error => console.log(error)
    }
  }

  redClicked(name) {
    swal("Traffic Stopped!", "You please wait" + name + "is stopped for 10min", "danger")
    // onClick={() => swal("Traffic flow Allowed!", "from" + item.veneue.name, "success")}
    // onClick={() => swal("Traffic flow Allowed!", "", "success")}
  }

  greenClicked(name) {
    // swal("Traffic Stopped!", "You please wait" + name + "is stopped for 10min", "error")
    swal("Traffic flow Allowed!", "from position " + name+"", "success")
  
  // onClick={() => swal("Traffic flow Allowed!", "", "success")}
}

notiClicked(name) {
  // onClick={() => swal("Traffic flow Allowed!", "from" + item.veneue.name, "success")}
  // onClick={() => swal("Traffic flow Allowed!", "", "success")}
}

renderPoliceDashboard() {
  const { Venes } = this.state;

  return (
    <div>
      <div >
        <GeoLocation app_id="LRPmFfziO59Zxz1l3Uz2" app_code="u5na03-FeNTyqHFE1C5nwg" />
      </div>
      <br /> <br />
      <div style={{ overflowX: 'auto', width: "80%", marginTop: "100px", textAlign: "center", margin: "120px" }}>
        <table>
          <tr>
            <th>S#no </th>
            <th>Location Name</th>
            <th>Location Address</th>
            <th>Is red alert here</th>
            <th>Control Signals</th>
          </tr>
          {Venes.map((item, index) => {
            console.log(item);
            return (
              <tr>
                <td>{index}</td>
                <td>{item.venue.name}</td>
                <td>{item.venue.location.address}</td>
                <td>True</td>
                {/* <td>{item.venue.address}</td> */}
                <td>
                  <button style={{ backgroundColor: "red" }} onClick={() => this.redClicked(item.venue.name)} className="button button5">red</button>
                  <button style={{ backgroundColor: "green" }} onClick={() => this.greenClicked(item.venue.name)} className="button button5">green</button>
                  <button style={{ backgroundColor: "purple" }} onClick={() => this.notiClicked(item.venue.name)} className="button button5">send alert</button>

                </td>
              </tr>

            )
          })}
        </table>
      </div>
    </div>
  )
}


renderSignUp() {

  return (
    <div style={{ width: "100%", position: "relative", top: "-1vh", left: "150px" }}>
      <img src={traffic} width={"600px"} height={"500px"} style={{ float: "right", position: "relative", right: "400px" }} />
      <SignUpPage getData={this.getData} />
    </div>
  );

}
// return (
//   <div style={{ width: '70%', margin: '30px',border:"2px solid red" }}>


//   </div>
// )

render() {
  const { Venes, isPoliceLogin } = this.state;

  // const paperStyle = { padding: "0px", margin: "0px" };
  // const { post_obj } = this.state;
  return (
    <div>

      <Layout>
        <Header waterfall>
          <HeaderRow title="Traffic Controlling System ">
            <Textfield
              value=""
              onChange={() => { }}
              label="Search2"
              expandable
              expandableIcon="search"
            />
          </HeaderRow>
          <HeaderRow>
            <Navigation>
              <a href="#">Red Alert Areas</a>
              <a href="#">Send Notification</a>
              {/* <a href="#">Link</a>
                <a href="#">Link</a> */}
            </Navigation>
          </HeaderRow>
        </Header>
        <Drawer title="Title">
          <Navigation>
            <a href="#">Red Alert Areas</a>
            <a href="#">Send Notification</a>
          </Navigation>
        </Drawer>
        <Content>
          <br /><br />
          <div>
            {isPoliceLogin == true && this.renderPoliceDashboard()}
          </div>
          <div>
            {isPoliceLogin == false && this.renderSignUp()}
          </div>
          {/* {isPoliceLogin == false && this.renderUserDashboard()} */}
          <br /><br />
          <Footer size="mega">
            <FooterSection type="middle">
              <FooterDropDownSection title="Features">
                <FooterLinkList>
                  <a href="#">About</a>
                  <a href="#">Terms</a>
                  <a href="#">Partners</a>
                  <a href="#">Updates</a>
                </FooterLinkList>
              </FooterDropDownSection>
              <FooterDropDownSection title="Details">
                <FooterLinkList>
                  <a href="#">Specs</a>
                  <a href="#">Tools</a>
                  <a href="#">Resources</a>
                </FooterLinkList>
              </FooterDropDownSection>
              <FooterDropDownSection title="Technology">
                <FooterLinkList>
                  <a href="#">How it works</a>
                  <a href="#">Patterns</a>
                  <a href="#">Usage</a>
                  <a href="#">Products</a>
                  <a href="#">Contracts</a>
                </FooterLinkList>
              </FooterDropDownSection>
              <FooterDropDownSection title="FAQ">
                <FooterLinkList>
                  <a href="#">Questions</a>
                  <a href="#">Answers</a>
                  <a href="#">Contact Us</a>
                </FooterLinkList>
              </FooterDropDownSection>
            </FooterSection>
            <FooterSection type="bottom" logo="Title">
              <FooterLinkList>
                <a href="#">Help</a>
                <a href="#">Privacy & Terms</a>
              </FooterLinkList>
            </FooterSection>
          </Footer>
          {/* <div className="page-content" >
            </div> */}
        </Content>
      </Layout>
    </div >
  );
}
}

export default App;





