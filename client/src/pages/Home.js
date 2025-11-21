import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/Auth.js";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio, Spin } from "antd";
import { Prices } from "../components/Prices.js";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart.js";
import {
  AiOutlineReload,
  AiOutlineShoppingCart,
  AiOutlineEye,
} from "react-icons/ai";
import "../styles/HomePage.css";

// ============== FilterSection Component ==============
const FilterSection = ({
  categories,
  checked,
  handleFilters,
  radio,
  setRadio,
  Prices,
}) => {
  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3> Filters</h3>
        <button
          className="btn-reset"
          onClick={() => window.location.reload()}
          title="Reset all filters"
        >
          Reset All
        </button>
      </div>

      <div className="filter-group">
        <h4 className="filter-title"> Category</h4>
        <div className="filter-options">
          {categories?.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handleFilters(e.target.checked, c._id)}
              checked={checked.includes(c._id)}
              className="custom-checkbox"
            >
              {c.name}
            </Checkbox>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4 className="filter-title"> Price Range</h4>
        <div className="filter-options">
          <Radio.Group
            onChange={(e) => setRadio(e.target.value)}
            value={radio}
            className="custom-radio-group"
          >
            {Prices?.map((p) => (
              <div key={p._id} className="radio-item">
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
      </div>

      <style jsx>{`
        .filter-sidebar {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 20px;
          border: 1px solid #e8e8e8;
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #f0f0f0;
        }

        .filter-header h3 {
          margin: 0;
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-reset {
          background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(255, 77, 79, 0.3);
        }

        .btn-reset:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 77, 79, 0.4);
        }

        .btn-reset:active {
          transform: translateY(0);
        }

        .filter-group {
          margin-bottom: 28px;
        }

        .filter-group:last-child {
          margin-bottom: 0;
        }

        .filter-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .custom-checkbox {
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .custom-checkbox:hover {
          background: #f5f5f5;
        }

        .radio-item {
          padding: 6px 12px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .radio-item:hover {
          background: #f5f5f5;
        }

        @media (max-width: 768px) {
          .filter-sidebar {
            position: static;
            margin-bottom: 20px;
            padding: 20px;
          }

          .filter-header {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }

          .btn-reset {
            width: 100%;
            padding: 10px 16px;
          }

          .filter-header h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

// ============== ProductCard Component ==============
const ProductCard = ({ product, navigate, cart, setCart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const addToCart = () => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item added to cart! 🛒");
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {!imageLoaded && (
          <div className="image-skeleton">
            <Spin />
          </div>
        )}
        <img
          src={`${process.env.REACT_APP_API_BASE}api/v1/product/product-photo/${product._id}`}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
        <div className="product-overlay">
          <button
            className="overlay-btn btn-view"
            onClick={() => navigate(`/product/${product.slug}`)}
            title="View Details"
          >
            <AiOutlineEye size={20} />
          </button>
          <button
            className="overlay-btn btn-add"
            onClick={addToCart}
            title="Add to Cart"
          >
            <AiOutlineShoppingCart size={20} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <h5 className="product-name" title={product.name}>
          {product.name}
        </h5>
        <p className="product-desc">
          {product.description.substring(0, 65)}...
        </p>

        <div className="product-footer">
          <div className="price-wrapper">
            <span className="product-price">
              {product.price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>

          <div className="product-actions">
            <button
              className="btn-details"
              onClick={() => navigate(`/product/${product.slug}`)}
            >
              View Details
            </button>
            <button className="btn-cart" onClick={addToCart}>
              <AiOutlineShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid #f0f0f0;
        }

        .product-card:hover {
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
          transform: translateY(-8px);
          border-color: #1890ff;
        }

        .product-image-wrapper {
          width: 100%;
          height: 260px;
          overflow: hidden;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          position: relative;
        }

        .image-skeleton {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-image-wrapper img {
          transform: scale(1.1);
        }

        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .overlay-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }

        .btn-view {
          background: #1890ff;
        }

        .btn-add {
          background: #52c41a;
        }

        .overlay-btn:hover {
          transform: scale(1.15);
        }

        .product-info {
          padding: 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 10px 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 2.8em;
        }

        .product-desc {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 14px;
          flex: 1;
          line-height: 1.5;
        }

        .product-footer {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .price-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .product-price {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .product-actions {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }

        .btn-details,
        .btn-cart {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-details {
          background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
          color: #333;
          border: 1px solid #d9d9d9;
        }

        .btn-details:hover {
          background: linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .btn-cart {
          background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
        }

        .btn-cart:hover {
          background: linear-gradient(135deg, #40a9ff 0%, #69c0ff 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(24, 144, 255, 0.4);
        }

        @media (max-width: 768px) {
          .product-image-wrapper {
            height: 200px;
          }

          .product-name {
            font-size: 1rem;
          }

          .product-price {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
};

// ============== Main Home Component ==============
const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  // Get all products
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to load products");
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to load more products");
    }
  };

  // Handle filters
  const handleFilters = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Filter products
  const filterProducts = async () => {
    try {
      setFilterLoading(true);
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setFilterLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setFilterLoading(false);
      console.log(error);
      toast.error("Failed to filter products");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  return (
    <Layout title="Shop Now - EasyMarket">
      {/* Banner Image */}
      <div className="banner-container">
        <img src="/images/banner.png" className="banner-img" alt="banner" />
      </div>

      <div className="home-container">
        <div className="home-layout">
          {/* Filter Section */}
          <div className="filter-column">
            <FilterSection
              categories={categories}
              checked={checked}
              handleFilters={handleFilters}
              radio={radio}
              setRadio={setRadio}
              Prices={Prices}
            />
          </div>

          {/* Products Section */}
          <div className="products-column">
            <div className="products-header">
              <div>
                <h1>All Products</h1>
                <p className="products-subtitle">
                  Discover amazing products at great prices
                </p>
              </div>
              <div className="product-count-badge">
                {products?.length} {products?.length === 1 ? "item" : "items"}
              </div>
            </div>

            {filterLoading ? (
              <div className="loading-state">
                <Spin size="large" />
                <p>Filtering products...</p>
              </div>
            ) : products?.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {products?.map((p) => (
                    <ProductCard
                      key={p._id}
                      product={p}
                      navigate={navigate}
                      cart={cart}
                      setCart={setCart}
                    />
                  ))}
                </div>

                {products?.length < total && (
                  <div className="load-more-section">
                    <button
                      className="btn-load-more"
                      onClick={() => setPage(page + 1)}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spin size="small" /> Loading more products...
                        </>
                      ) : (
                        <>
                          Load More Products <AiOutlineReload />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .banner-container {
          width: 100%;
          overflow: hidden;
          max-height: 400px;
          margin-bottom: 30px;
        }

        .banner-img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .home-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 30px 20px 60px;
        }

        .home-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 30px;
          align-items: start;
        }

        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .products-header h1 {
          margin: 0 0 8px 0;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .products-subtitle {
          margin: 0;
          color: #666;
          font-size: 0.95rem;
        }

        .product-count-badge {
          background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .loading-state {
          text-align: center;
          padding: 80px 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 16px;
        }

        .loading-state p {
          margin-top: 20px;
          color: #666;
          font-size: 1.05rem;
          font-weight: 500;
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 16px;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 10px;
        }

        .empty-state p {
          color: #666;
          font-size: 1rem;
        }

        .load-more-section {
          text-align: center;
          margin-top: 40px;
          padding-top: 40px;
          border-top: 2px solid #f0f0f0;
        }

        .btn-load-more {
          background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
          color: white;
          border: none;
          padding: 14px 40px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
        }

        .btn-load-more:hover:not(:disabled) {
          background: linear-gradient(135deg, #40a9ff 0%, #69c0ff 100%);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(24, 144, 255, 0.4);
        }

        .btn-load-more:active:not(:disabled) {
          transform: translateY(-1px);
        }

        .btn-load-more:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 1024px) {
          .home-layout {
            grid-template-columns: 260px 1fr;
            gap: 24px;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .banner-container {
            max-height: 250px;
          }

          .home-container {
            padding: 20px 15px 40px;
          }

          .home-layout {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .products-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .products-header h1 {
            font-size: 1.6rem;
          }

          .product-count-badge {
            align-self: stretch;
            text-align: center;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
          }

          .btn-load-more {
            width: 100%;
            padding: 12px 20px;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 12px;
          }

          .products-header h1 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Home;
