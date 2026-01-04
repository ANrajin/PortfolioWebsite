import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import AdminSidebar from "@/components/admin/Sidebar";
import { LogOut, User } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold text-slate-100">Admin Panel</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* User Info */}
                        <div className="flex items-center gap-3">
                            {session.user.image ? (
                                <Image
                                    src={session.user.image}
                                    alt={session.user.name || "User"}
                                    width={32}
                                    height={32}
                                    className="rounded-full border border-slate-700"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                                    <User size={16} className="text-slate-400" />
                                </div>
                            )}
                            <div className="hidden sm:block">
                                <p className="text-sm font-medium text-slate-200">
                                    {session.user.name || "Admin"}
                                </p>
                                <p className="text-xs text-slate-400">{session.user.email}</p>
                            </div>
                        </div>

                        {/* Sign Out */}
                        <form
                            action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/" });
                            }}
                        >
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Sign Out</span>
                            </button>
                        </form>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
