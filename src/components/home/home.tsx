import { useEffect, useState } from "react";
import DataTable from "../dataTable/index";
import { TableData } from "../../types/dataTable";
import Pagination from "../pagination/pagination";
import style from "./style.module.scss";
import { formatCurrency } from "../../utils/number";

const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  // fetch the projects from the API
  const fetchProjects = async () => {
    setLoading(true);
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  };
  // get the table data based on the projects
  const getTableData = () => {
    const tableData: TableData = {
      columns: [],
      rows: [],
    };

    if (projects.length === 0) {
      return tableData;
    }
    /// get the columns from the first project
    tableData.columns = [
      {
        id: "s.no",
        label: "S.No",
      },
      {
        id: "percentage.funded",
        label: "Percentage Funded",
      },
      {
        id: "amt.pledged",
        label: "Amount Pledged",
      },
    ];

    // filter the rows based on the page
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const filteredProjects = projects.slice(start, end);

    // get the rows from the projects
    tableData.rows = filteredProjects.map((project) => {
      return Object.keys(project).reduce(
        (acc: { [key: string]: string }, column) => {
          if (column === "amt.pledged") {
            // format the currency
            acc[column] = formatCurrency(project[column]);
          } else {
            acc[column] = project[column];
          }
          return acc;
        },
        {}
      );
    });
    return tableData;
  };
  // fetch the projects on the initial load
  useEffect(() => {
    fetchProjects();
  }, []);

  // handle the page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className={style.header}>
        <div className={style.detail}>
          <h2 className={style.title}>KickStarter</h2>
          <p className={style.description}>highly-rated kickstarter projects</p>
        </div>
      </div>
      <DataTable loading={loading} data={getTableData()} />
      <Pagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalRows={projects.length}
      />
    </div>
  );
};

export default Home;
