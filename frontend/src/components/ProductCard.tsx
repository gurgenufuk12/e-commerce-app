import React from "react";
import { Link } from "react-router-dom";
import {
  addFovoriteToUserById,
  removeFavoriteFromUserById,
} from "../services/api.ts";
import { addToCart } from "../redux/cartSlice.ts";
import { useDispatch } from "react-redux";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import { AuthContext } from "../contexts/AuthContext.tsx";
import { toast } from "react-toastify";
import Mouse from "../assets/mouse.jpg";

interface ProductCardProps {
  id: string;
  brand: string;
  name: string;
  price: number;
  description: string;
  color: string;
  stock: number;
  categoryId: string;
  categoryName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  brand,
  name,
  price,
  description,
  color,
  stock,
  categoryId,
  categoryName,
}) => {
  const dispatch = useDispatch();
  const authContext = React.useContext(AuthContext);
  const userUid = authContext?.user?.uid;
  const [buttonActive, setButtonActive] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const product = {
    id,
    brand,
    name,
    price,
    color,
    stock,
  };
  const quantity = 1;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      addToCart({
        ...product,
        quantity,
        totalPrice: product.price * quantity,
      })
    );
  };
  const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const favoriteProduct = {
      id,
      name,
      price,
      description,
      color,
      stock,
      categoryId,
      categoryName,
    };
    if (isFavorite) {
      await removeFavoriteFromUserById(userUid, favoriteProduct);
      setIsFavorite(false);
      toast.success("Removed from favorites");
    } else {
      await addFovoriteToUserById(userUid, favoriteProduct);
      setIsFavorite(true);
      toast.success("Added to favorites");
    }
  };
  return (
    <Link
      onMouseEnter={() => setButtonActive(true)}
      onMouseLeave={() => setButtonActive(false)}
      to={`/product/${id}`}
      state={{
        id,
        name,
        price,
        description,
        color,
        stock,
        categoryId,
        categoryName,
      }}
      className="relative p-4 border-2 rounded-xl border-orange-500 hover:shadow-xl transition-shadow duration-200 w-64 h-64 flex flex-col items-center justify-between"
    >
      <div className="flex-grow flex items-center justify-center flex-col">
        <img src={Mouse} alt={name} className="h-32 object-cover" />
        <h3 className="text-lg font-semibold text-center">
          {brand}
          {name}
        </h3>
      </div>
      <p className="text-gray-700">Price: {price}</p>
      <button
        onClick={handleAddToCart}
        disabled={!buttonActive}
        className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 duration-200 disabled:hidden"
      >
        Add to Cart
      </button>
      <button
        onClick={handleFavorite}
        className={`absolute top-2 right-2 bg-white  p-2 rounded-full hover:bg-orange-100 duration-200 `}
      >
        {isFavorite ? (
          <FavoriteSharpIcon sx={{ fontSize: "2rem", color: "red" }} />
        ) : (
          <FavoriteBorderSharpIcon sx={{ fontSize: "2rem", color: "gray" }} />
        )}
      </button>
    </Link>
  );
};

export default ProductCard;
