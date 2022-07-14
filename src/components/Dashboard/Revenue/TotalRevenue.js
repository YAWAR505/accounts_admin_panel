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


const Charts = ({ aspect, title }) => {
  const [transactions, setTransactions] = useState([])
  console.log(transactions);
  useEffect(() => {
    const q = query(collection(db, "Students"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const Transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(Transactions);
    });
    return () => unsubscribe();
  }, []);
  function findOcc(arr, key) {
    let arr2 = [];

    arr.forEach((x) => {

      // Checking if there is any object in arr2
      // which contains the key value
      if (arr2.some((val) => { return val[key] == x[key] })) {

        // If yes! then increase the occurrence by 1
        arr2.forEach((k) => {
          if (k[key] === x[key]) {
            k["Students"]++
          }
        })

      } else {
        // If not! Then create a new object initialize 
        // it with the present iteration key's value and 
        // set the occurrence to 1
        let a = {}
        a[key] = x[key]
        a["Students"] = 1
        arr2.push(a);
      }
    })

    return arr2
  }
  let key = "ClassName"
  console.log(findOcc(transactions, key))
  return (
    <div className="chart">
      <div className="title">{title}</div>
      {!transactions && <div>Loading...</div>}
      <ResponsiveContainer width="100%" aspect={aspect}>
        <ComposedChart
          width={730}
          height={250}
          data={findOcc(transactions, key)}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* <CartesianGrid stroke="#ccc" /> */}
          <Bar dataKey="Students" fill="green" barSize={40} />
          <XAxis dataKey="ClassName" />
          <YAxis

          />
          {/* <Line type="monotone" dataKey="Amount" stroke="#ff7300" /> */}

          <Tooltip />
          <Legend />

        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
// const arr = [
//   { name: "mohammad", feetype: "admission", id: 1 },
//   { name: "mohammad", feetype: "admission", id: 2 },
//   { name: "sajad ", feetype: "monthly", id: 3 },
//   { name: "xyz", feetype: "admission", id: 4 },
//   { name: "xyz", feetype: "monthly", id: 5 },
// ]





