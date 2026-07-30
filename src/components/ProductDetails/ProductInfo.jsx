import Rating from "../Shop/Rating";
import { Truck, ShieldCheck } from "lucide-react";
import ProductActions from "./ProductActions";

const ProductInfo = ({ product }) => {
  return (
    <div className="flex flex-col space-y-4">
      {/* Category & Brand */}
      <div className="flex items-center gap-2 text-sm">
        <span className="rounded-full bg-amazon-yellow/30 text-amazon-orangeHover px-2 py-1 capitalize">
          {product.category}
        </span>
        <span className="capitalize">{product.brand}</span>
      </div>

      {/* Product Name */}
      <h1 className="text-3xl font-bold text-amazon-textDark">
        {product.name}
      </h1>

      {/* Rating  & Stock*/}
      <div className="flex items-center gap-4">
        <Rating rating={product.averageRating} />

        <div>
          {product.stock > 0 ? (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              In Stock ({product.stock})
            </span>
          ) : (
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-destructive">
              Out Of Stock
            </span>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-amazon-textDark">
          EGP {product.discountPrice || product.price}
        </span>

        {product.discountPrice > 0 && (
          <span className="text-lg text-amazon-textLight line-through">
            EGP {product.price}
          </span>
        )}

        <div className="rounded-xl bg-destructive/20 px-2 py-1 text-xs font-semibold text-destructive">
          -{product.discountPrice}%
        </div>
      </div>

      {/* Description */}
      <p className="leading-7 text-amazon-textLight">{product.description}</p>

      <ProductActions product={product} />

      {/* Features */}
      <div className="space-y-3 border-t border-amazon-border pt-6">
        <div className="flex items-center gap-3">
          <Truck className="text-amazon-orange" size={20} />
          <span>Free shipping on eligible orders.</span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="text-amazon-orange" size={20} />
          <span>100% secure payment.</span>
        </div>
      </div>

      
    </div>
  );
};

export default ProductInfo;
