import React from 'react';
import Select from 'react-select';
import Trip from '../Trip/Trip';
import './TripList.css';

const TripsList = ({ trips, filterByDriver, isFiltered, tripsByDriver, handleSelectTrip }) => {
  //get trips array to render on list
  const tripsList = isFiltered ? tripsByDriver : trips

  //get all unique drivers in trips and render their names in the select
  const options = trips
    .reduce((acc, curr) => {
      if (acc.includes(curr.driver)) return acc;
      return [
        ...acc,
        curr.driver
      ]
    }
      ,
      []
    )
    .sort()
    .map(
      driver => ({ value: driver, label: driver }));

  return (
    <>
      <div>
        <label>Search by Driver:</label>
        <Select
          classNamePrefix="select"
          options={[{ value: 'all', label: 'All' }, { options }]}
          onChange={(e) => filterByDriver(e)}
        />
      </div>

      <table className="tftable" border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time Start</th>
            <th>Time Finish</th>
            <th>Name</th>
            <th>Destination</th>
            <th>Edit</th>
          </tr>
        </thead>
        {tripsList.map((trip) => (
          <Trip
            handleSelectTrip={handleSelectTrip}
            key={trip.id}
            trip={trip}
          />
        ))}
      </table>
    </>
  )
};


export default TripsList;
