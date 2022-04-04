import {React , useState } from 'react';
var axios = require("axios").default;


function CityList(props) {

  return (
      <tr>
        <td>{props.name}</td>
        <td>{props.country}</td>
        <td><img src= {"https://countryflagsapi.com/png/" + props.country}/></td>
      </tr>
  )

}

export default CityList;

// <td><img src= {"https://countryflagsapi.com/png/" + props.country}/></td>
