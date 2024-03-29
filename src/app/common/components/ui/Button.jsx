import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const Button = ({ text,route, onClick, className }) => {
  return (
    <Link href={route}>
      <button
        className={`rounded-lg bg-gradient-to-br from-[#93C648] to-[#50B577] px-7 py-[13px] text-base font-semibold text-white ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    </Link>
  );
};
// Button.propTypes = {
//   text: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
//   className: PropTypes.string,
// };

export default Button;
