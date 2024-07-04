"use client";

import styles from './page.module.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography, Select, ListSubheader, MenuItem, Button, Divider, ToggleButton, ToggleButtonGroup, Backdrop, IconButton, Tooltip, SpeedDial, SpeedDialAction, SvgIcon } from '@mui/material';

// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import HelpIcon from '@mui/icons-material/Help';
import { MoreHoriz, PlayArrow, Stop } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import React, { useState, useEffect, version } from 'react';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { useOrientation } from "react-use";
import LazyLoad from 'react-lazyload';

import { prefix } from './prefix.js';

const jacket = `${prefix}/STARMAP_jacket_front.svg`
const landscapeGIF = `${prefix}/landscape.gif`
const versionInfo = "v1.1.2(20240704) by ctchu@HKNEAC"

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
      "Noto Sans TC",
      'sans-serif',
    ].join(','),
    button: {
      fontSize: "2vh",
    },
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
  fontFamily: "Noto Sans TC",
}

darkTheme.typography.h3 = {
  fontSize: "1rem",
  '@media (max-height:700px)': {
    fontSize: '0.6rem',
  },
  fontFamily: "Noto Sans TC",
}

darkTheme.typography.h4 = {
  fontSize: "0.6rem",
  '@media (max-height:700px)': {
    fontSize: '0.5rem',
  },
  fontFamily: "Noto Sans TC",
}

if (process.env.NODE_ENV === "production") {
  console.log = () => { };
}

