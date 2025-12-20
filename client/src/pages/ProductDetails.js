import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetails.css";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { Spin } from "antd";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  //get product
  const getProduct = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );

      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );

      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (productItem) => {
    setCart([...cart, productItem]);
    localStorage.setItem("cart", JSON.stringify([...cart, productItem]));
    toast.success("Added to cart! 🛒");
  };

  if (loading) {
    return (
      <Layout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      {/* Product Details Section */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            marginBottom: "80px",
          }}
        >
          {/* Product Image */}
          <div
            style={{
              background: "linear-gradient(135deg, #EBD5AB 0%, #F5E9D3 100%)",
              borderRadius: "20px",
              padding: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(27, 33, 26, 0.1)",
              border: "2px solid #EBD5AB",
              position: "relative",
              minHeight: "500px",
            }}
          >
            {!imageLoaded && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Spin size="large" />
              </div>
            )}
            <img
              src={`${process.env.REACT_APP_API_BASE}api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                objectFit: "contain",
                borderRadius: "16px",
                display: imageLoaded ? "block" : "none",
              }}
            />
          </div>

          {/* Product Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            <div
              style={{
                background: "#628141",
                color: "white",
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                display: "inline-block",
                marginBottom: "20px",
                width: "fit-content",
              }}
            >
              {product?.category?.name}
            </div>

            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#1B211A",
                marginBottom: "20px",
                lineHeight: "1.2",
                fontFamily: '"Playfair Display", Georgia, serif',
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#628141",
                marginBottom: "30px",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {product?.price?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #F5F5F5 0%, #FAFAFA 100%)",
                padding: "24px",
                borderRadius: "16px",
                marginBottom: "30px",
                border: "1px solid #EBD5AB",
              }}
            >
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#1B211A",
                  marginBottom: "12px",
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Description
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#666",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                {product.description}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "30px",
              }}
            >
              <button
                onClick={() => addToCart(product)}
                style={{
                  flex: 1,
                  background:
                    "linear-gradient(135deg, #628141 0%, #8BAE66 100%)",
                  color: "white",
                  border: "none",
                  padding: "18px 32px",
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 4px 16px rgba(98, 129, 65, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow =
                    "0 6px 24px rgba(98, 129, 65, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 16px rgba(98, 129, 65, 0.3)";
                }}
              >
                <AiOutlineShoppingCart size={24} />
                Add to Cart
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                padding: "24px",
                background: "linear-gradient(135deg, #EBD5AB 0%, #F5E9D3 100%)",
                borderRadius: "16px",
                border: "1px solid #EBD5AB",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>
                  🚚
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#1B211A",
                    fontWeight: "600",
                  }}
                >
                  Free Shipping
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>
                  ↩️
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#1B211A",
                    fontWeight: "600",
                  }}
                >
                  Easy Returns
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>✓</div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#1B211A",
                    fontWeight: "600",
                  }}
                >
                  Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div
          style={{
            borderTop: "2px solid #EBD5AB",
            paddingTop: "60px",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#1B211A",
              marginBottom: "40px",
              fontFamily: '"Playfair Display", Georgia, serif',
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            ✨ Similar Products
          </h2>

          {relatedProduct.length < 1 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "linear-gradient(135deg, #EBD5AB 0%, #F5E9D3 100%)",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#666",
                  margin: 0,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                No similar products found
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {relatedProduct?.map((p) => (
                <SimilarProductCard
                  key={p._id}
                  product={p}
                  navigate={navigate}
                  addToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          div[style*="gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'"] {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important;
          }
        }

        @media (max-width: 768px) {
          div[style*="fontSize: '2.5rem'"] {
            font-size: 2rem !important;
          }
          div[style*="fontSize: '2rem'"][style*="fontWeight: '700'"][style*="color: '#628141'"] {
            font-size: 1.6rem !important;
          }
          div[style*="minHeight: '500px'"] {
            min-height: 400px !important;
            padding: 30px !important;
          }
          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"] {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          button[style*="flex: 1"] {
            font-size: 1rem !important;
            padding: 16px 24px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="fontSize: '2rem'"][style*="fontFamily"] {
            font-size: 1.6rem !important;
          }
          div[style*="gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'"],
          div[style*="gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'"] {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </Layout>
  );
};

// Similar Product Card Component
const SimilarProductCard = ({ product, navigate, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
        cursor: "pointer",
      }}
      onClick={() => navigate(`/product/${product.slug}`)}
    >
      <div
        style={{
          width: "100%",
          height: "240px",
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
            margin: "0 0 10px 0",
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
            marginBottom: "14px",
            flex: 1,
            lineHeight: 1.5,
          }}
        >
          {product.description.substring(0, 60)}...
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
          }}
        >
          <span
            style={{
              fontSize: "1.4rem",
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
            gridTemplateColumns: "1fr auto",
            gap: "8px",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.slug}`);
            }}
            style={{
              padding: "10px 16px",
              border: "2px solid #1B211A",
              borderRadius: "10px",
              fontSize: "0.85rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              background: "transparent",
              color: "#1B211A",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#1B211A";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#1B211A";
            }}
          >
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "10px",
              fontSize: "0.85rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              background: "#628141",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#8BAE66";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#628141";
            }}
          >
            <AiOutlineShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
