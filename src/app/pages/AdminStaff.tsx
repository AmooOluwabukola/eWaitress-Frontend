import React from 'react';
import type  { Staff } from '../types';
import { ArrowLeft, UserPlus, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface AdminStaffProps {
  staff: Staff[];
  onBack: () => void;
  onToggleStaffStatus: (staffId: string) => void;
}

export function AdminStaff({ staff, onBack, onToggleStaffStatus }: AdminStaffProps) {
  const handleToggleStatus = (staffId: string) => {
    onToggleStaffStatus(staffId);
    const member = staff.find(s => s.id === staffId);
    toast.success(`${member?.name} is now ${member?.active ? 'inactive' : 'active'}`);
  };

  const getRoleBadgeColor = (role: Staff['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'attendant':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'kitchen':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-stone-600" />
              </button>
              <h1 className="text-stone-800">Staff Management</h1>
            </div>
            <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center gap-2 transition-colors">
              <UserPlus className="w-5 h-5" />
              Add Staff
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-stone-600 mb-1">Total Staff</p>
            <p className="text-stone-800">{staff.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-stone-600 mb-1">Active Staff</p>
            <p className="text-green-600">{staff.filter(s => s.active).length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-stone-600 mb-1">Attendants</p>
            <p className="text-blue-600">{staff.filter(s => s.role === 'attendant').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-stone-600 mb-1">Kitchen Staff</p>
            <p className="text-emerald-600">{staff.filter(s => s.role === 'kitchen').length}</p>
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <span className="text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-stone-800">{member.name}</h3>
                    <p className="text-xs text-stone-500">{member.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleStatus(member.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    member.active ? 'bg-green-500' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      member.active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs border capitalize ${getRoleBadgeColor(member.role)}`}>
                  {member.role}
                </span>
              </div>

              <div className="space-y-2 text-sm text-stone-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{member.name.toLowerCase().replace(' ', '.')}@hotel.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) {Math.floor(Math.random() * 900 + 100)}-{Math.floor(Math.random() * 9000 + 1000)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-200">
                <button className="w-full px-4 py-2 text-sm border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
