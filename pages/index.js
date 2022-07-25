import React from 'react';
import { Product, FooterBanner, HeroBanner} from '../components';
import { client } from '../lib/client';

const Home = ({products, bannerData, product}) => {
  return (
    <>
   <HeroBanner heroBanner={bannerData.length && bannerData[0]} product={product} />
   <div className="products-heading">
     <h2>Best Selling Products</h2>
     <p>Speakers of many variations</p>
   </div>
   <div className="products-container">
     {products?.map((product) => <Product key={products._id} product={product}/>)}
   </div>

   <FooterBanner footerBanner={bannerData && bannerData[0]}/>
   </>
  )
}

export const getServerSideProps = async() => {
   const query = '*[_type == "product"]';
   const products = await client.fetch(query);

   const bannerQuery = '*[_type == "banner"]';
   const bannerData = await client.fetch(bannerQuery);
   const productQuery = `*[_type == "product" && slug.current == 'headphones-wireless']`;
   const product  = await client.fetch(productQuery);
   
   return {
     props: {products, bannerData,product}
   }
};

export default Home;
