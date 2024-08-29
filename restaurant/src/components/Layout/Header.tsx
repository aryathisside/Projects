import React, { useState } from 'react'
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png'
import { CenteredTypographyDrawer,BoxWithBorderDrawer,  UL,UlDrawer, CenteredTypography, BoxWithBorder } from '../../styles/header';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Header: React.FC  = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (

    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
    <Typography 
      color="white" 
      fontFamily="Popstick Regular" 
      fontSize={"30px"} 
      marginTop={"9px"} 
      marginLeft={"10px"} 
      alignItems={"center"}
      variant='h6' 
      component={"div"} 
      sx={{ flexGrow: 1, mb: 4 }}>

            {/* <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} /> */}
              <BoxWithBorderDrawer>
                <CenteredTypographyDrawer>
                  MELTADO
                </CenteredTypographyDrawer>
              </BoxWithBorderDrawer>
            </Typography>
              <UlDrawer >
            <Divider sx={{borderColor: "black"}}/>
                <li><Link to={'/'}> Home </Link></li>
                <li> <Link to={'/contact'}> Contact </Link></li>
                <li><Link to={'/menu'}> Menu </Link></li>
                <li><Link to={'/about'}> About </Link></li>
              </UlDrawer>
    </Box>
  );


  return (
    < >
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "#126874" }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton color='inherit' aria-label='open drawer' edge="start" sx={{ mr: 2, display: { sm: "none" } }} onClick={handleDrawerToggle}>
              <MenuOpenIcon />
            </IconButton>
            <Typography color="white" fontFamily="Popstick Regular" fontSize={"30px"} marginTop={"9px"} marginLeft={"10px"} alignItems={"center"} variant='h6' component={"div"} sx={{ flexGrow: 1 }}>
              <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            </Typography>

            <Box>
              <BoxWithBorder>
                <CenteredTypography>
                  MELTADO
                </CenteredTypography>
              </BoxWithBorder>
            </Box>
            <Box marginRight={"10px"} sx={{ display: { xs: 'none', sm: 'block' } }}>
              <UL>
                <li><Link to={'/'}> Home </Link></li>
                <li> <Link to={'/contact'}> Contact </Link></li>
                <li><Link to={'/menu'}> Menu </Link></li>
                <li><Link to={'/about'}> About </Link></li>
              </UL>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component={"nav"}>
          <Drawer 
            variant='temporary' 
            open={mobileOpen} 
            onClose={handleDrawerToggle} 
            sx={{display:{xs:'block', sm:'none'}, 
            "& .MuiDrawer-paper": {
              boxSizing: 'border-box',
              width: "180px",
              backgroundColor: "#126874"
            },
          }}

          >
            {drawer}
          </Drawer>
        </Box>
        <Toolbar/>
      </Box >
    </>
  )
}

export default Header

