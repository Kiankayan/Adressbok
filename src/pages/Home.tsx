import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Search, SlidersHorizontal, Users } from "lucide-react";
import type { Employee } from "../types/Employee";
import "./Home.css";

function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("first-asc");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="status-message">Laddar anställda...</p>;
  }

  if (error) {
    return <p className="status-message error-message">{error}</p>;
  }

  const filteredEmployees = employees.filter((employee) => {
    const firstName = employee.name.first.toLowerCase();
    const lastName = employee.name.last.toLowerCase();
    const fullName = `${firstName} ${lastName}`;

    return (
      firstName.startsWith(search.trim().toLowerCase()) ||
      lastName.startsWith(search.trim().toLowerCase()) ||
      fullName.startsWith(search.trim().toLowerCase())
    );
  });

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
      <header className="home-header">
        <img
          src="/images/home-header.png"
          alt="Adressbok"
          className="header-image"
        />
      </header>

      <main className="home-content">
        <div className="controls">
          <div className="search-wrapper">
            <Search className="search-icon" size={24} />

            <input
              type="text"
              placeholder="Sök efter anställd..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="sort-wrapper">
            <SlidersHorizontal size={22} />

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
        </div>

        <div className="employee-list">
          {sortedEmployees.map((employee) => (
            <Link
              to={`/employee/${employee.login.uuid}`}
              key={employee.login.uuid}
              className="home-employee-card"
            >
              <img
                src={employee.picture.large}
                alt={`${employee.name.first} ${employee.name.last}`}
              />

              <h2>
                {employee.name.first} {employee.name.last}
              </h2>

              <div className="contact-info">
                <p>
                  <Mail size={17} />
                  <span>{employee.email}</span>
                </p>

                <p>
                  <Phone size={17} />
                  <span>{employee.phone}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>

        {sortedEmployees.length === 0 && (
          <p className="no-results">Ingen anställd hittades.</p>
        )}
      </main>

      <footer className="home-footer">
        <div className="footer-icon">
          <Users size={20} />
        </div>

        <span>{employees.length} anställda i adressboken</span>
      </footer>

      <div className="wave wave-light"></div>
      <div className="wave wave-medium"></div>
      <div className="wave wave-dark"></div>
    </div>
  );
}

export default Home;
