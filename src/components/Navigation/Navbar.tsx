import React, { useState } from 'react';
import { LayoutGrid, Search, Settings, Bell } from 'lucide-react';
import { cn } from '../../utils/cn';
import avatarImg from '../../assets/avatar.png';

interface NavbarProps {
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick, onNotificationsClick }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    'Dashboard',
    'Appointment',
    'Patient',
    'Reports',
    'Chats',
    'Billing',
  ];

  return (
    <header className="w-full bg-white border-b border-slate-100/80 px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 shrink-0 select-none">
      <div className="w-full flex items-center justify-between">
        {/* Left Navigation Menu */}
        <nav className="flex items-center space-x-2 sm:space-x-6 overflow-x-auto no-scrollbar py-0.5">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            if (item === 'Dashboard') {
              return (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold bg-[#6C5CE7] text-white shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <LayoutGrid className="w-4 h-4 text-white" />
                  <span>Dashboard</span>
                </button>
              );
            }

            return (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={cn(
                  'text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap px-1 py-1.5',
                  isActive
                    ? 'text-slate-900 font-bold'
                    : 'text-slate-700 hover:text-slate-900'
                )}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Doctor Profile */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <button
            onClick={onSearchClick}
            aria-label="Search"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3F4F6] hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            aria-label="Settings"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3F4F6] hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                onNotificationsClick?.();
              }}
              aria-label="Notifications"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3F4F6] hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-bold text-xs text-slate-900">Notifications</span>
                  <span className="text-[10px] bg-purple-50 text-purple-600 font-semibold px-2 py-0.5 rounded-full">3 New</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-xl bg-slate-50">
                    <p className="font-semibold text-slate-800 text-[11px]">Heart rate spike detected</p>
                    <p className="text-slate-400 text-[10px]">Apple Watch synced 110 BPM</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Physician Profile */}
          <div className="flex items-center gap-2.5 ml-1 sm:ml-2 cursor-pointer">
            <img
              src={avatarImg}
              alt="David Brock"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-1 ring-slate-200 shadow-sm"
            />
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">David Brock</div>
              <div className="text-[10px] text-slate-400 font-medium leading-tight">General Physician</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
