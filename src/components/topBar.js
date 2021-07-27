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
}));

const TopBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={logo} alt="Logo" />
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
          <div style={{ width: "150px" }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "inline" }}>
                <div style={{ display: "inline-block", width: "50%" }}>
                  Signin
                </div>
                <div style={{ display: "inline-block", width: "50%" }}>
                  Register
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "#8080805c", height: "70px" }}>
              <div
                style={{
                  display: "inline",
                  alignItems: "center",
                  height: "100%",
                  justifyItems: "center",
                }}
              >
                <div style={{ display: "inline-block" }}>
                  <ShoppingCartIcon />
                </div>
                <div style={{ display: "inline-block" }}>
                  <Typography variant="subtitle1">0 items</Typography>
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
