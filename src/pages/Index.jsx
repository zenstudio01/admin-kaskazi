import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { bootstrapAuth } from "../utils/bootstrapAuth";


export default function Index() {

  const navigate = useNavigate();

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {

    const checkAuth = async() => {
      try {

        const loggedIn = await bootstrapAuth();

        if (loggedIn) {
          console.log("Session found");

          navigate("/dashboard", {
            replace: true
          });
        } 
        else {
          console.log("No session found");
          navigate("/login", {
            replace: true
          });

        }

      } catch(error) {
        console.log("Auth check error:",error);
        navigate("/login", {replace:true});

      } finally {
        setCheckingAuth(false);

      }

    };
    checkAuth();
  }, [navigate]);


  if(checkingAuth){


    return (

      <div
        className="h-screen flex items-center justify-center bg-gradient-to-br from-[#062E5B] to-[#0A427F]"
      >

        <div className="text-center">


          <div
            className="
            w-24
            h-24
            bg-white
            rounded-3xl
            flex
            items-center
            justify-center
            shadow-xl
            mx-auto
            "
          >


            <Activity

              size={45}

              className="text-[#F57C00]"

            />


          </div>



          <div className="mt-6">


            <div
              className="
              h-10
              w-10
              border-4
              border-orange-500
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
              "
            >

            </div>



            <p className="text-white mt-4 text-lg">


              Checking admin session...


            </p>


          </div>



        </div>


      </div>

    );


  }



  return null;


}