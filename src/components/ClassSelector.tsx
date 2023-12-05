import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const ClassSelector = (props: any) => {
  const selectedIndex = props.colors.findIndex(
    (color: any) => color.name === props.value.name
  );
  return (
    <Select
      value={selectedIndex}
      onChange={(event) => props.onChange(props.colors[event.target.value])}
    >
      {props.colors.map((item: any, index: number) => (
        <MenuItem key={index} value={index}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                marginRight: 1,
                backgroundColor: item.color,
              }}
            />
            {item.name}
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};

export default ClassSelector;
