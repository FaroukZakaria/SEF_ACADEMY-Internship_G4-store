import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import axiosInstance from '../api/axiosInstance';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  
  const [loading, setLoading] = useState(true);
  const [activeTab, activeTabSet] = useState('description');
  
  const [quantity, setQuantity] = useState(1);
  
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const productRes = await axiosInstance.get(`/products/${id}`);
        setProduct(productRes.data.product || productRes.data);

        const reviewsRes = await axiosInstance.get(`/products/${id}/reviews`);
        setReviews(reviewsRes.data.reviews || []);
        setAverageRating(reviewsRes.data.averageRating || 0);
        setNumReviews(reviewsRes.data.numReviews || 0);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    try {
      await axiosInstance.post('/carts/items', {
        productId: id,
        quantity: quantity
      });
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.response?.data?.message || 'Failed to add product to cart');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (newRating === 0) {
      alert('Please select a rating score (stars)');
      return;
    }

    try {
      const response = await axiosInstance.post(`/products/${id}/reviews`, {
        rating: Number(newRating),
        comment: newComment
      });
      
      alert('Review added successfully!');
      setReviews(prev => [response.data.review, ...prev]);
      setAverageRating(response.data.averageRating);
      setNumReviews(response.data.numReviews);
      setNewComment('');
      setNewRating(0); 
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.response?.data?.message || 'Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="bg-[var(--amazon-bg)] min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--amazon-orange)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20 text-xl text-[var(--destructive)] bg-[var(--amazon-bg)] min-h-[70vh]">Product not found.</div>;
  }

  const productImage = product.images?.[0]?.url || 'https://via.placeholder.com/400';

  return (
    <div className="bg-[var(--amazon-bg)] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* قسم تفاصيل المنتج الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[var(--amazon-surface)] p-6 rounded-xl shadow-sm border border-[var(--amazon-border)]">
          
          {/* صورة المنتج */}
          <div className="flex justify-center items-center bg-[var(--amazon-bg)] rounded-lg p-4 border border-[var(--amazon-border)]">
            <img src={productImage} alt={product.name} className="max-h-[400px] object-contain rounded-lg" />
          </div>

       
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex gap-2 mb-2">
                {product.category && (
                  <span className="bg-[var(--amazon-navy)] text-[var(--amazon-textBase)] text-xs px-2.5 py-1 rounded-full font-medium">
                    {product.category}
                  </span>
                )}
                {product.subcategory && (
                  <span className="bg-[var(--amazon-border)] text-[var(--amazon-textLight)] text-xs px-2.5 py-1 rounded-full font-medium">
                    {product.subcategory}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-[var(--amazon-textDark)] mb-3">{product.name}</h1>

        
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[var(--amazon-yellow)]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                      {star <= Math.round(averageRating) ? <FaStar /> : <FaRegStar className="text-gray-400" />}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-[var(--amazon-textLight)]">({numReviews} reviews)</span>
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${product.stock > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

            
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-[var(--amazon-textDark)]">
                  EGP {product.discountPrice || product.price}
                </span>
                {product.discountPrice && product.discountPrice < product.price && (
                  <span className="text-lg text-[var(--amazon-textLight)] line-through">
                    EGP {product.price}
                  </span>
                )}
              </div>

              <p className="text-[var(--amazon-textLight)] mb-6 leading-relaxed">{product.shortDescription}</p>
            </div>

         
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[var(--amazon-border)] rounded-lg overflow-hidden bg-[var(--amazon-bg)]">
                  <button onClick={handleDecrease} className="px-3 py-2 bg-[var(--amazon-surface)] hover:bg-[var(--amazon-border)] text-[var(--amazon-textDark)] transition">-</button>
                  <span className="px-4 py-2 font-semibold text-[var(--amazon-textDark)]">{quantity}</span>
                  <button onClick={handleIncrease} className="px-3 py-2 bg-[var(--amazon-surface)] hover:bg-[var(--amazon-border)] text-[var(--amazon-textDark)] transition">+</button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 bg-[var(--amazon-orange)] hover:bg-[var(--amazon-orangeHover)] text-[var(--amazon-textDark)] font-bold py-3 px-6 rounded-lg transition shadow-sm disabled:opacity-50"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

 
        <div className="mt-12 bg-[var(--amazon-surface)] rounded-xl shadow-sm border border-[var(--amazon-border)] p-6">
          <div className="flex border-b border-[var(--amazon-border)] gap-8">
            <button 
              className={`pb-3 font-semibold text-lg transition border-b-2 ${activeTab === 'description' ? 'border-[var(--amazon-orange)] text-[var(--amazon-textDark)]' : 'border-transparent text-[var(--amazon-textLight)] hover:text-[var(--amazon-textDark)]'}`}
              onClick={() => activeTabSet('description')}
            >
              Description
            </button>
            <button 
              className={`pb-3 font-semibold text-lg transition border-b-2 ${activeTab === 'reviews' ? 'border-[var(--amazon-orange)] text-[var(--amazon-textDark)]' : 'border-transparent text-[var(--amazon-textLight)] hover:text-[var(--amazon-textDark)]'}`}
              onClick={() => activeTabSet('reviews')}
            >
              Reviews ({numReviews})
            </button>
          </div>

          <div className="mt-6">
            {activeTab === 'description' ? (
              <div className="text-[var(--amazon-textLight)] leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            ) : (
              <div>
              
                <form onSubmit={handleReviewSubmit} className="mb-10 bg-[var(--amazon-bg)] p-6 rounded-xl border border-[var(--amazon-border)]">
                  <h3 className="text-lg font-bold text-[var(--amazon-textDark)] mb-3">Write a Review</h3>
                  
                  <div className="flex items-center gap-1 mb-4 text-2xl cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = star <= (hoverRating || newRating);
                      return (
                        <span
                          key={star}
                          onClick={() => setNewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition"
                        >
                          {isFilled ? (
                            <FaStar className="text-[var(--amazon-yellow)]" />
                          ) : (
                            <FaRegStar className="text-gray-400" />
                          )}
                        </span>
                      );
                    })}
                  </div>

                  <div className="mb-4">
                    <textarea 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      required
                      rows="3"
                      className="w-full p-3 border border-[var(--amazon-border)] rounded-lg bg-[var(--amazon-surface)] text-[var(--amazon-textDark)] focus:ring-2 focus:ring-[var(--amazon-orange)] focus:outline-none"
                    />
                  </div>

                  <button type="submit" className="bg-[var(--amazon-orange)] hover:bg-[var(--amazon-orangeHover)] text-[var(--amazon-textDark)] font-bold px-6 py-2.5 rounded-lg transition shadow-sm">
                    Submit Review
                  </button>
                </form>

                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <p className="text-[var(--amazon-textLight)] text-center py-6">No reviews yet. Be the first to review this product!</p>
                  ) : (
                    reviews.map((rev) => (
                      <div key={rev._id} className="border-b border-[var(--amazon-border)] pb-4 last:border-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[var(--amazon-textDark)]">{rev.username || 'Anonymous'}</span>
                          <span className="text-xs text-[var(--amazon-textLight)]">
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex text-[var(--amazon-yellow)] text-sm mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>
                              {star <= rev.rating ? <FaStar /> : <FaRegStar className="text-gray-400" />}
                            </span>
                          ))}
                        </div>
                        <p className="text-[var(--amazon-textLight)] text-sm">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}