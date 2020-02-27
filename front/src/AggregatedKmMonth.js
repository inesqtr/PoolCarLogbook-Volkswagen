import React from 'react';
import './AggregatedKmMonth.css';

const AggregatedKmMonth = ({ kmMonth }) => {

   const renderTableData = () => {
      return kmMonth.map((date, i) => {
         const { monthYear, km } = date //destructuring
         return (
            <tr key={i}>
               <td>{monthYear.toString().substring(0,4)}</td>
               <td>{monthYear.toString().substring(4)}</td>
               <td>{km} km</td>
            </tr>
         )
      })
   }

   return (
      <section >
      {console.log(kmMonth)}
         <h2>Mileage per month</h2>
         
         <table className='mileageTable'>
            <tbody>
               <tr><th>Year</th><th>Month</th><th>Total mileage</th></tr>
               {renderTableData()}
            </tbody>
         </table>

      </section>
  );
}
export default AggregatedKmMonth;

