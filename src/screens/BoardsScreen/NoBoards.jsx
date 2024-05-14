import {Stack, Typography} from "@mui/material";

const NoBoards = () => {
  return (
    <Stack mt={15} textAlign="center" spacing={1}>
      <Typography variant="h5">Нет созданных досок</Typography>
      <Typography>Создайте вашу первую доску!</Typography>
    </Stack>
  );
};

export default NoBoards;