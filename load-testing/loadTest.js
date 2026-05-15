const axios = require("axios");

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzc4ODQ1MzA2LCJleHAiOjE3Nzg5MzE3MDZ9.9qZFeyjPzuhK_6QRdYGQjcU2HaImp_hBsz-VWl7q5so";

const ORDER_API =
  "http://localhost:3000/api/orders/create";

const PAYMENT_API =
  "http://localhost:3000/api/payments/process";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

const sendOrderRequest = async () => {

  try {

    const response = await axios.post(
      ORDER_API,
      {
        product: "Laptop",
        quantity: 1,
      },
      { headers }
    );

    console.log(
      "ORDER:",
      response.data.message
    );

  } catch (error) {

    console.log(
      "ORDER ERROR:",
      error.message
    );
  }
};

const sendPaymentRequest = async () => {

  try {

    const response = await axios.post(
      PAYMENT_API,
      {
        amount: 5000,
      },
      { headers }
    );

    console.log(
      "PAYMENT:",
      response.data.message
    );

  } catch (error) {

    console.log(
      "PAYMENT ERROR:",
      error.message
    );
  }
};

const startLoadTest = async () => {

  const requests = [];

  for (let i = 0; i < 50; i++) {

    requests.push(sendOrderRequest());

    requests.push(sendPaymentRequest());
  }

  await Promise.all(requests);

  console.log(
    "🔥 LOAD TEST COMPLETED"
  );
};

startLoadTest();