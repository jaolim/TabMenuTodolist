import { useState } from 'react'
import './App.css'

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TodoList from "./TodoList";
import Hello from "./Hello";

function TabsTodo() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="navigation tab">
              <Tab label="HOME" value="1" />
              <Tab label="TODOS" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Hello />
          </TabPanel>
          <TabPanel value="2">
            <Container maxWidth="xl">
              <CssBaseline />
              <AppBar position="sticky">
                <Toolbar>
                  <Typography variant="h6">
                    My Todos
                  </Typography>
                </Toolbar>
              </AppBar>
            </Container>
            <TodoList />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default TabsTodo;