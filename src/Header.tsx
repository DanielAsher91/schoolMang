import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "./store";
import { frontPageActions } from "./store/frontPage";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBarButton } from "./types";


type Props = {
    window?: () => Window;
};




const drawerWidth = 240;
const navItems = ['Admin', 'Teacher', 'Studnet'];



const Header:React.FC<Props> = (props) => {

    

    const dispatch = useDispatch();


    const adminHander = () => {
        dispatch(frontPageActions.setRole('ADMIN'))
    }
    const studentHander = () => {
        dispatch(frontPageActions.setRole('STUDENT'))
    }
    const teacherHander = () => {
        dispatch(frontPageActions.setRole('TEACHER'))
    }

    const navItems1: AppBarButton[] = [{
        title: 'Admin',
        onClick: (adminHander)
    },
    {
        title: 'Teacher',
        onClick: (teacherHander)
    },
    {
        title: 'Studnet',
        onClick: (studentHander)
    }
]

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };
  
    const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
        School management 
        </Typography>
        <Divider />
        <List>
          {navItems1.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton onClick={item.onClick} sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
   
    const container = window !== undefined ? () => window().document.body : undefined;
return(
    
    

//     <header>
//      <button onClick={adminHander}>Admin</button>
//         <button onClick={studentHander}>Studnet</button>
//         <button onClick={teacherHander}>Teacher</button>
//         <ButtonGroup variant="text" aria-label="Basic button group">
//   <Button>One</Button>
//   <Button>Two</Button>
//   <Button>Three</Button>
// </ButtonGroup> 
//     </header> 


<Box sx={{ display: 'flex',position: 'fixed' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
           School management
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems1.map((item) => (
              <Button onClick={item.onClick} key={item.title} sx={{ color: '#fff' }}>
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      
    </Box>

        
)

}

export default Header;