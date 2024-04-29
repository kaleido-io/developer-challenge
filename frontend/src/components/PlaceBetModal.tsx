import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

function PlaceBetModal({
    open,
    handleClose,
    handleBet,
    row,
}: {
    open: boolean;
    handleClose: () => void;
    handleBet: (awayScore: number, homeScore: number) => void;
    row: any;
}) {
    const [selectedTeam, setSelectedTeam] = useState('');
    const [betAmount, setBetAmount] = useState('');

    const handleTeamChange = (event: any) => {
        setSelectedTeam(event.target.value);
    };

    const handleBetClick = () => {
        if (!selectedTeam || !betAmount) {
            return;
        }

        handleBet(Number(selectedTeam), parseFloat(betAmount));
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '8px',
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Place Bet
                </Typography>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Select Team</FormLabel>
                    <RadioGroup
                        value={selectedTeam}
                        onChange={handleTeamChange}
                    >
                        <FormControlLabel
                            value={row?.away_team_id}
                            control={<Radio />}
                            label={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img
                                        src={`images/${row?.away_team_image}`}
                                        alt={`images/${row?.away_team_city} ${row?.away_team_name}`}
                                        style={{
                                            marginRight: '8px',
                                            width: '32px',
                                            height: '32px',
                                        }}
                                    />
                                    {row?.away_team_city} {row?.away_team_name}
                                </Box>
                            }
                        />
                        <FormControlLabel
                            value={row?.home_team_id}
                            control={<Radio />}
                            label={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img
                                        src={`images/${row?.home_team_image}`}
                                        alt={`images/${row?.home_team_city} ${row?.home_team_name}`}
                                        style={{
                                            marginRight: '8px',
                                            width: '32px',
                                            height: '32px',
                                        }}
                                    />
                                    {row?.home_team_city} {row?.home_team_name}
                                </Box>
                            }
                        />
                    </RadioGroup>
                </FormControl>
                <TextField
                    label="Bet Amount (Ether)"
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <Button
                    variant="contained"
                    onClick={handleBetClick}
                    sx={{ mt: 2 }}
                >
                    Place Bet
                </Button>
            </Box>
        </Modal>
    );
}

export default PlaceBetModal;
