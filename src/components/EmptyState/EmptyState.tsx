import { Box, Typography, Paper } from '@mui/material';

export function EmptyState({ message }: { message: string }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="60vh"
    >
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          {message}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Por favor, tente novamente mais tarde ou entre em contato com o suporte.
        </Typography>
      </Paper>
    </Box>
  );
}
