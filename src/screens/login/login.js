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
    footer:{
        backgroundColor:"#8080805c",
        marginTop: 20,
        padding:"15px 100px",
    }
}))

const Login = () => {
    const classes = useStyles();
    const [state, setstate] = useState(
        {
            email:"",
            password:"",
            error:{
                email:false,
                password:false
            }
        }
    );

    const validation  = () => {
        if(!(state?.email) && !(state?.password)){
            setstate((prevState) => ({
                ...prevState,
                error:{
                    email:true,
                    password:true
                }
            }))
        }
        else if(state?.email && state?.password){
            alert(state?.email)
            let emailCheck = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(state?.email);
            let passwordCheck = /^(?=.*\d)(?=.*?[A-Za-z])(?=.*?[0-9])(?!.*\s).{6,}$/.test(state?.password);
            alert(emailCheck)

            setstate((prevState) => ({
                ...prevState,
                error:{
                    email: !emailCheck,
                    password: !passwordCheck
                }
            }))
        }
        else if(state?.email || state?.password){
            alert("2")
            setstate((prevState) => ({
                ...prevState,
                error:{
                    email: !(state?.email),
                    password: !(state?.password)
                }
            }))
        }
        
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
                            <Typography variant="h3">Login</Typography>
                            <Typography variant="h6">Get access to your Orders, Wishlist and Recommendations</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            name="email"
                            variant="standard"
                            label="Email"
                            placeholder="Enter your Email Id"
                            fullWidth
                            required
                            onChange={(e) => handleChange(e)}
                            error={state?.error?.email}
                            helperText={state?.error?.email &&"Enter your Email"}
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
                            helperText={state?.error?.password && "Enter your Password"}
                            className={classes.spacing}
                            />
                            <Button 
                            variant="contained" color="secondary" fullWidth className={classes.spacing}
                            onClick={validation}
                            >Login</Button>
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

export default Login
