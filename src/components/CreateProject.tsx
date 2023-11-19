import { ChangeEvent, FormEvent, useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import { SketchPicker, ColorResult } from "react-color";
import { createProject } from "../services/ProjectService";

interface LabelClass {
  name: string;
  color: string;
}

export default function ProjectForm() {
  const [projectName, setProjectName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [labelClasses, setLabelClasses] = useState<LabelClass[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null
  );
  const pickerRef = useRef<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setSelectedColorIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateFiles = (incomingFiles: any) => {
    setFiles(incomingFiles);
  };

  const handleColorChange = (color: ColorResult, index: number) => {
    const newLabelClasses = [...labelClasses];
    newLabelClasses[index].color = color.hex;
    setLabelClasses(newLabelClasses);
  };

  const handleAddLabelClass = () => {
    setLabelClasses([...labelClasses, { name: "", color: "#000" }]);
  };

  const handleDeleteLabelClass = (index: number) => {
    const newLabelClasses = [...labelClasses];
    newLabelClasses.splice(index, 1);
    setLabelClasses(newLabelClasses);
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (
      projectName &&
      description &&
      labelClasses.length > 0 &&
      files.length > 0
    ) {
      const result = await createProject(
        projectName,
        description,
        labelClasses,
        files.map((file: any) => file.file)
      );
      setMessage(result);
      if (result.includes("successfully")) {
        window.location.href = "/home";
      }
    } else {
      setMessage("Please fill out all fields");
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Project Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="projectName"
            label="Project Name"
            name="projectName"
            autoComplete="projectName"
            autoFocus
            value={projectName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProjectName(e.target.value)
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={5}
            name="description"
            label="Description"
            type="text"
            id="description"
            autoComplete="description"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
          <br></br>
          <Divider variant="fullWidth" />
          <div style={{ overflow: "auto" }}>
            {labelClasses.map((labelClass, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name={`labelClass${index}`}
                  label="Label Class"
                  type="text"
                  id={`labelClass${index}`}
                  autoComplete={`labelClass${index}`}
                  value={labelClass.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const newLabelClasses = [...labelClasses];
                    newLabelClasses[index].name = e.target.value;
                    setLabelClasses(newLabelClasses);
                  }}
                />
                <div
                  style={{
                    width: 55,
                    height: 40,
                    backgroundColor: labelClass.color,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 10,
                  }}
                  onClick={() => setSelectedColorIndex(index)}
                />
                {selectedColorIndex === index && (
                  <div
                    ref={pickerRef}
                    style={{
                      overflow: "auto",
                      width: "100%",
                    }}
                  >
                    <SketchPicker
                      color={labelClass.color}
                      onChangeComplete={(color: ColorResult) =>
                        handleColorChange(color, index)
                      }
                    />
                  </div>
                )}
                <Button
                  style={{ marginTop: 10 }}
                  onClick={() => handleDeleteLabelClass(index)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={handleAddLabelClass}>Add Label Class</Button>
          <Divider variant="fullWidth" />
          <br></br>
          <Typography variant="body1" color="error">
            Once the project is created, the images cannot be updated *
          </Typography>
          <Dropzone
            onChange={updateFiles}
            value={files}
            accept=".png,.jpeg,.jpg"
            maxFileSize={10000000}
            maxFiles={25}
          >
            {files.map((file, index) => (
              <FileMosaic key={index} {...file} preview />
            ))}
          </Dropzone>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          {message && (
            <Typography
              variant="body1"
              color={message.includes("successfully") ? "green" : "error"}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
