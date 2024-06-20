import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../features/products/productSlice";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!product) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Card>
          <CardMedia
            component="img"
            alt={product.title}
            height="400"
            image={product.image}
            title={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.description}
            </Typography>
            <Typography variant="h5" component="div" mt={2}>
              ${product.price}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mt={2}>
              Category: {product.category}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => navigate("/")}
            >
              Back to Products
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default SingleProduct;
