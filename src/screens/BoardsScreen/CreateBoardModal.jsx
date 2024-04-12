import { useState } from "react"
import {Dialog, Stack, Typography, Box, TextField, Button} from "@mui/material";
import ModalHeader from "../../components/layout/ModalHeader.jsx";
import {colors} from "../../theme.js";


const CreateBoardModal = () => {
    const [name, setName] = useState('')
    const [color, setColor] = useState(0)

    return (
        <Dialog open fullWidth maxWidth="xs">
            <Stack p={2}>
                <ModalHeader title="Create Board"/>
                <Stack my={5} spacing={3}>
                    <TextField
                        value={name}
                        onChange={e => setName(e.target.value)}
                        label="Board name"/>
                    <Stack spacing={1.5} direction="row">
                        <Typography>Color:</Typography>
                            {colors.map((clr, idx) =>
                            <Box
                            sx={{
                                cursor: "pointer",
                                border: color === idx ? "3px solid #383838" : "none",
                                outline: `2px solid ${clr}`
                            }}

                            onClick={() => setColor(idx)}
                            key={clr}
                            height={25}
                            width={25}
                            backgroundColor={clr}
                            borderRadius="50%"
                            />)}
                    </Stack>
                </Stack>
                <Button variant="contained" size="large">Create</Button>
            </Stack>
        </Dialog>
    );
};

export default CreateBoardModal;