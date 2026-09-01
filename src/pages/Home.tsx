import { useEffect, useState } from "react";
import type { Employee } from "../types/Employee";

function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => setEmployees(data.results));
  }, []);

  return (
    <div>
      <h1>Alla anställda</h1>

      {employees.map((employee) => (
        <div key={employee.email}>
          <img src={employee.picture.large} alt={employee.name.first} />
          <h2>
            {employee.name.first} {employee.name.last}
          </h2>
          <p>{employee.email}</p>
          <p>{employee.phone}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
