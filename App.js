import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // ================= STATES =================
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState(null);

  const [name, setName] = useState(""); // ✅ signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); // 🔥 toggle

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      getProfile();
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  // ================= SIGNUP =================
  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
      });

      alert("Signup Successful");

      // clear fields
      setName("");
      setEmail("");
      setPassword("");

      setIsSignup(false); // switch to login
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  // ================= GET PROFILE =================
  const getProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProfile(res.data);
    } catch (err) {
      console.log("PROFILE ERROR:", err);
    }
  };

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    getProfile();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      alert("User Deleted");
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        name: "Updated Name",
      });

      alert("User Updated");
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfile(null);
  };

  // ================= UI =================
  return (
    <div style={{ padding: "20px" }}>
      <h1>SkillSwap App 🔥</h1>

      {/* 🔐 LOGIN / SIGNUP */}
      {!profile ? (
        <div>
          <h2>{isSignup ? "Signup" : "Login"}</h2>

          {/* 👇 Name only for signup */}
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br /><br />
            </>
          )}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          {/* 🔘 Button */}
          {isSignup ? (
            <button onClick={handleSignup}>Signup</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}

          <br /><br />

          {/* 🔄 Toggle */}
          <p
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Signup"}
          </p>
        </div>
      ) : (
        // 🔓 AFTER LOGIN
        <div>
          <h2>Welcome, {profile.name} 👋</h2>
          <p>Email: {profile.email}</p>

          <button onClick={handleLogout}>Logout</button>

          <hr />

          <h2>Users List</h2>

          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                style={{
                  border: "1px solid gray",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <p><b>Name:</b> {user.name}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Skills Have:</b> {user.skillsHave?.join(", ")}</p>
                <p><b>Skills Want:</b> {user.skillsWant?.join(", ")}</p>

                <button onClick={() => handleDelete(user._id)}>
                  Delete
                </button>

                <button
                  onClick={() => handleUpdate(user._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Update
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;