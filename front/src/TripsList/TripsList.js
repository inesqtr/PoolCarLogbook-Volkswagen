import React from 'react';
import Select from 'react-select';
import Trip from '../Trip/Trip';
import Calendar from '../Calendar';
import './TripList.css';


// handleBest = () => {
//   const filtered = this.state.games.filter(best => best.rating > 4.5)
//   this.setState({ 
//     bestGames: filtered,
//     showAll: !this.state.showAll
//   })
// }

{/* <button onClick={this.handleBest}>{buttonText}</button> */ }

const TripsList = ({ isNew, trips, filterByDriver, isFiltered, tripsByDriver, handleSelectTrip }) => {
  const tripsList = isFiltered ? tripsByDriver : trips
  const options = trips.map((trip) => ({ value: trip.driver, label: trip.driver }));
  
  return (
    <>
      <Calendar
        isNew={isNew}
        trips={trips}
      />

      <div>
        <label>Search by Driver:</label>
        <Select
          classNamePrefix="select"
          options={[{value:'all', label: 'All'}, {options} ]}
          onChange={(e) => filterByDriver(e)}
        />
      </div>

      <table className="tftable" border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
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
