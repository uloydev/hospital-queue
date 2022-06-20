import LinkItem from "./LinkItem";
import "./Link.css";
import { useHistory } from "react-router-dom";

const Link = () => {
  const history = useHistory();

  return (
    <div className="main-link">
      <LinkItem
        title="Ambil Antrean"
        bgcolor="#3469F1"
        onClick={() => history.push("/take-antrean")}
      />
      <LinkItem
        title="Data Diri"
        bgcolor="#16BFF4"
        onClick={() => history.push("/profile")}
      />
      <LinkItem
        title="Panduan Pemakaian Website"
        bgcolor="#F2B369"
        onClick={() => history.push("/guide")}
      />
      <LinkItem
        title="Tentang Klinik"
        bgcolor="#F167D3"
        onClick={() => history.push("/about")}
      />
    </div>
  );
};

export default Link;
