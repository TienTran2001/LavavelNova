import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import COLORS from '../../../../utils/colors';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { charBarIcon } from '../../../../assets';
import SIZES from '../../../../utils/sizes';
import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';
import CountUp from 'react-countup';

const createProgressAnimation = (widthPercent: number) => keyframes`
  from {
    width: 0;
  }
  to {
    width: ${widthPercent}%;
  }
`;

const UserPageCard = () => {
  const [days, setDays] = useState('30');
  const newUsersPercent = 65;

  const handleChange = (event: SelectChangeEvent) => {
    setDays(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              paddingX: 3,
              paddingY: 2,
              minHeight: SIZES.heightCardItem,
            }}
          >
            {/* ----------------------top--------------------------- */}
            <Box
              sx={{
                display: 'flex',
                columnGap: '10px',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: COLORS.gray500,
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontWeight: 800,
                  fontSize: '14px',
                }}
              >
                Current Users
              </Typography>

              <FormControl sx={{ minWidth: 100 }}>
                <Select
                  value={days}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  size="small"
                  IconComponent={ExpandMoreIcon}
                  sx={{
                    fontSize: '12px',
                    color: COLORS.gray500,
                    borderRadius: '4px',
                    border: `1px solid ${COLORS.gray300} `,
                    outline: 'none',
                    fontWeight: 400,
                    '& .MuiSelect-icon': {
                      fontSize: 18,
                      color: COLORS.gray500,
                    },
                    '& .MuiSelect-select': {
                      padding: '6px 0 6px 12px',
                    },
                  }}
                >
                  <MenuItem value={30} sx={{ fontSize: '12px' }}>
                    30 Days
                  </MenuItem>
                  <MenuItem value={60} sx={{ fontSize: '12px' }}>
                    60 Days
                  </MenuItem>
                  <MenuItem value={90} sx={{ fontSize: '12px' }}>
                    90 Days
                  </MenuItem>
                  <MenuItem value={15} sx={{ fontSize: '12px' }}>
                    15 Days
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* ----------------------end top--------------------------- */}
            {/* ---------------------- bottom --------------------------- */}
            <Box sx={{ paddingY: 2 }}>
              <Box
                sx={{
                  paddingY: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    padding: 2,
                    backgroundColor: COLORS.primary500,
                    borderRadius: '8px',
                    display: 'inline-block',
                  }}
                >
                  <img src={charBarIcon} alt="charBarIcon" />
                </Box>
                <Typography fontSize={36} color={COLORS.gray500}>
                  <CountUp end={7} />
                </Typography>
              </Box>
            </Box>
            {/* ---------------------- end bottom --------------------------- */}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              paddingX: 3,
              paddingY: 2,
              minHeight: SIZES.heightCardItem,
            }}
          >
            {/* ----------------------top--------------------------- */}
            <Box
              sx={{
                display: 'flex',
                columnGap: '10px',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: COLORS.gray500,
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontWeight: 800,
                  fontSize: '14px',
                }}
              >
                New Users
              </Typography>

              <Typography fontSize={14} color={COLORS.gray500} fontWeight={400}>
                15k
              </Typography>
            </Box>
            {/* ----------------------end top--------------------------- */}
            {/* ---------------------- bottom --------------------------- */}
            <Box paddingTop={2}>
              <Typography
                component={'span'}
                fontSize={36}
                color={COLORS.gray500}
              >
                <CountUp end={newUsersPercent} />%
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  height: '16px',
                  backgroundColor: COLORS.gray200,
                  borderRadius: 999,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: COLORS.green500,
                    height: '16px',
                    width: `${newUsersPercent}%`,
                    animation: `${createProgressAnimation(
                      newUsersPercent
                    )} 1s ease-in-out`,
                  }}
                ></Box>
              </Box>
            </Box>
            {/* ---------------------- end bottom --------------------------- */}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserPageCard;
