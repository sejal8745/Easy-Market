import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        .custom-navbar {
          background: linear-gradient(135deg, #1B211A 0%, #2a3328 100%) !important;
          box-shadow: 0 4px 20px rgba(27, 33, 26, 0.15);
          padding: 12px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          margin-bottom: 20px;
          border-bottom: 3px solid #628141;
        }

        .custom-navbar .navbar-brand {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #EBD5AB !important;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .custom-navbar .navbar-brand:hover {
          color: #8BAE66 !important;
          transform: translateY(-2px);
        }

        .custom-navbar .nav-link {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #EBD5AB !important;
          padding: 6px 14px !important;
          margin: 0 4px;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }

        .custom-navbar .nav-link:hover {
          background: rgba(235, 213, 171, 0.1);
          color: #8BAE66 !important;
          transform: translateY(-2px);
        }

        .custom-navbar .nav-link.active {
          background: linear-gradient(135deg, #628141 0%, #8BAE66 100%);
          color: white !important;
          box-shadow: 0 4px 12px rgba(98, 129, 65, 0.3);
        }

        .custom-navbar .dropdown-menu {
          background: #1B211A;
          border: 2px solid #628141;
          border-radius: 12px;
          padding: 8px;
          margin-top: 8px;
          box-shadow: 0 8px 24px rgba(27, 33, 26, 0.3);
        }

        .custom-navbar .dropdown-item {
          font-family: 'Inter', sans-serif;
          color: #EBD5AB;
          padding: 10px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .custom-navbar .dropdown-item:hover {
          background: linear-gradient(135deg, #628141 0%, #8BAE66 100%);
          color: white;
        }

        .custom-navbar .navbar-toggler {
          border: 2px solid #628141;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .custom-navbar .navbar-toggler:hover {
          background: rgba(98, 129, 65, 0.2);
          border-color: #8BAE66;
        }

        .custom-navbar .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%23EBD5AB' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }

        .custom-navbar .navbar-toggler:focus {
          box-shadow: 0 0 0 0.25rem rgba(98, 129, 65, 0.25);
        }

        .cart-badge .ant-badge-count {
          background: linear-gradient(135deg, #628141 0%, #8BAE66 100%);
          box-shadow: 0 2px 8px rgba(98, 129, 65, 0.4);
          font-weight: 600;
        }

        .user-welcome {
          color: #8BAE66;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        @media (max-width: 991px) {
          .custom-navbar {
            padding: 12px 0;
          }

          .custom-navbar .navbar-brand {
            font-size: 1.5rem;
          }

          .custom-navbar .container-fluid {
            flex-wrap: nowrap;
          }

          .custom-navbar .navbar-collapse {
            background: #1B211A;
            padding:10px;
            border-radius: 12px;
            margin-top: 10px;
            border: 2px solid #628141;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            width: 100%;
          }

          .custom-navbar .nav-link {
            margin: 4px 0;
          }

          .custom-navbar .dropdown-menu {
            background: #2a3328;
            border: 1px solid #628141;
          }

          .custom-navbar .navbar-toggler {
            margin-left: 8px;
          }
        }

        @media (max-width: 576px) {
          .custom-navbar .navbar-brand {
            font-size: 1.2rem;
          }

          .custom-navbar .nav-link {
            font-size: 0.95rem;
            padding: 8px 14px !important;
          }
        }
      `}</style>

      <nav className="navbar navbar-expand-lg custom-navbar">
        <div
          className="container-fluid"
          style={{ maxWidth: "1400px", margin: "0 auto" }}
        >
          <Link to="/" className="navbar-brand">
            🛒 EasyMarket
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <SearchInput />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul
              className="navbar-nav ms-auto mb-2 mb-lg-0"
              style={{ alignItems: "center" }}
            >
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  HOME
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  CATEGORIES
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      📂 All Categories
                    </Link>
                  </li>
                  <li>
                    <hr style={{ borderColor: "#628141", margin: "8px 0" }} />
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        • {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      REGISTER
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      LOGIN
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle user-welcome"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      👤 {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          📊 Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <hr
                          style={{ borderColor: "#628141", margin: "8px 0" }}
                        />
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          🚪 Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link cart-badge">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    <span style={{ color: "#EBD5AB", fontWeight: "600" }}>
                      🛒 CART
                    </span>
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
