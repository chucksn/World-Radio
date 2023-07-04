import twitterIcon from "../assets/twitter.svg";
import tictokIcon from "../assets/tictok.svg";
import linkedinIcon from "../assets/linkedin.svg";

function Footer() {
  let year = new Date().getFullYear();
  return (
    <div className="footer flex flex-col items-center pt-3 pb-24 w-full shadow-c-1-top bg-slate-900 lg:pt-4 text-slate-400 ">
      <div className="footer-links flex justify-center gap-x-8 lg:gap-x-12 text-slate-300 text-lg hover:cursor-pointer lg:text-2xl   ">
        <a
          href="https://twitter.com/chuckfugee?t=fDFd4mEuIOOvFJLhSXnFNA&s=09"
          rel="noreferrer"
          target="_blank"
        >
          <img src={twitterIcon} alt="twitter" />
        </a>
        <a
          href="https://www.tiktok.com/@chuckx892?_t=8YbFb8cvrSI&_r=1"
          rel="noreferrer"
          target="_blank"
        >
          <img src={tictokIcon} alt="tictok" />
        </a>

        <a
          href="https://www.linkedin.com/in/chucksn611/"
          rel="noreferrer"
          target="_blank"
        >
          <img src={linkedinIcon} alt="linkedin" />
        </a>
      </div>
      <div className="footer-text flex flex-col items-center mt-6  lg:mt-12">
        <span className=" block text-xs">
          Designed and Developed By Chucks N &#169;{year}
        </span>
      </div>
    </div>
  );
}

export default Footer;
