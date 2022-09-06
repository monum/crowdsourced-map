// imports from installed modules
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  FormControl,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// imports from local files
import {
  CloseRounded,
  SwitchRightRounded,
  SwitchLeftRounded,
} from "@mui/icons-material";

import {
  setProjectDetails,
  resetProjectDetails,
  submitProject,
  toggleSuggestingProject,
} from "../../features/suggestProject/newProjectSlice";

import useStyles from "./styles";
import { getNeighborhood } from "../../utils";
import { setHideMap } from "../../features/utilsSlice";
import { trimAddress, capitalizeKeys } from "../../utils";
import { useDeterminePageSize, useWindowSize } from "../../hooks";
import { useAddProjectMutation } from "../../features/suggestProject/projectsApi";

const toastId = "suggest-project-page-toast";

const SuggestProject = () => {
  const { breakPoint } = useWindowSize();
  const { renderFullMap } = useDeterminePageSize();
  const { coords, address, title, description } = useSelector(
    (state) => state.newProject
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles({ renderFullMap, breakPoint });
  const { previousLocation } = useSelector((state) => state.utils);

  const [location, setLocation] = useState("");
  const [showCoords, setShowCoords] = useState(false);

  useEffect(() => {
    // update the address and coords fields
    if (showCoords) {
      if (!coords.lat) return;
      return setLocation(
        `lat: ${coords.lat.toFixed(4)}, lng: ${coords.lng.toFixed(4)}`
      );
    }

    if (!address?.data) return;
    const trimmedAddress = trimAddress(address.data);
    console.log();
    return setLocation(trimmedAddress);
  }, [address, coords, showCoords]);

  const handleClose = () => {
    // clear all data and stop suggesting project
    handleClearInput();
    dispatch(setHideMap(false));
    navigate(previousLocation.pathname);
  };

  const handleClearInput = () => {
    // clear all fields
    dispatch(resetProjectDetails());
    dispatch(toggleSuggestingProject(false));
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardHeader
          sx={renderFullMap ? { marginBottom: 4 } : { paddingLeft: 6.5 }}
          action={
            <IconButton onClick={handleClose}>
              <CloseRounded />
            </IconButton>
          }
          title="Please specify some details about your idea"
          className={classes.cardHeader}
        />
        <CardContent
          className={classes.cardContent}
          sx={
            renderFullMap
              ? { padding: "10px 25px 0 30px" }
              : { padding: "10px 80px 0 60px" }
          }
        >
          <FormControl className={classes.form}>
            <TextField
              required
              label="Project Title"
              placeholder="e.g. New Compost Bin"
              variant="standard"
              fullWidth
              sx={{ marginBottom: 2 }}
              className={classes.textFeild}
              value={title}
              onChange={(e) =>
                dispatch(setProjectDetails({ title: e.target.value }))
              }
            />

            <TextField
              label={`Location(${showCoords ? "coords" : "address"})`}
              variant="standard"
              fullWidth
              multiline
              sx={{ marginBottom: 2 }}
              className={classes.textFeild}
              value={location}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setShowCoords((state) => !state)}
                  >
                    {showCoords ? (
                      <SwitchRightRounded />
                    ) : !address?.isFetching ? (
                      <SwitchLeftRounded />
                    ) : (
                      <SyncLoader
                        size={8}
                        margin={4}
                        style={{ marginBottom: 3 }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              multiline
              label="Description"
              required
              variant="standard"
              fullWidth
              placeholder="please give us a little more detail"
              sx={{ marginBottom: 2 }}
              className={classes.textFeild}
              value={description}
              onChange={(e) =>
                dispatch(setProjectDetails({ description: e.target.value }))
              }
            />
          </FormControl>
          <SubmitButton
            handleClearInput={handleClearInput}
            disabled={!!!title.trim() || !!!description.trim()}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const SubmitButton = ({ handleClearInput, disabled }) => {
  const dispatch = useDispatch();
  const [addProject] = useAddProjectMutation();
  const { isActive, ...projectsData } = useSelector(
    (state) => state.newProject
  );

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    // organize data and submit project
    if (submitting || disabled) return;

    dispatch(submitProject());
    const addressData = projectsData.address.data;
    const lat = projectsData.coords.lat;
    const lng = projectsData.coords.lng;
    const neighborhood = getNeighborhood(lng, lat);
    if (!neighborhood)
      return toast.error("The location you selected is outside Boston");

    setSubmitting(true);
    const dateObj = new Date();
    const timestamp = () => dateObj.getTime();
    const date = dateObj.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
    });

    const { coords, ...project } = {
      ...projectsData,
      address: addressData,
      lat,
      lng,
      timestamp: timestamp(),
      date,
      neighborhood,
    };

    const newProject = capitalizeKeys(project);
    const action = await addProject({
      records: [
        {
          fields: {
            ...newProject,
          },
        },
      ],
    });

    if (action.error) {
      return toast.error("An error occurred please try again");
    }

    toast.success("Your idea has been submitted for review", {
      toastId,
    });
    setSubmitting(false);
    handleClearInput();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={disabled}
      sx={{ margin: "40px 0  40px 25% ", width: "50%", padding: "8px, 0" }}
      onClick={() => handleSubmit()}
    >
      {submitting ? (
        <SyncLoader color="#fff" size={8} margin={8.5} />
      ) : (
        "Submit"
      )}
    </Button>
  );
};

export default SuggestProject;
