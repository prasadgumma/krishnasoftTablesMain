// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import { Close } from "@mui/icons-material";

// const ViewMember = () => {
//   const { id } = useParams(); // Get the member ID from the URL params
//   const [member, setMember] = useState(null); // State to store member data
//   const [openDrawer, setOpenDrawer] = useState(true); // Drawer visibility state

//   useEffect(() => {
//     // Fetch the member data by ID when the component mounts
//     const fetchMemberData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:7779/members/${id}`);
//         setMember(response.data); // Set the member data to state
//       } catch (error) {
//         console.error("Error fetching member data:", error);
//       }
//     };
//     fetchMemberData();
//   }, [id]);

//   // Close the drawer when the button is clicked
//   const handleCloseDrawer = () => {
//     setOpenDrawer(false);
//   };

//   if (!member) {
//     return <Typography>Loading...</Typography>; // Show loading state while data is fetching
//   }

//   return (
//     <Drawer
//       anchor="right" // Drawer will slide from the right
//       open={openDrawer} // Drawer visibility
//       onClose={handleCloseDrawer} // Close the drawer
//       sx={{ width: 350 }}
//     >
//       <Box sx={{ width: 350, padding: 2 }}>
//         {/* Close button */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <IconButton onClick={handleCloseDrawer}>
//             <Close />
//           </IconButton>
//         </Box>

//         {/* Member Details */}
//         <Typography variant="h6" gutterBottom>
//           Member Details
//         </Typography>
//         <Divider sx={{ mb: 2 }} />

//         {/* List of member details */}
//         <List>
//           <ListItem>
//             <ListItemText primary="Name" secondary={member.member} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary="Age" secondary={member.age} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary="Education" secondary={member.education} />
//           </ListItem>
//           <ListItem>
//             <ListItemText
//               primary="Father's Name"
//               secondary={member.fatherName}
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemText
//               primary="Mother's Name"
//               secondary={member.motherName}
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary="City" secondary={member.city} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary="Profession" secondary={member.profession} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary="Status" secondary={member.status} />
//           </ListItem>
//           <ListItem>
//             <ListItemText
//               primary="Description"
//               secondary={member.description}
//             />
//           </ListItem>
//         </List>

//         {/* Close Button */}
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleCloseDrawer}
//           sx={{ marginTop: 2 }}
//         >
//           Close
//         </Button>
//       </Box>
//     </Drawer>
//   );
// };

// export default ViewMember;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Card,
} from "@mui/material";

const ViewMember = () => {
  const { id } = useParams(); // Get the member ID from the URL params
  const [member, setMember] = useState(null); // State to store member data

  useEffect(() => {
    // Fetch the member data by ID when the component mounts
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(`http://localhost:7779/members/${id}`);
        setMember(response.data); // Set the member data to state
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };
    fetchMemberData();
  }, [id]);

  if (!member) {
    return <Typography>Loading...</Typography>; // Show loading state while data is fetching
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Card sx={{ p: 3 }}>
        {/* Member Details */}
        <Typography variant="h5" gutterBottom>
          Member Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* List of member details */}
        <List>
          <ListItem>
            <ListItemText primary="Name" secondary={member.member} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Age" secondary={member.age} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Education" secondary={member.education} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Father's Name"
              secondary={member.fatherName}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Mother's Name"
              secondary={member.motherName}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="City" secondary={member.city} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Profession" secondary={member.profession} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Status" secondary={member.status} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Description"
              secondary={member.description}
            />
          </ListItem>
        </List>

        {/* Close Button */}
        <Button
          variant="contained"
          color="primary"
          //   fullWidth
          sx={{ marginTop: 2 }}
          onClick={() => window.history.back()} // Navigate back to previous page
        >
          Close
        </Button>
      </Card>
    </Box>
  );
};

export default ViewMember;
