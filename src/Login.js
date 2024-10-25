import { useState } from "react";
import { useNavigate } from "react-router";

const LogIn = () => {
    const serverBaseUrl = process.env.REACT_APP_API_URL;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(null);
    
    const navigate = useNavigate();
    
    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if(isLoggedIn())
        {
            sessionStorage.clear();
        }
        else
        {
            await fetch(`${serverBaseUrl}/authorization/login/`,
                {
                    body: JSON.stringify({ email, password }),
                    headers:
                    {
                      "Content-Type": "application/json"
                    },
                    method: "POST"
                })
            .then(async response => 
                {
                    if(response.status === 400)
                    {
                        alert("Incorrect credentials");
                        navigate("/login/");
                    }
                    else
                    {
                        const data = await response.json();
                        sessionStorage.setItem("access_token", data.access_token);
                        sessionStorage.setItem("user_name", data.user_name);
                        navigate("/");
                    }
                })
        }
        
        window.location.reload();
    };

    const isLoggedIn = () => sessionStorage.getItem("user_name");

    return (
        
        <div className="login">
            {
                !isLoggedIn() ? 
                <form onSubmit={handleSubmit}>
                    <h1>Log In</h1>
                    <label>Email</label>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label>Password</label>
                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="submit">Log In</button>
                </form> :
                <form onSubmit={handleSubmit}>
                    <button type="submit">Log Out</button>
                </form>
            }
        </div>
      );
}
 
export default LogIn;