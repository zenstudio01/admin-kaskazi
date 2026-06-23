import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  CreditCard,
  Search,
  CheckCircle,
  XCircle,
  Wallet,
} from "lucide-react";
import api from "../api/api";


export default function Payments() {


  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {

    try {

      const response = await api.get(`/admin_payments/`);

      const data = response.data;

      setPayments(data);
      setFilteredPayments(data);

    } catch(error){

      console.log(error);


    } finally {

      setLoading(false);

    }


  };





  useEffect(()=>{

    fetchPayments();

  },[]);





  useEffect(()=>{


    const filtered = payments.filter((payment)=>



      payment.method
      ?.toLowerCase()
      .includes(search.toLowerCase())


      ||


      payment.status
      ?.toLowerCase()
      .includes(search.toLowerCase())


      ||


      payment.receipt
      ?.toLowerCase()
      .includes(search.toLowerCase())


      ||


      String(payment.job_id)
      .includes(search)


    );


    setFilteredPayments(filtered);



  },[search,payments]);






  const completedPayments = payments.filter(
    payment => payment.status === "completed"
  ).length;



  const failedPayments = payments.filter(
    payment => payment.status === "failed"
  ).length;




  const totalAmount = payments.reduce(
    (sum,payment)=>
    sum + Number(payment.amount),
    0
  );






  const getStatusBadge = (status)=>{


    switch(status?.toLowerCase()){


      case "completed":

        return (

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">

            Completed

          </span>

        );



      case "failed":

        return (

          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">

            Failed

          </span>

        );



      case "pending":

        return (

          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">

            Pending

          </span>

        );



      default:

        return (

          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">

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

Payments Management

</h1>


<p className="text-slate-500 mt-1">

Monitor all transactions made through Kaskazi.

</p>



</div>








{/* Stats */}


<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">





<div className="bg-white p-5 rounded-2xl shadow-sm">


<div className="flex justify-between items-center">


<div>


<p className="text-slate-500 text-sm">

Total Payments

</p>


<h2 className="text-3xl font-bold">

{payments.length}

</h2>


</div>



<div className="bg-orange-100 p-3 rounded-xl">


<CreditCard

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

Revenue

</p>


<h2 className="text-3xl font-bold text-green-600">

KES {totalAmount.toLocaleString()}

</h2>


</div>



<div className="bg-green-100 p-3 rounded-xl">


<Wallet

className="text-green-600"

size={26}

/>


</div>


</div>


</div>







<div className="bg-white p-5 rounded-2xl shadow-sm">


<div className="flex justify-between items-center">


<div>


<p className="text-slate-500 text-sm">

Successful

</p>


<h2 className="text-3xl font-bold text-blue-600">

{completedPayments}

</h2>


</div>



<div className="bg-blue-100 p-3 rounded-xl">


<CheckCircle

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

Failed

</p>


<h2 className="text-3xl font-bold text-red-600">

{failedPayments}

</h2>


</div>



<div className="bg-red-100 p-3 rounded-xl">


<XCircle

className="text-red-600"

size={26}

/>


</div>


</div>


</div>






</div>









{/* Revenue Banner */}


<div className="bg-gradient-to-r from-[#062E5B] to-[#0A427F] rounded-2xl p-6 text-white">


<p className="opacity-80">

Total Money Processed

</p>


<h2 className="text-4xl font-bold mt-2">

KES {totalAmount.toLocaleString()}

</h2>


<p className="mt-2 opacity-70">

Combined value of all payments.

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

placeholder="Search payments..."

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

Job ID

</th>


<th className="text-left px-6 py-4">

Amount

</th>


<th className="text-left px-6 py-4">

Method

</th>


<th className="text-left px-6 py-4">

Status

</th>


<th className="text-left px-6 py-4">

Receipt

</th>


<th className="text-left px-6 py-4">

Created

</th>


</tr>


</thead>







<tbody>



{


filteredPayments.map((payment)=>(


<tr

key={payment.id}

className="border-t hover:bg-slate-50"

>



<td className="px-6 py-4 font-medium">


#{payment.job_id}


</td>





<td className="px-6 py-4 font-semibold text-green-600">


KES {Number(payment.amount).toLocaleString()}


</td>





<td className="px-6 py-4">


{payment.method}


</td>





<td className="px-6 py-4">


{getStatusBadge(payment.status)}


</td>





<td className="px-6 py-4 text-slate-500">


{payment.receipt || "N/A"}


</td>





<td className="px-6 py-4 text-slate-500">


{
new Date(
payment.created_at
).toLocaleDateString()
}


</td>



</tr>



))


}






{

filteredPayments.length === 0 &&


<tr>

<td

colSpan="6"

className="text-center py-10 text-slate-500"

>

No payments found.

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