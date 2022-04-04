import {React , useState } from 'react';
import CityList from './cityapi.jsx';
import './index.css';
var axios = require("axios").default;



function App() {

  const [cityname,setcityname] = useState('');
  const [row, setrow] = useState([{}]);


  const handleChange = (e) => {
    setcityname(e.target.value);
    document.querySelectorAll('table')[0].style.visibility = 'hidden';
    setrow([{}]);
  }

  const handleClick = (e) => {
    document.querySelectorAll('.loader-wrapper')[0].style.visibility = 'visible';

    var options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      params: {namePrefix: cityname},
      headers: {
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        'x-rapidapi-key': '4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe'
      }
    };

    axios.request(options).then(function (response) {
    	const responseArr = response.data.data;
      console.log(response.data.data.length);
      document.querySelectorAll('.loader-wrapper')[0].style.visibility = 'hidden';


      if (cityname.length === 0 || response.data.data.length === 0) {
        console.log("No result found");
        document.querySelectorAll('.status h1')[0].style.visibility = 'visible';
        document.querySelectorAll('.status h1')[0].innerText = 'No result found';
      }

      else {
        document.querySelectorAll('table')[0].style.visibility = 'visible';
        document.querySelectorAll('.status h1')[0].style.visibility = 'hidden';
        responseArr.forEach((item, i) => {
          console.log(item);
          setrow(
            function (prevItems) {

              return (
                [...prevItems, {
                  name : item.city ,
                  country : item.country ,
                  countryCode : item.countryCode,
                  ids : item.id
                }]
              )

            }
          );
          console.log(row);
        });

      }
    }).catch(function (error) {
    	console.error(error);
      document.querySelectorAll('.status h1')[0].style.visibility = 'visible';
      document.querySelectorAll('.status h1')[0].innerText = 'OOPS. Something Went Wrong!';
    });


    setcityname('');
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleClick}>
        <div className="inputBox">
          <input type="text" name="searchbar" placeholder="Search Places..." value={cityname} onChange={handleChange} />
          <button type="button" role="submit" name="searchsubmit" onClick={handleClick}>Submit</button>
        </div>
      </form>
      <div className="loader-wrapper">
        <div className="loader"></div>
        <div className="loader"></div>
        <div className="loader"></div>
      </div>
      <table>
        <tr className="headingRow">
          <th>Place Name</th>
          <th>Country</th>
          <th>Country Flag </th>
        </tr>
        {row.map(
              function (items,index) {
                if (index > 0) {
                  return <CityList
                            key = {items.id}
                            name = {items.name}
                            country = {items.country}
                            countrycode = {items.countryCode}
                          />
                }
              }
            )}
      </table>
      <div className="status">
        <h1></h1>
      </div>
    </div>

  )

}

export default App;
