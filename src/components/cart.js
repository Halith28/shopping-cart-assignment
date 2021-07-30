import {
  Grid,
  IconButton,
  Modal,
  Paper,
  makeStyles,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    backgroundColor: "#e0e0e0",
    height: "100vh",
    [theme.breakpoints.up("600")]: {
      position: "absolute",
      bottom: 0,
      right: 100,
      height: "80vh",
      width: "400px",
    },
  },
  cartBody: {
    height: "calc(80vh - 150px)",
    overflow: "auto",
    [theme.breakpoints.down("600")]: {
      height: "calc(100vh - 150px)",
    },
  },
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    margin: "10px 0px",
    "& .MuiAvatar-colorDefault": {
      backgroundColor: "#bf2957",
    },
  },
  checkout: {
    padding: 10,
    position: "relative",
    bottom: 0,
    backgroundColor: "white",
  },
  checkoutButton: {
    backgroundColor: "#bf2957",
    color: "white",
    borderRadius: 0,
    padding: 10,
    textTransform: "Capitalize",
  },
  slogan: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
  },
  actionArea: {
    [theme.breakpoints.down("400")]: {
      "& .MuiAvatar-root": {
        height: 22,
        width: 22,
      },
    },
  },
  emptyCart: {
    height: "calc(80vh - 125px)",
    [theme.breakpoints.down("600")]: {
      height: "calc(100vh - 125px)",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const CartComp = (props) => {
  const classes = useStyles();
  //   const cartData = props?.body.map((obj) => ({ ...obj, count: 1 }));
  const [cart, setcart] = useState([]);
  console.log(props?.body);

  useEffect(() => {
    setcart(props?.body);
  }, [props?.refresh, props?.body]);

  //   const handleCount = (item, index) => {
  //     // debugger;
  //     let sample = cart;
  //     sample[index].count = sample[index].count + 1;
  //     // setcartData({ ...cartData });
  //     // setcartData((prevState) => ({
  //     //   ...prevState,
  //     //   [index]: {
  //     //     ...prevState[index],
  //     //     count: prevState[index].count + 1,
  //     //   },
  //     // }));
  //     setcart(sample);
  //     console.log(cart);
  //   };
  //   console.log("sda", cart[0].count);
  //   console.log(cart);

  return (
    <Modal
      open={props?.open}
      onClose={props?.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        backgroundColor: "rgb(128 128 128 / 36%)",
        // height: "100px",
        // width: "100px",
      }}
    >
      <Paper className={classes.root}>
        <Grid
          container
          justifyContent="space-between"
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "5px 0px 5px 15px",
          }}
          alignItems="center"
        >
          <Grid>My Cart</Grid>
          <Grid>
            <IconButton onClick={props?.handleClose}>
              <Close style={{ color: "white" }} />
            </IconButton>
          </Grid>
        </Grid>
        {cart?.length > 0 ? (
          <div className={classes.cartBody}>
            {cart?.map((item, index) => (
              <Grid container className={classes.cartItem} key={index}>
                <Grid item xs={3}>
                  <img
                    src={item?.imageURL}
                    alt="image123"
                    height="70px"
                    width="70px"
                  />
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
                    {item?.name}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    className={classes.actionArea}
                  >
                    <div style={{ margin: "0px 5px" }}>
                      <Avatar>
                        <IconButton
                          onClick={() => props?.handleIncrement(item, index)}
                        >
                          +
                        </IconButton>
                      </Avatar>
                    </div>
                    <Typography
                      variant="subtitle1"
                      style={{ margin: "0px 5px" }}
                    >
                      {item?.count}
                    </Typography>

                    <Avatar style={{ margin: "0px 5px" }}>
                      <IconButton
                        onClick={() => props?.handleDecrement(item, index)}
                      >
                        -
                      </IconButton>
                    </Avatar>
                    <Typography
                      variant="subtitle1"
                      style={{ margin: "0px 5px" }}
                    >
                      X
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{ margin: "0px 5px" }}
                    >
                      Rs.{item?.price}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={2} style={{ alignSelf: "center" }}>
                  <Typography variant="subtitle1" align="center">
                    Rs.{item?.price * item?.count}
                  </Typography>
                </Grid>
              </Grid>
            ))}

            <div className={classes.slogan}>
              <Typography variant="subtitle2">
                You won't find it cheaper anywhere
              </Typography>
            </div>
          </div>
        ) : (
          <div className={classes.emptyCart}>
            <div>
              <Typography variant="h6" align="center">
                No items in your cart
              </Typography>
              <Typography variant="subtitle1" align="center">
                Your favourite items are just a click away
              </Typography>
            </div>
          </div>
        )}

        <div className={classes.checkout}>
          {!(cart?.length === 0) && (
            <Typography variant="caption" align="center">
              Promo code can be applied on payment page
            </Typography>
          )}

          {/* <Grid
            container
            justifyContent="space-between"
            className={classes.checkoutButton}
          >
            <Grid item>
              <Typography variant="subtitle1">Proceed to checkout</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {props?.body[0].price}
              </Typography>
            </Grid>
          </Grid> */}
          <Button
            variant="contained"
            fullWidth
            className={classes.checkoutButton}
          >
            {!(cart?.length === 0) ? (
              <Grid
                container
                justifyContent="space-between"
                //   className={classes.checkoutButton}
              >
                <Grid item>
                  <Typography variant="subtitle1">
                    Proceed to checkout
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Rs.
                    {cart?.length > 0 &&
                      cart
                        ?.map((item) => item?.count * item?.price)
                        ?.reduce((item, b) => item + b)}{" "}
                    <span>{`>`}</span>
                    {/* {props?.body[0]?.price} */}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <div onClick={props?.handleClose}>Start Shopping</div>
            )}
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

CartComp.defaultProps = {
  body: [],
};

CartComp.propTypes = {
  body: PropTypes.array,
};

export default CartComp;
