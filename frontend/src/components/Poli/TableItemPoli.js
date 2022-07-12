import { Fragment } from "react";

const TableItemPoli = ({ item }) => {
  let classname = "";
  if (item.status === "Selesai") {
    classname = "success white";
  }
  if (item.status === "Pemeriksaan") {
    classname = "primary white";
  }
  if (item.status === "Tiba") {
    classname = "warning white";
  }
  return (
    <tr key={item.id}>
      <Fragment>
        <td>{item.number}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.address}</td>
        <td>{item.complaint}</td>
        <td className={classname}>{item.status}</td>
      </Fragment>
    </tr>
  );
};

export default TableItemPoli;
