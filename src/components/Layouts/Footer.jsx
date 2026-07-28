import { Heart, MessageCircle , Globe, Zap } from 'lucide-react';
const Footer = () => {
    return(
        <div className="bg-amazon-surface border-t border-amazon-border px-12 pt-12 pb-6">
            <div className="flex flex-col md:flex-row">
                <div className="flex-1">
                    <a href="/" className="text-2xl font-bold text-amazon-orange">
                        <Zap size={24} className='inline' /> Koda Store</a>
                    <div className="text-sm text-amazon-textLight w-[280px] my-3">Shop the future, delivered today. Premium products at the best prices with fast delivery across Egypt.</div>
                </div>
                <div className="flex-1 flex gap-16">
                    <div className="flex-1 flex flex-col gap-2 text-amazon-textLight text-sm">
                        <p className="text-amazon-textDark font-bold text-base">Quick Links</p>
                        <a className="hover:text-amazon-yellow" href="/shop">Shop</a>
                        <a className="hover:text-amazon-yellow" href="/orders">My Orders</a>
                        <a className="hover:text-amazon-yellow" href="/wishlist">Wishlist</a>
                        <a className="hover:text-amazon-yellow" href="/profile">Profile</a>
                    </div>
                    <div className="flex-1">
                        <div className="text-amazon-textDark font-bold">Follow Us</div>
                        <div className="flex gap-3 mt-4">
                            <a href='#' className="h-7 w-7 rounded-full bg-amazon-bg flex justify-center items-center">
                                <Globe size={15} className="text-amazon-textDark hover:text-amazon-yellow" />
                            </a>
                            <a href='#' className="h-7 w-7 rounded-full bg-amazon-bg flex justify-center items-center">
                                <MessageCircle size={15} className="text-amazon-textDark hover:text-amazon-yellow" />
                            </a>
                            <a href='#' className="h-7 w-7 rounded-full bg-amazon-bg flex justify-center items-center">
                                <Heart size={15} className="text-amazon-textDark hover:text-amazon-yellow" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-amazon-border mx-auto my-6"/>
            <div className="text-amazon-textLight text-sm text-center mx-auto">© 2026 Koda Store. All rights reserved.</div>
        </div>
    );
};

export default Footer;