"use client";

import styles from './page.module.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography, TextField, Autocomplete, Button, Divider, ToggleButton, ToggleButtonGroup, Backdrop } from '@mui/material';

// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import SettingsIcon from '@mui/icons-material/Settings';

import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { useOrientation } from "react-use";

const yellowStarchart = `${prefix}/STARMAPv2022_yellow_3600x.png`
const orangeStarchart = `${prefix}/STARMAPv2022_orange_3600x.png`
const redStarchart = `${prefix}/STARMAPv2022_red_3600x.png`
const jacket = `${prefix}/STARMAPv2022_jacket_3600px.png`
const landscapeGIF = `${prefix}/landscape.gif`

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      light: '#ff7961',
      main: '#bf616a',
      dark: '#ba000d',
      contrastText: '#000',
    },
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
  '@media (max-height:650px)': {
    fontSize: '1rem',
  },
  '@media (min-height:800px)': {
    fontSize: '2rem',
  },
  fontFamily: "NotoSansTC",
}

darkTheme.typography.h3 = {
  fontSize: "1rem",
  '@media (max-height:700px)': {
    fontSize: '0.6rem',
  },
  fontFamily: "NotoSansTC",
}

darkTheme.typography.h4 = {
  fontSize: "0.8rem",
  '@media (max-height:700px)': {
    fontSize: '0.4rem',
  },
  fontFamily: "NotoSansTC",
}

