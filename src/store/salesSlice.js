import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import salesData from '../data/salesData.json';


export const fetchSalesData = createAsyncThunk('sales/fetchSalesData', async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return salesData;
});


const getMonthName = dateString => {
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'short' });
};


const calculateMoMGrowth = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    salesRecords: [],
    kpis: {},
    monthlySales: [],
    productShare: [],
    topProducts: [],
    topCustomers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSalesData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSalesData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.salesRecords = action.payload;

        
        let totalRevenue = 0;
        let totalTarget = 0;

        
        action.payload.forEach(record => {
          totalRevenue += record.revenue;
          totalTarget += record.target;
        });

        
        const targetAchievement = totalTarget > 0 ? (totalRevenue / totalTarget) * 100 : 0;

        
        const monthlyData = {};

        action.payload.forEach(record => {
          const month = getMonthName(record.date);

          
          if (!monthlyData[month]) {
            monthlyData[month] = { sales: 0, target: 0 };
          }

          
          monthlyData[month].sales += record.revenue;
          monthlyData[month].target += record.target;
        });

        
        const monthOrder = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const sortedMonthlyData = [];

       
        monthOrder.forEach(month => {
          if (monthlyData[month]) {
            sortedMonthlyData.push({
              month: month,
              sales: monthlyData[month].sales,
              target: monthlyData[month].target,
            });
          }
        });

        state.monthlySales = sortedMonthlyData;

       
        let momGrowth = 0;
        if (sortedMonthlyData.length >= 2) {
          const currentMonth = sortedMonthlyData[sortedMonthlyData.length - 1].sales;
          const previousMonth = sortedMonthlyData[sortedMonthlyData.length - 2].sales;
          momGrowth = calculateMoMGrowth(currentMonth, previousMonth);
        }

        
        state.kpis = {
          totalRevenue: totalRevenue,
          targetAchievement: targetAchievement,
          momGrowth: momGrowth,
        };

       
        const productRevenue = {};

        
        action.payload.forEach(record => {
          if (!productRevenue[record.product]) {
            productRevenue[record.product] = 0;
          }
          productRevenue[record.product] += record.revenue;
        });

       
        const productShareArray = [];
        Object.keys(productRevenue).forEach(product => {
          productShareArray.push({
            name: product,
            value: productRevenue[product],
          });
        });

       
        productShareArray.sort((a, b) => b.value - a.value);
        state.productShare = productShareArray;

        
        const topProductsArray = [];
        Object.keys(productRevenue).forEach(product => {
          let totalUnits = 0;
          action.payload.forEach(record => {
            if (record.product === product) {
              totalUnits += record.unitsSold;
            }
          });

          topProductsArray.push({
            product: product,
            revenue: productRevenue[product],
            units: totalUnits,
          });
        });

        
        topProductsArray.sort((a, b) => b.revenue - a.revenue);
        state.topProducts = topProductsArray.slice(0, 5);

        
        const customerData = {};

        
        action.payload.forEach(record => {
          if (!customerData[record.client]) {
            customerData[record.client] = { revenue: 0, orders: 0 };
          }
          customerData[record.client].revenue += record.revenue;
          customerData[record.client].orders += 1;
        });

        
        const topCustomersArray = [];
        Object.keys(customerData).forEach(customer => {
          topCustomersArray.push({
            customer: customer,
            revenue: customerData[customer].revenue,
            orders: customerData[customer].orders,
          });
        });

       
        topCustomersArray.sort((a, b) => b.revenue - a.revenue);
        state.topCustomers = topCustomersArray.slice(0, 5);
      })
      .addCase(fetchSalesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default salesSlice.reducer;
