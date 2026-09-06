import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Employee } from "../types/Employee";
import { ArrowLeft, Mail, Phone, MapPin, Globe, Home } from "lucide-react";
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
    return <p className="details-loading">Laddar...</p>;
  }

  return (
    <div className="employee-page">
      <header className="employee-header">
        <div className="employee-header-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={22} />
            <span>Tillbaka</span>
          </Link>

          <Link to="/" className="home-link" aria-label="Gå till startsidan">
            <Home size={24} />
          </Link>
        </div>
      </header>

      <main className="employee-main">
        <div className="employee-card">
          <img
            src={employee.picture.large}
            alt={`${employee.name.first} ${employee.name.last}`}
          />

          <h1>
            {employee.name.first} {employee.name.last}
          </h1>

          <div className="title-line"></div>

          <div className="employee-details">
            <p>
              <Mail size={25} />
              <strong>E-post:</strong>
              <span>{employee.email}</span>
            </p>

            <p>
              <Phone size={25} />
              <strong>Telefon:</strong>
              <span>{employee.phone}</span>
            </p>

            <p>
              <MapPin size={25} />
              <strong>Stad:</strong>
              <span>{employee.location.city}</span>
            </p>

            <p>
              <Globe size={25} />
              <strong>Land:</strong>
              <span>{employee.location.country}</span>
            </p>
          </div>
        </div>
      </main>

      <div className="detail-ocean">
        <img src="/images/detail-ocean.png" alt="" />
      </div>
    </div>
  );
}

export default EmployeeDetails;
