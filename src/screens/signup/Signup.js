import { Grid, makeStyles, TextField, Typography, Button } from '@material-ui/core'
import React, {useState} from 'react'
import TopBar from '../../components/topBar'

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: 40
    },
    spacing:{
        marginTop: 30
    },
    textFieldSpacing:{
        marginTop:20
    },
    footer:{
        backgroundColor:"#8080805c",
        marginTop: 20,
        padding:"15px 100px",
    }
}))

const SignUp = () => {
    const classes = useStyles();
    const [state, setstate] = useState(
        {   
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
            error:{
                email:false,
                password:false
            }
        }
    );

    const validation  = () => {

    let required = [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword",
      ];

    let errors = {};
    let formIsValid = true;
    let data = state;

    required.forEach((w) => {
      if (!data[w]) {
        formIsValid = false;
        errors[w] = true;
      }
    });
    setstate((prevState) => ({
        ...prevState,
        error: errors,
        // errorMessage: "Please select anyone option",
    }))
    if(formIsValid){
        let emailCheck = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(state?.email);
        let passwordCheck = /^(?=.*\d)(?=.*?[A-Za-z])(?=.*?[0-9])(?!.*\s).{6,}$/.test(state?.password);
        let confirmCheck = state?.password === state?.confirmPassword ? true : false;

        setstate((prevState) => ({
            ...prevState,
            error:{
                email: !emailCheck,
                password: !passwordCheck,
                confirmPassword: !confirmCheck
            },
            errorMessage:{
                email: !emailCheck ? "Email is not valid" : "",
                password: !passwordCheck ? "Password is not valid" : "",
                confirmPassword: !confirmCheck ? "Password does not match" : ""
            }
        }))
    }
        // if(!(state?.email) && !(state?.password)){
        //     setstate((prevState) => ({
        //         ...prevState,
        //         error:{
        //             email:true,
        //             password:true
        //         }
        //     }))
        // }
        // else if(state?.email && state?.password){
        //     alert(state?.email)
        //     let emailCheck = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(state?.email);
        //     let passwordCheck = /^(?=.*\d)(?=.*?[A-Za-z])(?=.*?[0-9])(?!.*\s).{6,}$/.test(state?.password);
        //     alert(emailCheck)

        //     setstate((prevState) => ({
        //         ...prevState,
        //         error:{
        //             email: !emailCheck,
        //             password: !passwordCheck
        //         }
        //     }))
        // }
        // else if(state?.email || state?.password){
        //     alert("2")
        //     setstate((prevState) => ({
        //         ...prevState,
        //         error:{
        //             email: !(state?.email),
        //             password: !(state?.password)
        //         }
        //     }))
        // }
        
    }

    const handleChange = ({target:{name,value}})  => {
        setstate((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    console.log(state)
    return (
        <div>
            <TopBar />
            <Grid container className={classes.root}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h3">SignUp</Typography>
                            <Typography variant="h6">We don't share your personal details to anyone</Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            name="firstName"
                            variant="standard"
                            label="FirstName"
                            placeholder="Enter your FirstName"
                            fullWidth
                            required
                            onChange={(e) => handleChange(e)}
                            error={state?.error?.firstName}
                            helperText={state?.error?.firstName &&"Enter your FirstName"}
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
                            helperText={state?.error?.lastName &&"Enter your LastName"}
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
                            helperText={state?.error?.email && state?.errorMessage?.email ? `${state?.errorMessage?.email}`
                            : state?.error?.email &&  "Enter your Email Id"}
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
                            helperText={state?.error?.password && state?.errorMessage?.password ? `${state?.errorMessage?.password}`
                            : state?.error?.password &&  "Enter your Password"}
                            className={classes.textFieldSpacing}
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
                            helperText={state?.error?.confirmPassword && state?.errorMessage?.confirmPassword ? `${state?.errorMessage?.confirmPassword}`
                            : state?.error?.confirmPassword &&  "Re-Enter your Password"}
                        
                        // state?.error?.confirmPassword ? (
                        //     state?.errorMessage?.confirmPassword ? state?.errorMessage?.confirmPassword : "Re-Enter your Password"
                        // ) : ""
                            className={classes.textFieldSpacing}
                            />
                            <Button 
                            variant="contained" color="secondary" fullWidth className={classes.spacing}
                            onClick={validation}
                            >SignUp</Button>
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
        </div>
    )
}

export default SignUp
