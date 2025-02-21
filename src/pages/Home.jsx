import { useState } from "react";
import { LogIn } from "../../backend/firemethods";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../backend/firemethods";

function Button({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg"
    >
      {value}
    </button>
  );
}

function Input({ type, id, name, label, placeholder, autofocus, value, onChange }) {
  return (
    <label className="text-gray-500 block mt-3">
      {label}
      <input
        autoFocus={autofocus}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
      />
    </label>
  );
}

function LoginForm() {
  const navigate =useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await LogIn(formData)
    console.log(res)
    if(res) {alert('Logged In Successfully!');
      navigate('/tickets')
    }
    else alert('User does not exists')
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className="border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-center block text-2xl">Log In</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            name="email"
            label="Email Address"
            placeholder="me@example.com"
            autofocus={true}
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="••••••••••"
            value={formData.password}
            onChange={handleChange}
          />
          <Button value="Submit" onClick={handleSubmit} />
          <Link to='/signup' className="block text-center mt-4 text-indigo-600 hover:underline">Don't have an account? Sign Up</Link>
        </form>
        {/* <button className="text-white bg-black px-3 py-1 rounded-md" onClick={() => signout()}>Sign Out</button> */}
      </div>
    </div>
  );
}

const Home = () => {
  return <LoginForm />;
};

export default Home;
