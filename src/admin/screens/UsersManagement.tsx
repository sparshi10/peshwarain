import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  UserCheck, 
  Trash2, 
  X, 
  Check, 
  AlertTriangle,
  Lock,
  Mail,
  Shield
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useToast } from '../ToastContext';
import { AdminUser, UserRole } from '../../types';

export const UsersManagement: React.FC = () => {
  const { users, addUser, updateUser, deleteUser, currentUser } = useRestaurant();
  const { showToast } = useToast();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<AdminUser | null>(null);

  // Form states
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [roleInput, setRoleInput] = useState<UserRole>('Staff');

  const isAdmin = currentUser?.role === 'Admin';

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) {
      showToast('Name and email are required', 'error');
      return;
    }

    addUser({
      name: nameInput.trim(),
      email: emailInput.trim(),
      role: roleInput,
      status: 'Active'
    });

    setNameInput('');
    setEmailInput('');
    setRoleInput('Staff');
    setIsInviteModalOpen(false);
    showToast(`Invited ${nameInput} as ${roleInput}`, 'success');
  };

  const handleToggleStatus = (user: AdminUser) => {
    if (user.id === currentUser?.id) {
      showToast('You cannot deactivate your own active account', 'error');
      return;
    }

    const nextStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    updateUser({ ...user, status: nextStatus });
    showToast(`Account for ${user.name} is now ${nextStatus}`, 'info');
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmUser) {
      if (deleteConfirmUser.id === currentUser?.id) {
        showToast('You cannot delete your own active account', 'error');
        setDeleteConfirmUser(null);
        return;
      }

      deleteUser(deleteConfirmUser.id);
      showToast(`Removed user ${deleteConfirmUser.name}`, 'info');
      setDeleteConfirmUser(null);
    }
  };

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-2xs">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-[#D9A441] flex items-center justify-center mx-auto mb-3">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-gray-900">
          Admin Access Required
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Only users with the "Admin" role can view team members, invite new staff, and adjust authorization permissions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Team & User Access Control
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage manager, head chef, and kitchen staff accounts with role-based permissions.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B5502F] hover:bg-[#9E4226] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite New User</span>
        </button>
      </div>

      {/* Role explanation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#B5502F] flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900">Admin Role (Owner / GM)</span>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Full unconstrained access to edit menu, business facts, operating hours, hero copy, review synchronization, and manage staff credentials.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900">Staff Role (Kitchen / Floor)</span>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Can update menu items (mark dishes sold out or update prices) and handle table reservation inquiries. Read-only on business settings and user accounts.
            </p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50/75 border-b border-gray-200 uppercase tracking-wider text-[11px] text-gray-500 font-semibold">
              <tr>
                <th className="py-3 px-4">User Details</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                      <span>{u.name}</span>
                      {u.id === currentUser?.id && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-gray-100 text-gray-600 font-normal">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono">
                      {u.email}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      u.role === 'Admin'
                        ? 'bg-[#B5502F]/10 text-[#B5502F]'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {u.role === 'Admin' ? <Shield className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                      <span>{u.role}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      u.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {u.lastLogin}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className="text-xs text-gray-500 hover:text-gray-900 cursor-pointer underline"
                      >
                        {u.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                      </button>
                      {u.id !== currentUser?.id && (
                        <button
                          onClick={() => setDeleteConfirmUser(u)}
                          className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-sm font-bold text-gray-900">
                Invite Restaurant Team Member
              </h3>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Asif Mahmud"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="e.g. asif@peshwarain.com"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Assigned Permission Role *
                </label>
                <select
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value as UserRole)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                >
                  <option value="Staff">Staff (Can edit menu items & table requests)</option>
                  <option value="Admin">Admin (Full access to all 8 screens & users)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-[#B5502F] hover:bg-[#9E4226] text-white rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              Remove account for {deleteConfirmUser.name}?
            </h3>
            <p className="text-xs text-gray-500 mt-1.5">
              This staff member will lose login access to the dashboard immediately.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setDeleteConfirmUser(null)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-3.5 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
