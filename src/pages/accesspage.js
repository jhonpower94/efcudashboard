import * as React from "react";
import { Alert, AlertTitle, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { notification$ } from "../redux/action";

export default function AccessPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      notification$({
        title: "⛔ Access denied",
        discription:
          "Sorry you are not allowed to process transactions or make changes currently, please contact our live support to fix issue.",
      })
    );
  }, []);
  return (
    <>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12} md={6}>
          <Alert variant="filled" severity="warning">
            <AlertTitle>Sorry! Account frozen!</AlertTitle>
            Your account is temporary locked down for some security reasons.
            Click on the livechat button or the link below &#128071; to contact customer service.
            <a href="https://jivo.chat/RQaN8yO0S2" target="_self">
              <Typography variant="h6">
                Live chat 
              </Typography>
            </a>
          </Alert>
        </Grid>
      </Grid>
    </>
  );
}
