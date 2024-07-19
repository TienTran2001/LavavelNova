import AppBar from '@mui/material/AppBar';
import COLORS from '../../utils/colors';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import SIZES from '../../utils/sizes';
import IconButton from '@mui/material/IconButton';
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
import React, { useState } from 'react';
import InputPrimary from '../Input/InputPrimary';
import MenuIcon from '@mui/icons-material/Menu';
import useMenuContext from '../../hooks/useMenuContext';
import { useUserStore } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const TopBarComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const open = Boolean(anchorEl);
  const handleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { setIsMenuOpen } = useMenuContext();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('laravel');
    navigate('/login');
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white',
          boxShadow: 'none',
          color: COLORS.gray600,
        }}
        className={`w-full 2xl:!w-[calc(100%_-_240px)] !ml-0 2xl:!ml-sideBar`}
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
            <IconButton
              className="2xl:!hidden"
              onClick={() => setIsMenuOpen(true)}
              sx={{ color: COLORS.gray600 }}
            >
              <MenuIcon />
            </IconButton>
            {/*--------------------- input search ---------------------------- */}
            <InputPrimary
              value={search}
              onChange={(e) => handleChangeSearch(e)}
              placeholder="Press / to search"
              backgroundColor={COLORS.gray100}
            />
            {/*--------------------- end input search ---------------------------- */}
            {user != null ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '8px',
                  }}
                >
                  <IconButton
                    aria-label="search"
                    sx={{ color: COLORS.gray500, p: '8px' }}
                    size="small"
                  >
                    <Badge
                      variant="dot"
                      color="error"
                      className="topBar-notification"
                    >
                      <span className="absolute inline-flex w-2 h-2 bg-red-400 rounded-full opacity-75 -top-1 -right-1 animate-ping"></span>
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
                        src={user.avatar}
                      />
                      <Typography
                        component="span"
                        sx={{ fontWeight: 600, fontSize: '14px', ml: '12px' }}
                      >
                        {user.username}
                      </Typography>
                      <ExpandMoreIcon sx={{ ml: '4px' }} />
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Button variant="contained" onClick={() => navigate('/login')}>
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {user && (
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
              src={user.avatar}
            />
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
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default TopBarComponent;
