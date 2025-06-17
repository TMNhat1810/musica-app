import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { styles } from './style';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { useState } from 'react';

export default function MainLayout() {
  const [expand, setExpand] = useState<boolean>(
    localStorage.getItem('expand') === 'true',
  );

  return (
    <Box sx={styles.container}>
      <Header
        onMenuClick={() => {
          localStorage.setItem('expand', String(!expand));
          setExpand((expand) => !expand);
        }}
      />
      <Box sx={styles.contentContainer}>
        <SideMenu expand={expand} />
        <Box sx={{ ml: expand ? '240px' : '90px', flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
