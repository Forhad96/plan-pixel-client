'use client'

import Link from "next/link";

const ChoosePlanBtn = ({btnHover,name,price}) => {
    // const handlePayment =()=>{
    //     console.log(name);
    // }
    return (
      <Link href={`/pricing/${name}`}>
        <button
          // onClick={handlePayment}
          className={`font-bold my-9 py-4 rounded-xl mx-auto border border-black  w-full ${btnHover}`}
        >
          Choose Plan
        </button>
      </Link>
    );
};
export default ChoosePlanBtn;