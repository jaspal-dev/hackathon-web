import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Stack, Typography } from "@mui/material";
import { getFlight } from "./../../api/getFlight";
import { formatDate } from "./../../lib/helper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ListFlight() {
  const [rowsData, setRowsData] = React.useState([]);
  const [isLoadedData, setIsLoadedData] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    async function loadFlights() {
      try {
        const response = await getFlight();
        setRowsData(response.data);
        setIsLoadedData(true);
      } catch (err) {
        toast.error("Some error occoured");
        setIsLoadedData(true);
      }
    }
    loadFlights();
  }, []);
  return (
    <Box m={3} mx={5}>
      <Typography variant="h3" my={2} textAlign={"center"}>
        Flights
      </Typography>
      {isLoadedData && rowsData.length === 0 ? (
        <Typography textAlign={"center"}>
          No flights found, you can add one from top menu bar.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">Departure Gate</StyledTableCell>
                <StyledTableCell align="center">Arrival Gate</StyledTableCell>
                <StyledTableCell align="center">
                  Scheduled Departure
                </StyledTableCell>
                <StyledTableCell align="center">
                  Scheduled Arrival
                </StyledTableCell>
                <StyledTableCell align="center">
                  Actual Departure
                </StyledTableCell>
                <StyledTableCell align="center">Actual Arrival</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsData.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.departureGate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.arrivalGate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatDate(row.scheduledDeparture)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatDate(row.scheduledArrival)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatDate(row.actualDeparture)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatDate(row.actualArrival)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Stack spacing={2}>
                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate("/flight", {
                            state: { isUpdate: true, data: row },
                          })
                        }
                      >
                        Update Flight
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate(`/passenger?flightId=${row.id}`)
                        }
                      >
                        Add Passenger
                      </Button>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
