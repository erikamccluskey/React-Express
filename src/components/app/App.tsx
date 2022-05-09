import React, { useState, useEffect } from "react";
import "../../css/App.css";

interface UserUI {
  id: string;
  username: string;
  name: string;
  email: string;
}

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState(""); // state hook for welcome message

  const [usersList, setUsersList] = useState<UserUI[]>([]); // state hook for users, initialized empty UserUI array

  const fetchMessage = async () => {
    const message = await fetch("/api").then((res) => res.text());
    setWelcomeMessage(message);
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchUsers = async () => {
    const users = await fetch("/users/all").then((res) => res.json());
    setUsersList(users);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>{welcomeMessage}</p>
        <button onClick={fetchUsers}>Fetch users</button>
        {usersList.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {usersList.map((user: UserUI) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </header>
    </div>
  );
}

export default App;
