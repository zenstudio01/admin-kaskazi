import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/api";
import Colors from "../constants/colors";
import { useParams } from "react-router-dom";

import {
  BadgeCheck,
  BadgeX,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Clock3,
} from "lucide-react";

export default function WorkerDetails() {
  const { id } = useParams();

  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchWorker = async () => {
    try {
      const response = await api.get(`/admin/workers/${id}/`);
      setWorker(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorker();
  }, [id]);

  const verifyWorker = async (verified) => {
    try {
      setSaving(true);

      await api.post(`/admin/workers/${id}/verify/`, {
        verified,
      });

      setWorker((prev) => ({
        ...prev,
        verified,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: Colors.typography }}
            >
              Worker Details
            </h1>

            <p
              className="mt-1 text-sm font-medium"
              style={{ color: Colors.placeholder }}
            >
              Review worker documents before verification.
            </p>
          </div>

          <div>
            {worker?.verified ? (
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(90, 153, 76, 0.15)",
                  color: Colors.placeholder,
                }}
              >
                <BadgeCheck size={18} />
                Verified Worker
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-xs font-semibold">
                <BadgeX size={18} />
                Not Verified
              </span>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div
          className="rounded-2xl shadow-sm p-6 sm:p-8 border"
          style={{
            backgroundColor: Colors.primary,
            borderColor: "rgba(15, 34, 54, 0.08)",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <img
              src={worker?.profile_image || "/placeholder-avatar.png"}
              alt={worker?.full_name || "Worker"}
              className="w-36 h-36 rounded-2xl object-cover border-2 shadow-sm shrink-0"
              style={{ borderColor: "rgba(15, 34, 54, 0.1)" }}
            />

            <div className="grid md:grid-cols-2 gap-6 flex-1 w-full">
              {/* Full Name */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Full Name
                </p>
                <div
                  className="flex items-center gap-2 mt-1.5 font-semibold text-sm"
                  style={{ color: Colors.typography }}
                >
                  <User size={16} style={{ color: Colors.placeholder }} />
                  <p>{worker?.full_name}</p>
                </div>
              </div>

              {/* Email */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Email
                </p>
                <div
                  className="flex items-center gap-2 mt-1.5 text-sm font-medium"
                  style={{ color: Colors.typography }}
                >
                  <Mail size={16} style={{ color: Colors.placeholder }} />
                  <p>{worker?.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Phone
                </p>
                <div
                  className="flex items-center gap-2 mt-1.5 text-sm font-medium"
                  style={{ color: Colors.typography }}
                >
                  <Phone size={16} style={{ color: Colors.placeholder }} />
                  <p>{worker?.phone_number || "N/A"}</p>
                </div>
              </div>

              {/* Location */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Location
                </p>
                <div
                  className="flex items-center gap-2 mt-1.5 text-sm font-medium"
                  style={{ color: Colors.typography }}
                >
                  <MapPin size={16} style={{ color: Colors.placeholder }} />
                  <p>{worker?.location || "Not specified"}</p>
                </div>
              </div>

              {/* Profession */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Profession
                </p>
                <div
                  className="flex items-center gap-2 mt-1.5 text-sm font-medium"
                  style={{ color: Colors.typography }}
                >
                  <Briefcase
                    size={16}
                    style={{ color: Colors.placeholder }}
                  />
                  <p>{worker?.profession || "General Worker"}</p>
                </div>
              </div>

              {/* Experience */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Experience
                </p>
                <div
                  className="flex items-center gap-2 mt-1.5 text-sm font-medium"
                  style={{ color: Colors.typography }}
                >
                  <Clock3 size={16} style={{ color: Colors.placeholder }} />
                  <p>{worker?.experience_years || 0} Years</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-8 border-t border-slate-200/80 pt-6">
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: Colors.placeholder }}
            >
              Bio & Summary
            </p>

            <p
              className="text-sm leading-relaxed"
              style={{ color: Colors.typography }}
            >
              {worker?.bio || "No biography provided."}
            </p>
          </div>
        </div>

        {/* Verification Documents Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* ID Front */}
          <div
            className="rounded-2xl shadow-sm p-5 border bg-white"
            style={{
              backgroundColor: Colors.primary,
              borderColor: "rgba(15, 34, 54, 0.08)",
            }}
          >
            <h3
              className="font-bold text-sm mb-3"
              style={{ color: Colors.typography }}
            >
              ID Front Image
            </h3>

            <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80">
              {worker?.id_front_image ? (
                <img
                  src={worker.id_front_image}
                  className="w-full h-72 object-cover transition-transform hover:scale-105 duration-200"
                  alt="ID Front"
                />
              ) : (
                <div className="h-72 flex items-center justify-center text-xs text-slate-400">
                  No Document Uploaded
                </div>
              )}
            </div>
          </div>

          {/* ID Back */}
          <div
            className="rounded-2xl shadow-sm p-5 border bg-white"
            style={{
              backgroundColor: Colors.primary,
              borderColor: "rgba(15, 34, 54, 0.08)",
            }}
          >
            <h3
              className="font-bold text-sm mb-3"
              style={{ color: Colors.typography }}
            >
              ID Back Image
            </h3>

            <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80">
              {worker?.id_back_image ? (
                <img
                  src={worker.id_back_image}
                  className="w-full h-72 object-cover transition-transform hover:scale-105 duration-200"
                  alt="ID Back"
                />
              ) : (
                <div className="h-72 flex items-center justify-center text-xs text-slate-400">
                  No Document Uploaded
                </div>
              )}
            </div>
          </div>

          {/* Certificate */}
          <div
            className="rounded-2xl shadow-sm p-5 border bg-white"
            style={{
              backgroundColor: Colors.primary,
              borderColor: "rgba(15, 34, 54, 0.08)",
            }}
          >
            <h3
              className="font-bold text-sm mb-3"
              style={{ color: Colors.typography }}
            >
              Professional Certificate
            </h3>

            <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80">
              {worker?.certificate_image ? (
                <img
                  src={worker.certificate_image}
                  className="w-full h-72 object-cover transition-transform hover:scale-105 duration-200"
                  alt="Certificate"
                />
              ) : (
                <div className="h-72 flex items-center justify-center text-xs text-slate-400">
                  No Document Uploaded
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Verification Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          <button
            disabled={saving}
            onClick={() => verifyWorker(true)}
            className="px-6 py-3 rounded-xl font-semibold text-xs text-white shadow-sm transition-all hover:brightness-110 active:scale-95 disabled:opacity-60"
            style={{ backgroundColor: Colors.background }}
          >
            {saving ? "Processing..." : "Verify Worker"}
          </button>

          <button
            disabled={saving}
            onClick={() => verifyWorker(false)}
            className="px-6 py-3 rounded-xl font-semibold text-xs text-white bg-red-600 shadow-sm transition-all hover:bg-red-700 active:scale-95 disabled:opacity-60"
          >
            {saving ? "Processing..." : "Remove Verification"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}