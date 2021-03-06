import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import * as React from "react";
import NumberFormat from "react-number-format";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const allBanks = require("../../config/bank.json");
const countries = require("../../config/country.json");

function TransferMain({ type }) {
  const [values, setValues] = React.useState({
    textmask: "(100) 000-0000",
    numberformat: "",
    mode: "local",
    accountNumber: "",
    bankname: "",
    fullname: "",
    swift: "",
    iban: "",
    country: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    navigate("../security");
  };
  return (
    <Container>
      <form onSubmit={submitForm}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Transaction type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="mode"
                value={values.mode}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="local"
                  name="mode"
                  control={<Radio />}
                  label="Local transfer"
                />
                <FormControlLabel
                  value="international"
                  name="mode"
                  control={<Radio />}
                  label="International transfer"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              label="Amount"
              value={values.numberformat}
              onChange={handleChange}
              name="numberformat"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              required
              id="outlined-basic"
              label="Account number"
              name="accountNumber"
              variant="outlined"
              fullWidth
            />
          </Grid>
          {values.mode === "local" ? (
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select bank
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="bankname"
                  value={values.bankname}
                  label={values.bankname}
                  onChange={handleChange}
                >
                  {allBanks.map((bank, index) => (
                    <MenuItem key={index} value={bank.bankName}>
                      {bank.bankName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ) : (
            <React.Fragment>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Recievers full name"
                  name="fullname"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Swift"
                  name="swift"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="IBAN"
                  name="iban"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Recievers country
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label-country"
                    id="demo-simple-select-country"
                    name="country"
                    value={values.country}
                    label={values.country}
                    onChange={handleChange}
                  >
                    {countries.map((cntry, index) => (
                      <MenuItem key={index} value={cntry.name}>
                        {cntry.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </React.Fragment>
          )}
          <Grid item xs={12} md={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disableElevation
            >
              {`Continue`}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default TransferMain;
