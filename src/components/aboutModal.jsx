function AboutModal({ setAboutToggle }) {
  const handleCloseModal = () => {
    setAboutToggle(false);
  };
  return (
    <div className="modal fixed top-0 left-0 h-full w-full bg-black/60 ">
      <div className="modal-content w-4/5 md:w-1/2 p-4 bg-slate-300/90 rounded-xl m-auto mt-48 shadow-c-1">
        <span className="close block text-right text-2xl md:text-xl ">
          <i
            className="fa-solid fa-circle-xmark cursor-pointer"
            onClick={handleCloseModal}
          ></i>
        </span>
        <span className="about-text font-unbounded text-xs">
          World radio is a web radio application that streams live radio
          stations from almost all the countries of the world. Streaming over
          5000 radio station worldwide. All you have to do is search or select
          for your desired country. <br />
          Developed with ReactJs, Redux-Toolkit, Tailwind, Framer-motion
        </span>
      </div>
    </div>
  );
}

export default AboutModal;
