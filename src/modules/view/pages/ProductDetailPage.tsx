import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";
import ProductDetailHead from "../components/ProductDetailHead";
import ProductDetailInfo from "../components/ProductDetailInfo";
import RelatedProducts from "../components/RalatedProducts";


export default function ProductDetailPage() {
  return (
    <div>
        <Header/>
        <ProductDetailHead/>
        {/* <ProductTabs/> */}
        {/* <ViewedProducts/> */}
        <ProductDetailInfo/>
        <RelatedProducts/>

        <Footer/>
    </div>
  )
}
