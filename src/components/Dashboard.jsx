import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalesData } from '../store/salesSlice';
import KpiCard from './KpiCard';
import SalesLineChart from './SalesLineChart';
import ProductPieChart from './ProductPieChart';
import TopDataTable from './TopDataTable';
import FullSalesTable from './FullSalesTable';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    kpis,
    monthlySales,
    productShare,
    topProducts,
    topCustomers,
    salesRecords,
    status,
    
  } = useSelector(state => state.sales);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSalesData());
    }
  }, [status, dispatch]);

  
  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sales & Revenue Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                Track your sales performance and key metrics
              </p>
            </div>
            {/* <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div> */}
          </div>
        </div>
      </header>

     
      <main className="max-w-7xl mx-auto p-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KpiCard
            title="Total Revenue"
            value={formatCurrency(kpis.totalRevenue || 0)}
            icon="💰"
            trend="up"
          />
          <KpiCard
            title="Target Achievement"
            value={`${(kpis.targetAchievement || 0).toFixed(1)}%`}
            icon="🎯"
            trend={kpis.targetAchievement >= 100 ? 'up' : 'down'}
          />
          <KpiCard
            title="Month-over-Month Growth"
            value={`${(kpis.momGrowth || 0).toFixed(1)}%`}
            icon="📈"
            trend={kpis.momGrowth >= 0 ? 'up' : 'down'}
          />
        </div>

        
        <div className="chart grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Sales vs Target</h2>
            <SalesLineChart data={monthlySales} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Product Revenue Share</h2>
            <ProductPieChart data={productShare} />
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Top 5 Products</h2>
            <TopDataTable
              data={topProducts}
              columns={[
                { key: 'product', label: 'Product', type: 'text' },
                { key: 'revenue', label: 'Revenue', type: 'currency' },
                { key: 'units', label: 'Units Sold', type: 'number' },
              ]}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Top 5 Customers</h2>
            <TopDataTable
              data={topCustomers}
              columns={[
                { key: 'customer', label: 'Customer', type: 'text' },
                { key: 'revenue', label: 'Revenue', type: 'currency' },
                { key: 'orders', label: 'Orders', type: 'number' },
              ]}
            />
          </div>
        </div>

        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">All Sales Records</h2>
          <FullSalesTable data={salesRecords} />
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
