import { useEffect, useState } from "react";
import _ from 'lodash';
import { ProductInterface } from "./types";
import Product from "./product";

function Pagination () {

    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [page, setPage] = useState(6);
    const [noOfPages, setNoOfPages] = useState(10);

    const getProductsApi = async () => {
        const res = await fetch('https://dummyjson.com/products?limit=102');
        const data = await res.json();
        setProducts(data.products);
        console.log(data);
        setNoOfPages(Math.ceil((data.products.length)/10));
    }

    useEffect(() => {
        getProductsApi();
    }, []);

    const openPage = (i: number) => {
        console.log("hello",i);
        setPage(i);
    }

    return (
        <div className="parent">
            <div className="pagination">
                {!_.isEmpty(products) ?
                    products.slice(page*10, page*10+10).map((product, idx) => 
                            <Product id={product.id} title={product.title} price={product.price} />
                    ) : null
                }
            </div>
            <div className="pages">
                {0 !== page ? <div className="pageBox" onClick={() => openPage(page-1)}>Prev</div> : null }
                {(Array(noOfPages).fill(1)).map((__, index) =>
                    <div 
                        className={page === (index) ? "pageBox selected" : "pageBox"}
                        onClick={() => openPage(index)}
                    >{index+1}</div>
                )}
                {noOfPages-1 !== page ? <div className="pageBox" onClick={() => openPage(page+1)}>Next</div> : null}
            </div>
        </div>
    )
}

export default Pagination;