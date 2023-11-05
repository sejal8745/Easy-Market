import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        {children}
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "EasyMarket - shop online",
  description: "MERN stack web app",
  keywords: "mern,react,node,mongodb,ecommerce",
  author: "sedik",
};

export default Layout;
