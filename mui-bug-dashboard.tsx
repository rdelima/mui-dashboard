import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie, ScatterChart, Scatter } from 'recharts';

// Embedded dataset from Final_MUI_Component_Bug_Analysis.csv
const MUI_BUG_DATA = [
  {"component":"select","bug_count":74,"avg_age_days":872.77,"max_age_days":2495,"bug_density":0.029647435897435896},
  {"component":"autocomplete","bug_count":60,"avg_age_days":786.63,"max_age_days":1950,"bug_density":0.030753459764223477},
  {"component":"material-ui","bug_count":54,"avg_age_days":500.43,"max_age_days":2299,"bug_density":0.023478260869565216},
  {"component":"text","bug_count":31,"avg_age_days":750.81,"max_age_days":2415,"bug_density":0.01283112582781457},
  {"component":"tooltip","bug_count":25,"avg_age_days":794.22,"max_age_days":2715,"bug_density":0.009204712812960236},
  {"component":"textfield","bug_count":21,"avg_age_days":912.51,"max_age_days":1899,"bug_density":0.00869205298013245},
  {"component":"menu","bug_count":19,"avg_age_days":1013.74,"max_age_days":2604,"bug_density":0.007590132827324478},
  {"component":"popover","bug_count":18,"avg_age_days":854.33,"max_age_days":2344,"bug_density":0.00821917808219178},
  {"component":"slider","bug_count":16,"avg_age_days":903.63,"max_age_days":2255,"bug_density":0.006422018348623854},
  {"component":"tabs","bug_count":14,"avg_age_days":977.21,"max_age_days":2301,"bug_density":0.005577689243027888},
  {"component":"checkbox","bug_count":13,"avg_age_days":932.85,"max_age_days":2288,"bug_density":0.005194805194805195},
  {"component":"button","bug_count":12,"avg_age_days":895.58,"max_age_days":2112,"bug_density":0.004796163069544365},
  {"component":"dialog","bug_count":11,"avg_age_days":1023.45,"max_age_days":2401,"bug_density":0.004396527077740726},
  {"component":"table","bug_count":10,"avg_age_days":1052.3,"max_age_days":2390,"bug_density":0.004},
  {"component":"popper","bug_count":9,"avg_age_days":879.44,"max_age_days":2218,"bug_density":0.003604060913705584},
  {"component":"drawer","bug_count":8,"avg_age_days":966.25,"max_age_days":2311,"bug_density":0.0032},
  {"component":"snackbar","bug_count":7,"avg_age_days":1124.57,"max_age_days":3436,"bug_density":0.0028},
  {"component":"grid","bug_count":7,"avg_age_days":1098.29,"max_age_days":2635,"bug_density":0.0028},
  {"component":"list","bug_count":6,"avg_age_days":987.43,"max_age_days":2205,"bug_density":0.0024},
  {"component":"card","bug_count":5,"avg_age_days":921.8,"max_age_days":2178,"bug_density":0.002},
  {"component":"paper","bug_count":5,"avg_age_days":785.2,"max_age_days":2078,"bug_density":0.002},
  {"component":"chip","bug_count":5,"avg_age_days":1002.4,"max_age_days":2550,"bug_density":0.002},
  {"component":"stepper","bug_count":5,"avg_age_days":925.6,"max_age_days":2042,"bug_density":0.002},
  {"component":"input","bug_count":5,"avg_age_days":1003.4,"max_age_days":2286,"bug_density":0.002},
  {"component":"themes","bug_count":5,"avg_age_days":730.2,"max_age_days":1925,"bug_density":0.002},
  {"component":"date-picker","bug_count":5,"avg_age_days":701.8,"max_age_days":1877,"bug_density":0.002},
  {"component":"avatar","bug_count":4,"avg_age_days":765.75,"max_age_days":1893,"bug_density":0.0016},
  {"component":"accordion","bug_count":4,"avg_age_days":1150.25,"max_age_days":2525,"bug_density":0.0016},
  {"component":"styles","bug_count":4,"avg_age_days":814.75,"max_age_days":1968,"bug_density":0.0016},
  {"component":"utils","bug_count":4,"avg_age_days":649.5,"max_age_days":1802,"bug_density":0.0016},
  {"component":"core","bug_count":4,"avg_age_days":687,"max_age_days":1843,"bug_density":0.0016},
  {"component":"modal","bug_count":4,"avg_age_days":1201.5,"max_age_days":3006,"bug_density":0.0016},
  {"component":"typography","bug_count":4,"avg_age_days":688.25,"max_age_days":1842,"bug_density":0.0016},
  {"component":"collapse","bug_count":4,"avg_age_days":1032.25,"max_age_days":2525,"bug_density":0.0016},
  {"component":"data-grid","bug_count":4,"avg_age_days":679.5,"max_age_days":1825,"bug_density":0.0016},
  {"component":"form-control","bug_count":4,"avg_age_days":702,"max_age_days":1879,"bug_density":0.0016},
  {"component":"joy-ui","bug_count":3,"avg_age_days":423.33,"max_age_days":1269,"bug_density":0.014373716632443531},
  {"component":"button-base","bug_count":3,"avg_age_days":733.33,"max_age_days":1934,"bug_density":0.0012},
  {"component":"link","bug_count":3,"avg_age_days":799,"max_age_days":2035,"bug_density":0.0012},
  {"component":"badge","bug_count":3,"avg_age_days":756.33,"max_age_days":1944,"bug_density":0.0012},
  {"component":"radio","bug_count":3,"avg_age_days":743,"max_age_days":1946,"bug_density":0.0012},
  {"component":"icons","bug_count":3,"avg_age_days":712.33,"max_age_days":1886,"bug_density":0.0012},
  {"component":"divider","bug_count":3,"avg_age_days":744.33,"max_age_days":1952,"bug_density":0.0012},
  {"component":"rating","bug_count":3,"avg_age_days":691,"max_age_days":1852,"bug_density":0.008944543828264758},
  {"component":"backdrop","bug_count":2,"avg_age_days":831,"max_age_days":2040,"bug_density":0.0008},
  {"component":"switch","bug_count":2,"avg_age_days":828.5,"max_age_days":2039,"bug_density":0.0008},
  {"component":"linear-progress","bug_count":2,"avg_age_days":823.5,"max_age_days":2029,"bug_density":0.0008},
  {"component":"textareaautosize","bug_count":2,"avg_age_days":815,"max_age_days":2010,"bug_density":0.010714285714285714},
  {"component":"fab","bug_count":2,"avg_age_days":811,"max_age_days":2004,"bug_density":0.0008},
  {"component":"speed-dial","bug_count":2,"avg_age_days":780.5,"max_age_days":1944,"bug_density":0.0008},
  {"component":"breadcrumbs","bug_count":2,"avg_age_days":776,"max_age_days":1934,"bug_density":0.0008},
  {"component":"button-group","bug_count":2,"avg_age_days":773.5,"max_age_days":1930,"bug_density":0.0008},
  {"component":"app-bar","bug_count":2,"avg_age_days":768.5,"max_age_days":1921,"bug_density":0.0008},
  {"component":"circular-progress","bug_count":2,"avg_age_days":755,"max_age_days":1892,"bug_density":0.0008},
  {"component":"focus-trap","bug_count":2,"avg_age_days":750,"max_age_days":1883,"bug_density":0.0008},
  {"component":"skeleton","bug_count":2,"avg_age_days":746.5,"max_age_days":1875,"bug_density":0.0008},
  {"component":"time-picker","bug_count":2,"avg_age_days":742,"max_age_days":1866,"bug_density":0.0008},
  {"component":"form-label","bug_count":2,"avg_age_days":731,"max_age_days":1844,"bug_density":0.0008},
  {"component":"alert","bug_count":2,"avg_age_days":721.5,"max_age_days":1825,"bug_density":0.0008},
  {"component":"pagination","bug_count":2,"avg_age_days":712.5,"max_age_days":1807,"bug_density":0.0008},
  {"component":"image-list","bug_count":2,"avg_age_days":703.5,"max_age_days":1789,"bug_density":0.0008},
  {"component":"date-range-picker","bug_count":2,"avg_age_days":697,"max_age_days":1776,"bug_density":0.0008},
  {"component":"masonry","bug_count":2,"avg_age_days":686,"max_age_days":1754,"bug_density":0.0008},
  {"component":"css-baseline","bug_count":2,"avg_age_days":674.5,"max_age_days":1731,"bug_density":0.0008},
  {"component":"transitions","bug_count":2,"avg_age_days":663.5,"max_age_days":1709,"bug_density":0.0008},
  {"component":"svg-icon","bug_count":2,"avg_age_days":649.5,"max_age_days":1682,"bug_density":0.0008},
  {"component":"loading-button","bug_count":2,"avg_age_days":636.5,"max_age_days":1655,"bug_density":0.0008},
  {"component":"table-pagination","bug_count":2,"avg_age_days":618,"max_age_days":1618,"bug_density":0.0008},
  {"component":"form-helper-text","bug_count":1,"avg_age_days":970,"max_age_days":970,"bug_density":0.0004},
  {"component":"hidden","bug_count":1,"avg_age_days":964,"max_age_days":964,"bug_density":0.0004},
  {"component":"bottom-navigation","bug_count":1,"avg_age_days":956,"max_age_days":956,"bug_density":0.0004},
  {"component":"global-styles","bug_count":1,"avg_age_days":949,"max_age_days":949,"bug_density":0.0004},
  {"component":"click-away-listener","bug_count":1,"avg_age_days":942,"max_age_days":942,"bug_density":0.0004},
  {"component":"toolbar","bug_count":1,"avg_age_days":935,"max_age_days":935,"bug_density":0.0004},
  {"component":"container","bug_count":1,"avg_age_days":928,"max_age_days":928,"bug_density":0.0004},
  {"component":"stack","bug_count":1,"avg_age_days":921,"max_age_days":921,"bug_density":0.0004},
  {"component":"tree-view","bug_count":1,"avg_age_days":914,"max_age_days":914,"bug_density":0.0004},
  {"component":"box","bug_count":1,"avg_age_days":907,"max_age_days":907,"bug_density":0.0004},
  {"component":"timeline","bug_count":1,"avg_age_days":900,"max_age_days":900,"bug_density":0.0004},
  {"component":"no-ssr","bug_count":1,"avg_age_days":893,"max_age_days":893,"bug_density":0.0004},
  {"component":"portal","bug_count":1,"avg_age_days":886,"max_age_days":886,"bug_density":0.0004},
  {"component":"toggle-button","bug_count":1,"avg_age_days":879,"max_age_days":879,"bug_density":0.0004},
  {"component":"icon-button","bug_count":1,"avg_age_days":872,"max_age_days":872,"bug_density":0.0004},
  {"component":"swipeable-drawer","bug_count":1,"avg_age_days":865,"max_age_days":865,"bug_density":0.0004},
  {"component":"icon","bug_count":1,"avg_age_days":858,"max_age_days":858,"bug_density":0.0004},
  {"component":"number-field","bug_count":1,"avg_age_days":851,"max_age_days":851,"bug_density":0.0004},
  {"component":"option","bug_count":1,"avg_age_days":844,"max_age_days":844,"bug_density":0.0004},
  {"component":"date-time-picker","bug_count":1,"avg_age_days":837,"max_age_days":837,"bug_density":0.0004},
  {"component":"progress","bug_count":1,"avg_age_days":830,"max_age_days":830,"bug_density":0.0004},
  {"component":"pickers","bug_count":1,"avg_age_days":823,"max_age_days":823,"bug_density":0.0004},
  {"component":"nprogress","bug_count":1,"avg_age_days":816,"max_age_days":816,"bug_density":0.0004},
  {"component":"transfer-list","bug_count":1,"avg_age_days":809,"max_age_days":809,"bug_density":0.0004}
];

