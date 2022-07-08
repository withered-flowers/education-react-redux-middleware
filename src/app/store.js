import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "../features/counter/sliceCounter.js";
// import service yang dibutuhkan
import { reqresinColorAPI } from "../services/reqresinColorAPI.js";

export const store = configureStore({
  reducer: {
    counterRTK: counterSlice,
    // Di sini kita akan menambahkan reducerPathnya ke dalam sini
    // perhatikan di sini menggunakan "array", karena di dalam object tidak bisa menggunakan "dot"

    // Perasaan kita ga buat reducer yah?
    // Yes, dibuatkan SECARA OTOMATIS pada saat kita menggunakan createApi
    [reqresinColorAPI.reducerPath]: reqresinColorAPI.reducer,
  },
  // Misalnya ini untuk tingkat lanjut, ingin menggunakan caching, invalidation (untuk refresh data),
  // ataupun untuk polling datanya
  // bisa menggunakan middleware

  // menerima sebuah fungsi yang menerima parameter getDefaultMiddleware (sebuah fungsi juga)
  middleware: (getDefaultMiddleware) => {
    // Di sini kita akan menggabungkan middleware dari reqresinColorAPI ke default middlewarenya
    // Kapan kita bikinnya yah? Lagi lagi, dibuatkan secara otomatis pada saat kita mendefinisikan
    // dalam createApi di service (wuoah......)
    return getDefaultMiddleware().concat(reqresinColorAPI.middleware);
  },
});
