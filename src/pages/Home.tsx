import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Employee } from "../types/Employee";

function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10&seed=adressbok")
      .then((response) => response.json())
      .then((data) => setEmployees(data.results));
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.first.toLowerCase().startsWith(search.toLowerCase()) ||
      employee.name.last.toLowerCase().startsWith(search.toLowerCase()),
  );

  return (
    <div>
      <h1>Alla anställda</h1>

      <input
        type="text"
        placeholder="Sök efter anställd..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {filteredEmployees.map((employee) => (
        <Link to={`/employee/${employee.login.uuid}`} key={employee.login.uuid}>
          <div>
            <img src={employee.picture.large} alt={employee.name.first} />

            <h2>
              {employee.name.first} {employee.name.last}
            </h2>

            <p>{employee.email}</p>
            <p>{employee.phone}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;
