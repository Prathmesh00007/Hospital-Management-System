import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Search, Edit, Delete } from '@mui/icons-material';

const Patients = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', contact: '+1234567890', lastVisit: '2024-03-15' },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', contact: '+1234567891', lastVisit: '2024-03-14' },
    { id: 3, name: 'Bob Johnson', age: 28, gender: 'Male', contact: '+1234567892', lastVisit: '2024-03-13' },
    // Add more patient data as needed
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 4,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
          }}
        >
          Patients
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                {!isMobile && (
                  <>
                    <TableCell>Age</TableCell>
                    <TableCell>Gender</TableCell>
                  </>
                )}
                <TableCell>Contact</TableCell>
                {!isMobile && <TableCell>Last Visit</TableCell>}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                    </>
                  )}
                  <TableCell>{patient.contact}</TableCell>
                  {!isMobile && <TableCell>{patient.lastVisit}</TableCell>}
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Patients; 