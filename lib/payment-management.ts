interface Payment {
  amount: string;
  tax: string;
  shipping: string;
}

export const calculatePayment = ({ amount, tax, shipping }: Payment) => {
  if (!amount || !tax || !shipping) {
    return {
      message: "Please provide all the required fields",
      success: false,
    };
  }

  const total = parseFloat(amount) + parseFloat(tax) + parseFloat(shipping);

  return {
    total: total,
    success: true,
  };
};
