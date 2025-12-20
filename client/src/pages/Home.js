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
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        padding: "28px",
        boxShadow: "0 2px 16px rgba(27, 33, 26, 0.08)",
        position: "sticky",
        top: "20px",
        border: "1px solid #EBD5AB",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          paddingBottom: "20px",
          borderBottom: "2px solid #EBD5AB",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1B211A",
            fontFamily: '"Playfair Display", Georgia, serif',
          }}
        >
          🎯 Filters
        </h3>
        <button
          onClick={() => window.location.reload()}
          title="Reset all filters"
          style={{
            background: "#628141",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: '"Inter", sans-serif',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#8BAE66";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#628141";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Reset All
        </button>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#1B211A",
            marginBottom: "16px",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          📁 Category
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {categories?.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handleFilters(e.target.checked, c._id)}
              checked={checked.includes(c._id)}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                transition: "all 0.2s",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {c.name}
            </Checkbox>
          ))}
        </div>
      </div>

      <div>
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#1B211A",
            marginBottom: "16px",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          💰 Price Range
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
            {Prices?.map((p) => (
              <div
                key={p._id}
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  transition: "all 0.2s",
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
        
        @media (max-width: 768px) {
          div[style*="position: sticky"] {
            position: static !important;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

// ============== ProductCard Component ==============
const ProductCard = ({ product, navigate, cart, setCart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const addToCart = () => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item added to cart! 🛒");
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: isHovered
          ? "0 12px 32px rgba(27, 33, 26, 0.15)"
          : "0 2px 12px rgba(27, 33, 26, 0.08)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: `1px solid ${isHovered ? "#628141" : "#EBD5AB"}`,
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "260px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #EBD5AB 0%, #F5E9D3 100%)",
          position: "relative",
        }}
      >
        {!imageLoaded && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin />
          </div>
        )}
        <img
          src={`${process.env.REACT_APP_API_BASE}api/v1/product/product-photo/${product._id}`}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.08)" : "scale(1)",
            display: imageLoaded ? "block" : "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(27, 33, 26, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <button
            onClick={() => navigate(`/product/${product.slug}`)}
            title="View Details"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              color: "white",
              background: "#628141",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.15)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            <AiOutlineEye size={22} />
          </button>
          <button
            onClick={addToCart}
            title="Add to Cart"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              color: "white",
              background: "#8BAE66",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.15)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            <AiOutlineShoppingCart size={22} />
          </button>
        </div>
      </div>

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <h5
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#1B211A",
            margin: "0 0 12px 0",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.8em",
            fontFamily: '"Playfair Display", Georgia, serif',
          }}
        >
          {product.name}
        </h5>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#666",
            marginBottom: "16px",
            flex: 1,
            lineHeight: 1.5,
          }}
        >
          {product.description.substring(0, 65)}...
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "1.6rem",
                fontWeight: "700",
                color: "#628141",
              }}
            >
              {product.price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "8px",
            }}
          >
            <button
              onClick={() => navigate(`/product/${product.slug}`)}
              style={{
                padding: "12px 18px",
                border: "2px solid #1B211A",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                background: "transparent",
                color: "#1B211A",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#1B211A";
                e.target.style.color = "white";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#1B211A";
                e.target.style.transform = "translateY(0)";
              }}
            >
              View Details
            </button>
            <button
              onClick={addToCart}
              style={{
                padding: "12px 18px",
                border: "none",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                background: "#628141",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#8BAE66";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#628141";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <AiOutlineShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      {/* Banner Image */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          maxHeight: "420px",
          marginBottom: "40px",
          borderRadius: "0 0 24px 24px",
          boxShadow: "0 4px 20px rgba(27, 33, 26, 0.1)",
        }}
      >
        <img
          src="/images/banner.png"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
          alt="banner"
        />
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 20px 60px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Filter Section */}
          <div>
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
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "32px",
                paddingBottom: "24px",
                borderBottom: "2px solid #EBD5AB",
              }}
            >
              <div>
                <h1
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "2.2rem",
                    fontWeight: "700",
                    color: "#1B211A",
                    fontFamily: '"Playfair Display", Georgia, serif',
                  }}
                >
                  ✨ All Products
                </h1>
                <p
                  style={{
                    margin: 0,
                    color: "#666",
                    fontSize: "1rem",
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Discover amazing products at great prices
                </p>
              </div>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #628141 0%, #8BAE66 100%)",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "20px",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 12px rgba(98, 129, 65, 0.3)",
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {products?.length} {products?.length === 1 ? "item" : "items"}
              </div>
            </div>

            {filterLoading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 20px",
                  background:
                    "linear-gradient(135deg, #EBD5AB 0%, #F5E9D3 100%)",
                  borderRadius: "16px",
                }}
              >
                <Spin size="large" />
                <p
                  style={{
                    marginTop: "20px",
                    color: "#1B211A",
                    fontSize: "1.05rem",
                    fontWeight: "500",
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Filtering products...
                </p>
              </div>
            ) : products?.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 20px",
                  background:
                    "linear-gradient(135deg, #EBD5AB 0%, #F5E9D3 100%)",
                  borderRadius: "16px",
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📦</div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    color: "#1B211A",
                    marginBottom: "10px",
                    fontFamily: '"Playfair Display", Georgia, serif',
                  }}
                >
                  No products found
                </h3>
                <p
                  style={{
                    color: "#666",
                    fontSize: "1rem",
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "24px",
                    marginBottom: "40px",
                  }}
                >
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
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "40px",
                      paddingTop: "40px",
                      borderTop: "2px solid #EBD5AB",
                    }}
                  >
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={loading}
                      style={{
                        background: loading
                          ? "#ccc"
                          : "linear-gradient(135deg, #628141 0%, #8BAE66 100%)",
                        color: "white",
                        border: "none",
                        padding: "16px 48px",
                        borderRadius: "12px",
                        fontSize: "1rem",
                        fontWeight: "600",
                        cursor: loading ? "not-allowed" : "pointer",
                        transition: "all 0.3s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        boxShadow: "0 4px 12px rgba(98, 129, 65, 0.3)",
                        fontFamily: '"Inter", sans-serif',
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.target.style.transform = "translateY(-3px)";
                          e.target.style.boxShadow =
                            "0 6px 20px rgba(98, 129, 65, 0.4)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 4px 12px rgba(98, 129, 65, 0.3)";
                        }
                      }}
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

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: 300px 1fr"] {
            grid-template-columns: 260px 1fr !important;
            gap: 24px !important;
          }
          div[style*="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))"] {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important;
            gap: 20px !important;
          }
        }

        @media (max-width: 768px) {
          div[style*="maxHeight: '420px'"] {
            max-height: 250px !important;
          }
          div[style*="grid-template-columns: 300px 1fr"],
          div[style*="grid-template-columns: 260px 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          div[style*="fontSize: '2.2rem'"] {
            font-size: 1.6rem !important;
          }
          div[style*="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))"],
          div[style*="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))"] {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
            gap: 16px !important;
          }
          button[style*="padding: '16px 48px'"] {
            width: 100% !important;
            padding: 14px 20px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))"] {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important;
            gap: 12px !important;
          }
          div[style*="fontSize: '1.6rem'"] {
            font-size: 1.4rem !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Home;
