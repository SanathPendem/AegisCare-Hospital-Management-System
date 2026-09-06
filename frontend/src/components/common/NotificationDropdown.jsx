import React, { useState } from 'react';
import { Bell, Calendar, Pill, UserPlus, CreditCard, CheckCircle2 } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    title: 'New OPD Appointment Booked',
    desc: 'Patient Ananya Sharma booked Dr. Sarah Jenkins (Cardiology)',
    time: '10 mins ago',
    icon: Calendar,
    color: 'text-sky-600 bg-sky-50',
    unread: true
  },
  {
    id: 2,
    title: 'Low Medicine Stock Alert',
    desc: 'Paracetamol 500mg stock fallen below 20 units threshold',
    time: '45 mins ago',
    icon: Pill,
    color: 'text-amber-600 bg-amber-50',
    unread: true
  },
  {
    id: 3,
    title: 'New Patient Registered',
    desc: 'Walk-in patient Rahul Verma onboarding completed',
    time: '2 hours ago',
    icon: UserPlus,
    color: 'text-emerald-600 bg-emerald-50',
    unread: false
  },
  {
    id: 4,
    title: 'Bill Payment Settlement',
    desc: 'Invoice #INV-2026-004 paid ₹4,500 via online portal',
    time: '3 hours ago',
    icon: CreditCard,
    color: 'text-indigo-600 bg-indigo-50',
    unread: false
  }
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-slate-500 hover:text-sky-800 hover:bg-sky-50 transition"
        title="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h4 className="font-bold text-slate-900 text-sm">Notifications</h4>
              {unreadCount > 0 && (
                <span className="bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>
            <button
              onClick={markAllRead}
              className="text-xs text-sky-700 font-bold hover:underline"
            >
              Mark all as read
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className={`p-4 flex items-start space-x-3 hover:bg-slate-50 transition ${n.unread ? 'bg-sky-50/40' : ''}`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${n.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-900 truncate">{n.title}</h5>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-1">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-tight">{n.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
            <span className="text-xs text-slate-500 font-semibold">AegisCare Live Hospital Alerts</span>
          </div>
        </div>
      )}
    </div>
  );
}
