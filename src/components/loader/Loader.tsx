import { Backdrop, CircularProgress } from "@mui/material";

type LoadingProps = {
  loading: boolean;
};
/*
 * Loader
 * Component to show while make submit API call
 * To blur background and make all field and button non-active
 */
const Loader = ({ loading }: LoadingProps) => {
  return (
    <>
      <Backdrop
        data-testid="loader-backdrop"
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(6px)",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
export default Loader;
