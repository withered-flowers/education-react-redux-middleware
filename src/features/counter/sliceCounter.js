// karena di sini kita butuh menggunakan axios, kita import axios
import axios from "axios";

// sekarang di sini kita juga harus menggunakan middleware Thunk
// dengan menggunakan redux toolkit "createAsyncThunk"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialStateForCounter = { user: "Whoever", counter: 10000 };

// Di sini kita akan membuat si "Thunk"-nya
// Agar kita bisa membuat logic untuk async-nya
// Nantinya bisa di-dispatch seperti layaknya action pada biasanya

// Ceritanya di sini kita akan mengambil data user by id dari sebuah API
// dengan nama reqres.in (GET https://reqres.in/api/users/{id})

// Ingat, karena ini nanti akan diimport, kita harus export di sini yah
// (langsung export, tanpa ada embel embel .actions atau .reducers)
export const userAsync = createAsyncThunk(
  // parameter pertama adalah "prefix" yang akan digunakan
  // "prefix" ini nantinya akan men-generate beberapa constant, yang akan
  // merepresentasikan siklus hidup (lifecycle) dari sebuah request async:
  // - "prefix"/pending
  // - "prefix"/fulfilled
  // - "prefix"/rejected
  // (Mirip dengan kondisi pada Promise)
  "counterRTK/fetchUser",
  // Parameter kedua adalah pembuat Payloadnya (fnHandler), umumnya bersifat async
  async (id) => {
    // di dalam sinilah kita akan menggunakan si axios
    const response = await axios.get(`https://reqres.in/api/users/${id}`);

    // Di dalam fnHandler ini, HARUS ada return
    // dimana return ini akan menjadi data yang dikembalikan PADA SAAT
    // kondisi berhasil terjadi

    // Dalam kasus ini kita mengembalikan si ... response.data.data
    // (ingat Response schema axios, response data axios ada di response.data
    //   dan data dari reqres.in ada di object data, sehingga jadinya response.data.data
    return response.data.data;
  }
);

// Selanjutnya kita akan memodifikasi slice di sini untuk bisa menggunakan userAsync tersebut
const counterRTKSlice = createSlice({
  name: "counterRTK",
  initialState: initialStateForCounter,
  reducers: {
    increment(state) {
      state.counter += 1;
    },
    decrement(state) {
      state.counter -= 1;
    },
    reset(state) {
      state.counter = 0;
    },
    incrementSpec(state, action) {
      state.counter += action.payload;
    },
    decrementSpec(state, action) {
      state.counter -= action.payload;
    },
  },
  // Untuk bisa menggunakan actions yang dibuat oleh createAsyncThunk
  // Kita tidak menggunakan property "reducers" di atas lagi,
  // melainkan menggunakan property "extraReducers"

  // extraReducers menerima sebuah function yang memiliki 1 parameter: Builder
  extraReducers: (builder) => {
    // kita di sini akan menggunakan builder untuk membuat case dari "Promise" yang akan terjadi
    // pending / fulfilled / rejected
    builder
      // addCase ini akan menerima dua parameter:
      // - parameter 1 adalah nama dari case-nya (didapat dari userAsync)
      // - parameter 2 adalah handler nya (fungsi yang akan dijalankan ketika case terjadi)
      .addCase(
        // Nah di sini kita akan menggunakan case yang sudah ada dari si createAsyncThunk (userAsync)
        userAsync.pending,
        // Di sini kita akan membuat handler untuk case pending
        // Mirip dengan reducer, menerima max 2 parameter
        // parameter 1: state (data yang sekiranya ingin diubah)
        // parameter 2: action (yang memiliki payload)

        // misal pada kasus ini kita hanya ingin menuliskan loading... saja di console log
        // tidak perlu kedua parameter tersebut
        () => {
          console.log("Loading ...");
        }
      )
      .addCase(
        // Kita tambahkan case lagi untuk fulfilled
        userAsync.fulfilled,
        // Di sini untuk handler kita membutuhkan 2 parameter
        (state, action) => {
          // Kita akan set state dari user-nya
          // Lihat initialStateForCounter untuk lebih detilnya ada state apa saja
          state.user = action.payload; // kita ambil dari action.payload, mirip reducer di atas
        }
      )
      .addCase(
        // Kita tambahkan case lagi untuk rejected
        userAsync.rejected,
        () => {
          // misalnya kita tidak membutuhkan apapun
          console.log("Fail to get user data");
        }
      );
  },
});

export const { increment, decrement, reset, incrementSpec, decrementSpec } =
  counterRTKSlice.actions;

export const selectUser = (state) => state.counterRTK.user;
export const selectCounter = (state) => state.counterRTK.counter;

export default counterRTKSlice.reducer;
