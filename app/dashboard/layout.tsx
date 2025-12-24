import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-zinc-950 text-white selection:bg-blue-500/30">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64">
                <Header />
                <main className="flex-1 overflow-auto p-8 bg-gray-900/50">
                    {children}
                </main>
            </div>
        </div>
    );
}
