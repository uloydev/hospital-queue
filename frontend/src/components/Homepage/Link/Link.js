import LinkItem from "./LinkItem";
import "./Link.css";

const Link = () => {
  return (
    <div className="main-link">
      <LinkItem title="Ambil Antrean" bgcolor="#3469F1" />
      <LinkItem title="Data Diri" bgcolor="#16BFF4" />
      <LinkItem title="Panduan Pemakaian Website" bgcolor="#F2B369" />
      <LinkItem title="Tentang Klinik" bgcolor="#F167D3" />
    </div>
  );
};

export default Link;
