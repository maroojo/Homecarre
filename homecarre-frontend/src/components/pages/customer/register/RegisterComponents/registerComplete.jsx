import React from "react";

const RegisterComplete =() =>{
    return(
        <div>
            <div className="px-2 py-8 my-5 mx-6 bg-white rounded-3xl flex flex-col items-center">
                <h3 className="text-2xl font-bold">You're the {}</h3>
                <p>{}address</p>
                <br />
                <h3 className="text-2xl font-bold">Phone Number</h3>
                <p>{}0987654321</p>
            </div>
        </div>
    )
}

export default RegisterComplete;