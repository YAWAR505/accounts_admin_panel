import "./chart.scss";
import {
  ComposedChart,
  BarChart,
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  Cell
} from "recharts";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const colors = scaleOrdinal(schemeCategory10).range();

const Charts = ({ aspect, title }) => {
  const [transactions, setTransactions] = useState([])
  transactions.sort((a, b) => {
    return a.rollNo - b.rollNo
  })

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
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          {/* <CartesianGrid stroke="#ccc" /> */}
          <Bar dataKey="Students" fill="#8884d8"
            barSize={30} label={{ position: "top" }}
          >
            {transactions.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
          <XAxis dataKey="ClassName" />
          <YAxis
            label={{ value: "No Of Students", angle: -90, position: "insideLeft" }}
          />
          <Line type="monotone" dataKey="Students" stroke="#ff7300" />

          <Tooltip />
          <Legend />

        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;






