import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for API calls
export const fetchBills = createAsyncThunk(
  'bills/fetchBills',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch('/bills', {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch bills');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const payBill = createAsyncThunk(
  'bills/payBill',
  async ({ billId, accountId }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`/bills/${billId}/pay`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountId }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to pay bill');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBill = createAsyncThunk(
  'bills/createBill',
  async (billData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch('/bills', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create bill');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBill = createAsyncThunk(
  'bills/updateBill',
  async (billData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`/bills/${billData.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update bill');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBill = createAsyncThunk(
  'bills/deleteBill',
  async (billId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`/bills/${billId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete bill');
      }
      
      return billId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  bills: [],
  isLoading: false,
  error: null,
  paymentStatus: null,
};

const billSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPaymentStatus: (state) => {
      state.paymentStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch bills cases
      .addCase(fetchBills.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bills = action.payload;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Pay bill cases
      .addCase(payBill.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.paymentStatus = 'pending';
      })
      .addCase(payBill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentStatus = 'success';
        // Update the bill status in the list
        const billIndex = state.bills.findIndex(bill => bill.id === action.payload.billId);
        if (billIndex !== -1) {
          state.bills[billIndex].status = 'PAID';
        }
      })
      .addCase(payBill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.paymentStatus = 'failed';
      })
      // Create bill cases
      .addCase(createBill.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bills.push(action.payload);
      })
      .addCase(createBill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update bill cases
      .addCase(updateBill.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBill.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.bills.findIndex(bill => bill.id === action.payload.id);
        if (index !== -1) {
          state.bills[index] = action.payload;
        }
      })
      .addCase(updateBill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete bill cases
      .addCase(deleteBill.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bills = state.bills.filter(bill => bill.id !== action.payload);
      })
      .addCase(deleteBill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearPaymentStatus } = billSlice.actions;
export default billSlice.reducer;