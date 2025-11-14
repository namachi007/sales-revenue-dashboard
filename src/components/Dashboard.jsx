import React, { useEffect, useMemo } from 'react';
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

  const lastUpdated = useMemo(() => {
    if (!salesRecords || salesRecords.length === 0) return null;
    const latestDate = salesRecords.reduce((latest, record) => {
      const current = new Date(record.date);
      return current > latest ? current : latest;
    }, new Date(salesRecords[0].date));

    return latestDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [salesRecords]);

  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const totalRevenue = kpis.totalRevenue || 0;
  const targetAchievement = kpis.targetAchievement || 0;
  const momGrowth = kpis.momGrowth || 0;

  return (
    <div className="App">
      <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <main className="mx-auto max-w-7xl space-y-10">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-sky-900 text-white shadow-2xl">
            <div className="absolute -right-8 top-0 h-60 w-60 rounded-full bg-white/20 blur-3xl" aria-hidden="true" />
            <div className="absolute bottom-0 left-6 h-32 w-32 rounded-full bg-sky-400/20 blur-2xl" aria-hidden="true" />
            <div className="relative z-10 space-y-8 p-8 md:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 animate-pulse" aria-hidden="true" />
                    Forecast ready
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.5em] text-white/60">Revenue Pulse</p>
                    <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Sales & Revenue Dashboard</h1>
                    <p className="mt-3 max-w-2xl text-sm text-white/80">
                      Track performance, spotlight opportunities, and instantly share polished reports with your team.
                    </p>
                    {lastUpdated && (
                      <p className="mt-4 text-sm font-medium text-white/70">Last sync • {lastUpdated}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {['Monthly', 'Quarterly', 'Annual'].map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={index === 0}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 ${
                        index === 0
                          ? 'bg-white/25 text-white shadow-inner'
                          : 'bg-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>Download report</span>
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">YTD Revenue</p>
                  <p className="mt-2 text-2xl font-semibold">{formatCurrency(totalRevenue)}</p>
                  <p className="mt-1 text-sm text-white/70">Across all active deals</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">Target Hit</p>
                  <p className="mt-2 text-2xl font-semibold">{targetAchievement.toFixed(1)}%</p>
                  <p className="mt-1 text-sm text-white/70">
                    {targetAchievement >= 100 ? 'Ahead of goal' : 'Room to overachieve'}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">Momentum</p>
                  <p className={`mt-2 text-2xl font-semibold ${momGrowth >= 0 ? 'text-emerald-200' : 'text-rose-200'}`}>
                    {momGrowth >= 0 ? '+' : ''}
                    {momGrowth.toFixed(1)}%
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    {momGrowth >= 0 ? 'Momentum improving' : 'Stabilize pipeline'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {status === 'loading' ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/40 border-t-white" aria-label="Loading" />
            </div>
          ) : (
            <>
              <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <KpiCard
                  title="Total Revenue"
                  value={formatCurrency(totalRevenue)}
                  icon="💰"
                  trend="up"
                />
                <KpiCard
                  title="Target Achievement"
                  value={`${targetAchievement.toFixed(1)}%`}
                  icon="🎯"
                  trend={targetAchievement >= 100 ? 'up' : 'down'}
                />
                <KpiCard
                  title="Month-over-Month Growth"
                  value={`${momGrowth.toFixed(1)}%`}
                  icon="📈"
                  trend={momGrowth >= 0 ? 'up' : 'down'}
                />
              </section>

              <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-black/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Performance</p>
                      <h2 className="mt-1 text-xl font-semibold text-slate-900">Sales vs Target</h2>
                    </div>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                      Live
                    </span>
                  </div>
                  <SalesLineChart data={monthlySales} />
                </div>
                <div className="rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-black/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Composition</p>
                      <h2 className="mt-1 text-xl font-semibold text-slate-900">Product Revenue Share</h2>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Updated</span>
                  </div>
                  <ProductPieChart data={productShare} />
                </div>
              </section>

              <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-black/5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">Top 5 Products</h2>
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Revenue</span>
                  </div>
                  <TopDataTable
                    data={topProducts}
                    columns={[
                      { key: 'product', label: 'Product', type: 'text' },
                      { key: 'revenue', label: 'Revenue', type: 'currency' },
                      { key: 'units', label: 'Units Sold', type: 'number' },
                    ]}
                  />
                </div>
                <div className="rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-black/5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">Top 5 Customers</h2>
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Relationships</span>
                  </div>
                  <TopDataTable
                    data={topCustomers}
                    columns={[
                      { key: 'customer', label: 'Customer', type: 'text' },
                      { key: 'revenue', label: 'Revenue', type: 'currency' },
                      { key: 'orders', label: 'Orders', type: 'number' },
                    ]}
                  />
                </div>
              </section>

              <section className="rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-black/5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Insights</p>
                    <h2 className="text-2xl font-semibold text-slate-900">All Sales Records</h2>
                  </div>
                  <p className="text-sm text-slate-500">
                    Drill into granular transactions and identify coaching opportunities.
                  </p>
                </div>
                <div className="mt-6">
                  <FullSalesTable data={salesRecords} />
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
