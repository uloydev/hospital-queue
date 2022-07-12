import React from "react";
import Wrap from "../components/UI/Wrap";
import "./Pages.css";
import ClinicImg from "../assets/images/klinik.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const About = () => {
  const history = useHistory();

  const clickBackHandler = () => {
    history.push("/homepage");
  };
  return (
    <div className="wrap_about">
      <Wrap
        backgroundColor="#f1f1f1"
        title="Tentang Klinik"
        isBack
        onClickBack={clickBackHandler}
      >
        <div className="about">
          <div className="about_image">
            <img alt="" srcSet={ClinicImg} />
            <div>
              <h4>Jam operasional: </h4>
              <p style={{ marginBottom: "10px" }}>Senin - Minggu 24 Jam</p>
              <h4>Alamat: </h4>
              <p>Jl. Abdul Gani Raya No 21, Cilodong Depok</p>
            </div>
          </div>
          <div className="about_desc">
            <p>
              Klinik Al Barokah Cilodong adalah sebuah badan usaha yang
              memberikan jasa pelayanan dibidang kesehatan kepada masyarakat
              umum yang memiliki masalah kesehatan.
            </p>

            <p>Sosial media yang dapat dihubungi</p>
            <div>
              <FontAwesomeIcon icon={faWhatsapp} className="icon" />{" "}
              082823642374
            </div>
            <div>
              <FontAwesomeIcon icon={faInstagram} className="icon" />{" "}
              klinikalbarokah
            </div>
          </div>
        </div>
      </Wrap>
    </div>
  );
};

export default About;
