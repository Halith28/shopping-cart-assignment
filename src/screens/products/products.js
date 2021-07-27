import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TopBar from "../../components/topBar";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {},
  navigationGrid: {
    backgroundColor: "rgb(128 128 128 / 36%)",
    // height: "calc(100vh - 110px)",
    height: "100vh",
  },
  navigationButton: {
    borderBottom: "1px solid rgb(128 128 128 / 36%)",
    padding: 10,
  },
  productsGrid: {
    height: "calc(100vh - 110px)",
    // height: "100vh",
    padding: 10,
  },
  productDescription: {
    backgroundColor: "rgb(128 128 128 / 26%)",
    padding: 5,
    // height: 100,
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  productCard: {
    borderBottom: "1px dashed rgb(128 128 128 / 26%)",
    padding: 5,
  },
  productFooter: {
    marginTop: 10,
  },
  productImage: {
    // height: 100,
    width: "100%",
    maxHeight: "250px",
  },
  buyButton: {
    backgroundColor: "#bf2957",
    color: "white",
    borderRadius: 0,
  },
}));

const Products = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => {
        setCategories(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <TopBar />
      <Grid container>
        <Grid item xs={2} className={classes.navigationGrid}>
          {categories?.map((item, index) => (
            <div key={index} className={classes.navigationButton}>
              {item?.name}
            </div>
          ))}
        </Grid>
        <Grid item xs={10} className={classes.productsGrid}>
          <Grid container spacing={2}>
            {products?.map((item, index) => (
              <Grid item xs={3} key={index}>
                <Grid className={classes.productCard}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: 600, height: 100 }}
                  >
                    {item?.name}
                  </Typography>
                  <img
                    src={item?.imageURL}
                    alt={item?.name}
                    className={classes.productImage}
                  />
                  <div className={classes.productDescription}>
                    <Typography variant="subtitle1">
                      {item?.description}
                    </Typography>
                  </div>
                  <Grid
                    container
                    justify="space-between"
                    className={classes.productFooter}
                  >
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">
                        MRP Rs.{item?.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <Button variant="contained" className={classes.buyButton}>
                        Buy Now
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
