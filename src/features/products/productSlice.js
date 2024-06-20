import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ITEMS_PER_PAGE = 10;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState }) => {
    const { page, itemsPerPage } = getState().products;
    const response = await axios.get(`https://fakestoreapi.com/products?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`);
    return response.data;
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (id) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    product: null,
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
    searchQuery: '',
    categoryFilter: '',
  },
  reducers: {
    searchProducts: (state, action) => {
      state.searchQuery = action.payload;
      const searchQuery = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(product =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
      );
    },
    filterProducts: (state, action) => {
      state.categoryFilter = action.payload;
      if (action.payload === '') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(product =>
          product.category === action.payload
        );
      }
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    appendProducts: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.filteredItems = [...state.filteredItems, ...action.payload];
      state.page += 1;
      state.hasMore = action.payload.length === ITEMS_PER_PAGE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload];
        state.filteredItems = state.items; // Keep filteredItems in sync
        state.hasMore = action.payload.length === ITEMS_PER_PAGE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { searchProducts, filterProducts, setPage, appendProducts } = productSlice.actions;

export default productSlice.reducer;


