import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToWishlist, removeFromWishlist } from "../redux/features/cartSlice";

const useWishlist = (data) => {
  const dispatch = useDispatch();
  const wishlistState = useSelector(({ cart: { wishlist } }) => wishlist);

  const productInWishlist = wishlistState.find((item) => item.id === data.id);

  const isWishlisted = productInWishlist?.wishlist || false;

  const wishlistStorage = JSON.parse(localStorage.getItem("wishlist"));
  const handlewishlistStorage = (id) => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistStorage.filter((item) => item.id !== id))
    );
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(data.id));
      handlewishlistStorage(data.id);
      toast.error("Product removed from wishlist", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      dispatch(addToWishlist({ ...data, wishlist: true }));
      toast.success("Product added to wishlist", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return { isWishlisted, handleWishlist };
};

export default useWishlist;
