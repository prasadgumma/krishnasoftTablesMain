import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, Breadcrumbs } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Highlight from "react-highlight";

function TablePlugins() {
  const [code1, setCode1] = useState();

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "address", headerName: "Address", width: 300 },
  ];

  const data = [
    {
      id: 1,
      name: "Anne Nader",
      email: "Rahul.Dare@hotmail.com",
      address: "4512 Nolan Brooks",
    },
    {
      id: 2,
      name: "Amber Leffler",
      email: "Mia58@gmail.com",
      address: "405 Emmy Radial",
    },
    {
      id: 3,
      name: "Andres Bosco",
      email: "Amir.Anderson@hotmail.com",
      address: "15853 Conroy Plains",
    },
    // Add remaining data here
  ];

  useEffect(() => {
    fetch("/assets/data/table-plugins/code-1.json")
      .then((response) => response.text())
      .then((html) => {
        setCode1(html);
      });
  }, []);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/table/data">Home</Link>
        <Link to="/table/data">Tables</Link>
        <Typography color="text.primary">Data Tables</Typography>
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>
        Table Plugins{" "}
        <small style={{ fontSize: "0.7em" }}>
          header small text goes here...
        </small>
      </Typography>
      <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
        <Typography variant="h6" gutterBottom>
          React DataGrid Component
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        </div>
      </Paper>
      <Paper elevation={1} style={{ marginTop: "16px", padding: "16px" }}>
        <Highlight className="typescript">{code1}</Highlight>
      </Paper>
    </div>
  );
}

export default TablePlugins;
