import { useState, useEffect } from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import GridSearchIcon from "@mui/icons-material/Search";
import axios from "axios"; // You can use any API fetching method you prefer

const SearchComponent = () => {
  const [customFilters, setCustomFilters] = useState({ member: "" });
  const [searchResults, setSearchResults] = useState([]); // To store API search results
  const [loading, setLoading] = useState(false); // For loading state
  console.log(customFilters, "searchData");
  // Debounce for input field
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (customFilters.member) {
        fetchData(customFilters.member);
      } else {
        setSearchResults([]); // Clear search results if no input
      }
    }, 500); // Debounce time (500ms)

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout on each change
  }, [customFilters.member]);

  // Function to call the API and fetch the data
  const fetchData = async (query) => {
    setLoading(true);
    try {
      // Ensure proper URL formatting
      const response = await axios.get(`http://localhost:7779/members/search`, {
        params: {
          member: query,
        },
      });
      console.log(response, "Res");
      setSearchResults(response.data); // Assuming response.data contains the result
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <TextField
        variant="filled"
        placeholder="Search..."
        size="small"
        value={customFilters.member}
        onChange={(e) =>
          setCustomFilters((prev) => ({
            ...prev,
            member: e.target.value,
          }))
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <GridSearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ width: "300px" }}
      />

      {/* Optionally, display loading indicator */}
      {loading && <div>Loading...</div>}

      {/* Display the search results */}
      <Box>
        {searchResults.map((result) => (
          <div key={result.id}>{result.name}</div> // Adjust with your response data
        ))}
      </Box>
    </Box>
  );
};

export default SearchComponent;
