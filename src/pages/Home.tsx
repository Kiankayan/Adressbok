import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Employee } from "../types/Employee";
import "./Home.css";

function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("first-asc");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10&seed=adressbok")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte hämta anställda");
        }

        return response.json();
      })
      .then((data) => {
        setEmployees(data.results);
      })
      .catch(() => {
        setError("Kunde inte hämta anställda. Försök igen senare.");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.first.toLowerCase().startsWith(search.toLowerCase()) ||
      employee.name.last.toLowerCase().startsWith(search.toLowerCase()),
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortOrder === "first-asc") {
      return a.name.first.localeCompare(b.name.first);
    }

    if (sortOrder === "first-desc") {
      return b.name.first.localeCompare(a.name.first);
    }

    if (sortOrder === "last-asc") {
      return a.name.last.localeCompare(b.name.last);
    }

    return b.name.last.localeCompare(a.name.last);
  });

  return (
    <div className="home">
      <h1 className="home-title">Adressbok</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Sök efter anställd..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="first-asc">Förnamn A–Ö</option>
          <option value="first-desc">Förnamn Ö–A</option>
          <option value="last-asc">Efternamn A–Ö</option>
          <option value="last-desc">Efternamn Ö–A</option>
        </select>
      </div>

      <div className="employee-list">
        {sortedEmployees.map((employee) => (
          <Link
            to={`/employee/${employee.login.uuid}`}
            key={employee.login.uuid}
            className="employee-card"
          >
            <img src={employee.picture.large} alt={employee.name.first} />

            <h2>
              {employee.name.first} {employee.name.last}
            </h2>

            <p>{employee.email}</p>
            <p>{employee.phone}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
