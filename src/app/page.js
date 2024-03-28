"use client";

import styles from './page.module.css'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography, Box } from '@mui/material';

const yellowStarchart = "/STARMAPv2022_yellow_3600x.png"
const jacket = "/STARMAPv2022_jacket_3600px.png"

export default function Home() {

 return (
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
        // component="img"
        sx={{
          height: "90vh",
          width : "90vh"
        }}
        // src={jacket}
      >
        <div
          style={{
            height:"100%",
            transform: "rotate(0deg)"
          }}
        >
          <img height="100%" src={yellowStarchart}/>
        </div>
        
      </Grid>
      <Grid 
        xs={2}
      >
        <Typography>xs=fgdhfdfsagfsgsdh4</Typography>
      </Grid>
    </Grid>
   </div>
 );
}