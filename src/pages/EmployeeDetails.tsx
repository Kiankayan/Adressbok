import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Employee } from "../types/Employee";
import "./EmployeeDetails.css";

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10&seed=adressbok")
      .then((response) => response.json())
      .then((data) => {
        const foundEmployee = data.results.find(
          (employee: Employee) => employee.login.uuid === id,
        );

        setEmployee(foundEmployee);
      });
  }, [id]);

  if (!employee) {
    return <p>Laddar...</p>;
  }

  return (
    <div className="employee-page">
      <div className="employee-container">
        <Link to="/" className="back-link">
          ← Tillbaka
        </Link>

        <div className="employee-card">
          <img src={employee.picture.large} alt={employee.name.first} />

          <h1>
            {employee.name.first} {employee.name.last}
          </h1>

          <p>
            <strong>E-post:</strong> {employee.email}
          </p>
          <p>
            <strong>Telefon:</strong> {employee.phone}
          </p>
          <p>
            <strong>Stad:</strong> {employee.location.city}
          </p>
          <p>
            <strong>Land:</strong> {employee.location.country}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
