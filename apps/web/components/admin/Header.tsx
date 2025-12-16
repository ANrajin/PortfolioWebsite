'use client';

import { LogOut, User } from 'lucide-react';

interface AdminHeaderProps {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
    return (
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold text-slate-100">Admin Panel</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                    {user?.image ? (
                        <img
                            src={user.image}
                            alt={user.name || 'User'}
                            className="w-8 h-8 rounded-full border border-slate-700"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                            <User size={16} className="text-slate-400" />
                        </div>
                    )}
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-slate-200">{user?.name || 'Admin'}</p>
                        <p className="text-xs text-slate-400">{user?.email}</p>
                    </div>
                </div>

                {/* Sign Out */}
                <form action="/api/auth/signout" method="POST">
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
    );
}
