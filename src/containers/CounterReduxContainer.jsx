// Sekarang di sini kita membutuhkan useEffect
// Karena ingin fetch data pada saat awal Container ini dibuat
import React, { useEffect, useState } from "react";

// Sekarang karena kita ingin menggunakan image orang, kita bisa menggunakan Avatar
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { selectUser, selectCounter } from "../features/counter/sliceCounter.js";

import {
  increment,
  decrement,
  reset,
  incrementSpec,
  decrementSpec,
  // Sekarang kita juga akan import si userAsync di ini
  userAsync,
} from "../features/counter/sliceCounter.js";

const CounterReduxContainer = () => {
  const [currAmount, setCurrAmount] = useState(0);

  const username = useSelector(selectUser);
  const counter = useSelector(selectCounter);

  const dispatcher = useDispatch();

  const buttonDecrementOnClickHandler = () => {
    dispatcher(decrement());
  };

  const buttonResetOnClickHandler = () => {
    dispatcher(reset());
  };

  const buttonIncrementOnClickHandler = () => {
    dispatcher(increment());
  };

  // Fungsi yang dibutuhkan untuk part 2
  const textFieldAmountOnChangeHandler = (e) => {
    const amountFromField = isNaN(parseInt(e.target.value))
      ? 0
      : parseInt(e.target.value);

    setCurrAmount(amountFromField);
  };

  const buttonDecrementByAmountOnClickHandler = () => {
    dispatcher(decrementSpec(currAmount));
  };

  const buttonIncrementByAmountOnClickHandler = () => {
    dispatcher(incrementSpec(currAmount));
  };

  // Di sini kita akan menggunakan useEffect
  useEffect(
    () => {
      // Kita akan memanggil si userAsync via dispatcher
      dispatcher(userAsync(3));
    },
    // Karena hanya ingin dipanggil 1x saja, maka kita harus membuat
    // dependency listnya kosongan saja
    [dispatcher]
  );

  return (
    <>
      <Box
        sx={{
          border: "1px dashed grey",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="body1" component="div">
          React Redux
        </Typography>

        {/* Kita gunakan avatar di sini */}
        <Avatar
          src={username.avatar}
          alt="avatar"
          sx={{ width: 64, height: 64 }}
        />

        <Typography variant="body1" component="div">
          {/* Di sini ada sedikit perubahan, karena username sekarang berbentuk object */}
          {/* Untuk bisa mengambil namanya kita akan menggunakan username.first_name */}
          Nama User: {username.first_name}
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            disabled
            label="Current Counter"
            // defaultValue="0"
            value={counter}
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            color="success"
            onClick={buttonDecrementOnClickHandler}
          >
            -1
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={buttonResetOnClickHandler}
          >
            0
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={buttonIncrementOnClickHandler}
          >
            +1
          </Button>
        </Box>

        {/* Mari kita tambahkan Bagian baru di sini */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="amount"
            size="small"
            value={currAmount}
            onChange={textFieldAmountOnChangeHandler}
          />
          <Button
            variant="outlined"
            color="success"
            onClick={buttonDecrementByAmountOnClickHandler}
          >
            - Amount
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={buttonIncrementByAmountOnClickHandler}
          >
            + Amount
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CounterReduxContainer;
