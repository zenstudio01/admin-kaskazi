import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { bootstrapAuth } from "../utils/bootstrapAuth";
import Colors from "../constants/colors";

export default function Index() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedIn = await bootstrapAuth();

        if (loggedIn) {
          console.log("Session found");
          navigate("/dashboard", {
            replace: true,
          });
        } else {
          console.log("No session found");
          navigate("/login", {
            replace: true,
          });
        }
      } catch (error) {
        console.log("Auth check error:", error);
        navigate("/login", { replace: true });
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div
        className="h-screen flex items-center justify-center p-4 transition-colors"
        style={{ backgroundColor: Colors.typography }}
      >
        <div className="text-center">
          {/* Logo Card Icon */}
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg mx-auto border transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: Colors.primary,
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Activity size={38} style={{ color: Colors.background }} />
          </div>

          {/* Loading Spinner & Status Text */}
          <div className="mt-8">
            <div
              className="h-9 w-9 border-3 border-t-transparent rounded-full animate-spin mx-auto"
              style={{
                borderColor: Colors.background,
                borderTopColor: "transparent",
              }}
            ></div>

            <p
              className="mt-4 text-xs font-semibold uppercase tracking-wider"
              style={{ color: Colors.primary }}
            >
              Checking admin session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}