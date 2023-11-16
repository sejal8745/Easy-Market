import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetails.css";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [cart, setCart] = useState([]);

  //get product
  const getProduct = async (req, res) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );

      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
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

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "IND",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button
            class="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h1>Similar Products</h1>
        {relatedProduct.length < 1 && (
          <p className="text-center">No similar products found</p>
        )}
        {/* {JSON.stringify(relatedProduct, null, 4)} */}
        <div className="d-flex flex-wrap">
          {relatedProduct?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "IND",
                    })}
                  </h5>
                </div>
                <p className="card-text">{p.description.substring(0, 60)}...</p>
                {/* <p className="card-text"> Rs {p.price}</p> */}
                <div className="card-name-price">
                  <button
                    class="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                    class="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
