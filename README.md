This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

karena menggunakan nextJS dan database mysql, web tidak saya deploy ke heroku, sedangkan di heroku menggunakan PortgressSql

cara penggunaan 
secara default web akan di run pada localhost:3000

lakukan import database sql terlebih dahulu

file : 
crud.sql

1. Buat user baru terlebih dahulu
2. Lakukan login App
3. Setelah itu anda akan di arahkan ke dashboard
4. Terdapat 3 sidabar
5. Dashbord, di mana anda memilih menu untuk di pesan, Click icon plus, lalu ketika selesai memilih menu click icon bucket yang ada yang di atas lalu klik order
6. Orders, lalu masuk sidebar orders dimana anda akan melihat semua order anda ( terdapat 2 aksi yaitu hapus dan purchase ).
7. Logout, gunakan untuk logout aplikasi
