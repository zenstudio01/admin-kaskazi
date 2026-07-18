import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/api";

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
      const response = await api.get(
        `/admin/workers/${id}/`
      );

      setWorker(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorker();
  }, []);

  const verifyWorker = async (verified) => {
    try {
      setSaving(true);

      await api.post(`/admin/workers/${id}/verify/`, {
        verified,
      });

      setWorker({
        ...worker,
        verified,
      });
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
          <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#062E5B]">
              Worker Details
            </h1>

            <p className="text-slate-500 mt-1">
              Review worker documents before verification.
            </p>
          </div>

          {worker.verified ? (
            <span className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              <BadgeCheck size={18} />
              Verified
            </span>
          ) : (
            <span className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
              <BadgeX size={18} />
              Not Verified
            </span>
          )}
        </div>

        {/* Profile */}

        <div className="bg-white rounded-2xl shadow-sm p-8">

          <div className="flex flex-col md:flex-row gap-8">

            <img
              src={worker.profile_image}
              alt=""
              className="w-40 h-40 rounded-full object-cover border-4 border-slate-100"
            />

            <div className="grid md:grid-cols-2 gap-6 flex-1">

              <div>
                <p className="text-slate-500 text-sm">
                  Full Name
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <User size={18} />
                  <p className="font-semibold">
                    {worker.full_name}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Email
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <Mail size={18} />
                  <p>{worker.email}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Phone
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <Phone size={18} />
                  <p>{worker.phone_number}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Location
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <MapPin size={18} />
                  <p>{worker.location}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Profession
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <Briefcase size={18} />
                  <p>{worker.profession}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Experience
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <Clock3 size={18} />
                  <p>
                    {worker.experience_years} Years
                  </p>
                </div>
              </div>

            </div>

          </div>

          <div className="mt-8">
            <p className="text-slate-500 text-sm mb-2">
              Bio
            </p>

            <p className="text-slate-700 leading-7">
              {worker.bio || "No bio provided."}
            </p>
          </div>

        </div>

        {/* Documents */}

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-5">

            <h3 className="font-bold mb-4">
              ID Front
            </h3>

            <img
              src={worker.id_front_image}
              className="rounded-xl w-full h-80 object-cover"
              alt=""
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">

            <h3 className="font-bold mb-4">
              ID Back
            </h3>

            <img
              src={worker.id_back_image}
              className="rounded-xl w-full h-80 object-cover"
              alt=""
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">

            <h3 className="font-bold mb-4">
              Certificate
            </h3>

            <img
              src={worker.certificate_image}
              className="rounded-xl w-full h-80 object-cover"
              alt=""
            />
          </div>

        </div>

        {/* Buttons */}

        <div className="flex gap-4">

          <button
            disabled={saving}
            onClick={() => verifyWorker(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            {saving ? "Saving..." : "Verify Worker"}
          </button>

          <button
            disabled={saving}
            onClick={() => verifyWorker(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            {saving ? "Saving..." : "Remove Verification"}
          </button>

        </div>

      </div>
    </AdminLayout>
  );
}