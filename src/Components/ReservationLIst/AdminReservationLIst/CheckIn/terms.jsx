import React from "react";

const TermsAndConditions = ({
  renterName,
  renterEmail,
  carMake,
  carModel,
  carYear,
  startDate,
  endDate,
  rentalRate,
  additionalServices = [],
}) => {

  const formattedStartDate = new Date(startDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  const formattedEndDate = new Date(endDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  
  return (
  <div>
    <h3>Rental Agreement</h3>
    <p>Rental Agreement Number:</p>

    <p>This Rental Agreement is entered into between Car Rental App, located at Concordia University, Montreal Canada, hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":</p>

    <p>
      1. Renter's Information:<br /><br />
      Name: {renterName}<br />
      Email Address: {renterEmail}<br />
      Driver's License Number: <input type="text"></input><br /><br />
      2. Vehicle Information:<br /><br />
      Make: {carMake}<br />
      Model: {carModel}<br />
      Year: {carYear}<br /><br />
      3. Rental Details:
    </p>

    <p>
      Rental Start Date: {formattedStartDate}<br />
      Rental End Date: {formattedEndDate}<br />
      <p>Rental Period: {formattedStartDate} - {formattedEndDate}</p>
      Rental Rate:  ${rentalRate}/hr<br />
      Additional Services (if any): {additionalServices.map((service, index) => <span key={index}>{service}, </span>)}
    </p>

    <p>4. Rental Terms and Conditions:</p>

    <p>
      The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.<br />
      The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.<br />
      The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.<br />
      The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.<br />
      The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.<br />
      The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.<br />
      The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.<br />
      The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.
    </p>

    <p>5. Indemnification:</p>

    <p>
      The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.
    </p>

    <p>6. Governing Law:</p>

    <p>
      This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of [Jurisdiction].
    </p>

    <p>7. Entire Agreement:</p>

    <p>
      This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.
    </p>

    <p>8. Signatures:</p>

    <p>The parties hereto have executed this Agreement as of the date first written above.</p>

    Rental Company:
      <br />
      Signature: <input type="text" placeholder="Signature" />
      <br />
      Print Name: <input type="text" placeholder="Print Name" />
      <br />
      Date: <input type="date" />
      <br /><br />
      
Renter:
      <br />
      Signature: <input type="text" placeholder="Signature" />
      <br />
      Print Name: <input type="text" placeholder="Print Name" />
      <br />
      Date: <input type="date" />
  </div>
);

};
export default TermsAndConditions;
