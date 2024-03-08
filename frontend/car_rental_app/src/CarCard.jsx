import React from "react";

const CarCard = ({ car1 }) => {


return (

    <div className='car'>
      <div>
        <p>{car1.year}</p>
      </div>
      <div>
        <img src={car1.poster !== "NA" ? car1.poster : 'https://via.placeholder.com/400'} alt = {car1.make}/>
      </div>
      <div>
        <span>
          {car1.price}
        </span>
        <h3>{car1.make}</h3>
      </div>
      
    </div>

);

}

export default CarCard; 