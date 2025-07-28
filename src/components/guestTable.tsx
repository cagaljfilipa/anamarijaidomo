"use client";
import { Invite } from "@/types/types";
import React, { useState } from "react";
import Image from "next/image";
import uuid4 from "uuid4";
import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";

function GuestTable({
  timeTable,
}: {
  timeTable: { time: string; event: string; location: string }[];
}) {
  const [imena, setImena] = useState("");
  const [poruka, setPoruka] = useState("");
  const [smjestaj, setSmjestaj] = useState(false);
  const [response, setResponse] = useState(false);

  const sendResponseToFirebase = () => {
    if (imena === "") {
      alert("Molimo unesite imena gostiju");
      return;
    }
    const newInvite: Invite = {
      id: uuid4(),
      guests: imena,
      responded: true,
      poruka: poruka,
      smjestaj: smjestaj,
      date: `${new Date().toISOString()} ${new Date().toLocaleTimeString()}`,
    };
    console.log(newInvite);
    //send to firebase
    const inviteRef = doc(db, "invites", newInvite.id);
    setDoc(inviteRef, newInvite)
      .then(() => {
        console.log("Invite saved successfully!");
        setResponse(true);
      })
      .catch((error) => {
        console.error("Error saving invite: ", error);
      });
  };

  return (
    <div className="w-100 flex flex-col justify-center items-start gap-6 mt-8">
      <div
        className="w-full flex flex-col  justify-center items-center mb-0"
        style={{ marginTop: "-150px" }}
      >
        {response ? (
          <p
            className="font-sans"
            style={{
              color: "#333",
              fontWeight: "400",
              letterSpacing: "0.05em",
              fontSize: "14px",
              paddingLeft: "1em",
            }}
          >
            Hvala na odgovoru! <br />
          </p>
        ) : (
          <p
            className="font-sans"
            style={{
              color: "#333",
              fontWeight: "400",
              letterSpacing: "0.05em",
              fontSize: "14px",
              paddingLeft: "1em",
            }}
          >
            Svoj dolazak možete potvrditi ovdje
          </p>
        )}
      </div>
      {response ? (
        <div className="flex flex-col gap-4 w-full"></div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col items-center mx-10 p-2 ">
            <input
              value={imena}
              onChange={(e) => setImena(e.target.value)}
              type="text"
              placeholder="Ime i prezime gostiju"
              className="w-full px-3 py-2 border rounded-sm border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
            />
            <textarea
              value={poruka}
              onChange={(e) => setPoruka(e.target.value)}
              placeholder="Poruka po želji"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-row items-center  mx-20 p-2 shadow-slate-400">
            <div className=" w-100 flex flex-col justify-center items-center gap-6">
              <p
                className="font-sans"
                style={{
                  color: "#5b5b5b",
                  fontWeight: "400",
                  letterSpacing: "0.05em",
                  fontSize: "15px",
                  marginLeft: "5rem",
                }}
              >
                Pridružite nam se na početku <br></br>novog poglavlja našeg
                života.
              </p>
            </div>
          </div>
          <button
            className="px-8 py-2 border border-gray-300 rounded-md m-auto focus:outline-none focus:border-#dab6ba backg"
            style={{ backgroundColor: "#d9ddd5", borderColor: "#9b9d99" }}
            onClick={sendResponseToFirebase}
          >
            Potvrdi odgovor
          </button>
        </div>
      )}
    </div>
  );
}

export default GuestTable;
