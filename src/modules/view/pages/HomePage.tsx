import Header from "../../../shared/components/Header";
import Footer from "../../../shared/components/Footer";
import HeroCarousel from "./Sider";
import AboutSection from "../components/AboutSection";
import { Title } from "react-head";
import CategorySection from "../components/CategorySection";
import ProductPageImp from "./ProductPageImp";
import ServiceHighlights from "../components/ServiceHighlights";

const HomePage: React.FC = () => {
  return (
    <>
      <Title>Home | Thảo Susi Store</Title>
      <Header />
      <HeroCarousel />
      <CategorySection/>
      <ProductPageImp/>
      <ServiceHighlights/>
      <AboutSection />
      
      <Footer />
    </>
  );
};

export default HomePage;
