import React from "react";

const Home = (props) => {
  console.log(props)
  return (
    <React.Fragment>
      <div style={{backgroundImage:"url('./images/cover5.jpeg')", backgroundSize:"100% 100%", height:"90vh"}}>
        <div className="row" style={{margin:"0px", padding:"0px"}}>
          <div className="col-lg-5 align-items-center" style={{display:"grid", justifyContent:"center", height:"80vh"}}>
            {/* <h1 style={{ color: "#af3810"}}>Fast Food</h1> */}
            <button className="btn btn-danger" onClick={() => props.history.push("/menu")} style={{ backgroundColor: "#af3810", borderColor:"#af3810"}}>Order Now</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default Home;
