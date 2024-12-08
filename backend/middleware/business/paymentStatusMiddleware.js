//invoice
const paymentStatusMiddleware = async (req, res, next) => {
    try {
      const invoiceId = req.params.id;
      const invoice = await Invoice.findById(invoiceId);
  
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
  
      // Simulate payment gateway integration
      const paymentStatus = await checkPaymentStatus(invoiceId); // Mocked function
      invoice.status = paymentStatus ? "paid" : "pending";
  
      await invoice.save();
      req.invoice = invoice; // Pass the updated invoice to the next middleware
      next();
    } catch (error) {
      return res.status(500).json({ error: "Payment status update failed" });
    }
  };
  
  // Mocked payment gateway integration
  const checkPaymentStatus = async (invoiceId) => {
    // Simulate checking payment status from a gateway
    return Math.random() > 0.5; // Randomly return true or false for demo
  };
  