export default function Home() {

  const months = {
    hk: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    en:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  }
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

  const [rotateDeg, setRotateDeg] = useState(59.5)
  const [currentDeg, setCurrentDeg] = useState(0)
  const [showingStarchart, setShowingStarchart] = useState(1)
  const [opacity, setOpacity] = useState([1, 0, 0])
  const [displayMonths, setDisplayMonths] = useState(months.hk)
  const [month, setMonth] = useState(displayMonths[0])
  const [days, setDays] = useState(days31)
  const [day, setDay] = useState(days[0])
  const [time, setTime] = useState(times[8])
  const [rotateStyle, setRotateStyle] = useState("1s ease-in-out, opacity .15s ease-in-out")
  const screen = useOrientation();
  const [landscapeReminder, setLandscapeReminder] = useState(false)
  const [language, setLanguage] = useState("hk")
  const [animation, setAnimation] = useState("none !important")
  const [animationState, setAnimationState] = useState("paused")

  const [iauStarchart, setIauStarchart] = useState(`${prefix}/STARMAP_IAU_CHN.svg`)
  const [urbanStarchart, setUrbanStarchart] = useState(`${prefix}/STARMAP_URBAN_CHN.svg`)
  const [chnStarchart, setChnStarchart] = useState(`${prefix}/STARMAP_CHN_CHN.svg`)

  const content = {
    hk: {
      title: "互動旋轉星圖",
      chooseChart: "選擇星圖",
      iauChart: "西方",
      urbanChart: "市區",
      cnChart: "中國",
      gotoT: "前往時間",
      month: "月",
      day: "日",
      time: "時",
      rotation: "旋轉",
      zoom: "縮放",
      speed: "速度：",
      chartInfo: <div><i><b>西方：</b></i>顯示國際天文聯會（IAU）的88星座和4等或更光的星星<br /><i><b>市區：</b></i>只顯示在市區星空可見，較光的IAU星座，星座圖案和幾何圖形<br /><i><b>中國：</b></i>顯示中國古代星官</div>,
      rotationInfo: "模擬星空隨時間變化的移動：以現實的3600倍速將星圖旋轉，即不是以24小時，而是以24秒旋轉一圈",
      homepage: "可觀主頁",
      startRotation: "開始旋轉",
      stopRotation: "停止旋轉",
      zoomIn: "放大星圖",
      zoomOut: "縮小星圖",
      zoomReset: "重設縮放（縮到最少）",
      more: "更多",
      zoomToSky:"將天空置中",
    },
    en: {
      title: "Interactive Planisphere",
      chooseChart: "Choose Starchart",
      iauChart: "IAU",
      urbanChart: "Urban",
      cnChart: "Chinese",
      gotoT: "Go to time...",
      month: "Month",
      day: "Day",
      time: "Time",
      rotation: "Rotation",
      zoom: "Zoom",
      speed: "Speed:",
      chartInfo: <div><i><b>IAU:</b></i> shows the 88 IAU constellations with stars up to magnitude of 4<br /><i><b>Urban:</b></i> shows IAU constellations but only those with brighter stars visible in urban night skies, constellation art, and asterisms<br /><i><b>Chinese:</b></i> shows ancient Chinese constellations</div>,
      rotationInfo: "Simulate star movement through time, but in 3600x real-speed, meaning it will takes 24 seconds instead of 24 hours to perform one full rotation",
      homepage: "HKNEAC",
      startRotation: "Start rotation",
      stopRotation: "Stop rotation",
      zoomIn: "Zoom in planisphere",
      zoomOut: "Zoom out planisphere",
      zoomReset: "Reset zoom (zoom out to smallest)",
      more: "More",
      zoomToSky:"Centre on the sky",
    }
  }

  const [displayContent, setDisplayContent] = useState(content.hk)

  const actions = [
    {name: displayContent.homepage, icon: <HomeIcon />, url: "http://www.hokoon.edu.hk/"},
    {name: "Facebook", icon: <FacebookIcon />, url: "https://www.facebook.com/hokoon.astro/"},
    {name: "Instagram", icon: <InstagramIcon />, url: "https://www.instagram.com/hokoon.astro/"},
    {name: "YouTube", icon: <YouTubeIcon />, url: "https://www.youtube.com/@HokoonChannel"},
  ]

  const ZoomToSkyIcon = () => {
    return(
      <SvgIcon style={{ height: "3.5vh" }}>
        <svg viewBox="0 0 1182 1182" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" >
            <path d="M593.352,191.596C1037.26,200.331 1152.14,411.603 1131.2,572.477C1096.86,836.357 826.467,989.517 593.352,989.517C249.565,989.517 68.179,726.567 49.478,572.477C33.265,438.885 120.438,309.582 285.011,243.282C418.548,189.486 593.352,191.596 593.352,191.596ZM587.751,350.79L529.704,529.44L341.86,529.44L493.829,639.851L435.782,818.501L587.751,708.09L739.719,818.501L681.673,639.851L833.641,529.44L645.798,529.44L587.751,350.79Z" fill="#000"/>
        </svg>
      </SvgIcon>
  )}
  const ZoomOutMaxIcon = () => {
    return(
      <SvgIcon style={{ height: "3.5vh" }}>
        <svg viewBox="0 0 1182 1182" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" >
            <path d="M590.551,0C590.551,0 808.724,-5.349 965.91,151.22C1127.77,312.444 1133.24,502.17 1133.24,502.17L1181.1,502.17L1181.1,1039.49L1073.77,1181.1L107.334,1181.1L0,1039.49L0,502.17L47.863,502.17C47.863,502.17 53.332,312.444 215.192,151.22C372.378,-5.349 590.551,0 590.551,0ZM592.932,466.192C592.932,466.192 444.337,464.398 330.821,510.129C190.923,566.488 116.82,676.405 130.602,789.966C146.499,920.954 300.69,1144.48 592.932,1144.48C791.095,1144.48 1020.94,1014.28 1050.14,789.966C1067.94,653.213 970.282,473.617 592.932,466.192ZM588.171,601.518L637.514,753.382L797.194,753.382L668.011,847.24L717.354,999.104L588.171,905.247L458.987,999.104L508.331,847.24L379.147,753.382L538.827,753.382L588.171,601.518Z" fill="#000"/>
        </svg>
      </SvgIcon>
  )}

  // const rotate10deg = () => {
  //   setRotateDeg(rotateDeg + 10)
  //   console.log(rotateDeg)
  // }

  // const rotatem10deg = () => {
  //   setRotateDeg(rotateDeg - 10)
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
    console.log("screen type = "+ screen.type)
  }, [screen])

  const setDaysInMonth = (month) => {
    let dayInM = days31
    console.log("month chosen")
    if ((month == displayMonths[3]) || (month == displayMonths[5]) || (month == displayMonths[8]) || (month == displayMonths[10])) {
      dayInM.pop()
      setDays(dayInM)
    } else if (month == displayMonths[1]) {
      for (let i = 0; i < 3; i++) {
        dayInM.pop()
      }
      setDays(dayInM)
    } else {
      setDays(dayInM)
    }
    setDay(days31[0])
  }

  const rotateToTime = () => {
    let animationDeg = 360 - getCurrentRotation(document.getElementById("rotationWrapper"))
    console.log("animation deg = " + animationDeg)
    let closestOrigin = rotateDeg - rotateDeg % 360
    let selectedMonthOffset = -1 * monthOffsetValues[displayMonths.indexOf(month)]
    let selectedDayOffset = -1 * (Number(day) - 1) * dayDeg
    let selectedTimeOffset = timeOffsetValues[time]
    let totalOffset = selectedMonthOffset + selectedDayOffset + selectedTimeOffset + animationDeg
    let rotationAngle = Math.abs(totalOffset - rotateDeg)
    let rotationAngleMod = Math.abs(totalOffset%360 - rotateDeg%360)
    if (rotationAngle > 0.1 && rotationAngleMod > 0.1 ) {
    setRotateStyle(Math.sqrt(Math.abs(closestOrigin + totalOffset - rotateDeg)) / 15 + "s ease-in-out, opacity .15s ease-in-out")
    setRotateDeg(closestOrigin + totalOffset)
    }
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

  const languageChange = (event, newLanguage) => {
    setLanguage(newLanguage)
    if (newLanguage == "hk") {
      setIauStarchart(`${prefix}/STARMAP_IAU_CHN.svg`)
      setUrbanStarchart(`${prefix}/STARMAP_URBAN_CHN.svg`)
      setChnStarchart(`${prefix}/STARMAP_CHN_CHN.svg`)
      setDisplayContent(content.hk)
      setMonth(months.hk[displayMonths.indexOf(month)])
      setDisplayMonths(months.hk)
    } else if (newLanguage == "en") {
      setIauStarchart(`${prefix}/STARMAP_IAU_ENG.svg`)
      setUrbanStarchart(`${prefix}/STARMAP_URBAN_ENG.svg`)
      setChnStarchart(`${prefix}/STARMAP_CHN_ENG.svg`)
      setDisplayContent(content.en)
      setMonth(months.en[displayMonths.indexOf(month)])
      setDisplayMonths(months.en)
    } else {
      setIauStarchart(`${prefix}/STARMAP_IAU_CHN.svg`)
      setUrbanStarchart(`${prefix}/STARMAP_URBAN_CHN.svg`)
      setChnStarchart(`${prefix}/STARMAP_CHN_CHN.svg`)
      setDisplayContent(content.hk)
      setMonth(months.hk[displayMonths.indexOf(month)])
      setDisplayMonths(months.hk)
    }
  }

  function getCurrentRotation(el){
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "none";
    if (tm != "none") {
      var values = tm.split('(')[1].split(')')[0].split(',');
      var angle = Math.atan2(values[1],values[0]) * (180/Math.PI);
      return (angle < 0 ? angle + 360 : angle);
    }
    return 0;
  }

  const RightPanel = () => {
    return (
      <Grid container
        textAlign="center"
        direction="column"
        alignItems="center"
        spacing={1}
        paddingTop= "8vh"
        paddingBottom= "8vh"
        margin="0"
      >
        <Typography variant="h1" color="common.white" style={{ paddingBottom:5 }}>
          {displayContent.title}
        </Typography>
        <Typography variant="h4" textAlign={"center"} color="#4c566a">
          {versionInfo}
        </Typography>
        <Divider sx={{ paddingTop: "2vh", paddingBottom: "1vh" }} orientation="horizontal" flexItem>
          <Typography variant="h3"  color="common.white">{displayContent.chooseChart}</Typography>
        </Divider>
        <Grid>
          <ToggleButtonGroup
            color="secondary"
            value={showingStarchart}
            exclusive
            onChange={starchartChange}
            title={displayContent.chooseChart}
            aria-label={displayContent.chooseChart}
            style={{
              paddingLeft: 10,
              paddingRight: 3,
              paddingTop: 3,
              paddingBottom: 3,
              minWidth: 0,
              minHeight: 0,
              maxHeight: "2.5rem",
              height: "5vh",
            }}
          >
            <ToggleButton value={1} style={{textTransform: "none",}}>{displayContent.iauChart}</ToggleButton>
            <ToggleButton value={2} style={{textTransform: "none",}}>{displayContent.urbanChart}</ToggleButton>
            <ToggleButton value={3} style={{textTransform: "none",}}>{displayContent.cnChart}</ToggleButton>
          </ToggleButtonGroup>
          <Tooltip title={displayContent.chartInfo}>
            <IconButton
              // onClick={}
              size="small"
              color="secondary"
              style={{
                paddingLeft: 1,
                paddingRight: 1,
                paddingTop: 3,
                paddingBottom: 3,
                maxWidth: "3rem",
                minWidth: 0,
                minHeight: 0,
                height: "3.5vh",
                width: "3.5vh",
              }}
            >
              <HelpIcon style={{ height: "2vh", width: "2vh", }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Divider sx={{ paddingTop: "3.5vh", paddingBottom: "1vh" }} orientation="horizontal" flexItem>
          <Typography variant="h3" color="common.white">{displayContent.gotoT}</Typography>
        </Divider>
        <div>
        <Select
          size="small"
          displayEmpty
          autoWidth
          sx={{ marginRight: "1vh", marginBottom: "1vh" }}
          value={month}
          onChange={(event) => {
            setMonth(event.target.value)
            setDaysInMonth(event.target.value)
          }}
        >
          {displayMonths.map(displayMonth => {
            return (
              <MenuItem value={displayMonth}>{displayMonth}</MenuItem>
          )})}
        </Select>

        <Select
          size="small"
          displayEmpty
          autoWidth
          value={day}
          onChange={(event) => {
            setDay(event.target.value)
          }}
        >
          {days.map(day => {
            if (language == "hk") {
              return (<MenuItem value={day}>{day}日</MenuItem>)
            } else {
              return (<MenuItem value={day}>{day}</MenuItem>)
            }
          })}
        </Select>
        </div>
        <Select
          size="small"
          displayEmpty
          autoWidth
          sx={{ marginBottom: "1vh" }}
          value={time}
          onChange={(event) => {
            setTime(event.target.value)
          }}
        >
          <ListSubheader>PM</ListSubheader>
          <MenuItem value={times[0]}>{times[0]}</MenuItem>
          {times.map(time => {
            if (time == "12:00 AM"){
                return ([<ListSubheader>AM</ListSubheader>, <MenuItem value={time}>{time}</MenuItem>])
            }
            return (<MenuItem value={time}>{time}</MenuItem>)
          })}
        </Select>
        <Button
          variant="contained"
          onClick={rotateToTime}
          title={displayContent.gotoT}
          aria-label={displayContent.gotoT}
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
            height: "3.5vh",
          }}
        >
          <Typography variant="h3">GO</Typography>
        </Button>
        <Divider sx={{ paddingTop: "3.5vh", paddingBottom: "1vh" }} orientation="horizontal" flexItem>
          <Typography variant="h3" color="common.white">{displayContent.rotation}</Typography>
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
          <Grid container direction="row" alignItems="center">
            <Button
              variant="contained"
              size="small"
              title={displayContent.startRotation}
              aria-label={displayContent.startRotation}
              onClick={()=>{
                setAnimation("rotation 24s infinite linear")
                setAnimationState("running")
              }}
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
                height: "3.5vh",
                width: "5vh",
              }}
            >
              <PlayArrow style={{ height: "3.5vh", }} />
            </Button>
            <Button
              variant="contained"
              size="small"
              title={displayContent.stopRotation}
              aria-label={displayContent.stopRotation}
              onClick={()=>{
                setAnimationState("paused")
                // setAnimation("none !important")
              }}
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
                height: "3.5vh",
                width: "5vh",
              }}
            >
              <Stop style={{ height: "3.5vh", }} />
            </Button>
            <Tooltip title={displayContent.rotationInfo}>
              <IconButton
                // onClick={}
                size="small"
                color="secondary"
                style={{
                  paddingLeft: 5,
                  paddingRight: 1,
                  paddingTop: 3,
                  paddingBottom: 3,
                  maxWidth: "3rem",
                  minWidth: 0,
                  minHeight: 0,
                  height: "3.5vh",
                  width: "3.5vh",
                }}
              >
                <HelpIcon style={{ height: "2vh", width: "2vh", }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </item>
        <Divider sx={{ paddingTop: "3.5vh", paddingBottom: "1vh" }} orientation="horizontal" flexItem>
          <Typography variant="h3" color="common.white">{displayContent.zoom}</Typography>
        </Divider>
        <ZoomControls />
        <Divider sx={{ paddingTop: "3.5vh", paddingBottom: "1vh" }} orientation="horizontal" flexItem>
          <Typography variant="h3" color="common.white">Language</Typography>
        </Divider>
        <ToggleButtonGroup
          color="secondary"
          value={language}
          exclusive
          onChange={languageChange}
          title="Choose language"
          aria-label="Choose Language"
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 3,
            paddingBottom: 3,
            minWidth: 0,
            minHeight: 0,
            maxHeight: "2.5rem",
            height: "5vh",
          }}
        >
          <ToggleButton value={"hk"} style={{textTransform: "none",}}>中文</ToggleButton>
          <ToggleButton value={"en"} style={{textTransform: "none",}}>English</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    )
  }

  const ZoomControls = () => {
    const { zoomIn, zoomOut, zoomToElement, resetTransform } = useControls();
    return (
      <Grid container
        direction="row"
      >
        <Button
          variant="contained"
          size="small"
          title={displayContent.zoomIn}
          aria-label={displayContent.zoomIn}
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
            height: "3.5vh",
            width: "5vh",
          }}
          onClick={() => zoomIn()}
        >
          <ZoomInIcon style={{ height: "3.5vh", }} />
        </Button>
        <Button
          variant="contained"
          title={displayContent.zoomOut}
          aria-label={displayContent.zoomOut}
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
            height: "3.5vh",
            width: "5vh",
          }}
          onClick={() => zoomOut()}
        >
          <ZoomOutIcon style={{ height: "3.5vh", }} />
        </Button>
        <Button
          variant="contained"
          title={displayContent.zoomToSky}
          aria-label={displayContent.zoomToSky}
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
            height: "3.5vh",
            width: "5vh",
          }}
          onClick={() => zoomToElement("skyarea",1.55,200)}
        >
          <ZoomToSkyIcon style={{ height: "3.5vh" }}/>
        </Button>
        <Button
          variant="contained"
          title={displayContent.zoomReset}
          aria-label={displayContent.zoomReset}
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
            height: "3.5vh",
            width: "5vh",
          }}
          onClick={() => resetTransform()}
        >
          <ZoomOutMaxIcon />
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
      <SpeedDial
        ariaLabel={displayContent.more}
        direction="up"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<MoreHoriz />}
        FabProps={{
          sx: {
            bgcolor: 'secondary.main',
            height: {xs: "2rem", md: "2.5rem"},
            width: {xs: "2rem", md: "2.5rem"},
            '&:hover': {
              bgcolor: 'secondary.main',
            }
          }
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={(event)=>{window.open(action.url)}}
          />
        ))}
      </SpeedDial>
      <div className={styles.container} maxWidth={false}>
        <TransformWrapper
          wheel={{ disabled: true }}
          panning={{velocityDisabled: true}}
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
                  <div id="rotationWrapper" style={{ height: "100%", width: "100%", transformOrigin: "50% 50%", transition: `${rotateStyle}`, rotate: `${rotateDeg}deg`, position: "absolute", animation: `${animation}`, animationPlayState: `${animationState}`}}>
                    <img className={styles.imgStartchart} style={{ opacity: `${opacity[0]}` }} src={iauStarchart} />
                    <LazyLoad>
                      <img className={styles.imgStartchart} style={{ opacity: `${opacity[1]}` }} src={urbanStarchart} />
                    </LazyLoad>
                    <LazyLoad>
                      <img className={styles.imgStartchart} style={{ opacity: `${opacity[2]}` }} src={chnStarchart} />
                    </LazyLoad>
                  </div>
                  <div className={styles.overlay}>
                    <img height="100%" src={jacket} />
                    <div className={styles.overlay} id="skyarea" style={{height:"55%", width:"75%", position: "absolute", right:"12.5%", bottom:"3%"}}></div>
                  </div>
                </div>
              </TransformComponent>
            </Grid>
            <Grid container
              xs={3}
              padding="0"
              direction="column"
              justifyContent="space-around"
              height={"100%"}
              style={{
                overflow: "auto"
              }}
            >
              <RightPanel />
            </Grid>
          </Grid>
        </TransformWrapper>
      </div>
    </ThemeProvider>
  );
}