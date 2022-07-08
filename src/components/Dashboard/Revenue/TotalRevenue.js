import "./chart.scss";
import {
  ComposedChart,
  BarChart,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Scatter,
  Line,
  Area,

} from "recharts";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import moment from "moment";
const data = [
  { name: "January", Total: 1200,value: 100 },
  { name: "February", Total: 2100 ,value:200 },
  { name: "March", Total: 800 ,value:50 },
  { name: "April", Total: 1600 ,value: 60},
  { name: "May", Total: 900 ,value: 400},
  { name: "June", Total: 1700 ,value: 800},
];

const Charts = ({ aspect, title }) => {
  const [transactions,setTransactions] =useState([])
  useEffect(() => {
    const q = query(collection(db, "PayFee"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const Transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(Transactions);
    });
    return () => unsubscribe();
  }, []);
 
  return (
    <div className="chart">
      <div className="title">{title}</div>
      {!transactions && <div>Loading...</div>}
      <ResponsiveContainer width="100%" aspect={aspect}>
        <ComposedChart
          width={730}
          height={250}
          data={transactions}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
           {/* <CartesianGrid stroke="#ccc" /> */}
          <Bar  dataKey="Amount" fill="green" barSize={40} />
          <XAxis dataKey="feeType"/>
          <YAxis   />
          <Line type="monotone" dataKey="Amount" stroke="#ff7300" />

          <Tooltip />
          <Legend />
      
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
