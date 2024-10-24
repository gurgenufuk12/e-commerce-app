import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton.tsx";
import { AuthContext } from "../contexts/AuthContext.tsx";
import useRandomStringGenerator from "../hooks/useRandomStringGenerator.tsx";
import {
  isUserBoughtProduct,
  getProductComments,
  addCommentToProductById,
} from "../services/api.ts";
import { Comment } from "../types/Comment.ts";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.userProfile;
  const location = useLocation();
  const product = location.state;
  const { generateRandomString } = useRandomStringGenerator();
  const [quantity, setQuantity] = React.useState(1);
  const [userBoughtTheProduct, setUserBoughtTheProduct] = React.useState(false);
  const [commentBody, setCommentBody] = React.useState("");
  const [comments, setComments] = React.useState<Comment[]>([]);

  useEffect(() => {
    if (product) {
      const fetchProductComments = async () => {
        try {
          const comments = await getProductComments(product.id);
          setComments(comments);
        } catch (error) {
          console.error("Failed to fetch comments:", error);
        }
      };
      fetchProductComments();
    }
  }, [product]);

  useEffect(() => {
    if (product && user) {
      const checkUserBoughtTheProduct = async () => {
        try {
          const result = await isUserBoughtProduct(user.userUid, product.id);
          setUserBoughtTheProduct(result.isBought);
        } catch (error) {
          console.error("Error checking if user bought product:", error);
        }
      };
      checkUserBoughtTheProduct();
    }
  }, [product, user]);
  const handleAddComment = () => {
    const commentId = generateRandomString("C");
    const comment = {
      commentAuthor: {
        userId: user?.userUid,
        userName: user?.username,
      },
      commentId: commentId,
      commentBody: commentBody,
      commentDate: new Date().toISOString(),
    };
    try {
      addCommentToProductById(product.id, comment);
      toast.success("Comment added successfully.");
      setComments([...comments, comment]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="flex flex-col gap-10 mx-24 mt-8">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {product.name}
        </h1>

        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold text-gray-700">
            Price: <span className="text-gray-900">${product.price}</span>
          </p>
          {product.stock > 0 ? (
            <p className="text-sm text-green-600 font-semibold">In Stock</p>
          ) : (
            <p className="text-sm text-red-600 font-semibold">Out of Stock</p>
          )}
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-700 font-medium">
            Category:{" "}
            <span className="text-gray-900">{product.categoryName}</span>
          </p>
          <p className="text-sm text-gray-700 font-medium">
            Color: <span className="text-gray-900">{product.color}</span>
          </p>
        </div>

        <p className="mt-6 text-base text-gray-700 leading-relaxed">
          Description: {product.description}
        </p>

        <div className="flex items-center mt-6 gap-2">
          <input
            type="number"
            value={quantity}
            min="1"
            max={product.stock}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border border-gray-300 rounded-lg px-4 py-2 w-24 focus:outline-none focus:border-indigo-500 transition duration-200 ease-in-out"
          />
          <AddToCartButton
            product={product}
            quantity={quantity}
            disabled={product.stock === 0}
          />
        </div>
      </div>
      <div className="flex flex-col shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Product Comments
        </h1>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.commentId}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <p className="text-gray-800 font-semibold">
                {comment.commentAuthor.userName}
              </p>
              <p className="text-gray-700">{comment.commentBody}</p>

              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-500 text-sm">
                  {new Date(comment.commentDate).toLocaleDateString()}
                </p>

                <p className="text-gray-500 text-sm">
                  {new Date(comment.commentDate).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-800">No comments yet.</p>
        )}
        {userBoughtTheProduct ? (
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Add Comment
            </h1>
            <textarea
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:border-indigo-500 transition duration-200 ease-in-out"
              placeholder="Write your comment here..."
              onChange={(e) => setCommentBody(e.target.value)}
            ></textarea>
            <button
              onClick={handleAddComment}
              className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg mt-4"
            >
              Add Comment
            </button>
          </div>
        ) : (
          <p className="text-gray-800 mt-4">
            You need to buy the product to add a comment.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
