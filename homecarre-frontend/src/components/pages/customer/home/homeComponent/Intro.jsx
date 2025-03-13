import React from 'react';

const Intro = ({ fullName }) => {
    return (
        <div className="flex flex-col items-end text-right p-4">
            <div className="text-lg font-bold">Welcome, {fullName}</div>
            <div className="text-md">You're the property</div>
            <div className="text-sm">Noble Rereal Condominium Unit No.1234235</div>
        </div>
    );
};

export default Intro;