export default function Home() {

  const months = ["1月 Jan", "2月 Feb", "3月 Mar", "4月 Apr", "5月 May", "6月 Jun", "7月 Jul", "8月 Aug", "9月 Sep", "10月 Oct", "11月 Nov", "12月 Dec"]
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

  const [rotateDeg, setRotateDeg] = useState(0)
  const [showingStarchart, setShowingStarchart] = useState(1)
  const [opacity, setOpacity] = useState([1, 0, 0])
  const [month, setMonth] = useState(months[0])
  const [days, setDays] = useState(days31)
  const [day, setDay] = useState(days[0])
  const [time, setTime] = useState(times[24])
  const [rotateStyle, setRotateStyle] = useState("1s ease-in-out, opacity .15s ease-in-out")
  const screen = useOrientation();
  const [landscapeReminder, setLandscapeReminder] = useState(false)

  // const rotate10deg = () => {
  //   setRotateDeg(rotateDeg + 10)
  //   console.log(rotateDeg)
  // }

  // const rotatem10deg = () => {
  //   setRotateDeg(rotateDeg - 10)
  //   console.log(rotateDeg)
  // }

  useEffect(() => {
    const noSelectElements =
      document.querySelectorAll(".no-select");
    noSelectElements.forEach((element) => {
      element.style.webkitUserSelect = "none";
      element.style.mozUserSelect = "none";
      element.style.msUserSelect = "none";
      element.style.userSelect = "none";
    });
  }, []);

  useEffect(() => {
    
    (screen.type === "portrait-primary") || (screen.type === "portrait-secondary") ? setLandscapeReminder(true) : setLandscapeReminder(false)
    console.log(screen.type)
  }, [screen])

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
    let closestOrigin = rotateDeg - rotateDeg % 360
    let selectedMonthOffset = -1 * monthOffsetValues[months.indexOf(month)]
    let selectedDayOffset = -1 * (Number(day) - 1) * dayDeg
    let selectedTimeOffset = timeOffsetValues[time]
    let totalOffset = selectedMonthOffset + selectedDayOffset + selectedTimeOffset
    setRotateStyle(Math.sqrt(Math.abs(closestOrigin + totalOffset - rotateDeg)) / 15 + "s ease-in-out, opacity .15s ease-in-out")
    setRotateDeg(closestOrigin + totalOffset)
  }

  const rotateAnimation = () => {
    console.log("rotate animation pressed")
    setRotateStyle("24s linear, opacity .15s ease-in-out")
    setRotateDeg(rotateDeg - 360)
  }

  const starchartChange = (event, newStarchart) => {
    if (newStarchart == 1) {
      setOpacity([1, 0, 0])
      setShowingStarchart(newStarchart)
    } else if (newStarchart == 2) {
      setOpacity([0, 1, 0])
      setShowingStarchart(newStarchart)
    } else if (newStarchart == 3) {
      setOpacity([0, 0, 1])
      setShowingStarchart(newStarchart)
    } else {
      setOpacity([1, 0, 0])
      setShowingStarchart(1)
    }
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
          Interactive Planisphere<br />互動旋轉星圖
        </Typography>
        <Divider sx={{ paddingTop: "3vh", paddingBottom: "1vh" }} orientation="horizontal" flexItem>
          <Typography variant="h3">Choose Starchart</Typography>
        </Divider>
        <ToggleButtonGroup
          color="secondary"
          value={showingStarchart}
          exclusive
          onChange={starchartChange}
          aria-label="Platform"
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 3,
            paddingBottom: 3,
            minWidth: 0,
            minHeight: 0,
            maxHeight: "2.5rem",
          }}
        >
          <ToggleButton value={1}>西方</ToggleButton>
          <ToggleButton value={2}>市區</ToggleButton>
          <ToggleButton value={3}>中國</ToggleButton>
        </ToggleButtonGroup>
        <Divider sx={{ paddingTop: "3vh", paddingBottom: "1vh" }} orientation="horizontal" flexItem>
          <Typography variant="h3">Go to Time</Typography>
        </Divider>
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
        <Button
          variant="contained"
          onClick={rotateToTime}
          style={{
            backgroundColor: "#bf616a",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 3,
            paddingBottom: 3,
            maxWidth: "3rem",
            minWidth: 0,
            minHeight: 0,
            marginRight: "0.3rem",
          }}
        >
          <Typography variant="h3">GO</Typography>
        </Button>
        <Divider sx={{ paddingTop: "3vh", paddingBottom: "1vh" }} orientation="horizontal" flexItem>
          <Typography variant="h3">Animation</Typography>
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
            style={{
              textTransform: "none",
              backgroundColor: "#bf616a",
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 3,
              paddingBottom: 3,
            }}
          >
            <Typography variant="h3">3600x Real Speed</Typography>
          </Button>
        </item>
        <Divider sx={{ paddingTop: "3vh", paddingBottom: "1vh" }} orientation="horizontal" flexItem>
          <Typography variant="h3">Zoom</Typography>
        </Divider>
        <ZoomControls />
      </Grid>
    )
  }

  const ZoomControls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <Grid container
        direction="row"
      >
        <Button
          variant="contained"
          size="small"
          style={{
            textTransform: "none",
            backgroundColor: "#bf616a",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 3,
            paddingBottom: 3,
            maxWidth: "3rem",
            minWidth: 0,
            minHeight: 0,
            marginRight: "0.3rem",
          }}
          onClick={() => zoomIn()}
        >
          <ZoomInIcon />
        </Button>
        <Button
          variant="contained"
          style={{
            textTransform: "none",
            backgroundColor: "#bf616a",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 3,
            paddingBottom: 3,
            maxWidth: "3rem",
            minWidth: 0,
            minHeight: 0,
            marginRight: "0.3rem"
          }}
          onClick={() => zoomOut()}
        >
          <ZoomOutIcon />
        </Button>
        <Button
          variant="contained"
          style={{
            textTransform: "none",
            backgroundColor: "#bf616a",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 3,
            paddingBottom: 3,
            maxWidth: "3rem",
            minWidth: 0,
            minHeight: 0,
          }}
          onClick={() => resetTransform()}
        >
          <ZoomOutMapIcon />
        </Button>
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={landscapeReminder}
      >
        <Grid container
          direction="row"
          alignContent="center"
          justifyContent="center"
        >
          <img src={landscapeGIF}/>
          <Typography
            variant="h3"
            align="center"
          >
            Please rotate your device to landscape mode.
            <br />
            請將你的裝置轉為橫向。
          </Typography>
        </Grid>
      </Backdrop>
      <div className={styles.container} maxWidth={false}>
        <TransformWrapper
          wheel={{ disabled: true }}
          disablePadding={true}
        >
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
            <Grid
              xs={6}
              className={"no-select"}
              sx={{
                height: "95vh",
                width: "95vh"
              }}
              style={{ position: "relative" }}
            >

              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                }}
                contentStyle={{
                  width: "100%",
                  height: "100%"
                }}
              >
                <div className={styles.starchart}>
                  <img className={styles.imgStartchart} height="100%" style={{ transition: rotateStyle, rotate: `${rotateDeg}deg`, position: "absolute", opacity: `${opacity[0]}` }} src={yellowStarchart} />
                  <img className={styles.imgStartchart} height="100%" style={{ transition: rotateStyle, rotate: `${rotateDeg}deg`, position: "absolute", opacity: `${opacity[1]}` }} src={orangeStarchart} />
                  <img className={styles.imgStartchart} height="100%" style={{ transition: rotateStyle, rotate: `${rotateDeg}deg`, position: "absolute", opacity: `${opacity[2]}` }} src={redStarchart} />
                  <div className={styles.overlay}>
                    <img height="100%" width="100%" src={jacket} />
                  </div>
                </div>
              </TransformComponent>
            </Grid>
            <Grid container
              xs={3}
              direction="column"
              justifyContent="space-around"
              height={"100%"}
            >
              <RightPanel />
              <Grid>
                <Typography variant="h4" textAlign={"center"} color="#4c566a">
                  v20240417 by ctchu@HKNEAC
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </TransformWrapper>
      </div>
    </ThemeProvider>
  );
}