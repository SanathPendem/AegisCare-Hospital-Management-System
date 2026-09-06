import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

export default function ActionMenu({ items = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="action-dropdown" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="action-dropdown-menu">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  setIsOpen(false);
                  if (item.onClick) item.onClick();
                }}
                className={`action-dropdown-item ${item.danger ? 'danger' : ''}`}
              >
                {Icon && <Icon size={14} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
