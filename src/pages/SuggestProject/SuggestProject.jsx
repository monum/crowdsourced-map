import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { SyncLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

import {
  CloseRounded,
  SwitchRightRounded,
  SwitchLeftRounded,
} from "@mui/icons-material";

import useStyles from "./styles";
import { useAddProjectMutation } from "../../features/projects/projectsApi";
import { useDeterminePageSize } from "../../hooks";
import {
  setProjectDetails,
  submitProject,
  toggleSuggestingProject,
} from "../../features/projects/newProjectSlice";

const capitalizeKeys = (obj) => {
  const newObj = {};
  for (let key in obj) {
    const newKey = key.charAt(0).toUpperCase() + key.slice(1);

    newObj[newKey] = obj[key];
  }

  return newObj;
};

const trimAddress = (address = "") => {
  const addressArr = address.split(",");

  addressArr.pop(); // getting out "United States" from the address
  if (addressArr.length > 2) addressArr.pop(); // getting out "Massachusetts" from the address

  return addressArr;
};

const SuggestProject = () => {
  const { coords, address } = useSelector((state) => state.newProject);
  const { renderFullMap } = useDeterminePageSize();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles({ renderFullMap });
  const { previousLocation } = useSelector((state) => state.utils);

  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [showCoords, setShowCoords] = useState(false);

  useEffect(() => {
    if (showCoords) {
      if (!coords) return;
      return setLocation(
        `lat: ${coords.lat.toFixed(4)}, lng: ${coords.lng.toFixed(4)}`
      );
    }

    if (!address?.data) return;
    const trimmedAddress = trimAddress(address.data);
    return setLocation(trimmedAddress);
  }, [address, coords, showCoords]);

  const handleRedirect = () => {
    dispatch(toggleSuggestingProject(false));
    navigate(previousLocation.pathname);
  };

  const handleClearInput = () => {
    setProjectTitle("");
    setDescription("");
    setLocation("");
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardHeader
          sx={renderFullMap ? { marginBottom: 4 } : { paddingLeft: 6.5 }}
          action={
            <IconButton onClick={handleRedirect}>
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
              variant="standard"
              fullWidth
              sx={{ marginBottom: 2 }}
              className={classes.textFeild}
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
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
              label="Description(optional)"
              variant="standard"
              fullWidth
              sx={{ marginBottom: 2 }}
              className={classes.textFeild}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <SubmitButton
            handleClearInput={handleClearInput}
            title={projectTitle}
            description={description}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const SubmitButton = ({ handleClearInput, title, description }) => {
  const dispatch = useDispatch();
  const [addProject] = useAddProjectMutation();
  const { renderFullMap } = useDeterminePageSize();
  const { isActive, ...projectsData } = useSelector(
    (state) => state.newProject
  );

  const [submitting, setSubmitting] = useState(false);

  const handleUpdateState = () => {
    dispatch(
      setProjectDetails({
        title,
        description,
      })
    );
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const addressData = projectsData.address.data;
    const lat = projectsData.coords.lat;
    const lng = projectsData.coords.lng;

    const dateObj = new Date();
    const timestamp = () => Math.round(dateObj.getTime() / 1000);
    const date = dateObj.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
    });

    const { address, coords, ...project } = {
      ...projectsData,
      address: addressData,
      lat,
      lng,
      title,
      description,
      timestamp: timestamp(),
      date,
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
      return alert("There was an error when uploading the project");
    }

    setSubmitting(false);
    dispatch(toggleSuggestingProject(false));
    handleClearInput();
  };

  return (
    <Button
      variant="contained"
      color="primary"
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

/* <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => {
            const file = URL.createObjectURL(e.target.files[0]);
            setImage(file);
          }}
        />
        <Button variant="contained" component="span">
          Upload
        </Button>
        <img src={image} alt="img" />
      </label> */
