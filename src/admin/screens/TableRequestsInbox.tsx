import React, { useState } from 'react';
import { 
  Inbox, 
  Phone, 
  Clock, 
  Calendar, 
  Users, 
  CheckCircle2, 
  MessageSquare, 
  Check, 
  Filter,
  Search,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useToast } from '../ToastContext';
import { TableRequest, TableRequestStatus } from '../../types';

const STATUS_FILTERS: Array<'ALL' | TableRequestStatus> = ['ALL', 'New', 'Contacted', 'Confirmed', 'Closed'];

export const TableRequestsInbox: React.FC = () => {
  const { tableRequests, updateTableRequestStatus } = useRestaurant();
  const { showToast } = useToast();

  const [statusFilter, setStatusFilter] = useState<'ALL' | TableRequestStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<TableRequest | null>(null);

  const safeRequests = tableRequests || [];
  const filteredRequests = safeRequests.filter(req => {
    const matchesStatus = statusFilter === 'ALL' || req.status === statusFilter;
    const matchesSearch = (req.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.contact || '').includes(searchQuery) ||
      (req.message || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const unreadCount = safeRequests.filter(r => r.status === 'New').length;

  const handleStatusChange = (id: string, status: TableRequestStatus) => {
    updateTableRequestStatus(id, status);
    showToast(`Inquiry status marked as ${status}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Table Requests & Inquiries Inbox
            </h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Incoming table reservations and pre-orders submitted through the customer "Ask About a Table" modal.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {STATUS_FILTERS.map(st => {
            const count = st === 'ALL'
              ? safeRequests.length
              : safeRequests.filter(r => r.status === st).length;

            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === st
                    ? 'bg-[#B5502F] text-white'
                    : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{st}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  statusFilter === st ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, or notes..."
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
          />
        </div>
      </div>

      {/* Requests Table / Cards */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Inbox className="w-8 h-8 mx-auto text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-600">No requests found</p>
            <p className="text-xs text-gray-400 mt-1">
              Table inquiries submitted through the website's reservation modal will show up here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50/75 border-b border-gray-200 uppercase tracking-wider text-[11px] text-gray-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Guest & Contact</th>
                  <th className="py-3 px-4">Party & Service</th>
                  <th className="py-3 px-4">Requested Time</th>
                  <th className="py-3 px-4">Special Request / Notes</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Quick Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRequests.map(req => (
                  <tr 
                    key={req.id} 
                    className={`hover:bg-gray-50/60 transition-colors ${
                      req.status === 'New' ? 'bg-orange-50/30' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
                        {req.name}
                        {req.status === 'New' && (
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                        )}
                      </div>
                      <a 
                        href={`tel:${req.contact}`}
                        className="text-xs text-[#B5502F] font-mono hover:underline inline-flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{req.contact}</span>
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-900 font-medium flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span>{req.partySize || '2-4 Guests'}</span>
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {req.serviceType || 'Dine-in Table'}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-gray-800 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{req.requestedDateTime}</span>
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Received {new Date(req.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p className="text-gray-700 truncate" title={req.message}>
                        {req.message || '—'}
                      </p>
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        req.status === 'New'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : req.status === 'Contacted'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : req.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {req.status !== 'Confirmed' && (
                          <button
                            onClick={() => handleStatusChange(req.id, 'Confirmed')}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-md text-[11px] font-medium transition-colors cursor-pointer"
                          >
                            Confirm Table
                          </button>
                        )}
                        {req.status === 'New' && (
                          <button
                            onClick={() => handleStatusChange(req.id, 'Contacted')}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-300 rounded-md text-[11px] font-medium transition-colors cursor-pointer"
                          >
                            Mark Contacted
                          </button>
                        )}
                        {req.status !== 'Closed' && (
                          <button
                            onClick={() => handleStatusChange(req.id, 'Closed')}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-[11px] transition-colors cursor-pointer"
                          >
                            Close
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
