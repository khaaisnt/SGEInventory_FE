import Header from "@/components/layout/header";
import { Icon } from "@iconify/react";
import React from "react";

const InfoPage = () => {
  return (
    <main>
      <section>
        <Header
          title="Information"
          subtitle="Everything you need to know before borrowing or storing items."
        />
      </section>

      <section>
        <div className="flex flex-col md:flex-row gap-2 md:gap-10 mt-8">
          <div className="bg-white w-full p-4 rounded-2xl shadow-md">
            <div className="flex gap-2 items-center mb-2">
              <div className="bg-primary-100 p-2 rounded-xl">
                <Icon
                  icon={"coolicons:clipboard-list"}
                  className="text-xl text-primary-900"
                />
              </div>
              <p className="text-xl font-bold text-primary-900">
                Borrow Regulations
              </p>
            </div>
            <hr className="border-t-2 border-primary-900 rounded-full " />
            <ol className="list-decimal pl-5 space-y-1 text-primary-900 mt-3 text-sm sm:text-base">
              <li>
                Peminjaman diajukam lewat menu Borrow Request oleh lembaga atau
                organisasi mahasiswa. Isi nama lembaga, pilih barang beserta
                jumlahnya (boleh lebih dari satu), tujuan, klinik, dan saran.
              </li>
              <li>
                Jumlah barang yang diajukan tidak boleh melebihi stok yang
                tertera di kolom Available.
              </li>
              <li>
                Pengajuan akan berstatus pending sampai diperiksa admin.
                hasilnya Approved atau Rejected.
              </li>
              <li>
                Setelah Approved, barang bisa diambil sesuai tanggal peminjaman.
              </li>
              <li>
                Barang akan menjadi tanggung jawab pengaju dan program kerja
                yang bersangkutan.
              </li>
              <li>
                Minbureau berhak mengeluarkan peringatan apabila barang telat
                dikembalikan atau barang mengalami kerusakan
              </li>
              <li>
                Masa peminjaman inventaris SGE maksimal 2 minggu. Jika melebihi,
                harap mengisi ulang form peminjaman baru lewat Borrow Request.
              </li>
            </ol>
          </div>

          <div className="bg-white w-full p-4 rounded-2xl shadow-md">
            <div className="flex gap-2 items-center mb-2">
              <div className="bg-primary-100 p-2 rounded-xl">
                <Icon
                  icon={"keyline-icons:package-plus"}
                  className="text-xl text-primary-900"
                />
              </div>
              <p className="text-xl font-bold text-primary-900">
                Storage Regulations
              </p>
            </div>
            <hr className="border-t-2 border-primary-900 rounded-full " />
            <ol className="list-decimal pl-5 space-y-1 mt-3 text-primary-900 text-sm sm:text-base">
              <li>
                Setiap Keluarga Besar Mahasiswa FILKOM dapat melakukan penitipan
                Inventaris di Gudang Lembaga (di belakang ruang sekretariat DPM
                FILKOM) dengan didasarkan kepentingan yang menunjang program
                kerja lembaga masing-masing.
              </li>
              <li>
                Isi nama lembaga, nama program kerja, barang beserta jumlahnya,
                durasi penitipan, dan foto barang. Keterangan boleh dikosongkan.
              </li>
              <li>
                Pengajuan akan berstatus Penidng sampai diperiksa admin.
                hasilnya Approved atau Rejected.
              </li>
              <li>
                Bawa barang yang akan dititipkan hanya setelah status Approved.
              </li>
              <li>
                Inventaris dapat dititipkan{" "}
                <span className="font-semibold">maksimal 1 minggu</span> setelah
                konfirmasi pengajuan, apabila{" "}
                <span className="font-semibold">lebih dari 1 minggu</span> harap
                <span className="font-semibold">
                  mengisikan form ulang lewat
                </span>{" "}
              </li>
              <li className="font-semibold">
                Barang akan menjadi tanggung jawab ADKEU BEM dan program kerja
                yang bersangkutan, dengan syarat sudah melakukan konfirmasi
                terlebih dahulu.
              </li>
              <li className="font-semibold">
                ADKEU BEM berhak mengeluarkan dan tidak bertanggung jawab atas
                inventaris, jika melebihi atau menyalahi ketentuan yang berlaku
              </li>
              <li className="font-semibold">
                Jika pintu Gudang Lembaga masih terkunci, kunci dapat diambil di
                staff cleaning service GKM
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InfoPage;
