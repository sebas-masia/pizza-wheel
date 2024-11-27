import React, { useState, useMemo } from "react";
import { Spin } from "../types/types";

interface AdminTableProps {
  spins: Spin[];
}

const LOCATIONS = ["Downtown", "West Side", "North Mall", "Beach Front"];

export const AdminTable: React.FC<AdminTableProps> = ({ spins }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Spin>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const sortedAndFilteredSpins = useMemo(() => {
    return spins
      .filter((spin) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          spin.name.toLowerCase().includes(searchLower) ||
          spin.email.toLowerCase().includes(searchLower) ||
          spin.sucursal.toLowerCase().includes(searchLower) ||
          spin.award.toLowerCase().includes(searchLower);

        // Apply location filter
        const matchesLocation = selectedLocation
          ? spin.sucursal === selectedLocation
          : true;

        return matchesSearch && matchesLocation;
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (sortDirection === "asc") {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      });
  }, [spins, searchTerm, sortField, sortDirection, selectedLocation]);

  const handleSort = (field: keyof Spin) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="admin-table">
      <div className="table-filters">
        <div className="filter-group">
          <label htmlFor="search">Search in all fields:</label>
          <div className="search-bar">
            <input
              id="search"
              type="text"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-group">
          <label htmlFor="location">Filter by location:</label>
          <div className="location-filter">
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="location-select"
            >
              <option value="">All Locations</option>
              {LOCATIONS.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {["id", "name", "email", "sucursal", "award", "createdAt"].map(
              (field) => (
                <th
                  key={field}
                  onClick={() => handleSort(field as keyof Spin)}
                  className={
                    sortField === field ? `sorted-${sortDirection}` : ""
                  }
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredSpins.map((spin) => (
            <tr key={spin.id}>
              <td>{spin.id}</td>
              <td>{spin.name}</td>
              <td>{spin.email}</td>
              <td>{spin.sucursal}</td>
              <td>{spin.award}</td>
              <td>{new Date(spin.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
