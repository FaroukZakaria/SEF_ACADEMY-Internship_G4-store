import { getMyProfile, logOut } from "../../auth-service/authService";
import { useEffect, useState } from "react";
import { getWishlist } from "../../api/wishlist";
import { getCart } from "../../api/cart";
import useThemeStore from "../../store/themeStore"
import useShopStore from "../../store/shopStore";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png"
import { Search, Sun, Moon, Heart, ShoppingCart, CircleUserRound, X, Menu, ArrowRight, LogOut, House, ShoppingBag, BookHeart, Settings2, Package } from "lucide-react";

const navItems = [
    {
        title : "Home",
        path : "/",
    },
    {
        title : "Shop",
        path : "/shop",

    },
    {
        title : "My Orders",
        path : "/orders"
    },
    {
        title : "Wishlist",
        path : "/wishlist"
    },
]

const dropDownItems = [
    {
        title : "Home",
        path : "/",
        icon : <House size={24} className="text-amazon-orange inline mr-1 pb-1" />
    },
    {
        title : "Shop",
        path : "/shop",
        icon : <ShoppingBag size={24} className="text-amazon-orange inline mr-1 pb-1" />
    },
    {
        title : "My Orders",
        path : "/orders",
        icon : <Package size={24} className="text-amazon-orange inline mr-1 pb-1" />
    },
    {
        title : "Wishlist",
        path : "/wishlist",
        icon : <BookHeart size={24} className="text-amazon-orange inline mr-1 pb-1" />
    },
    {
        title : "Cart",
        path : "/cart",
        icon : <ShoppingCart size={24} className="text-amazon-orange inline mr-1 pb-1" />
    },
    {
        title : "Profile Settings",
        path : "/profile",
        icon : <Settings2 size={24} className="text-amazon-orange inline mr-1 pb-1" />
    },
]

