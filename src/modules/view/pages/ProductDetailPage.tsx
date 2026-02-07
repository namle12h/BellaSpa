import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";
import ProductDetailHead from "../components/ProductDetailHead";
import ProductDetailInfo from "../components/ProductDetailInfo";
import RelatedProducts from "../components/RalatedProducts";
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();

  const productId = Number(id);
  return (
    <div>
      <Header />
      <ProductDetailHead />
      
      <ProductDetailInfo />
      <RelatedProducts productId={productId} />

      <Footer />
    </div>
  )
}
