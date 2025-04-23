import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto text-center">
        <h1>Oops - Halaman Tidak Ditemukan</h1>
        <Link to="/" className="mt-4 inline-block">
          <Button size="default" variant={"default"}>
            Kembali ke beranda
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
