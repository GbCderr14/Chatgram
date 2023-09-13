import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Box, InputBase } from "@mui/material";

interface SearchBarProps {
  setText: (text: string) => void;
}

function SearchBar(props: SearchBarProps) {
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    props.setText(inputValue);
  };

  return (
    <Box
      display="flex"
      style={{
        backgroundColor: "#f0f2f5",
        padding: "2%",
        borderRadius: "12px",
        margin: "6px 3px",
      }}
    >
      <FontAwesomeIcon icon={faSearch} style={{ padding: "3%" }} />
      <InputBase
        placeholder="Search or start a new chat"
        sx={{ width: "100%" }}
        onChange={onTextChange}
      />
    </Box>
  );
}

export default SearchBar;
