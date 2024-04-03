"use client";

import styles from './page.module.css'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography, TextField, Autocomplete, Button } from '@mui/material';
import React, { useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const yellowStarchart = "/STARMAPv2022_yellow_3600x.png"
const jacket = "/STARMAPv2022_jacket_3600px.png"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {

  const [rotateDeg, setRotateDeg] = useState(0)
  
  const months = ["1","2","3","4","5","6","7","8","9","10","11","12"]
  const monthOffsetValues = [0, 30.49, 58.11, 88.65, 118.33, 148.86, 178.52, 209.04, 239.64, 269.15, 299.78, 329.37]
  const times = ["6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM", "8:45 PM", "9:00 PM", "9:15 PM", "9:30 PM", "9:45 PM", "10:00 PM", "10:15 PM", "10:30 PM", "10:45 PM", "11:00 PM", "11:15 PM", "11:30 PM", "11:45 PM", "12:00 AM", "12:15 AM", "12:30 AM", "12:45 AM", "1:00 AM", "1:15 AM", "1:30 AM", "1:45 AM", "2:00 AM", "2:15 AM", "2:30 AM", "2:45 AM", "3:00 AM", "3:15 AM", "3:30 AM", "3:45 AM", "4:00 AM", "4:15 AM", "4:30 AM", "4:45 AM", "5:00 AM", "5:15 AM", "5:30 AM", "5:45 AM", "6:00 AM"]
  const timeOffsetValues = {
    "6:00 PM": 89.4,
    "6:15 PM": 85.7,
    "6:30 PM": 81.9,
    "6:45 PM": 78.1,
    "7:00 PM": 74.4,
    "7:15 PM": 70.7,
    "7:30 PM": 67.0,
    "7:45 PM": 63.2,
    "8:00 PM": 59.5,
    "8:15 PM": 55.7,
    "8:30 PM": 52.0,
    "8:45 PM": 48.3,
    "9:00 PM": 44.6,
    "9:15 PM": 40.8,
    "9:30 PM": 37.1,
    "9:45 PM": 33.4,
    "10:00 PM": 29.7,
    "10:15 PM": 26.0,
    "10:30 PM": 22.3,
    "10:45 PM": 18.6,
    "11:00 PM": 14.9,
    "11:15 PM": 11.2,
    "11:30 PM": 7.4,
    "11:45 PM": 3.7,
    "12:00 AM": 0.0,
    "12:15 AM": -3.7,
    "12:30 AM": -7.4,
    "12:45 AM": -11.2,
    "1:00 AM": -14.9,
    "1:15 AM": -18.6,
    "1:30 AM": -22.3,
    "1:45 AM": -26.0,
    "2:00 AM": -29.7,
    "2:15 AM": -33.4,
    "2:30 AM": -37.1,
    "2:45 AM": -40.8,
    "3:00 AM": -44.6,
    "3:15 AM": -48.3,
    "3:30 AM": -52.0,
    "3:45 AM": -55.7,
    "4:00 AM": -59.5,
    "4:15 AM": -63.2,
    "4:30 AM": -67.0,
    "4:45 AM": -70.7,
    "5:00 AM": -74.4,
    "5:15 AM": -78.1,
    "5:30 AM": -81.9,
    "5:45 AM": -85.7,
    "6:00 AM": -89.4,
  }
  const days = [1,2,3,4,5,6,7,8,9,10,11,12]

  const [month, setMonth] = useState(months[0])
  const [inputMonth, setInputMonth] = React.useState('');
  const [time, setTime] = useState(times[0])
  const [inputTime, setInputTime] = React.useState('');
  // let root = document.documentElement.starchart

  const rotate10deg = () => {
    setRotateDeg(rotateDeg+10)
    // root.style.setProperty("--starchart-rotation", rotateDeg, "deg")
    console.log(rotateDeg)
  }

  const rotatem10deg = () => {
    setRotateDeg(rotateDeg-10)
    // root.style.setProperty("--starchart-rotation", rotateDeg, "deg")
    console.log(rotateDeg)
  }

  const rotateToTime = () => {
    let selectedMonthOffset = -1* monthOffsetValues[Number(month)-1]
    let selectedTimeOffset = timeOffsetValues[time]
    // let selectedTimeOffset = 0
    setRotateDeg(selectedMonthOffset + selectedTimeOffset)
    console.log(month)
    console.log(time)
    console.log(rotateDeg)
  }

 return (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
   <div className={styles.container}>
    <Grid container
      direction="row"
      spacing={2}
      sx={{
        height: "100vh",
        width: "100%",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid xs={8}
        sx={{
          height: "90vh",
          width : "90vh"
        }}
      >
        <div className={styles.starchart}>
          <img height="100%" style={{rotate: `${rotateDeg}deg`}} src={yellowStarchart}/>
          <div className={styles.overlay}>
            <img height="100%" width="100%" src={jacket}/>
          </div>
        </div>
      </Grid>
      <Grid 
        xs={2}
      >
        <Autocomplete
          disablePortal
          autoHighlight
          options={months}
          value={month}
          onChange={(event, newValue) => {
            setMonth(newValue);
          }}
          sx={{width:200}}
          renderInput={(params) => <TextField {...params} label="Month" />}
        />
        {/* <Autocomplete
          disablePortal
          autoHighlight
          options={days}
          sx={{width:100}}
          renderInput={(params) => <TextField {...params} label="Day" />}
        /> */}
        <Autocomplete
          disablePortal
          autoHighlight
          options={times}
          value={time}
          onChange={(eventT, newTime) => {
            setTime(newTime);
          }}
          sx={{width:200}}
          renderInput={(displayTime) => <TextField {...displayTime} label="Time" />}
        />
         <Button
          variant="contained"
          onClick={rotateToTime}
          >
            GO
        </Button>
        <Button
          variant="contained"
          onClick={rotatem10deg}
          >
            &lt;
        </Button>
        <Button
          variant="contained"
          onClick={rotate10deg}
          >
            &gt;
        </Button>
      </Grid>
    </Grid>
   </div>
  </ThemeProvider>
 );
}