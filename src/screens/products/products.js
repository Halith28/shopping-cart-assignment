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
import CartComp from "../../components/cart";

const useStyles = makeStyles((theme) => ({
  root: {},
  navigationGrid: {
    backgroundColor: "rgb(128 128 128 / 36%)",
    // height: "calc(100vh - 110px)",
    height: "100vh",
    cursor: "pointer",
    [theme.breakpoints.down("600")]: {
      display: "none",
    },
    position: "fixed",
    top: 110,
  },
  navigationButton: {
    borderBottom: "1px solid rgb(128 128 128 / 36%)",
    padding: 15,
  },
  productsGrid: {
    height: "calc(100vh - 110px)",
    // height: "100vh",
    padding: 10,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: 195,
    },
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
    "box-shadow":
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    // "-webkit-box-shadow": "inset 0 0 8px rgba(0,0,0, 0.25)",
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
      color: "white",
      backgroundColor: "#bf2957",
    },
    "& .MuiSelect-icon": {
      color: "white",
    },
    "& .MuiFormLabel-root": {
      color: "white",
    },
  },
  content: {
    marginTop: 130,
    [theme.breakpoints.down("570")]: {
      marginTop: 75,
    },
  },
}));

const Products = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleCart = () => {
    setOpen(true);
  };

  const handleOpen = (item) => {
    let sample = item;
    sample.count = 1;
    cart.push(sample);
    setOpen(true);
    console.log(cart);
  };

  console.log(cart);

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleIncrement = (item, index) => {
    // debugger;
    let sample = cart;
    sample[index].count = sample[index].count + 1;
    setCart(sample);
    setRefresh(!refresh);
  };

  const handleDecrement = (item, index) => {
    let sample = cart;
    if (sample[index].count < 2) {
      sample.splice(index, 1);
    } else {
      sample[index].count = sample[index].count - 1;
    }
    setCart(sample);
    setRefresh(!refresh);
  };

  console.log(products);
  return (
    <>
      <TopBar handleCart={handleCart} cartCount={cart?.length} />
      <Grid container className={classes.content}>
        <Grid item className={classes.navigationGrid}>
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
              {categories?.map((item, index) => (
                <option
                  key={index}
                  onClick={() => filterProducts(item?.id)}
                  value={item?.id}
                  style={{ backgroundColor: "rgb(128 128 128 / 36%)" }}
                >
                  {item?.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.productsGrid}>
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
                    justifyContent="space-between"
                    className={classes.productFooter}
                  >
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">
                        MRP Rs.{item?.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <Button
                        variant="contained"
                        className={classes.buyButton}
                        onClick={() => handleOpen(item)}
                      >
                        Buy Now
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <CartComp
            open={open}
            handleClose={handleClose}
            body={cart}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            refresh={refresh}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
