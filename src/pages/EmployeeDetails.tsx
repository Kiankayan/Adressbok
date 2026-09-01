import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Employee } from "../types/Employee";

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
    <div>
      <Link to="/">← Tillbaka</Link>

      <img src={employee.picture.large} alt={employee.name.first} />

      <h1>
        {employee.name.first} {employee.name.last}
      </h1>

      <p>{employee.email}</p>
      <p>{employee.phone}</p>

      <p>{employee.location.city}</p>
      <p>{employee.location.country}</p>
    </div>
  );
}

export default EmployeeDetails;
