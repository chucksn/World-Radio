import { motion } from "framer-motion";

const modalVariant = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "linear",
      type: "spring",
      stiffness: 100,
    },
  },
};

function AboutModal({ setAboutToggle }) {
  const handleCloseModal = () => {
    setAboutToggle(false);
  };
  return (
    <div className="modal fixed top-0 left-0 h-full w-full bg-black/60 ">
      <motion.div
        className="modal-content w-4/5 md:w-1/2 p-4 bg-slate-200/90 rounded-xl m-auto mt-48 shadow-c-1"
        variants={modalVariant}
        initial="hidden"
        animate="visible"
      >
        <span className="close block text-right text-2xl md:text-xl ">
          <i
            className="fa-solid fa-circle-xmark cursor-pointer"
            onClick={handleCloseModal}
          ></i>
        </span>
        <span className="about-text font-unbounded text-xs">
          World radio is a web radio application that streams live radio
          stations from almost all the countries of the world. Streaming over
          15,000 radio station worldwide. All you have to do is search or select
          any Country of your choice to load all available stations. <br />
          Tech stack: React.js, Redux-Toolkit, Tailwind, Framer-motion, APIs,
          Vite.
        </span>
      </motion.div>
    </div>
  );
}

export default AboutModal;
