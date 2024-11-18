// import React, { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from "@mui/material";

// function FolderCreationTable() {
//   const [open, setOpen] = useState(false);
//   const [folderName, setFolderName] = useState("");

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setFolderName("");
//   };

//   const handleCreateFolder = () => {
//     // Implement your folder creation logic here, like an API call
//     console.log("Folder Created:", folderName);
//     handleClose();
//   };

//   return (
//     <div>
//       {/* Add the "Create Folder" button */}
//       <Button variant="contained" color="primary" onClick={handleOpen}>
//         Create Folder
//       </Button>

//       {/* Folder Creation Dialog */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Create New Folder</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Folder Name"
//             type="text"
//             fullWidth
//             value={folderName}
//             onChange={(e) => setFolderName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleCreateFolder} color="primary">
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Place your table component here */}
//       {/* <YourTableComponent /> */}
//     </div>
//   );
// }

// export default FolderCreationTable;

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Card,
// } from "@mui/material";
// import FolderIcon from "@mui/icons-material/Folder";
// import ShieldIcon from "@mui/icons-material/Shield";
// import SearchIcon from "@mui/icons-material/Search";
// import AddIcon from "@mui/icons-material/Add";

// function ContactsListWithFolders() {
//   const [folders, setFolders] = useState(["My First Folder", "2nd Folder"]);
//   const [open, setOpen] = useState(false);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setNewFolderName("");
//   };

//   const handleAddFolder = () => {
//     if (newFolderName.trim()) {
//       setFolders([...folders, newFolderName.trim()]);
//       handleClose();
//     }
//   };

//   const filteredFolders = folders.filter((folder) =>
//     folder.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box>
//       <Card>
//         {/* Search Bar */}
//         <Box display="flex" alignItems="center" mb={2}>
//           <SearchIcon />
//           <TextField
//             placeholder="Search"
//             variant="outlined"
//             size="small"
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{ ml: 1 }}
//           />
//         </Box>

//         {/* Add Folder Button */}
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={handleOpen}
//         >
//           New Folder
//         </Button>

//         {/* Folder Creation Dialog */}
//         <Dialog open={open} onClose={handleClose}>
//           <DialogTitle>Create New Folder</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Folder Name"
//               type="text"
//               fullWidth
//               value={newFolderName}
//               onChange={(e) => setNewFolderName(e.target.value)}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="secondary">
//               Cancel
//             </Button>
//             <Button onClick={handleAddFolder} color="primary">
//               Create
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Folder List */}
//         <List>
//           {filteredFolders.map((folder, index) => (
//             <ListItem key={index}>
//               <ListItemIcon>
//                 {index === 0 ? <ShieldIcon /> : <FolderIcon />}
//               </ListItemIcon>
//               <ListItemText primary={folder} />
//             </ListItem>
//           ))}
//         </List>
//       </Card>
//     </Box>
//   );
// }

// export default ContactsListWithFolders;

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ShieldIcon from "@mui/icons-material/Shield";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

function ContactsListWithFolders() {
  const [folders, setFolders] = useState(["My First Folder", "Folder 1"]);
  const [open, setOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewFolderName("");
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, newFolderName.trim()]);
      handleClose();
    }
  };

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

  const filteredFolders = folders.filter((folder) =>
    folder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Card>
        {/* Search Bar */}
        <Box display="flex" alignItems="center" mb={2} p={2}>
          <SearchIcon />
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ ml: 1 }}
          />
        </Box>

        {/* Add Folder Button */}
        <Box p={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            New Folder
          </Button>
        </Box>

        {/* Folder Creation Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Folder Name"
              type="text"
              fullWidth
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddFolder} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        {/* Folder List */}
        <List>
          {filteredFolders.map((folder, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleFolderClick(folder)}
            >
              <ListItemIcon>
                {index === 0 ? <ShieldIcon /> : <FolderIcon />}
              </ListItemIcon>
              <ListItemText primary={folder} />
            </ListItem>
          ))}
        </List>

        {/* Conditional Table Rendering */}
        {selectedFolder === "Folder 1" && (
          <Box p={2}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Example data - replace with actual data */}
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>(123) 456-7890</TableCell>
                    <TableCell>johndoe@example.com</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>(987) 654-3210</TableCell>
                    <TableCell>janesmith@example.com</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Card>
    </Box>
  );
}

export default ContactsListWithFolders;
