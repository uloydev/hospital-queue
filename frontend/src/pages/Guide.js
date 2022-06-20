import React from "react";
import Wrap from "../components/UI/Wrap";

const Guide = () => {
  return (
    <div
      style={{
        width: "50rem",
        maxWidth: "90%",
      }}
    >
      <Wrap backgroundColor="#f1f1f1" title="Panduan Pemakaian Website">
        <ol style={{ textAlign: "justify" }}>
          <li>
            Login, jika belum mempunyai akun silahkan register terlebih dahulu.
          </li>
          <li>Pilih menu “Ambil Antrian”. </li>
          <li>
            Sebelum mengisi data, baca <span> PERINGATAN</span> terlebih dahulu
            untuk informasi sebelum mengisi data.
          </li>
          <li>Isi semua form data.</li>
          <li>
            Setelah mengisi data, maka anda akan mendapatkan nomor antrian.
          </li>
          <li>
            Jika sudah mendapatkan nomor Antrian, Pasien diwajibkan untuk selalu
            <span> REFRESH WEBSITE</span> agar nomor Antrian yang sedang
            berlangsung bisa terus diperbarui/terupdate.
          </li>
          <li>
            Jika Antrian Yang Sedang Berlangsung dengan Antrian Anda berjarak
            kurang dari 3 (contoh : Antrian Yang Sedang Berlangsung (7) dan
            Antrian Anda (10)), maka aplikasi website akan mengirimkan
            Notifikasi kepada anda untuk segera datang ke klinik.
          </li>
          <li>
            Setelah tiba di klinik, Dimohon pasien untuk
            <span> MENGKONFIRMASI KEDATANGAN</span> yang berada di website
            ,dibawah nomor Antrian Anda.
          </li>
          <li>
            Tunggu hingga giliran nomor Antrian Anda, dan admin akan mengirimkan
            <span> NOTIFIKASI UNTUK MASUK KE RUANGAN PEMERIKSAAN</span> kepada
            anda melalui aplikasi WEBSITE.
          </li>
        </ol>
      </Wrap>
    </div>
  );
};

export default Guide;
