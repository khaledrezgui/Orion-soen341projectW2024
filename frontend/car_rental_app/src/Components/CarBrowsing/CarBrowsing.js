import React, { useState, useEffect } from "react";
import CarCard from "./CarCard";
import SearchIcon from '../../pictures/search.svg';
import "./CarBrowsing.css";
import axios from 'axios';

const CarBrowsing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedCode, setSelectedCode] = useState("");

const [filterType, setFilterType] = useState('');
const [filterSize, setFilterSize] = useState(0); // 0 indicates no filter applied
const [filterYear, setFilterYear] = useState(0); // Similarly, 0 for no filter


  // Assuming codes are fetched or defined here
  const [codes, setCodes] = useState({
    postalCodes: [
      { code: 'H3Z 2Y7', nearestBranchId: '6603983fe8160304628dd514' },
      { code: 'H3S 2L5', nearestBranchId: '66039848e8160304628dd515' },
      { code: 'H4B 1R6', nearestBranchId: '6603986ce8160304628dd517' }
    ],
    airportCodes: [
      { code: 'YUL', nearestBranchId: '6603983fe8160304628dd514' },
      { code: 'YMX', nearestBranchId: '66039848e8160304628dd515' }
    ]
  });
  const [selectedBranchObject, setSelectedBranchObject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchesResponse = await axios.get('/branches');
        setBranches(branchesResponse.data);
        const carsResponse = await axios.get('/cars');
        setCars(carsResponse.data);
        setAllCars(carsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const branch = branches.find(branch => branch._id === selectedBranch);
    setSelectedBranchObject(branch);
  }, [selectedBranch, branches]);

  const handleCodeChange = (selectedCode) => {
    const foundCode = [...codes.postalCodes, ...codes.airportCodes].find(code => code.code === selectedCode);
    if (foundCode) {
      setSelectedBranch(foundCode.nearestBranchId);
      setSelectedCode(selectedCode);
      // Filter cars based on the selected branch
      const filteredCars = allCars.filter(car => car.branchId === foundCode.nearestBranchId);
      setCars(filteredCars);
    }
  };

  useEffect(() => {
    let filteredCars = allCars;

    if (searchTerm) {
      filteredCars = filteredCars.filter(car => `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filterType) {
      filteredCars = filteredCars.filter(car => car.type === filterType);
    }
    if (filterSize) {
      filteredCars = filteredCars.filter(car => car.seats === filterSize);
    }
    if (filterYear) {
      filteredCars = filteredCars.filter(car => car.year === filterYear);
    }
    if (selectedBranch) {
      filteredCars = filteredCars.filter(car => car.branchId === selectedBranch);
    }

    setCars(filteredCars);
  }, [searchTerm, filterType, filterSize, filterYear, selectedBranch, allCars]);

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType('');
    setFilterSize(0);
    setFilterYear(0);
    setSelectedBranch('');
    setSelectedCode('');
  };

  return (
    <div className="carbrowsing">
      <h1>Car Rental App</h1>
      <div className="search-container">
        <div className="search-input">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for cars"
          />
          <img src={SearchIcon} alt="search" onClick={() => handleCodeChange(searchTerm)} />
        </div>
            <select className="dropdown-select" onChange={(e) => handleCodeChange(e.target.value)}>
              <option value="">Select Postal Code or Airport</option>
              {codes.postalCodes.map((code) => (
                <option key={code.code} value={code.code}>{`Postal Code: ${code.code}`}</option>
              ))}
              {codes.airportCodes.map((code) => (
                <option key={code.code} value={code.code}>{`Airport Code: ${code.code}`}</option>
              ))}
            </select>
          </div>
          <div className="selected-branch">
            <h2>Selected Branch: {selectedBranchObject ? selectedBranchObject.name : 'None selected'}</h2>
          </div>
              <div className="filters">
          <select className="dropdown-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Convertible">Convertible</option>
            <option value="Coupe">Coupe</option>
            <option value="Sedan">Sedan</option>
            {/* Add more types as needed */}
          </select>

      <select className="dropdown-select" value={filterSize} onChange={e => setFilterSize(Number(e.target.value))}>
        <option value="0">Any Size</option>
        <option value="2">2 Seats</option>
        <option value="4">4 Seats</option>
        <option value="5">5 Seats</option>
        <option value="7">7 Seats</option>
        {/* Add more sizes as needed */}
      </select>

      <input 
        className="dropdown-select" // Assuming you have CSS that makes inputs and selects look similar
        type="number" 
        value={filterYear === 0 ? '' : filterYear}
        onChange={e => setFilterYear(Number(e.target.value))}
        placeholder="Year"
      />
    </div>

    <button onClick={clearFilters} className="dropdown-select clear-filters-btn">Clear Selection</button>
    
      <div className="container">
        {cars.length > 0 ? (
          cars.map((car, index) => <CarCard key={index} car={car} />)
        ) : (
          <div className="empty">
            <h2>No cars found for the selected branch</h2>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default CarBrowsing;
