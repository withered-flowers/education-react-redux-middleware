import React from "react";

import { Box, Typography } from "@mui/material";

// Di sini kita akan menerima property color dari listing yang akan dibuat nantinya
// (lihat src/components/ColorList.jsx)
const ColorItem = ({ colorItem }) => {
  return (
    <>
      <Box key={item.id} sx={{ color: colorItem.color }}>
        <Typography variant="body1">{colorItem.name}</Typography>
      </Box>
    </>
  );
};

export default ColorItem;
