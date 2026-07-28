import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  Star,
  Search,
  MessageSquare,
  Award,
} from "lucide-react";
import api from "../api/api";
import Colors from "../constants/colors";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const response = await api.get("/admin_reviews/");
      const data = response.data;

      setReviews(data);
      setFilteredReviews(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const filtered = reviews.filter(
      (review) =>
        review.client?.toLowerCase().includes(search.toLowerCase()) ||
        review.worker?.toLowerCase().includes(search.toLowerCase()) ||
        review.comment?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredReviews(filtered);
  }, [search, reviews]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const fiveStarReviews = reviews.filter(
    (review) => Number(review.rating) === 5
  ).length;

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            }
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div
            className="h-12 w-12 border-4 border-t-transparent rounded-full animate-spin"
            style={{
              borderColor: Colors.background,
              borderTopColor: "transparent",
            }}
          ></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: Colors.typography }}
          >
            Reviews Management
          </h1>

          <p
            className="mt-1 text-sm font-medium"
            style={{ color: Colors.placeholder }}
          >
            Monitor customer feedback and worker ratings.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Total Reviews */}
          <div
            className="rounded-2xl shadow-sm p-5 border"
            style={{
              backgroundColor: Colors.primary,
              borderColor: "rgba(15, 34, 54, 0.08)",
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Total Reviews
                </p>

                <h2
                  className="text-3xl font-bold mt-2"
                  style={{ color: Colors.typography }}
                >
                  {reviews.length}
                </h2>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(15, 34, 54, 0.08)" }}
              >
                <MessageSquare
                  style={{ color: Colors.typography }}
                  size={26}
                />
              </div>
            </div>
          </div>

          {/* Average Rating */}
          <div
            className="rounded-2xl shadow-sm p-5 border"
            style={{
              backgroundColor: Colors.primary,
              borderColor: "rgba(15, 34, 54, 0.08)",
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Average Rating
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <h2 className="text-3xl font-bold text-amber-500">
                    {averageRating}
                  </h2>
                  <Star className="text-amber-400 fill-amber-400" size={24} />
                </div>
              </div>

              <div className="bg-amber-100 p-3 rounded-xl">
                <Star className="text-amber-600 fill-amber-600" size={26} />
              </div>
            </div>
          </div>

          {/* 5-Star Reviews */}
          <div
            className="rounded-2xl shadow-sm p-5 border"
            style={{
              backgroundColor: Colors.primary,
              borderColor: "rgba(15, 34, 54, 0.08)",
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  5 Star Reviews
                </p>

                <h2
                  className="text-3xl font-bold mt-2"
                  style={{ color: Colors.background }}
                >
                  {fiveStarReviews}
                </h2>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(90, 153, 76, 0.12)" }}
              >
                <Award style={{ color: Colors.background }} size={26} />
              </div>
            </div>
          </div>
        </div>

        {/* Satisfaction Banner */}
        <div
          className="rounded-2xl p-6 text-white shadow-md"
          style={{
            background: `linear-gradient(135deg, ${Colors.typography} 0%, ${Colors.placeholder} 100%)`,
          }}
        >
          <p className="text-xs uppercase tracking-wider font-semibold opacity-80">
            Overall Customer Satisfaction
          </p>

          <h2 className="text-4xl font-bold mt-2">{averageRating} / 5.0</h2>

          <p className="mt-2 text-sm opacity-80">
            Calculated across all submitted client and worker reviews.
          </p>
        </div>

        {/* Search */}
        <div
          className="rounded-2xl shadow-sm p-4 border"
          style={{
            backgroundColor: Colors.primary,
            borderColor: "rgba(15, 34, 54, 0.08)",
          }}
        >
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-3.5"
              style={{ color: Colors.placeholder }}
            />

            <input
              type="text"
              placeholder="Search by client, worker, or comment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-slate-300/80 rounded-xl focus:outline-none transition-all text-sm"
              style={{
                color: Colors.typography,
                backgroundColor: "#ffffff",
              }}
            />
          </div>
        </div>

        {/* Reviews Table */}
        <div
          className="rounded-2xl shadow-sm overflow-hidden border"
          style={{
            backgroundColor: Colors.primary,
            borderColor: "rgba(15, 34, 54, 0.08)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  className="border-b text-left text-xs uppercase tracking-wider font-semibold"
                  style={{
                    backgroundColor: "rgba(15, 34, 54, 0.03)",
                    color: Colors.placeholder,
                    borderColor: "rgba(15, 34, 54, 0.08)",
                  }}
                >
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Worker</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Comment</th>
                  <th className="px-6 py-4">Created</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200/60">
                {filteredReviews.map((review) => (
                  <tr
                    key={review.id}
                    className="transition-colors hover:bg-black/[0.02]"
                  >
                    {/* Client */}
                    <td
                      className="px-6 py-4 font-semibold"
                      style={{ color: Colors.typography }}
                    >
                      {review.client}
                    </td>

                    {/* Worker */}
                    <td
                      className="px-6 py-4 font-medium"
                      style={{ color: Colors.typography }}
                    >
                      {review.worker}
                    </td>

                    {/* Rating */}
                    <td className="px-6 py-4">{renderStars(review.rating)}</td>

                    {/* Comment */}
                    <td
                      className="px-6 py-4 max-w-md text-xs leading-relaxed"
                      style={{ color: Colors.typography }}
                    >
                      {review.comment || (
                        <span
                          className="italic"
                          style={{ color: Colors.placeholder }}
                        >
                          No comment left.
                        </span>
                      )}
                    </td>

                    {/* Created Date */}
                    <td
                      className="px-6 py-4 text-xs font-medium"
                      style={{ color: Colors.placeholder }}
                    >
                      {new Date(review.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}

                {filteredReviews.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-12 font-medium"
                      style={{ color: Colors.placeholder }}
                    >
                      No reviews found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}