const TopBar = ({ isLoggedIn, setIsLoggedIn, profileUsername, setProfileUsername }) => {
    const [openSearch, setOpenSearch] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const { theme, toggleTheme } = useThemeStore();

    const wishlist = useShopStore((s) => s.wishlist);
    const setWishlist = useShopStore((s) => s.setWishlist);
    const cart = useShopStore((s) => s.cart);
    const setCart = useShopStore((s) => s.setCart);
    const wishlistLoading = useShopStore((s) => s.wishlistLoading);
    const setWishlistLoading = useShopStore((s) => s.setWishlistLoading);

    const wishlistCount = wishlist.length;
    const ordersCount = cart.itemCount;
    const navigate = useNavigate();

    useEffect( () => {
        const token = localStorage.getItem("token");

        if (token)
            setIsLoggedIn(true);
        else return;

        const fetchMyProfile = async () => {
            try {
                const username = localStorage.getItem("username");
                if (username) {
                    setProfileUsername(username);
                } else {
                    const data = await getMyProfile();
                    setProfileUsername(data.user?.username);
                    localStorage.setItem("username", data.user?.username);
                }
            } catch (e) {
                toast.error(e.response?.data?.message);
            }
        }
        fetchMyProfile();
    }, []);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                setWishlistLoading(true);
                const data = await getWishlist();

                setWishlist(data.wishlist.products);
                setWishlistLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchWishlist();
    }, []);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const data = await getCart();

                setCart(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCart();
    }, []);

    const searchHandler = (e) => {
        if(e.key === "Enter"){
            const searchValue = e.target.value;
            setOpenSearch(false);
            const dynamicURL = "/shop?search=" + searchValue;
            navigate(dynamicURL);
        }
    };

    const logOutHandler = async () => {
        try {
          const data = await logOut();
          toast.success(data.message);
        } catch (e) {
          toast.error(e.response?.data?.message)
        } finally {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          localStorage.removeItem("username");
          setIsLoggedIn(false);
          navigate("/login");
        }
    };

    const DropDown = () => {
        return (
            <div className="block md:hidden">
            <div className="flex w-full h-[65px] bg-amazon-surface/30 items-center fixed top-0 z-100 backdrop-blur-sm"></div>
                <div className="w-[300px] h-[310px] bg-amazon-lightNavy/50 fixed top-0 right-0 z-120 rounded-bl-2xl border border-amazon-border backdrop-blur-xl">
                    <div className="w-full h-[65px] bg-amazon-surface flex justify-between p-3">
                        <div className="flex gap-3">
                            <div className="p-2 bg-amazon-bg/70 rounded-xl">
                                <img src={logo} alt="Logo" className="w-12 h-6" />
                            </div>
                            <div>
                                <div className="text-amazon-textDark text-sm font-bold">Koda Store</div>
                                <div className="text-amazon-textLight text-xs font-">Welcome</div>
                            </div>
                        </div>
                        <X size={18} onClick={() => setDropDown(false)} strokeWidth={2} className="cursor-pointer text-amazon-textLight hover:text-amazon-orange absolute right-[15px] top-[22px]" />
                    </div>
                    <div className="flex flex-col">
                        <a href="/profile" className="w-9/10 mx-auto my-2 bg-amazon-surface rounded-2xl p-2 flex gap-3 border border-amazon-border" >
                            <div className="h-10 w-10 rounded-full bg-amazon-orange text-amazon-textBase font-bold flex justify-center items-center mt-0.5">
                                {profileUsername[0]?.toUpperCase() || "U"}
                            </div>
                            <div className="flex flex-col">
                                <div className="pb-1 font-bold">{profileUsername || "User"}</div>
                                <div className="text-xs text-amazon-orange">View Profile <ArrowRight size={14} className="pb-0.5 inline" /></div>
                            </div>
                        </a>
                        <div className="max-h-[100px] overflow-y-auto scroll-smooth">
                            {dropDownItems.map((item, index) => (
                                <NavLink 
                                    key={index} to={item.path} end={item.path === "/"} 
                                    className= "w-9/10 mx-auto my-2 bg-amazon-surface rounded-2xl p-2 flex justify-between border border-amazon-border font-bold hover:text-amazon-yellow"
                                >
                                    <div>
                                        {item.icon} {item.title}
                                    </div>
                                    {item.title === "Cart" && ordersCount ?
                                    <div className="font-extrabold text-[10px] mt-1 bg-amazon-orange text-amazon-textLight h-5 w-5 border border-amazon-border rounded-full flex justify-center items-center">
                                        {ordersCount}
                                    </div>
                                    : 
                                    null}
                                    {item.title === "Wishlist" && wishlistCount ?
                                    <div className="font-extrabold text-[10px] mt-1 bg-amazon-orange text-amazon-textLight h-5 w-5 border border-amazon-border rounded-full flex justify-center items-center">
                                        {wishlistCount}
                                    </div>
                                    : 
                                    null}
                                </NavLink>
                            ))}
                        </div>
                        <a className="cursor-pointer w-9/10 mx-auto my-4 bg-red-100 rounded-2xl p-2 text-center text-destructive font-semibold hover:bg-red-200 border border-destructive/20"
                            onClick={logOutHandler}
                        >
                            <LogOut size={18} className="pb-0.5 inline mr-2" />
                            Log Out
                        </a>
                    </div>
                </div>
                </div>
        );
    }

    return(
        <>
            <div className="w-full h-[65px] bg-amazon-surface/90 flex items-center sticky top-0 z-90 backdrop-blur-xl">
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-between">

                    {/* Logo Icon */}
                    <a href="/" className="flex justify-center">
                        <img src={logo} alt="Logo" className="w-28 h-12 pl-4 sm:min-w-26" />
                    </a>

                    {/* NavBar */}
                    <div className=" hidden md:flex h-[50px] justify-center">
                            <div className="rounded-3xl border border-amazon-border h-full flex gap-3 items-center p-4">
                            {navItems.map((item, index) => (
                                <NavLink 
                                    key={index} to={item.path} end={item.path === "/"} 
                                    className={({ isActive }) => 
                                        `rounded-3xl px-3 py-1 cursor-pointer font-medium text-amazon-textLight
                                        ${isActive ? "bg-amazon-orange text-white" : "hover:text-amazon-yellow"}`}>
                                    {item.title}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right NavItems */}
                    <div className="flex justify-between items-center gap-3 px-2">

                            {/* SearchBar */}
                            {openSearch ? 
                                <div className="hidden sm:block relative">
                                    <input autoFocus className="border border-amazon-border rounded-full py-2 px-4" type="text" placeholder="Search..." onKeyDown={searchHandler}/>
                                    <X size={18} onClick={() => setOpenSearch(false)} strokeWidth={2} className="cursor-pointer text-amazon-textLight hover:text-amazon-orange absolute right-[8px] top-[13px]" />
                                </div>
                                :
                                <a className="hidden sm:block cursor-pointer p-2 border border-amazon-border text-amazon-textLight rounded-full flex justify-center items-center"
                                    onClick={() => setOpenSearch(true)}>
                                    <Search size={18} strokeWidth={2} className="text-amazon-textLight hover:text-amazon-orange" />
                                </a>
                            }

                            {/* Theme */}
                            <a className="p-1.5 border border-amazon-border text-amazon-textLight rounded-full flex justify-center items-center"
                                onClick={toggleTheme}>
                                {theme === "dark" ?
                                <Sun size={16} strokeWidth={2} className="text-amazon-textLight hover:text-amazon-orange" />
                                : <Moon size={16} strokeWidth={2} className="text-amazon-textLight hover:text-amazon-orange" />}
                            </a>

                            {/* Wishlist */}
                            <a className="p-1.5 border border-amazon-border text-amazon-textLight rounded-full flex justify-center items-center relative"
                                href="/wishlist">
                                <Heart size={16} strokeWidth={2} className="text-amazon-textLight hover:text-amazon-orange" />
                                {
                                    wishlistCount ?
                                        <div className="absolute font-extrabold text-[10px] bg-amazon-orange text-amazon-textLight top-[-11px] right-[-8px] h-5 w-5 border border-amazon-border rounded-full flex justify-center items-center">
                                            {wishlistCount}
                                        </div>
                                    : 
                                        <div></div>
                                }
                            </a>

                            {/* Shopping Cart  */}
                            <a className="p-1.5 border border-amazon-border text-amazon-textLight rounded-full flex justify-center items-center relative"
                                href="/cart">
                                <ShoppingCart size={16} strokeWidth={2} className="text-amazon-textLight hover:text-amazon-orange" />
                                {
                                    ordersCount ?
                                    <div className="absolute font-extrabold text-[10px] bg-amazon-orange text-amazon-textLight top-[-11px] right-[-8px] h-5 w-5 border border-amazon-border rounded-full flex justify-center items-center">
                                        {ordersCount}
                                    </div>
                                    : 
                                    <div></div>
                                }
                            </a>

                            {/* User Profile */}
                            {isLoggedIn ? (
                                <>
                                    <a className="hover:text-amazon-orange hidden md:flex py-1 px-3 border border-amazon-border text-amazon-textLight rounded-full justify-between items-center gap-2"
                                        href="/profile">
                                        <CircleUserRound size={18} strokeWidth={2} />
                                        <div className="pb-1">{profileUsername || "User"}</div>
                                    </a>
                                    <a className="flex md:hidden p-1.5 border border-amazon-border text-amazon-textLight rounded-full justify-center items-center cursor-pointer"
                                        onClick={() => setDropDown(true)}>
                                        <Menu size={18} strokeWidth={2} className="text-amazon-textLight hover:text-amazon-orange" />
                                    </a>
                                </>
                            ) : (
                                <a className="hidden bg-amazon-orange hover:bg-amazon-orangeHover md:flex py-1.5 px-4 border border-amazon-border text-amazon-textBase rounded-full justify-between items-center gap-2"
                                    href="/login">
                                    <div className="font-bold text-amazon-textBase text-sm">Login</div>
                                </a>
                            )}
                    </div>
                </div>
            </div>
            {dropDown ? <DropDown /> : null}
        </>
    );
};

export default TopBar;