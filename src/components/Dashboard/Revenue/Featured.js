import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import moment from "moment";

const Featured = () => {
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
  const today = moment().format("YYYY-MM-DD");
  const fullMonth = moment().subtract(30, "d").format("YYYY-MM-DD");
  var daysOfMonth;
  const LastThirtyDays = transactions.filter((item) => {
    return (
      (daysOfMonth = moment(item.timestamp.seconds * 1000).format(
        "YYYY-MM-DD"
      )),
      daysOfMonth >= fullMonth && daysOfMonth <= today
    );
  });
  const Thirty_Days_Amount = LastThirtyDays.map((item) => item.Amount).reduce(
    (sum, item) => sum + item,
    0
  );

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Transactions</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"80%"} strokeWidth={5} />
        </div>
        <p className="title">Total Transactions</p>
        <p className="amount">₹{numberWithCommas(Thirty_Days_Amount)}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">₹12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">₹12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">₹12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
