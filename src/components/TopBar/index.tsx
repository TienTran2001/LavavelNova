import AppBar from '@mui/material/AppBar';
import COLORS from '../../utils/colors';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import SIZES from '../../utils/sizes';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import React from 'react';

const TopBarComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white',
          boxShadow: 'none',
          color: COLORS.gray600,
          ml: SIZES.sideBar,
          width: `calc(100% - ${SIZES.sideBar})`,
        }}
      >
        <Toolbar
          variant="dense"
          disableGutters
          sx={{ minHeight: SIZES.heightTopHeader }}
        >
          <Box
            sx={{
              width: '100%',
              px: '48px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/*--------------------- input search ---------------------------- */}
            <Box
              sx={{
                backgroundColor: COLORS.gray100,
                borderRadius: 9999,
                display: 'flex',
                minWidth: SIZES.inputTopBar,
              }}
            >
              <IconButton
                aria-label="search"
                sx={{ color: COLORS.gray400, p: '4px' }}
              >
                <SearchIcon />
              </IconButton>
              <input
                type="text"
                className="w-full px-2 bg-transparent outline-none text-14 text-gray/600"
                placeholder="Press / to search"
              />
            </Box>
            {/*--------------------- end input search ---------------------------- */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', columnGap: '8px' }}
            >
              <IconButton
                aria-label="search"
                sx={{ color: COLORS.gray500, p: '8px' }}
                size="small"
              >
                <Badge variant="dot" color="error">
                  <NotificationsNoneOutlinedIcon
                    fontSize="small"
                    sx={{ width: '24px', height: '24px' }}
                  />
                </Badge>
              </IconButton>
              <Box
                sx={{
                  display: 'flex',
                  alignItem: 'center',

                  columnGap: '12px',
                }}
              >
                <Button
                  onClick={handleOpenProfile}
                  sx={{
                    paddingX: '4px',
                    color: COLORS.gray600,
                    textTransform: 'none',
                  }}
                >
                  <Avatar
                    alt="Travis Howard"
                    sx={{ width: 32, height: 32 }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgzJoA4UNRwoNGyX-1RxI3Mob1OMDdqtijIQ&s"
                  />
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600, fontSize: '14px', ml: '12px' }}
                  >
                    Digital Creative
                  </Typography>
                  <ExpandMoreIcon sx={{ ml: '4px' }} />
                </Button>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar
            alt="Travis Howard"
            sx={{ width: 32, height: 32 }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgzJoA4UNRwoNGyX-1RxI3Mob1OMDdqtijIQ&s"
          />{' '}
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default TopBarComponent;
