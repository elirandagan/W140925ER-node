const QrCode = require("qrcode"); // commonJs
// import QrCode from "qrcode" // module

// QrCode.toDataURL((text = "Welcome to Node.js"), (err, url) => {
//   if (err) {
//     console.error(err);
//   } else if (url) {
//     console.log(url);
//   }
// });

QrCode.toString("Hello From HackerU", { type: "terminal" }, (err, url) => {
  if (err) {
    console.error(err);
  } else if (url) {
    console.log(url);
  }
});

QrCode.toFile(
  "QR.png",
  "Hello From HackerU",
  { type: "terminal" },
  (err, url) => {
    if (err) {
      console.error(err);
    } else if (url) {
      console.log(url);
    }
  },
);
