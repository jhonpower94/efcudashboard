import { doc, setDoc, collection, getDocs, query } from "firebase/firestore";
import { ajax } from "rxjs/ajax";
import { db } from "./firebaseinit";
import { docData, collectionData } from "rxfire/firestore";
import { checkingsinfo$, savingsinfo$, userinfo$ } from "../redux/action";
import { store } from "../";
const cardGen = require("card-number-generator");

const accountArray = [
  { type: "savings", store: savingsinfo$ },
  { type: "checkings", store: checkingsinfo$ },
];

export const addUsers = async (docid, userdatas) => {
  const query = doc(db, `users/${docid}`);
  await setDoc(query, userdatas);
};

export const generateAccounts = (docid) => {
  const cardinfo = {
    Expiredate: "08/25",
    address: "1638 Hood Avenue",
    zipcode: "92009",
    city: "Carlsbad",
    state: "CA",
  };

  accountArray.forEach((value, index) => {
    const generateAcnumber = Math.floor(Math.random() * 10000000);
    const generateCvv = Math.floor(Math.random() * 1000 + 1);
    const generatecardnumber = cardGen({ issuer: "MasterCard" });

    const query = doc(db, "users", `${docid}`, "account", value.type);
    setDoc(query, {
      ...cardinfo,
      type: value.type,
      cardnumber: generatecardnumber,
      accountnumber: `00${generateAcnumber}`,
      cvv: `${generateCvv}`,
      balance: 0,
    });
  });
};

export const getUserInfo = (userid) => {
  const query = doc(db, `users/${userid}`);
  docData(query).subscribe((userData) => {
    store.dispatch(userinfo$(userData));
  });

  accountArray.forEach((val, index) => {
    const accountQuery = doc(db, "users", `${userid}`, "account", val.type);
    docData(accountQuery).subscribe((accountData) => {
      store.dispatch(val.store(accountData));
    });
  });
};

export const getallusers = () => {
  const collectionRef = collection(db, "users");
  return collectionData(collectionRef, { idField: "uid" });
};

export const getuserDataAdmin = (id) => {
  const davidDocRef = doc(db, `users/${id}`);
  return docData(davidDocRef, { idField: "uid" });
};

export const getuserDataBalanceAdmin = (id, type) => {
  const DocRef = doc(db, "users", `${id}`, "account", type);
  return docData(DocRef, { idField: "uid" });
};

export const updateuserDataBalanceAdmin = (id, type, balance) => {
  const DocRef = doc(db, "users", `${id}`, "account", type);
  setDoc(DocRef, { balance: parseInt(balance) }, { merge: true });
  alert("User info has been updated successfully");
};

export const sendMessage = (message, to, subject) => {
  return ajax({
    url: "https://hotblockinvestmain.herokuapp.com/mail",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      message: message,
      to: to,
      subject: subject,
    },
  });
};
