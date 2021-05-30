import React from 'react';
import Title from '../general/Title';
import logo1 from '../Site files/products-banner.jpg';
import CategoriesList from './CategoriesList';

class Products extends React.Component {
    render() {
        return (
            <div className="productsPage">
                <Title logo={logo1} title={"Їжа та напої"} description={"Безліч страв на ваш смак"} />
                <CategoriesList />
            </div>
        );
    }
}

export default Products;