import React from "react";

export default function UserNotRegisteredError() {
  return (
    <div style={{ padding: 20, background: "#fff3f3", border: "1px solid #fbb", borderRadius: 8 }}>
      <strong>Guest Mode Enabled</strong>
      <p>You are playing without an account. Progress will not be saved.</p>
    </div>
  );
}
