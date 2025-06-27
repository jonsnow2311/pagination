import { ProductInterface } from "./types";

function Product (params: ProductInterface) {
    return (
        <div className="product">
            <h3>{params.title}</h3>
            <h4>{params.id}</h4>
            <h4>{params.price}</h4>
        </div>
    )
}

export default Product;