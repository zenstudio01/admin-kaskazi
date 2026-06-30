import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  Star,
  Search,
  MessageSquare,
  Users,
  Award,
} from "lucide-react";
import api from "../api/api";


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


    } catch(error){

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  useEffect(()=>{

    fetchReviews();

  },[]);



  useEffect(()=>{

    const filtered = reviews.filter((review)=>

      review.client
      ?.toLowerCase()
      .includes(search.toLowerCase())

      ||

      review.worker
      ?.toLowerCase()
      .includes(search.toLowerCase())

      ||

      review.comment
      ?.toLowerCase()
      .includes(search.toLowerCase())

    );


    setFilteredReviews(filtered);


  },[search,reviews]);




  const averageRating =
    reviews.length > 0
    ?
    (
      reviews.reduce(
        (sum,review)=>sum + Number(review.rating),
        0
      )
      /
      reviews.length
    ).toFixed(1)

    :
    0;



  const fiveStarReviews =
    reviews.filter(
      review => Number(review.rating) === 5
    ).length;



  const renderStars = (rating)=>{

    return (

      <div className="flex gap-1">

        {[1,2,3,4,5].map((star)=>(

          <Star

            key={star}

            size={18}

            className={
              star <= rating
              ?
              "fill-yellow-400 text-yellow-400"
              :
              "text-slate-300"
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
          <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }


return (

<AdminLayout>


<div className="space-y-6">


{/* Header */}

<div>

<h1 className="text-3xl font-bold text-[#062E5B]">

Reviews Management

</h1>


<p className="text-slate-500 mt-1">

Monitor customer feedback and worker ratings.

</p>


</div>





{/* Stats */}

<div className="grid md:grid-cols-3 gap-5">



<div className="bg-white p-5 rounded-2xl shadow-sm">

<div className="flex justify-between items-center">


<div>

<p className="text-slate-500 text-sm">

Total Reviews

</p>


<h2 className="text-3xl font-bold">

{reviews.length}

</h2>


</div>


<div className="bg-orange-100 p-3 rounded-xl">

<MessageSquare

className="text-orange-600"

size={26}

/>


</div>


</div>


</div>






<div className="bg-white p-5 rounded-2xl shadow-sm">


<div className="flex justify-between items-center">


<div>


<p className="text-slate-500 text-sm">

Average Rating

</p>


<h2 className="text-3xl font-bold text-yellow-500">

{averageRating} ⭐

</h2>


</div>



<div className="bg-yellow-100 p-3 rounded-xl">


<Star

className="text-yellow-600 fill-yellow-600"

size={26}

/>


</div>


</div>


</div>







<div className="bg-white p-5 rounded-2xl shadow-sm">


<div className="flex justify-between items-center">


<div>


<p className="text-slate-500 text-sm">

5 Star Reviews

</p>


<h2 className="text-3xl font-bold text-green-600">

{fiveStarReviews}

</h2>


</div>



<div className="bg-green-100 p-3 rounded-xl">


<Award

className="text-green-600"

size={26}

/>


</div>


</div>


</div>



</div>






{/* Rating Banner */}

<div className="bg-gradient-to-r from-[#062E5B] to-[#0A427F] rounded-2xl p-6 text-white">


<p className="opacity-80">

Overall Customer Satisfaction

</p>


<h2 className="text-4xl font-bold mt-2">

{averageRating}/5

</h2>


<p className="mt-2 opacity-70">

Based on all submitted reviews.

</p>


</div>







{/* Search */}


<div className="bg-white p-4 rounded-2xl shadow-sm">


<div className="relative max-w-md">


<Search

size={18}

className="absolute left-4 top-3.5 text-slate-400"

/>


<input


type="text"

placeholder="Search reviews..."

value={search}

onChange={(e)=>setSearch(e.target.value)}


className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#F57C00]"



/>



</div>


</div>







{/* Table */}


<div className="bg-white rounded-2xl shadow-sm overflow-hidden">


{
loading

?

<div className="p-20 flex justify-center">


<div className="h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>


</div>


:


<div className="overflow-x-auto">


<table className="w-full">


<thead className="bg-slate-50">


<tr>


<th className="text-left px-6 py-4">

Client

</th>


<th className="text-left px-6 py-4">

Worker

</th>



<th className="text-left px-6 py-4">

Rating

</th>



<th className="text-left px-6 py-4">

Comment

</th>



<th className="text-left px-6 py-4">

Created

</th>



</tr>


</thead>





<tbody>


{

filteredReviews.map((review)=>(


<tr

key={review.id}

className="border-t hover:bg-slate-50"

>


<td className="px-6 py-4 font-medium">

{review.client}

</td>



<td className="px-6 py-4">

{review.worker}

</td>




<td className="px-6 py-4">

{renderStars(review.rating)}

</td>




<td className="px-6 py-4 text-slate-600 max-w-md">


{review.comment}


</td>




<td className="px-6 py-4 text-slate-500">


{new Date(
review.created_at
).toLocaleDateString()}


</td>



</tr>


))


}





{

filteredReviews.length === 0 &&

<tr>

<td

colSpan="5"

className="text-center py-10 text-slate-500"

>

No reviews found.

</td>


</tr>

}



</tbody>



</table>



</div>


}



</div>




</div>



</AdminLayout>

);


}