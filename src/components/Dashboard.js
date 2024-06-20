import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, appendProducts } from '../features/products/productSlice';
import ProductList from './ProductList';
import Search from './Search';
import Filter from './Filter';
import { Container, Box, Typography, CircularProgress } from '@mui/material';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { filteredItems, loading, error, page } = useSelector((state) => state.products);
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    const callback = function(entries) {
      if (entries[0].isIntersecting && !loading && filteredItems.length) {
        dispatch(fetchProducts())
          .then((action) => {
            if (action.payload && action.payload.length) {
              dispatch(appendProducts(action.payload));
            }
          });
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(document.querySelector('#load-more-trigger'));
  }, [dispatch, loading, filteredItems.length]);

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Product Dashboard
        </Typography>
        <Box mb={2}>
          <Search />
        </Box>
        <Box mb={2}>
          <Filter />
        </Box>
        <ProductList products={filteredItems} />
        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}
        <div id="load-more-trigger" />
      </Box>
    </Container>
  );
};

export default Dashboard;



