
import React from 'react';

const SignIn = () => {
  return (
    <div
      className="font-nunito text-[#2977b7] underline"
      style={{
        position: 'absolute',
        top: 'calc(40px + 25pt * 1.2 + 40px + 80px + 15px + 18pt * 1.2 + 10px + 236px + 20px - 40px - 40px + 20px + 18pt * 1.2 + 10px + 40px + 40px + 40px - 40px + 20px)',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '18pt',
        fontWeight: 400, // Nunito Regular
        zIndex: 21,
      }}
    >
      Sign in
    </div>
  );
};

export default SignIn;
