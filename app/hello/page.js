"use client";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState('huynknde170566@fpt.edu.vn');

  const sendVerificationCode = async (e) => {
    e.preventDefault();

    console.log(email);
    try {
      const response = await fetch("/api/sendVerificationCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.message); // In ra thông báo từ API
    } catch (error) {
      console.error("Error sending verification code:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <Button onClick={sendVerificationCode}>Send Verification Code</Button>
    </div>
  );
};

export default Page;
