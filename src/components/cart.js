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
import React from "react";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {},
  cartBody: {
    height: "360px",
    overflow: "auto",
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
}));

const CartComp = (props) => {
  const classes = useStyles();
  const cartData = props?.body.map((obj) => ({ ...obj, count: 1 }));
  console.log(props?.body);

  const handleCount = (item, index) => {
    cartData[index].count = cartData[index].count + 1;
    // setcartData({ ...cartData });
    // setcartData((prevState) => ({
    //   ...prevState,
    //   [index]: {
    //     ...prevState[index],
    //     count: prevState[index].count + 1,
    //   },
    // }));
    console.log(cartData);
  };

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
      <Paper
        style={{
          position: "absolute",
          bottom: 0,
          right: 100,
          height: "80vh",
          width: "400px",
          borderRadius: 0,
          backgroundColor: "#e0e0e0",
        }}
      >
        <Grid
          container
          justify="space-between"
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
        <div className={classes.cartBody}>
          {cartData.map((item, index) => (
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ margin: "0px 5px" }}>
                    <Avatar>
                      <IconButton onClick={() => handleCount(item, index)}>
                        +
                      </IconButton>
                    </Avatar>
                  </div>
                  <Typography variant="subtitle1" style={{ margin: "0px 5px" }}>
                    {item?.count}
                  </Typography>

                  <Avatar style={{ margin: "0px 5px" }}>
                    <IconButton>-</IconButton>
                  </Avatar>
                  <Typography variant="subtitle1" style={{ margin: "0px 5px" }}>
                    X
                  </Typography>
                  <Typography variant="subtitle1" style={{ margin: "0px 5px" }}>
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

        <div className={classes.checkout}>
          <Typography variant="caption" align="center">
            Promo code can be applied on payment page
          </Typography>
          {/* <Grid
            container
            justify="space-between"
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
            <Grid
              container
              justify="space-between"
              //   className={classes.checkoutButton}
            >
              <Grid item>
                <Typography variant="subtitle1">Proceed to checkout</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  {props?.body[0]?.price}
                </Typography>
              </Grid>
            </Grid>
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
