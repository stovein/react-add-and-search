import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const data = ["hebele", "hübele"];

  return (
    <div className="App">
      <Header />
      <SearchAndList data={data} />
    </div>
  );
}

function SearchAndList(props) {
  const data = props.data;

  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  function handleFilterChange(f) {
    const fd = data.filter((datum) => {
      return datum.toLowerCase().includes(f.toLowerCase());
    });
    setFilteredData(fd);
    setFilter(f);
  }

  function handleEditSubmit(edit) {
    data.push(edit);
    setFilteredData(data);
  }

  return (
    <div>
      <Edit onEditSubmit={handleEditSubmit} />

      <Search filter={filter} onFilterChange={handleFilterChange} />

      <List data={filteredData} />
    </div>
  );
}

function Search(props) {
  function handleChange(e) {
    props.onFilterChange(e.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={props.filter}
        onChange={handleChange}
      />
    </div>
  );
}

function List(props) {
  const data = props.data.map((datum, i) => <li key={i}> {datum} </li>);

  return <div>{data}</div>;
}

function Edit(props) {
  const [edit, setEdit] = useState("");

  const handleSubmit = (e) => {
    props.onEditSubmit(edit);
    setEdit("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Edit"
        value={edit}
        onChange={(e) => setEdit(e.target.value)}
      />
      <input type="submit" onClick={handleSubmit} />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1>Welcome to Edit & Search</h1>
      <h2>Start editing data and search for them!</h2>
    </div>
  );
}
