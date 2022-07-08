import React from "react";

// Di sini kita akan import Component ColorItem
import ColorItem from "./ColorItem";

// Di sini kita akan import query yang ingin kita gunakan
// GET /colors => endpoint colors => useColorsQuery
import { useColorsQuery } from "../services/reqresinColorAPI";

import { Box } from "@mui/material";

const ColorList = () => {
  // Di sini kita akan menggunakan hooks useColorsQuery tersebut
  // menerima Object, jadi kita langsung deconstruct saja yah
  // Property yang akan kita ambil adalah:
  // - data: berisikan data yang di-query (response)
  // - error: berisikan informasi error yang didapatkan apabila terjadi error
  // - isLoading: berisikan kondisi apakah query masih dalam tahap "pending" atau tidak
  const { data, error, isLoading } = useColorsQuery();

  return (
    <Box>
      {/* Kita gunakan conditional rendering di sini */}
      {error ? (
        <>Ada error di sini nih ...</>
      ) : isLoading ? (
        <>Loading data dulu yah ...</>
      ) : (
        data.data.map((colorItem) => (
          <ColorItem key={colorItem.id} colorItem={colorItem} />
        ))
      )}
    </Box>
  );
};

export default ColorList;
