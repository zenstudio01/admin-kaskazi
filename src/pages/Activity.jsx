import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  Activity,
  Briefcase,
  Clock3,
  CheckCircle,
  Search,
} from "lucide-react";
import api from "../api/api";


export default function Activities(){


const [activities,setActivities] = useState([]);
const [filteredActivities,setFilteredActivities] = useState([]);
const [search,setSearch] = useState("");
const [loading,setLoading] = useState(true);

const fetchActivities = async()=>{


try{

const response = await api.get("/recent_activity/");

const data = response.data;

setActivities(data);
setFilteredActivities(data);

}catch(error){

console.log(error);


}finally{


setLoading(false);


}



};





useEffect(()=>{

fetchActivities();

},[]);






useEffect(()=>{


const filtered = activities.filter(
(activity)=>

activity.title
?.toLowerCase()
.includes(search.toLowerCase())

||

activity.status
?.toLowerCase()
.includes(search.toLowerCase())


);



setFilteredActivities(filtered);



},[search,activities]);







const activeJobs = activities.filter(
(activity)=>
activity.status === "active"
).length;



const completedJobs = activities.filter(
(activity)=>
activity.status === "completed"
).length;







const getStatusBadge=(status)=>{


switch(status?.toLowerCase()){


case "completed":

return (

<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">

Completed

</span>

);



case "active":

case "in_progress":

return (

<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">

Active

</span>

);



case "cancelled":

return (

<span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">

Cancelled

</span>

);



default:

return (

<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">

{status}

</span>

);


}


};








return (

<AdminLayout>


<div className="space-y-6">





{/* Header */}

<div>


<h1 className="text-3xl font-bold text-[#062E5B]">

Recent Activities

</h1>


<p className="text-slate-500 mt-1">

Track the latest activities happening in Kaskazi.

</p>


</div>







{/* Stats */}


<div className="grid md:grid-cols-3 gap-5">





<div className="bg-white p-5 rounded-2xl shadow-sm">


<div className="flex justify-between items-center">


<div>


<p className="text-slate-500 text-sm">

Total Activities

</p>


<h2 className="text-3xl font-bold">

{activities.length}

</h2>


</div>



<div className="bg-orange-100 p-3 rounded-xl">


<Activity

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

Active Jobs

</p>


<h2 className="text-3xl font-bold text-blue-600">

{activeJobs}

</h2>


</div>




<div className="bg-blue-100 p-3 rounded-xl">


<Clock3

className="text-blue-600"

size={26}

/>


</div>


</div>


</div>









<div className="bg-white p-5 rounded-2xl shadow-sm">


<div className="flex justify-between items-center">


<div>


<p className="text-slate-500 text-sm">

Completed Jobs

</p>


<h2 className="text-3xl font-bold text-green-600">

{completedJobs}

</h2>


</div>




<div className="bg-green-100 p-3 rounded-xl">


<CheckCircle

className="text-green-600"

size={26}

/>


</div>


</div>


</div>





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

placeholder="Search activities..."

value={search}

onChange={(e)=>setSearch(e.target.value)}


className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#F57C00]"



/>



</div>


</div>










{/* Activity Timeline */}


<div className="bg-white rounded-2xl shadow-sm p-6">


{

loading


?


<div className="flex justify-center p-10">


<div className="h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>


</div>



:


<div className="space-y-6">


{

filteredActivities.map((activity,index)=>(


<div

key={index}

className="flex gap-4 border-b pb-5 last:border-none"



>


<div className="bg-orange-100 p-3 rounded-full h-fit">


<Briefcase

className="text-orange-600"

size={22}

/>


</div>





<div className="flex-1">


<div className="flex justify-between items-center">


<h3 className="font-semibold text-lg">


{activity.title}


</h3>


{getStatusBadge(activity.status)}


</div>





<p className="text-slate-500 text-sm mt-1">


A new job activity was recorded.


</p>





<p className="text-slate-400 text-sm mt-2">


{new Date(
activity.created_at
).toLocaleString()}


</p>



</div>




</div>



))


}





{

filteredActivities.length===0 &&


<p className="text-center py-10 text-slate-500">

No activities found.

</p>


}





</div>


}



</div>





</div>


</AdminLayout>


);


}