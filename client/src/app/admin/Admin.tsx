import Nav from "@/components/Nav";
import AdminAuthWrapper from "./components/AdminAuthWrapper";
import Footer from "@/components/Footer";
import AdminDashboard from "./components/AdminDashboard";

export default function AdminPage() {
  return (
    <>
      <Nav />
      <AdminAuthWrapper>
        <AdminDashboard />
      </AdminAuthWrapper>
      <Footer />
    </>
  );
}
