import {
  Grid,
  makeStyles,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Popover,
} from "@material-ui/core";
import React, { useState } from "react";
import TopBar from "../../components/topBar";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useHistory } from "react-router-dom";
import { Routes } from "../../router/routes";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
  },
  spacing: {
    marginTop: 30,
  },
  textFieldSpacing: {
    marginTop: 20,
  },
  footer: {
    backgroundColor: "#8080805c",
    marginTop: 20,
    padding: "15px 100px",
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setstate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const validation = () => {
    let required = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ];

    let errors = {};
    let formIsValid = false;
    let data = state;

    required.forEach((w) => {
      if (!data[w]) {
        // formIsValid = false;
        errors[w] = true;
      }
    });
    setstate((prevState) => ({
      ...prevState,
      error: errors,
      // errorMessage: "Please select anyone option",
    }));
    if (state?.email || state?.password || state?.confirmPassword) {
      let emailCheck = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(
        state?.email
      );
      let passwordCheck =
        /^(?=.*\d)(?=.*?[A-Za-z])(?=.*?[0-9])(?!.*\s).{6,}$/.test(
          state?.password
        );
      let confirmCheck =
        state?.password === state?.confirmPassword ? true : false;

      setstate((prevState) => ({
        ...prevState,
        error: {
          ...prevState?.error,
          email: state?.email ? !emailCheck : state?.error?.email,
          password: state?.password ? !passwordCheck : state?.error?.password,
          confirmPassword: state?.confirmPassword
            ? !confirmCheck
            : state?.error?.confirmPassword,
        },
        errorMessage: {
          email: state?.email && !emailCheck ? "Email is not valid" : "",
          password:
            state?.password && !passwordCheck ? "Password is not valid" : "",
          confirmPassword:
            state?.confirmPassword && !confirmCheck
              ? "Password does not match"
              : "",
        },
      }));
      if (emailCheck && passwordCheck && confirmCheck) {
        formIsValid = true;
      }
    }
    if (formIsValid) {
      history.push(Routes.login);
      window?.localStorage.setItem("Email", state?.email);
      window?.localStorage.setItem("Password", state?.password);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setstate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(state);
  return (
    <div>
      <TopBar />
      <Grid container className={classes.root}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h3">SignUp</Typography>
              <Typography variant="h6">
                We don't share your personal details to anyone
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="firstName"
                name="firstName"
                title="firstName"
                variant="standard"
                label="FirstName"
                placeholder="Enter your FirstName"
                fullWidth
                required
                onChange={(e) => handleChange(e)}
                error={state?.error?.firstName}
                helperText={state?.error?.firstName && "Enter your FirstName"}
              />
              <TextField
                name="lastName"
                variant="standard"
                label="LastName"
                placeholder="Enter your LastName"
                fullWidth
                required
                onChange={(e) => handleChange(e)}
                error={state?.error?.lastName}
                helperText={state?.error?.lastName && "Enter your LastName"}
                className={classes.textFieldSpacing}
              />
              <TextField
                name="email"
                variant="standard"
                label="Email"
                placeholder="Enter your Email Id"
                fullWidth
                required
                onChange={(e) => handleChange(e)}
                error={state?.error?.email}
                helperText={
                  state?.error?.email && state?.errorMessage?.email
                    ? `${state?.errorMessage?.email}`
                    : state?.error?.email && "Enter your Email Id"
                }
                className={classes.textFieldSpacing}
              />
              <TextField
                name="password"
                variant="standard"
                label="Password"
                placeholder="Enter your Password"
                fullWidth
                required
                onChange={(e) => handleChange(e)}
                error={state?.error?.password}
                helperText={
                  state?.error?.password && state?.errorMessage?.password
                    ? `${state?.errorMessage?.password}`
                    : state?.error?.password && "Enter your Password"
                }
                className={classes.textFieldSpacing}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start" onClick={handleClick}>
                      <InfoOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="confirmPassword"
                variant="standard"
                label="Confirm Password"
                placeholder="Re-Enter your Password"
                fullWidth
                required
                onChange={(e) => handleChange(e)}
                error={state?.error?.confirmPassword}
                helperText={
                  state?.error?.confirmPassword &&
                  state?.errorMessage?.confirmPassword
                    ? `${state?.errorMessage?.confirmPassword}`
                    : state?.error?.confirmPassword && "Re-Enter your Password"
                }
                // state?.error?.confirmPassword ? (
                //     state?.errorMessage?.confirmPassword ? state?.errorMessage?.confirmPassword : "Re-Enter your Password"
                // ) : ""
                className={classes.textFieldSpacing}
              />
              <Button
                id="button"
                title="button"
                variant="contained"
                color="secondary"
                fullWidth
                className={classes.spacing}
                onClick={validation}
              >
                SignUp
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Grid className={classes.footer}>
        <Typography variant="caption" align="center">
          Copyright 2011-2018 Sabka Bazaar Supplies Pvt. Ltd.
        </Typography>
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          1. Minimum length 6 characters <br /> 2. Must have a number and
          alphabet <br /> 3. Cannot have spaces
        </Typography>
      </Popover>
    </div>
  );
};

export default SignUp;
