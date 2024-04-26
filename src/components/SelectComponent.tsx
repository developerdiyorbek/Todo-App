import { SelectProps } from "@/interfaces/interface";
import { MenuItem, Select } from "@mui/material";
import { FC } from "react";

const SelectComponent: FC<SelectProps> = ({ filter, setFilter }) => {
  return (
    <div className="text-end">
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={filter}
        label="filter"
        onChange={(e) => setFilter(e.target.value)}
        className="mb-5"
      >
        <MenuItem value={"all"}>all</MenuItem>
        <MenuItem value={"completed"}>completed</MenuItem>
        <MenuItem value={"uncompleted"}>uncompleted</MenuItem>
      </Select>
    </div>
  );
};

export default SelectComponent;
