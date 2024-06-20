import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';

const ProductList = ({ products }) => {

    const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer' }}>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="body1" color="text.primary">
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;




