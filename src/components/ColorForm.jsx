// Di sini kita membutuhkan useState untuk tracking perubahan input
import React, { useState } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

// Jangan lupa untuk import hooks untuk POST /colors
import { useAddColorMutation } from "../services/reqresinColorAPI";

const ColorForm = () => {
  // Di sini kita akan membuat statenya dalam bentuk Object
  const [colorData, setColorData] = useState({
    name: "",
    year: "",
    color: "",
    pantone_value: "",
  });

  // Di sini kita akan gunakan hooks tersebut

  // useAddColorMutation (a.k.a. useMutation)
  // akan memiliki array (tuple) yang bisa diberikan nama:
  // - trigger / dispatcher (kita beri nama di bawah addColor)
  // - result (hasil tembakan data-nya, dalam bentuk Object)

  // result ini memiliki 2 property utama yang bisa kita gunakan
  // isLoading dan data
  const [addColor, result] = useAddColorMutation();

  // Di sini kita akan membuat onChangenya satu per satu
  const textFieldNameOnChangeHandler = (event) => {
    setColorData({
      ...colorData,
      name: event.target.value,
    });
  };

  const textFieldYearOnChangeHandler = (event) => {
    setColorData({
      ...colorData,
      year: event.target.value,
    });
  };

  const textFieldNumberOnChangeHandler = (event) => {
    setColorData({
      ...colorData,
      color: event.target.value,
    });
  };

  const textFieldPantoneOnChangeHandler = (event) => {
    setColorData({
      ...colorData,
      pantone_value: event.target.value,
    });
  };

  // Di sini kita akan membuat onClick-nya
  const buttonAddColorOnClickHandler = (event) => {
    // Di sini kita akan memanggil query
    addColor(colorData);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "25vw" }}
    >
      <TextField
        size="small"
        label="Nama Warna"
        onChange={textFieldNameOnChangeHandler}
        value={colorData.name}
      />
      <TextField
        size="small"
        label="Tahun Dibuat"
        onChange={textFieldYearOnChangeHandler}
        value={colorData.year}
      />
      <TextField
        size="small"
        label="Nomor Warna (e.g. #F1F1F1)"
        onChange={textFieldNumberOnChangeHandler}
        value={colorData.color}
      />
      <TextField
        size="small"
        label="Pantone Value"
        onChange={textFieldPantoneOnChangeHandler}
        value={colorData.pantone_value}
      />
      <Button
        variant="outlined"
        color="success"
        onClick={buttonAddColorOnClickHandler}
      >
        Tambah Color
      </Button>

      {/* Di sini kita ingin mencetak kembalian-nya */}

      {/* Kita bisa memberikan logic ketika masih dalam tahap men-comot data (loading) */}
      {/* Kita berikan component loading, apabila sudah selesai, kita berikan hasil kembaliannya */}
      {result.isLoading ? (
        <>Loading...</>
      ) : (
        // Karena kembaliannya dalam bentuk JSON, kita stringify di sini
        <Typography variant="body1">{JSON.stringify(result.data)}</Typography>
      )}
    </Box>
  );
};

export default ColorForm;
