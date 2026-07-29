const DiscountBadge = ({ price, discountPrice }) => {
  if (!discountPrice || discountPrice >= price) return null;

  const discount = Math.round(((price - discountPrice) / price) * 100);

  return (
    <div className="absolute left-1 top-1 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-amazon-textBase">
      -{discount}%
    </div>
  );
};

export default DiscountBadge;
