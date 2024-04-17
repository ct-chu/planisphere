"use client";

import styles from './page.module.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography, TextField, Autocomplete, Button, Divider, Stack } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React, { useState } from 'react';
// import NotoSansTC from "/NotoSansTC-VariableFont_wght.ttf"

const yellowStarchart = "/STARMAPv2022_yellow_3600x.png"
const jacket = "/STARMAPv2022_jacket_3600px.png"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      "NotoSansTC",
      'sans-serif',
    ].join(','),
  },
});

darkTheme.typography.h1 = {
  fontSize: "1.5rem",
  '@media (max-height:700px)': {
    fontSize: '1rem',
  },
  fontFamily: "NotoSansTC",
}

darkTheme.typography.h4 = {
  fontSize: "0.8rem",
  '@media (max-height:700px)': {
    fontSize: '0.6rem',
  },
  fontFamily: "NotoSansTC",
}

export default function Home() {

  const [rotateDeg, setRotateDeg] = useState(0)

  const months = ["1月 JAN", "2月 Feb", "3月 Mar", "4月 Apr", "5月 May", "6月 Jun", "7月 Jul", "8月 Aug", "9月 Sep", "10月 Oct", "11月 Nov", "12月 Dec"]
  const monthOffsetValues = [0, 30.49, 58.11, 88.65, 118.33, 148.86, 178.52, 209.04, 239.64, 269.15, 299.78, 329.37]
  const dayDeg = 0.98
  const days31 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
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

  const [month, setMonth] = useState(months[0])
  const [inputMonth, setInputMonth] = useState('')
  const [days, setDays] = useState(days31)
  const [day, setDay] = useState(days[0])
  const [inputDay, setInputDay] = useState('')
  const [time, setTime] = useState(times[24])
  const [inputTime, setInputTime] = useState('')
  const [rotating, setRotating] = useState(false)
  const [rotateStyle, setRotateStyle] = useState(1)
  // let root = document.documentElement.starchart

  // const rotate10deg = () => {
  //   setRotateDeg(rotateDeg + 10)
  //   console.log(rotateDeg)
  // }

  // const rotatem10deg = () => {
  //   setRotateDeg(rotateDeg - 10)
  //   console.log(rotateDeg)
  // }

  const setDaysInMonth = (month) => {
    let dayInM = days31
    console.log("month chosen")
    if ((month == "4月 Apr") || (month == "6月 Jun") || (month == "9月 Sep") || (month == "11月 Nov")) {
      dayInM.pop()
      setDays(dayInM)
    } else if (month == "2月 Feb") {
      for (let i = 0; i < 3; i++) {
        dayInM.pop()
      }
      setDays(dayInM)
      console.log(dayInM)
    } else {
      setDays(dayInM)
    }
    setDay(days31[0])
  }

  const rotateToTime = () => {
    let closestOrigin = rotateDeg - rotateDeg%360
    let selectedMonthOffset = -1 * monthOffsetValues[months.indexOf(month)]
    let selectedDayOffset = -1 * (Number(day) - 1) * dayDeg
    let selectedTimeOffset = timeOffsetValues[time]
    let totalOffset = selectedMonthOffset + selectedDayOffset + selectedTimeOffset
    setRotateStyle(Math.sqrt(Math.abs(closestOrigin+totalOffset-rotateDeg))/15 + "s ease-in-out")  
    setRotateDeg(closestOrigin + totalOffset)
  }

  const rotateAnimation = () => {
    console.log("rotate animation pressed")
    setRotateStyle("24s linear")
    setRotateDeg(rotateDeg - 360)
    // console.log(rotating)
    // let myVar = !rotating
    // setRotating(myVar)
    // console.log(rotating)
    // if (rotating) {
    //   console.log("start rotating")
    //   setRotateStyle("20s linear")
    //   setRotateDeg(-360)
    // setRotateStyle(0)
    // setRotateDeg(0)
    // setrotateStyle(1)
    // setRotating(!rotating)
    // } else {
    //   setRotateStyle("1s ease-in-out")
    // }
  }

  const RightPanel = () => {
    return (
      <Grid container
        textAlign="center"
        direction="column"
        alignItems="center"
        spacing={1}
      >
        <Typography variant="h1">
          Interactive<br/>Planisphere<br/>互動旋轉星圖
        </Typography>
        <br /> <br />
        <Divider sx={{paddingTop: "3vh", paddingBottom: "1vh"}} orientation="horizontal" flexItem>
          Go to Time
        </Divider>
        <br />
          <Autocomplete
            size="small"
            disablePortal
            selectOnFocus
            options={months}
            value={month}
            onChange={(event, newValue) => {
              setMonth(newValue)
              setDaysInMonth(newValue)
            }}
            sx={{ width: 155, paddingBottom: "1vh" }}
            renderInput={(params) => <TextField {...params} label="月 Month" />}
          />
          <br />
          <Autocomplete
            size="small"
            disablePortal
            selectOnFocus
            options={days}
            value={day}
            onChange={(event, newValue) => {
              setDay(newValue)
            }}
            sx={{ width: 155, paddingBottom: "1vh" }}
            renderInput={(params) => <TextField {...params} label="日 Day" />}
          />
          <br />
          <Autocomplete
            size="small"
            disablePortal
            selectOnFocus
            options={times}
            value={time}
            onChange={(eventT, newTime) => {
              setTime(newTime);
            }}
            sx={{ width: 155, paddingBottom: "1vh" }}
            renderInput={(displayTime) => <TextField {...displayTime} label="時 Time" />}
          />
          
        <br />
        <Button
          variant="contained"
          onClick={rotateToTime}
        >
          GO
        </Button>
        <br /> <br />
        <Divider sx={{paddingTop: "3vh", paddingBottom: "1vh"}} orientation="horizontal" flexItem>
          Animation
        </Divider>
        <item>
          {/* <Button
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
          <br />*/}
          <Button
            variant="contained"
            onClick={rotateAnimation}
            style={{ textTransform: "none"}}
          >
            3600x Real Speed
          </Button>
        </item>
      </Grid>
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className={styles.container} maxWidth={false}>
        <Grid container
          direction="row"
          spacing={2}
          sx={{
            height: "100vh",
            width: "100%",
          }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid xs={6}
            sx={{
              height: "95vh",
              width: "95vh"
            }}
            style={{ position: "relative" }}
          >
            <div className={styles.starchart}>
              <img height="100%" style={{ transition: rotateStyle, rotate: `${rotateDeg}deg` }} src={yellowStarchart} />
              <div className={styles.overlay}>
                <img height="100%" width="100%" src={jacket} />
              </div>
            </div>
          </Grid>
          <Grid container
            xs={3}
            direction="column"
            justifyContent="space-around"
            height={"100%"}
            // alignItems="stretch"
          >
            {/* <Grid item maxHeight={"100vh"}> */}
              <RightPanel />
            {/* </Grid> */}
            <Grid item>
              <Typography variant="h4" textAlign={"center"}>
                v20240417 by ctchu@HKNEAC 
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}