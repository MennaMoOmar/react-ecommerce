import React from "react";

const About = (props) => {
  return (
    <React.Fragment>
      <div className="row" style={{margin:"0px", padding:"0px"}}>
        <div className="col-lg-6" style={{backgroundImage:"url('./images/about.jpeg')",backgroundSize:"100% 100%", height:"90vh"}}></div>
        <div className="col-lg-6 text-center d-flex" style={{flexDirection:"column", justifyContent:"center", backgroundColor:"#e7e5e0"}}>
          <h2 style={{color:"#af3810", marginBottom:"2rem"}}>About Us</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque doloremque repellendus in ratione reiciendis excepturi asperiores quaerat nisi. Optio, sunt dicta tempore labore obcaecati praesentium dolor enim? Ipsam, ipsa iusto!</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
