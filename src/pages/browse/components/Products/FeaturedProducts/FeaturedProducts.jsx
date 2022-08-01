import React from 'react';
import './FeaturedProducts.scss';
import { useQueryGetProductList } from '../../../../../data/queries/getProduct';
import { Link } from 'react-router-dom';
import Product from '../ProductCard/ProductCard';
import { FaGreaterThan } from 'react-icons/fa';

const FeaturedProducts = () => {
  const { data } = useQueryGetProductList();

  let featuredList = data?.products.filter(product => product.featuringFrom && product.featuringTo);

  const currentDate = new Date();
  featuredList = featuredList?.filter(product => {
    const [ featuringFromDay, featuringFromMonth, featuringFromYear ] = product.featuringFrom.split('/');
    const [ featuringToDay, featuringToMonth, featuringToYear ] = product.featuringTo.split('/');

    const featuringFromDate = new Date(+featuringFromYear, +featuringFromMonth - 1, +featuringFromDay);
    const featuringToDate = new Date(+featuringToYear, +featuringToMonth - 1, +featuringToDay);
    console.log(featuringFromDate)

    if (featuringFromDate <= currentDate && featuringToDate >= currentDate) {
      return product;
    }
    return null;
  })


  return (
    <div className='featured-products'>
      <ul className='product-list' style={{ justifyContent: 'center' }}>
          { featuredList?.map((product, index) => (
            <li key={product.id}>
              <Product product={product} />   
            </li>
          ))}
          <Link to='/shop' className='more'>
            <h4>Watch more</h4>
            <FaGreaterThan className='icon' />
            <FaGreaterThan className='icon' />
          </Link>
      </ul>
    </div>
  )
}

export default FeaturedProducts;