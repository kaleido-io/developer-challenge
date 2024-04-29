import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import FinishGameModal from './FinishGameModal';
import PlaceBetModal from './PlaceBetModal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function GamesTable({ user }: { user: any }) {
    const [games, setGames] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);

    useEffect(() => {
        getGames();
    }, []);

    async function getGames() {
        try {
            const res = await fetch('/api/games');
            if (!res.ok) {
                throw new Error('Failed to fetch games');
            }
            const gamesData = await res.json();
            setGames(gamesData);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    }

    async function addGameToContract(row: any) {
        const {
            id,
            away_team_id,
            home_team_id,
            away_money_line,
            home_money_line,
        } = row;
        try {
            const res = await fetch('/api/contract/games', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    away_team_id,
                    home_team_id,
                    away_money_line,
                    home_money_line,
                }),
            });
            if (!res.ok) {
                throw new Error('Failed to update game.on_contract.');
            }
        } catch (error) {
            console.error('Error updating game ', error);
        }
        await getGames();
    }

    async function startGameOnContract(row: any) {
        const { id } = row;
        try {
            const res = await fetch(`/api/contract/games/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, action: 'start' }),
            });
            if (!res.ok) {
                throw new Error('Failed to update game.started');
            }
        } catch (error) {
            console.error('Error updating game ', error);
        }
        await getGames();
    }

    const finishGameOnContract = (row: any) => {
        setSelectedRow(row);
        setOpenModal(true);
    };

    const handleFinish = async (awayScore: number, homeScore: number) => {
        try {
            const res = await fetch(`/api/contract/games/${selectedRow.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedRow.id,
                    away_score: awayScore,
                    home_score: homeScore,
                    action: 'finish',
                }),
            });
            if (!res.ok) {
                throw new Error('Failed to update game.finished');
            }
        } catch (error) {
            console.error('Error updating game ', error);
        }
        await getGames();
    };

    const placeBetOnContract = (row: any) => {
        setSelectedRow(row);
        setOpenModal(true);
    };

    const handleBet = async (teamId: number, betAmount: number) => {
        try {
            const res = await fetch('/api/contract/bets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    game_id: selectedRow.id,
                    team_id: teamId,
                    bet_amount: betAmount,
                }),
            });
            if (!res.ok) {
                throw new Error('Failed to create bet');
            }
        } catch (error) {
            console.error('Error creating bet ', error);
        }
        await getGames();
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            sortable: true,
            sortingOrder: ['asc'],
        },
        {
            field: 'awayTeam',
            headerName: 'Away Team City',
            description: 'Away team',
            sortable: true,
            width: 130,
            valueGetter: (value, row) =>
                `${row.away_team_city} ${row.away_team_name}`,
        },
        {
            field: 'away_money_line',
            headerName: 'Away Money Line',
            type: 'number',
            width: 90,
        },
        {
            field: 'away_score',
            headerName: 'Away Score',
            type: 'number',
            width: 90,
        },
        {
            field: 'homeTeam',
            headerName: 'Home Team City',
            description: 'Home team',
            sortable: true,
            width: 130,
            valueGetter: (value, row) =>
                `${row.home_team_city} ${row.home_team_name}`,
        },
        {
            field: 'home_money_line',
            headerName: 'Home Money Line',
            type: 'number',
            width: 90,
        },
        {
            field: 'home_score',
            headerName: 'Home Score',
            type: 'number',
            width: 90,
        },
        {
            field: 'buttonColumn',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        mt: 1.15,
                        display: { xs: 'flex', md: 'flex' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    {user.role === 'admin' && !params.row.on_contract && (
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={(e) => {
                                e.stopPropagation();
                                addGameToContract(params.row);
                            }}
                        >
                            Add
                        </Button>
                    )}
                    {user.role === 'admin' &&
                        params.row.on_contract &&
                        !params.row.started && (
                            <Button
                                variant="outlined"
                                startIcon={<PlayArrowIcon />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    startGameOnContract(params.row);
                                }}
                            >
                                Start
                            </Button>
                        )}
                    {user.role === 'admin' &&
                        params.row.on_contract &&
                        params.row.started &&
                        !params.row.finished && (
                            <Button
                                variant="outlined"
                                startIcon={<StopIcon />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    finishGameOnContract(params.row);
                                }}
                            >
                                Finish
                            </Button>
                        )}
                    {user.role === 'better' &&
                        params.row.on_contract &&
                        !params.row.started &&
                        !params.row.finished && (
                            <Button
                                variant="outlined"
                                startIcon={<AttachMoneyIcon />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    placeBetOnContract(params.row);
                                }}
                            >
                                Place Bet
                            </Button>
                        )}
                </Stack>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={games}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
            {user.role === 'admin' && (
                <FinishGameModal
                    open={openModal}
                    handleClose={() => setOpenModal(false)}
                    handleFinish={handleFinish}
                />
            )}
            {user.role === 'better' && (
                <PlaceBetModal
                    open={openModal}
                    handleClose={() => setOpenModal(false)}
                    handleBet={handleBet}
                    row={selectedRow}
                />
            )}
        </div>
    );
}

export default GamesTable;
