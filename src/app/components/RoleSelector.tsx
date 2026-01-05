import React from 'react';
import type { UserRole } from '../types';
import { User, Shield, Briefcase, ChefHat } from 'lucide-react';

interface RoleSelectorProps {
  onSelectRole: (role: UserRole) => void;
}

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  const roles = [
    // {
    //   role: 'guest' as UserRole,
    //   name: 'Guest',
    //   description: 'Browse menu and place orders',
    //   icon: User,
    //   color: 'amber-600'
    // },
    {
      role: 'admin' as UserRole,
      name: 'Admin',
      description: 'Manage orders, menu, and staff',
      icon: Shield,
      color: 'slate-600'
    },
    {
      role: 'attendant' as UserRole,
      name: 'Attendant',
      description: 'Process and deliver orders',
      icon: Briefcase,
      color: 'blue-600'
    },
    {
      role: 'kitchen' as UserRole,
      name: 'Kitchen',
      description: 'View and prepare orders',
      icon: ChefHat,
      color: 'emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="mb-4 text-stone-800 text-2xl font-bold">Luxury Hotel</h1>
          <p className="text-stone-600 text-lg">Food Ordering System</p>
          <p className="mt-2 text-sm text-stone-500">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map(({ role, name, description, icon: Icon, color }) => (
            <button
              key={role}
              onClick={() => onSelectRole(role)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-8 text-left group"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br bg-${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="mb-2 text-stone-800">{name}</h2>
              <p className="text-sm text-stone-600">{description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
