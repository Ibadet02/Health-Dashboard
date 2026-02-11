import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { Category } from "../constants/categories";

interface CustomSelectProps<
  Value extends Category["value"] | number | boolean | null = Category["value"],
  MenuItem extends Category = Category
> {
  currentValue: Value;
  setValue: (value: Value) => void;
  menuItems: MenuItem[];
  selectLabel: string;
}

const CustomSelect = ({
  currentValue,
  setValue,
  menuItems,
  selectLabel,
}: CustomSelectProps) => {
  const handleChange = (event: SelectChangeEvent<typeof currentValue>) => {
    setValue(event.target.value);
  };

  const generateLabelId = () => `${selectLabel}-select-label`;
  const generateMenuId = () => `${selectLabel}-select`;

  return (
    <FormControl fullWidth>
      <InputLabel id={generateLabelId()}>{selectLabel}</InputLabel>
      <Select
        labelId={generateLabelId()}
        id={generateMenuId()}
        value={currentValue}
        label={selectLabel}
        onChange={handleChange}
      >
        {menuItems.map(({ name, value }) => (
          <MenuItem value={value} key={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
