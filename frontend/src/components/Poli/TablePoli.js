import TableItemPoli from "./TableItemPoli";
import "./Table.css";

const TablePoli = (props) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <table className="fl-table">
        <thead>
          <tr>
            <th>No Antrian</th>
            <th>Nama</th>
            <th>No. Handphone</th>
            <th>Alamat</th>
            <th>Keluhan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.data?.map((item) => (
            <TableItemPoli
              key={item.id}
              item={{
                number: item.number,
                name: item.name,
                phone: item.phone,
                address: item.address,
                complaint: item.complaint,
                status: item.status,
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePoli;
