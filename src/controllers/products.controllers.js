import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id }).populate("user");
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    console.log("Usuario autenticado:", req.user);

    const { title, description, cost } = req.body;

    // Verifica si 'cost' es un número válido
    const parsedCost = parseFloat(cost);

    // Si no es un número válido, responde con un error
    if (isNaN(parsedCost)) {
      return res
        .status(400)
        .json({ message: 'El campo "cost" debe ser un número válido.' });
    }

    // Si el costo es válido, crea el nuevo producto
    const newProduct = new Product({
      title,
      description,
      cost: parsedCost, // Usamos el número validado
      user: req.user.id,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, description, cost } = req.body;
    const productUpdated = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, cost },
      { new: true }
    );
    return res.json(productUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
