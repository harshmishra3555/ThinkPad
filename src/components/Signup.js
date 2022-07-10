import React ,{useState} from 'react'
import { useNavigate} from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({ name:"", email: "", password: "",cpassword:""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate.push("/");

        }
        else {
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (

        <div className="container register-form">
            <div className="form">
                <div className="note">
                    <p>Registeration Form </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-content">
                        <div className="row">
                            <div className="row-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control my-4" id="email" name="email"onChange={onChange} placeholder="Your Name *" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control my-4" id="phone" name="phone" onChange={onChange} placeholder="Phone Number *" />
                                </div>
                            </div>
                            <div className="row-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control my-4" id="password" name="password" onChange={onChange} placeholder="Your Password *" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control my-4" id="cpassword" name="cpassword"onChange={onChange} placeholder="Confirm Password *" />
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btnSubmit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Signup