import { useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function FinishGameModal({
    open,
    handleClose,
    handleFinish,
}: {
    open: boolean;
    handleClose: () => void;
    handleFinish: (awayScore: number, homeScore: number) => void;
}) {
    const [awayScore, setAwayScore] = useState(0);
    const [homeScore, setHomeScore] = useState(0);

    const handleFinishClick = () => {
        handleFinish(awayScore, homeScore);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '5px',
                }}
            >
                <h2>Update Scores</h2>
                <TextField
                    label="Away Score"
                    value={awayScore}
                    onChange={(e) => setAwayScore(Number(e.target.value))}
                />
                <TextField
                    label="Home Score"
                    value={homeScore}
                    onChange={(e) => setHomeScore(Number(e.target.value))}
                />
                <Button onClick={handleFinishClick}>Finish Game</Button>
            </div>
        </Modal>
    );
}

export default FinishGameModal;
