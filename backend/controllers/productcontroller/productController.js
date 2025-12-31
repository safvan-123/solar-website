import SolarProduct from "../../models/productmodel/Product.js";

// Create product
export const createSolarProduct = async (req, res) => {
  try {
    const product = await SolarProduct.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all active products
export const getSolarProducts = async (req, res) => {
  try {
    const products = await SolarProduct.find({ isActive: true });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product (edit option)
export const updateSolarProduct = async (req, res) => {
  try {
    const updated = await SolarProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
export const deleteSolarProduct = async (req, res) => {
  try {
    const product = await SolarProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
