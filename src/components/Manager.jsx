import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);
  const ref = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copy to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
      toast("Password Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Error: Password not saved!");
    }
  };

  const deletePassword = (id) => {
    // Ask for confirmation
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this password?"
    );
    // If user confirms deletion
    if (confirmDeletion) {
      console.log("Deleting password with id", id);
      const newPasswordArray = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(newPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editPassword = (id) => {
    console.log("Edit password with id", id);
    setform(passwordArray.find((item) => item.id === id));
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "password";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full ">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="md:mycontainer  px-4 md:px-4 md:pt-8 lg:px-20 min-h-[87vh]">
        <h1 className=" font-bold text-3xl text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-center text-green-900 text-md">
          {" "}
          Own Password Manager
        </p>
        <div className="text-white flex flex-col items-center p-4 gap-8 ">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website URL"
            className="rounded-full  border  border-green-500 w-full text-black p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex md:flex-row flex-col justify-between w-full gap-8">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              className="rounded-full w-full border border-green-500 text-black p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                className="rounded-full w-full border border-green-500 text-black p-4 py-1"
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
              />
              <span
                onClick={showPassword}
                className="absolute right-[5px] cursor-pointer top-[4px] text-black "
              >
                <img
                  ref={ref}
                  width={26}
                  className="p-1"
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="text-black flex justify-center items-center bg-green-500 rounded-full px-8 py-2 w-fit gap-2  hover:bg-green-300 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords ">
          <h2 className="font-bold text-2xl py-4">Show Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to Display </div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site URL</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className=" py-2 border border-white">
                      <div className="flex justify-center items-center text-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div
                          className="cursor-pointer size-7 "
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" text-center  py-2 border border-white">
                      <div className="flex justify-center items-center text-center">
                        {" "}
                        <span>{item.username}</span>
                        <div
                          className="cursor-pointer size-7 "
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" text-center  py-2 border border-white">
                      <div className="flex justify-center items-center text-center">
                        {" "}
                        <span>{item.password}</span>
                        <div
                          className="cursor-pointer size-7 "
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" text-center  py-2 border border-white">
                      <div className="flex justify-center items-center text-center">
                        {" "}
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => editPassword(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => deletePassword(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
