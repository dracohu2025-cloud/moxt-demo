import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/docs/Sidebar";
import MobileSidebar from "@/components/docs/MobileSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex gap-8">
          <Sidebar />
          <main className="min-w-0 flex-1">
            <MobileSidebar />
            <article className="prose-moxt mt-4 lg:mt-0">{children}</article>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
