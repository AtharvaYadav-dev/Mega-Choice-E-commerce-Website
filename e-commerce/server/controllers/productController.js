import Product from '../models/Product.js';

export const listProducts = async (req, res, next) => {
  try {
    const {
      q,
      category,
      brand,
      gender,
      minPrice,
      maxPrice,
      page = 1,
      limit = 50,
      sort = '-createdAt'
    } = req.query;

    // Build filter
    const filter = { isActive: true };
    if (q) filter.name = { $regex: q, $options: 'i' };
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (gender && gender !== 'All') filter.gender = gender;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination and field selection
    const [products, total] = await Promise.all([
      Product.find(filter)
        .select('name description price discount category brand images stock rating reviews gender sizes isActive')
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean(), // Use lean() for better performance
      Product.countDocuments(filter)
    ]);

    res.json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
