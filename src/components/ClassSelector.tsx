import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ClassSelector;
