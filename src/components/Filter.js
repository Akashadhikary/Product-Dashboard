import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { filterProducts } from '../features/products/productSlice';

const Filter = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleFilter = (event) => {
    setSelectedCategory(event.target.value);
    dispatch(filterProducts(event.target.value));
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Category</InputLabel>
      <Select value={selectedCategory} onChange={handleFilter} label="Category">
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;






