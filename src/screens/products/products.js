import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TopBar from "../../components/topBar";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {},
  navigationGrid: {
    backgroundColor: "rgb(128 128 128 / 36%)",
    // height: "calc(100vh - 110px)",
    height: "100vh",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  navigationButton: {
    borderBottom: "1px solid rgb(128 128 128 / 36%)",
    padding: 15,
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
  navigationMobile: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    "& .MuiInputBase-input": {
      color: "black",
      backgroundColor: "#bf2957",
    },
    "& .MuiSelect-icon": {
      color: "white",
    },
    "& .MuiFormLabel-root": {
      color: "white",
    },
  },
}));

const Products = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
        setFilteredData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function filterProducts(categoryId) {
    const filteredData = products.filter(
      (item) => item?.category === categoryId
    );
    setFilteredData(filteredData);
  }

  console.log(products);
  return (
    <>
      <TopBar />
      <Grid container>
        <Grid item xs={12} sm={2} className={classes.navigationGrid}>
          {categories?.map((item, index) => (
            <div
              key={index}
              className={classes.navigationButton}
              onClick={() => filterProducts(item?.id)}
            >
              {item?.name}
            </div>
          ))}
        </Grid>
        <Grid item xs={12} className={classes.navigationMobile}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth
          >
            <InputLabel htmlFor="filled-age-native-simple">
              Select Category
            </InputLabel>
            <Select
              native
              // value={state.age}
              onChange={(e) => filterProducts(e.target.value)}
              inputProps={{
                name: "age",
                id: "filled-age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              {categories?.map((item, index) => (
                <option
                  key={index}
                  onClick={() => filterProducts(item?.id)}
                  value={item?.id}
                >
                  {item?.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={10} className={classes.productsGrid}>
          <Grid container spacing={2}>
            {filteredData?.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
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
