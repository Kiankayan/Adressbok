import { useParams } from "react-router-dom";

function EmployeeDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Detaljer om anställd</h1>
      <p>Employee ID: {id}</p>
    </div>
  );
}

export default EmployeeDetails;
