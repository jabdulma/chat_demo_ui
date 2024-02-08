import {styled} from "@mui/material/styles";

const BubbleSpacer = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1)
}));

export default BubbleSpacer;