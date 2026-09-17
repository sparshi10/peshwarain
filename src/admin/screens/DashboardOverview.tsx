import React from 'react';
import { 
  UtensilsCrossed, 
  MessageSquareQuote, 
  Inbox, 
  Clock, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  ExternalLink,
  Store,
  History
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';

interface DashboardOverviewProps {
  onNavigate: (screen: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const { 
    businessInfo, 
    menuItems, 
    reviews, 
    tableRequests, 
    activityLogs, 
    currentUser,
    setCurrentView 
  } = useRestaurant();

  const activeMenuItems = (menuItems || []).filter(m => m.isVisible !== false).length;
  const newRequests = (tableRequests || []).filter(r => r.status === 'New').length;
  const featuredReviews = (reviews || []).filter(r => r.isFeatured).length;

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Live Website Synced
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-1">
            Welcome back, {currentUser?.name.split(' ')[0] || 'Tariq'}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Rankin Street location is running. All changes saved here update the customer site immediately.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('menu')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#B5502F] hover:bg-[#9E4226] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Menu Dish</span>
          </button>
          <button
            onClick={() => setCurrentView('public')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Menu Items */}
        <div 
          onClick={() => onNavigate('menu')}
          className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs hover:border-[#B5502F]/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Menu Items
            </span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#B5502F] flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {menuItems.length}
            </span>
            <span className="text-xs text-emerald-600 font-medium">
              {activeMenuItems} shown on site
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1 flex items-center justify-between">
            <span>{menuItems.length - activeMenuItems} hidden dishes</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#B5502F] transition-colors" />
          </p>
        </div>

        {/* Reviews Shown */}
        <div 
          onClick={() => onNavigate('reviews')}
          className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs hover:border-[#D9A441]/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Reviews & Rating
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#D9A441] flex items-center justify-center">
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {businessInfo.rating} ★
            </span>
            <span className="text-xs text-gray-500 font-medium">
              ({businessInfo.reviewCount.toLocaleString()} total)
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1 flex items-center justify-between">
            <span>{featuredReviews} featured on homepage</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#D9A441] transition-colors" />
          </p>
        </div>

        {/* New Table Requests */}
        <div 
          onClick={() => onNavigate('requests')}
          className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs hover:border-blue-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Table Requests
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              newRequests > 0 ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-gray-500'
            }`}>
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {newRequests}
            </span>
            {newRequests > 0 ? (
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider">
                Unread Action
              </span>
            ) : (
              <span className="text-xs text-gray-500 font-medium">All caught up</span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1 flex items-center justify-between">
            <span>{tableRequests.length} total historical inquiries</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </p>
        </div>

        {/* Operating Schedule Status */}
        <div 
          onClick={() => onNavigate('business')}
          className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs hover:border-emerald-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Business Hours
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-sm font-bold text-gray-900 truncate">
              Wednesdays 5 PM
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1 truncate">
            {businessInfo.hoursDetail}
          </p>
          <p className="text-xs text-gray-400 mt-1 flex items-center justify-between">
            <span>Edit 7-day schedule</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
          </p>
        </div>
      </div>

      {/* Main Grid: Activity Log + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Log (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-gray-500" />
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Recent Restaurant Activity
              </h3>
            </div>
            <span className="text-xs text-gray-400">
              Auto-logged updates
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {activityLogs.slice(0, 7).map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-3 text-sm">
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#B5502F] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {log.action}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      By <span className="font-medium text-gray-600">{log.author}</span> · {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {log.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Management Shortcuts (1 Col) */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Quick Management Tasks
            </h3>
            <div className="space-y-2.5">
              <button
                onClick={() => onNavigate('menu')}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-gray-800">Update Dish Prices or Visibility</div>
                  <div className="text-[11px] text-gray-400">Hide sold out dishes, adjust ৳ amounts</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#B5502F]" />
              </button>

              <button
                onClick={() => onNavigate('business')}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-gray-800">Modify Operating Schedule</div>
                  <div className="text-[11px] text-gray-400">Set holiday hours or Wednesday times</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#B5502F]" />
              </button>

              <button
                onClick={() => onNavigate('content')}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-gray-800">Change Announcement Ticker</div>
                  <div className="text-[11px] text-gray-400">Update the top alert bar message</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#B5502F]" />
              </button>

              <button
                onClick={() => onNavigate('photos')}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-gray-800">Manage Photo Gallery</div>
                  <div className="text-[11px] text-gray-400">Add fresh kitchen or dining room photos</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#B5502F]" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-[#B5502F]" />
              16b Rankin St, Wari
            </span>
            <span className="font-mono text-[11px] text-gray-400">v1.2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