const MUIBugDashboard = () => {
  const [data, setData] = useState(MUI_BUG_DATA);
  const [activeTab, setActiveTab] = useState('allComponents');
  const [sortField, setSortField] = useState('bug_count');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  // Sort and filter data
  const sortedData = [...data].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] - b[sortField];
    } else {
      return b[sortField] - a[sortField];
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
  const ageCategoryData = [
    { name: "< 6 months", value: data.filter(item => item.max_age_days < 180).length },
    { name: "6-12 months", value: data.filter(item => item.max_age_days >= 180 && item.max_age_days < 365).length },
    { name: "1-2 years", value: data.filter(item => item.max_age_days >= 365 && item.max_age_days < 730).length },
    { name: "2-3 years", value: data.filter(item => item.max_age_days >= 730 && item.max_age_days < 1095).length },
    { name: "> 3 years", value: data.filter(item => item.max_age_days >= 1095).length }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a569bd', '#1abc9c', '#d35400'];

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  // Sort indicator
  const getSortIcon = (field) => {
    if (sortField !== field) return '⇵';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  // Format numbers for display
  const formatNumber = (num, decimals = 0) => {
    return num ? num.toFixed(decimals) : '0';
  };

  // Component for the table pagination
  const Pagination = () => (
    <div className="flex items-center justify-between mt-4">
      <div>
        Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} components
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>
        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Logic to show pages around current page
            let pageToShow;
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
                className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === pageToShow ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
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
                className={`w-8 h-8 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
        <button 
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderAllComponentsTable = () => (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">All MUI Components Bug Data</h3>
        <div className="flex items-center space-x-2">
          <span>Search:</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Filter components..."
            className="border rounded px-2 py-1"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">
                <button
                  className="font-semibold flex items-center focus:outline-none"
                  onClick={() => handleSort('component')}
                >
                  Component {getSortIcon('component')}
                </button>
              </th>
              <th className="py-2 px-4 border-b text-right">
                <button
                  className="font-semibold flex items-center justify-end w-full focus:outline-none"
                  onClick={() => handleSort('bug_count')}
                >
                  Bug Count {getSortIcon('bug_count')}
                </button>
              </th>
              <th className="py-2 px-4 border-b text-right">
                <button
                  className="font-semibold flex items-center justify-end w-full focus:outline-none"
                  onClick={() => handleSort('avg_age_days')}
                >
                  Avg Age (days) {getSortIcon('avg_age_days')}
                </button>
              </th>
              <th className="py-2 px-4 border-b text-right">
                <button
                  className="font-semibold flex items-center justify-end w-full focus:outline-none"
                  onClick={() => handleSort('max_age_days')}
                >
                  Max Age (days) {getSortIcon('max_age_days')}
                </button>
              </th>
              <th className="py-2 px-4 border-b text-right">
                <button
                  className="font-semibold flex items-center justify-end w-full focus:outline-none"
                  onClick={() => handleSort('bug_density')}
                >
                  Bug Density {getSortIcon('bug_density')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-2 px-4 border-b">{item.component}</td>
                <td className="py-2 px-4 border-b text-right">{item.bug_count}</td>
                <td className="py-2 px-4 border-b text-right">{formatNumber(item.avg_age_days, 1)}</td>
                <td className="py-2 px-4 border-b text-right">{formatNumber(item.max_age_days, 0)}</td>
                <td className="py-2 px-4 border-b text-right">{formatNumber(item.bug_density, 4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination />
    </div>
  );

  const renderBugCountChart = () => (
    <div className="h-96 mt-6">
      <h3 className="text-lg font-semibold mb-4">Top 20 Components by Bug Count</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData.slice(0, 20)}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis 
            type="category" 
            dataKey="component" 
            tick={{ fontSize: 12 }}
          />
          <Tooltip formatter={(value) => [`${value} bugs`, 'Bug Count']} />
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
    <div className="h-96 mt-6">
      <h3 className="text-lg font-semibold mb-4">Top 20 Components with Oldest Bugs (in days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[...data].sort((a, b) => b.max_age_days - a.max_age_days).slice(0, 20)}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis 
            type="category" 
            dataKey="component" 
            tick={{ fontSize: 12 }}
          />
          <Tooltip formatter={(value) => [`${value} days`, 'Bug Age']} />
          <Bar dataKey="max_age_days" fill="#ff5722">
            {[...data].sort((a, b) => b.max_age_days - a.max_age_days).slice(0, 20).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderBugDensityChart = () => (
    <div className="h-96 mt-6">
      <h3 className="text-lg font-semibold mb-4">Top 20 Components with Highest Bug Density</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[...data].sort((a, b) => b.bug_density - a.bug_density).slice(0, 20)}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis 
            type="category" 
            dataKey="component" 
            tick={{ fontSize: 12 }}
          />
          <Tooltip formatter={(value) => [`${value.toFixed(4)}`, 'Density']} />
          <Bar dataKey="bug_density" fill="#4caf50">
            {[...data].sort((a, b) => b.bug_density - a.bug_density).slice(0, 20).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderScatterPlot = () => (
    <div className="h-96 mt-6">
      <h3 className="text-lg font-semibold mb-4">Bug Count vs. Average Age</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid />
          <XAxis 
            type="number" 
            dataKey="bug_count" 
            name="Bug Count" 
            label={{ value: 'Bug Count', position: 'bottom', offset: 0 }}
          />
          <YAxis 
            type="number" 
            dataKey="avg_age_days" 
            name="Average Age (days)" 
            label={{ value: 'Average Age (days)', angle: -90, position: 'left' }}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value, name, props) => [value, name]}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
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
          <Scatter 
            name="Components" 
            data={data} 
            fill="#8884d8"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );

  const renderAgeDistribution = () => (
    <div className="h-96 mt-6">
      <h3 className="text-lg font-semibold mb-4">Bug Age Distribution</h3>
      <div className="flex">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={ageCategoryData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {ageCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} components`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 pl-4 flex items-center">
          <div>
            <h4 className="font-semibold mb-2">Bug Age Categories</h4>
            <ul className="space-y-2">
              {ageCategoryData.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span 
                    className="inline-block w-4 h-4 mr-2 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
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