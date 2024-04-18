import { useState } from "react";
import TopBar from "./TopBar.jsx";
import CreateBoardModal from "./CreateBoardModal.jsx";

import {Stack, Typography} from "@mui/material"

const BoardsScreen = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
        <TopBar openModal={() => setShowModal(true)} />
        {showModal && <CreateBoardModal closeModal={() => setShowModal(false)} />}
        <Stack mt={15} textAlign="center" spacing={1}>
            <Typography variant='h5'>No boards created</Typography>
            <Typography>Create you first board today!</Typography>

        </Stack>

        </>
    );
};

export default BoardsScreen;