import { useEffect, useState } from "react";
import type { Employee } from "../types/Employee";

function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => setEmployees(data.results));
  }, []);

  console.log(employees);

  return <h1>Alla anställda</h1>;
}

export default Home;
