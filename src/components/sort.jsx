import React from "react";

const Sort = (props) => {
    // console.log(props.products)
  return (
    <React.Fragment>
      <button className="btn btn-secondary" style={{borderRadius:"50%", margin:"10px"}} onClick={props.sortedByAsc}><i className="fas fa-arrow-up"></i></button>
      <button className="btn btn-secondary" style={{borderRadius:"50%"}} onClick={props.sortedByDesc}><i className="fas fa-arrow-down"></i></button>
    </React.Fragment>
  );
};

export default Sort;
