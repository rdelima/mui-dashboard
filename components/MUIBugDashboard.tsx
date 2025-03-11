'use client';

import React, {useState} from 'react';
import MUI_BUG_DATA, {BugData} from './MUIData'; // Import the dataset from a separate file

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
} from 'recharts';

interface AgeCategory {
  name: string;
  value: number;
}

// Embedded dataset from Final_MUI_Component_Bug_Analysis.csv

const MUIBugDashboard: React.FC = () => {
  const [data] = useState<BugData[]>(MUI_BUG_DATA);
  const [activeTab, setActiveTab] = useState<string>('allComponents');
  const [sortField, setSortField] = useState<string>('bug_count');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 20;

  // Sort and filter data
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField] as number;
    const bValue = b[sortField] as number;

    if (sortDirection === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  const filteredData = sortedData.filter(item =>
    item.component.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Calculate summary statistics
  const totalBugs = data.reduce((sum, item) => sum + item.bug_count, 0);
  const avgBugAge = data.reduce((sum, item) => sum + item.avg_age_days, 0) / data.length || 0;
  const maxBugAge = data.length ? Math.max(...data.map(item => item.max_age_days)) : 0;

  // Age categories for bug distribution
  const ageCategoryData: AgeCategory[] = [
    {name: '< 6 months', value: data.filter(item => item.max_age_days < 180).length},
    {
      name: '6-12 months',
      value: data.filter(item => item.max_age_days >= 180 && item.max_age_days < 365).length,
    },
    {
      name: '1-2 years',
      value: data.filter(item => item.max_age_days >= 365 && item.max_age_days < 730).length,
    },
    {
      name: '2-3 years',
      value: data.filter(item => item.max_age_days >= 730 && item.max_age_days < 1095).length,
    },
    {name: '> 3 years', value: data.filter(item => item.max_age_days >= 1095).length},
  ];

  // Define color array for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a569bd', '#1abc9c', '#d35400'];

  // Handle sort
  const handleSort = (field: string): void => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  // Sort indicator
  const getSortIcon = (field: string): string => {
    if (sortField !== field) return '⇵';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  // Format numbers for display
  const formatNumber = (num: number, decimals = 0): string => {
    return num ? num.toFixed(decimals) : '0';
  };

  // Component for the table pagination
  const Pagination = () => (
    <div className="flex items-center justify-between mt-4">
      <div>
        Showing {(currentPage - 1) * rowsPerPage + 1} to{' '}
        {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length}{' '}
        components
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        <div className="flex items-center space-x-1">
          {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
            // Logic to show pages around current page
            let pageToShow: number;
            if (totalPages <= 5) {
              pageToShow = i + 1;
            } else if (currentPage <= 3) {
              pageToShow = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageToShow = totalPages - 4 + i;
            } else {
              pageToShow = currentPage - 2 + i;
            }

            return (
              <button
                key={i}
                onClick={() => setCurrentPage(pageToShow)}
                className={`w-8 h-8 flex items-center justify-center rounded ${
                  currentPage === pageToShow
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {pageToShow}
              </button>
            );
          })}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span>...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderAllComponentsTable = () => (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">All Material UI Components Bug Data as of 3/2025</h3>
        <div className="flex items-center space-x-2">
          <span>Search:</span>
          <input
            type="text"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Filter components..."
            className="px-2 py-1 border rounded"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b">
                <button
                  className="flex items-center font-semibold focus:outline-none"
                  onClick={() => handleSort('component')}
                >
                  Component {getSortIcon('component')}
                </button>
              </th>
              <th className="px-4 py-2 text-right border-b">
                <button
                  className="flex items-center justify-end w-full font-semibold focus:outline-none"
                  onClick={() => handleSort('bug_count')}
                >
                  Bug Count {getSortIcon('bug_count')}
                </button>
              </th>
              <th className="px-4 py-2 text-right border-b">
                <button
                  className="flex items-center justify-end w-full font-semibold focus:outline-none"
                  onClick={() => handleSort('avg_age_days')}
                >
                  Avg Age (days) {getSortIcon('avg_age_days')}
                </button>
              </th>
              <th className="px-4 py-2 text-right border-b">
                <button
                  className="flex items-center justify-end w-full font-semibold focus:outline-none"
                  onClick={() => handleSort('max_age_days')}
                >
                  Max Age (days) {getSortIcon('max_age_days')}
                </button>
              </th>
              <th className="px-4 py-2 text-right border-b">
                <button
                  className="flex items-center justify-end w-full font-semibold focus:outline-none"
                  onClick={() => handleSort('bug_density')}
                >
                  Bug Density {getSortIcon('bug_density')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2 border-b">{item.component}</td>
                <td className="px-4 py-2 text-right border-b">{item.bug_count}</td>
                <td className="px-4 py-2 text-right border-b">
                  {formatNumber(item.avg_age_days, 1)}
                </td>
                <td className="px-4 py-2 text-right border-b">
                  {formatNumber(item.max_age_days, 0)}
                </td>
                <td className="px-4 py-2 text-right border-b">
                  {formatNumber(item.bug_density, 4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );

  const renderBugCountChart = () => (
    <div className="mt-6 h-128">
      <h3 className="mb-4 text-lg font-semibold">Top 20 Components by Bug Count</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData.slice(0, 20)}
          layout="vertical"
          margin={{top: 5, right: 30, left: 100, bottom: 5}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="component" tick={{fontSize: 12}} />
          <Tooltip formatter={value => [`${value} bugs`, 'Bug Count']} />
          <Bar dataKey="bug_count" fill="#1976d2">
            {sortedData.slice(0, 20).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderOldestBugsChart = () => (
    <div className="mt-6 h-128">
      <h3 className="mb-4 text-lg font-semibold">Top 20 Components with Oldest Bugs (in days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[...data].sort((a, b) => b.max_age_days - a.max_age_days).slice(0, 20)}
          layout="vertical"
          margin={{top: 5, right: 30, left: 100, bottom: 5}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="component" tick={{fontSize: 12}} />
          <Tooltip formatter={value => [`${value} days`, 'Bug Age']} />
          <Bar dataKey="max_age_days" fill="#ff5722">
            {[...data]
              .sort((a, b) => b.max_age_days - a.max_age_days)
              .slice(0, 20)
              .map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderBugDensityChart = () => (
    <div className="mt-6 h-128">
      <h3 className="mb-4 text-lg font-semibold">Top 20 Components with Highest Bug Density</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[...data].sort((a, b) => b.bug_density - a.bug_density).slice(0, 20)}
          layout="vertical"
          margin={{top: 5, right: 30, left: 100, bottom: 5}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="component" tick={{fontSize: 12}} />
          <Tooltip formatter={value => [`${(value as number).toFixed(4)}`, 'Density']} />
          <Bar dataKey="bug_density" fill="#4caf50">
            {[...data]
              .sort((a, b) => b.bug_density - a.bug_density)
              .slice(0, 20)
              .map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderScatterPlot = () => (
    <div className="mt-6 h-128">
      <h3 className="mb-4 text-lg font-semibold">Bug Count vs. Average Age</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="bug_count"
            name="Bug Count"
            label={{value: 'Bug Count', position: 'bottom', offset: 0}}
          />
          <YAxis
            type="number"
            dataKey="avg_age_days"
            name="Average Age (days)"
            label={{value: 'Average Age (days)', angle: -90, position: 'left'}}
          />
          <Tooltip
            cursor={{strokeDasharray: '3 3'}}
            content={({active, payload}) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload as BugData;
                return (
                  <div className="p-4 bg-white border border-gray-200 rounded shadow-lg">
                    <p className="font-bold">{data.component}</p>
                    <p>Bug Count: {data.bug_count}</p>
                    <p>Avg Age: {data.avg_age_days.toFixed(2)} days</p>
                    <p>Max Age: {data.max_age_days} days</p>
                    <p>Density: {data.bug_density.toFixed(4)}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter name="Components" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );

  const renderAgeDistribution = () => {
    // Filter zero values just for pie chart display
    const nonZeroData = ageCategoryData.filter(item => item.value > 0);

    return (
      <div className="mt-6 h-128">
        <h3 className="mb-4 text-lg font-semibold">Bug Age Distribution</h3>
        <div className="flex">
          <div className="w-1/2">
            <ResponsiveContainer width="100%" height={450}>
              <PieChart>
                <Pie
                  data={nonZeroData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {nonZeroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={value => [`${value} components`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center w-1/2 pl-4">
            <div>
              <h4 className="mb-2 font-semibold">Bug Age Categories</h4>
              <ul className="space-y-2">
                {ageCategoryData.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span
                      className="inline-block w-4 h-4 mr-2 rounded-full"
                      style={{backgroundColor: COLORS[index % COLORS.length]}}
                    ></span>
                    <span className="mr-2">{item.name}:</span>
                    <span className="font-semibold">{item.value} components</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container p-6 mx-auto bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Material UI Component Bug Dashboard</h1>
      <h4 className="text-m font-bold text-gray-800">By Ricardo De Lima.</h4>
      <h4 className="text-m font-bold text-gray-800">Data scraped: March 2025</h4>
      <p className="text-sm text-gray-500 mt-10">
        Bug density represents the number of bugs relative to component size. A higher bug density
        indicates a component with more bugs compared to its codebase size, highlighting areas that
        may require additional attention regardless of their total bug count.
      </p>
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-xl font-semibold text-gray-700">Total Bugs</div>
          <div className="mt-2 text-3xl font-bold text-blue-600">{totalBugs}</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-xl font-semibold text-gray-700">Average Bug Age</div>
          <div className="mt-2 text-3xl font-bold text-yellow-600">
            {formatNumber(avgBugAge, 1)} days
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-xl font-semibold text-gray-700">Oldest Bug</div>
          <div className="mt-2 text-3xl font-bold text-red-600">
            {formatNumber(maxBugAge, 0)} days
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex mb-6 space-x-4 border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'allComponents'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('allComponents')}
          >
            All Components
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'bugCount'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('bugCount')}
          >
            Bug Count
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'oldestBugs'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('oldestBugs')}
          >
            Oldest Bugs
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'bugDensity'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('bugDensity')}
          >
            Bug Density
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'scatterPlot'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('scatterPlot')}
          >
            Scatter Plot
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'ageDistribution'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('ageDistribution')}
          >
            Age Distribution
          </button>
        </div>

        {activeTab === 'allComponents' && renderAllComponentsTable()}
        {activeTab === 'bugCount' && renderBugCountChart()}
        {activeTab === 'oldestBugs' && renderOldestBugsChart()}
        {activeTab === 'bugDensity' && renderBugDensityChart()}
        {activeTab === 'scatterPlot' && renderScatterPlot()}
        {activeTab === 'ageDistribution' && renderAgeDistribution()}
      </div>
    </div>
  );
};

export default MUIBugDashboard;
