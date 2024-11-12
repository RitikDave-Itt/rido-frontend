import { Skeleton, Box, Typography } from '@mui/material';

const WalletSkeleton = () => {
  return (
    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} height="100%" width="100%">
      <Box
        width={{ xs: '100%', md: '33%' }}
        bgcolor="grey.200"
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Skeleton variant="rectangular" width="80%" height={64} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="50%" height={40} />
      </Box>

      <Box
        width={{ xs: '100%', md: '67%' }}
        bgcolor="grey.100"
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        overflow="auto"
      >
        <Box width="100%" mb={2}>
          <Typography variant="h6">
            <Skeleton width="30%" height={32} />
          </Typography>
          <Typography variant="h6">
            <Skeleton width="25%" height={32} />
          </Typography>
        </Box>

        <Box width="100%" mb={2}>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={64} sx={{ mb: 2, borderRadius: 1 }} />
          ))}
        </Box>

        <Box display="flex" justifyContent="center" width="100%">
          <Skeleton variant="rectangular" width={128} height={40} sx={{ borderRadius: 2 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default WalletSkeleton;
