import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../globals/components/navbar/Navbar";
import { useParams } from "react-router-dom";

interface Comment {
  comment: string;
  rating: number;
  productId: string;
}

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [singleProduct, setSingleProduct] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>(""); // for comment text
  const [newRating, setNewRating] = useState<number>(1); // for rating (1-5)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/getSingleProduct/${id}`
        );
        setSingleProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

    // Fetch comments for the product
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comment/getAllComment/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [id]);

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return; // Prevent empty comments

    try {
      const response = await axios.post(
        `http://localhost:3000/comment/addComment`,
        {
          comment: newComment,
          rating: newRating,
          productId: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setComments([...comments, response.data]); // Add the new comment to the state
      setNewComment(""); // Clear comment field
      setNewRating(1); // Reset rating to 1
      console.log("Comment added:", response.data);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                {singleProduct && (
                  <img
                    className="w-full h-full object-cover"
                    src={
                      "http://localhost:3000/" + singleProduct.imageUrl ||
                      "https://picsum.photos/536/354"
                    }
                    alt={singleProduct.name || "Product Image"}
                  />
                )}
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              {singleProduct ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {singleProduct.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {singleProduct.description}
                  </p>
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <span className="font-bold text-gray-700 dark:text-gray-300">
                        Price:
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        ${singleProduct.price}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">
                        Availability:
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {singleProduct.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Loading product details...
                </p>
              )}
            </div>
          </div>

          {/* Comment Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Comments
            </h3>
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Write a comment..."
              />
              <div className="mt-2">
                <label className="mr-2 text-gray-600 dark:text-gray-300">
                  Rating:
                </label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Submit Comment
              </button>
            </form>

            {/* Display comments */}
            {/* <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="p-4 bg-gray-200 rounded-md">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {comment.comment}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Rating: {comment.rating}/5
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div> */}
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-300 dark:border-gray-700"
                  >
                    <p className="text-base text-gray-800 dark:text-gray-100 font-semibold">
                      {comment.comment}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                      Rating:{" "}
                      <span className="font-bold text-yellow-500">
                        {comment.rating}/5
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-300 italic">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
