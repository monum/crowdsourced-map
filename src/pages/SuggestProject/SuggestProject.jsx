import { Input, Button } from "@mui/material";
import { useState } from "react";
import FileBase from "react-file-base64";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  FormControl,
  TextField,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

import useStyles from "./styles";
import { useAddProjectMutation } from "../../features/projects/projectsApi";

const inputs = [
  { title: "Project Title", required: true },
  { title: "Location", readOnly: true },
  { title: "Description(optional)", multiline: true },
];

const SuggestProject = ({ renderBig }) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          sx={{ paddingLeft: 6.5 }}
          action={
            <IconButton>
              <CloseRounded />
            </IconButton>
          }
          title="Please specify some details about your idea"
          className={classes.cardHeader}
        />
        <CardContent
          className={classes.cardContent}
          sx={{ padding: "10px 80px 0 60px" }}
        >
          <FormControl className={classes.form}>
            {inputs.map((input) => (
              <TextField
                required={input.required}
                inputProps={input.readOnly && { readOnly: true }}
                multiline={input.multiline}
                label={input.title}
                variant="standard"
                fullWidth
                sx={{ marginBottom: 2 }}
                className={classes.textFeild}
              />
            ))}
          </FormControl>
          <SubmitButton />
        </CardContent>
      </Card>
    </div>
  );
};

const SubmitButton = () => {
  const [addProject] = useAddProjectMutation();

  const handleSubmit = () => {
    addProject({
      records: [
        {
          fields: {
            location: "15 Downtown Boston, MA 02116",
            timestamp: 1657309327299,
            time: "2022-07-08",
            Title: "Newer compost bins",
          },
        },
      ],
    });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ margin: "40px 0  40px 25% ", width: "50%" }}
    >
      Submit
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
