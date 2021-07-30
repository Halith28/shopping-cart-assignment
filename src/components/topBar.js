import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import logo from "../assets/images/logo.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { Routes } from "../router/routes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "white",
      color: "black",
    },
    [theme.breakpoints.up("600")]: {
      "& .MuiToolbar-gutters": {
        paddingLeft: 100,
        paddingRight: 100,
      },
    },
    [theme.breakpoints.down("570")]: {
      "& .MuiTypography-h6": {
        fontSize: ".75rem",
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
  },
  logoImage: {
    [theme.breakpoints.down("570")]: {
      width: "50px",
    },
  },
  cartGrid: {
    backgroundColor: "#8080805c",
    height: "70px",
    [theme.breakpoints.down("570")]: {
      height: 50,
    },
  },
  thirdGrid: {
    width: 150,
    [theme.breakpoints.down("570")]: {
      width: 100,
    },
  },
  signGrid: {
    [theme.breakpoints.up("570")]: {
      marginBottom: 20,
    },
  },
}));

const TopBar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={logo} alt="Logo" className={classes.logoImage} />
          </IconButton>
          <Typography variant="h6" style={{ marginRight: 20 }}>
            <Link className={classes.link} to={Routes?.home}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to={Routes?.products}>
              Products
            </Link>
          </Typography>
          <div className={classes.thirdGrid}>
            <div className={classes.signGrid}>
              <div style={{ display: "inline" }}>
                <div style={{ display: "inline-block", width: "50%" }}>
                  {/* <Typography variant="subtitle1">Signin</Typography> */}
                  <Link className={classes.link} to={Routes?.login}>
                    Signin
                  </Link>
                </div>
                <div style={{ display: "inline-block", width: "50%" }}>
                  {/* <Typography variant="subtitle1">Register</Typography> */}
                  <Link className={classes.link} to={Routes?.signUp}>
                    Register
                  </Link>
                </div>
              </div>
            </div>
            <div className={classes.cartGrid} onClick={props?.handleCart}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "inline-block" }}>
                  <ShoppingCartIcon style={{ color: "#bf2957" }} />
                </div>
                <div style={{ display: "inline-block" }}>
                  <Typography variant="subtitle1">
                    {props?.cartCount ? props?.cartCount : 0} items
                  </Typography>
                </div>
              </div>
            </div>
            {/* <Grid container>
              <Grid item xs={6}>Signin</Grid>
              <Grid item xs={6}>Register</Grid>
              <Grid item xs={12} style={{backgroundColor:"red", height:"88px"}}>
              <ShoppingCartIcon />
              </Grid>
          </Grid> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
