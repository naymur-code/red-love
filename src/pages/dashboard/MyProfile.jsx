import React, { useContext, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { auth } from "../../firebase/firebase.config";

const MyProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const photoUrlRef = useRef();
  const displayNameRef = useRef();

  const handleEditProfile = () => {
    setEdit(true);
  };

  const handleUpdate = () => {
    const photoUrl = photoUrlRef.current.value;
    const displayName = displayNameRef.current.value;

    updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoUrl,
    })
      .then(() => {
        setUser({ ...user, photoURL: photoUrl, displayName: displayName });
        setEdit(false);
        Swal.fire({
          title: "Update Profile!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("update photo");
    setEdit(true);
  };
  return (
    <div className="container mx-auto px-5  my-20">
      <div className="flex flex-col justify-center items-center gap-3 mt-10">
        <h1 className="font-bold text-5xl ">My Profile</h1>
        <p className="text-xl">
          Manage your account and access exclusive pet care features
        </p>
      </div>

      <div className="flex justify-center">
        <div className="my-10 md:flex gap-10">
          <div className="card bg-base-200 md:w-70 shadow-xl border-2 border-gray-100 p-4 ">
            <div className="avatar justify-center">
              <div className="w-24 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
            <div className="card-body text-center">
              {edit || (
                <h2 className="card-title flex justify-center">
                  {user?.displayName}
                </h2>
              )}

              {edit && (
                <form action="">
                  <input
                    defaultValue={user?.displayName}
                    ref={displayNameRef}
                    type="text"
                    className="input my-2"
                    placeholder="your@email.com"
                  />
                  <input
                    ref={photoUrlRef}
                    type="text"
                    className="input"
                    placeholder="photoUrl"
                  />
                </form>
              )}

              <div className="card-actions justify-center">
                <button
                  onClick={handleEditProfile}
                  className="btn btn-sm btn-error"
                >
                  {" "}
                  <MdEdit />
                  Edit Profile
                </button>
                {edit && (
                  <button
                    onClick={handleUpdate}
                    className="btn btn-sm btn-info"
                  >
                    {" "}
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="card bg-base-300 md:w-2xl shadow-xl border-2 border-gray-100 p-4 ">
            <div className="card-body ">
              <h3 className="font-semibold text-3xl my-4">
                Personal Information
              </h3>

              <form>
                <fieldset className="fieldset gap-3">
                  <label className="label">Full Name</label>
                  <input
                    defaultValue={user?.displayName}
                    name="email"
                    type="email"
                    className="input"
                    placeholder="your@email.com"
                  />

                  <label className="label">Email Address</label>
                  <input
                    name="email"
                    defaultValue={user?.email}
                    type="email"
                    className="input"
                    readOnly
                    placeholder="your@email.com"
                  />

                  <label className="label">User ID</label>
                  <input
                    defaultValue={user.uid}
                    name="text"
                    type="text"
                    className="input"
                    placeholder="Enter your Number"
                  />
                  <div></div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;