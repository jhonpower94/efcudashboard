import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Checkbox, FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { navigate } from "@reach/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, signInWithEmailAndPassword } from "../../config/firebaseinit";
import { loading$ } from "../../redux/action";
import Logo from "../logo";

//import Logo from "./logo";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  margintop: {
    marginTop: theme.spacing(4),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const loading = useSelector((state) => state.loading);
  const classes = useStyles();

  const dispatch = useDispatch();
  const [remenberme, setRemenberme] = useState(false);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const changepersistance = (bol) => {
    setRemenberme(bol);
    console.log(bol);
  };
  const submitLogin = (event) => {
    event.preventDefault();
    dispatch(loading$());
    /*  const persistance = remenberme
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.NONE;
      */

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        dispatch(loading$());
        navigate("dashboard/account");
        // ...
      })
      .catch((error) => {
       // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div className={classes.paper}>
      <Logo />
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={submitLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          onChange={handleChange("email")}
          autoComplete="email"
          autoFocus
        />
        <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              onChange={() => changepersistance(!remenberme)}
            />
          }
          label="Remember me"
        />
        <LoadingButton
          type="submit"
          fullWidth
          loading={loading.loading}
          variant="contained"
          color="primary"
          disableElevation
        >
          {"Sign up"}
        </LoadingButton>
        
      </form>
      <Grid container spacing={3}>
        <Grid mt={4} item>
          <Link
            component="button"
            onClick={() => navigate("account/resetpassword")}
            color="textPrimary"
          >
            {`Forgot password`}
          </Link>
        </Grid>
        <Grid mt={4} item>
          <Link
            component="button"
            onClick={() => navigate("signup")}
            color="textPrimary"
          >
            {`Don't have an account`}
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
