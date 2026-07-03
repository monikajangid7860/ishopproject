// app/components/footer/FooterServer.jsx
import FooterClient from "./FooterClient";

export default function FooterServer() {
  const categories = {
    topCategories: [
      "Laptops", "PC & Computers", "Cell Phones", "Tablets",
      "Gaming & VR", "Networks", "Cameras", "Sounds", "Office"
    ],
    company: [
      "About Swoo", "Contact", "Career", "Blog", "Sitemap", "Store Locations"
    ],
    help: [
      "Customer Service", "Policy", "Terms & Conditions",
      "Track Order", "FAQs", "My Account", "Product Support"
    ],
    partner: [
      "Become Seller", "Affiliate", "Advertise", "Partnership"
    ]
  };

  return <FooterClient categories={categories} />;
}
