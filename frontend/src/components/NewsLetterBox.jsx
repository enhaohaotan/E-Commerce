import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler = (evevt) => {
    evevt.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="mt-3 text-gray-400">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className={`
          mx-auto my-6 flex w-full items-center gap-3 border pl-3
          sm:w-1/2
        `}
      >
        <input
          className={`
            w-full outline-none
            sm:flex-1
          `}
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-black px-10 py-4 text-xs text-white"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
