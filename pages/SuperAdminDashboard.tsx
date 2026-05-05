import React, { useState } from 'react';
import { Shield, Users, Settings, Activity, Database, Lock, LogOut, ChevronRight, Server, Globe, Power, Key } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SuperAdminDashboard: React.FC<any> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const [isProvisioning, setIsProvisioning] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Admin');

  const [generatedPassword, setGeneratedPassword] = useState<{email: string, pass: string} | null>(null);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let pass = '';
    for (let i = 0; i < 12; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  const handleResetPassword = (email: string) => {
    setGeneratedPassword({ email, pass: generatePassword() });
  };

  const [settings, setSettings] = useState({
    maintenanceMode: false,
    siteTitle: 'Enddy Cakes & Bakes',
    contactEmail: 'admin@enddycakes.com',
  });

  const [admins, setAdmins] = useState([
    { id: '1', email: 'admin@enddycakes.com', role: 'Admin', lastLogin: '2 hours ago' },
    { id: '2', email: 'owner@enddycakes.com', role: 'Super Admin', lastLogin: 'Just now' },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'EnddySuper2026!') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid super admin password. (Hint: EnddySuper2026!)');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-700">
          <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
             <Shield size={40} className="text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Super Admin Box</h1>
          <p className="text-gray-400 mb-8 font-mono text-sm">System configuration restricted.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
             {/* Hidden username field for accessibility / password manager compatibility */}
             <div className="hidden">
                 <input type="text" autoComplete="username" defaultValue="superadmin" />
             </div>
             <div>
                <input 
                  type="password" 
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter Master Password" 
                  className="w-full px-6 py-4 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-white font-mono text-center"
                />
             </div>
             <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition flex justify-center items-center gap-2 uppercase tracking-widest text-sm">
               <Lock size={16} /> Authenticate
             </button>
          </form>
          <div className="mt-8">
            <Link to="/" className="text-gray-500 hover:text-white text-sm transition font-medium">← Return to Site</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white border-b md:border-r border-gray-800 flex flex-col shadow-2xl">
         <div className="p-6 border-b border-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest">Super Admin</h2>
              <p className="text-xs text-gray-400 font-mono">sys.ctrl.panel</p>
            </div>
         </div>
         <nav className="flex-1 p-4 space-y-2">
            {[
              { id: 'overview', icon: Activity, label: 'System Overview' },
              { id: 'admins', icon: Users, label: 'Access Control' },
              { id: 'settings', icon: Settings, label: 'Global Settings' },
              { id: 'database', icon: Database, label: 'Database Health' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === tab.id ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-gray-800 text-gray-400 hover:text-white'}`}
              >
                <tab.icon size={18} />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
         </nav>
         <div className="p-4 border-t border-gray-800">
            <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all text-left">
              <LogOut size={18} /> <span className="font-medium text-sm">Terminate Session</span>
            </button>
            <div className="mt-4 pt-4 border-t border-gray-800 text-center">
              <Link to="/" className="text-xs text-gray-500 hover:text-white transition">Visit Live Site</Link>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden pt-6 px-4 md:px-12 pb-12">
        <header className="mb-10 mt-4 md:mt-0">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {activeTab === 'overview' && 'System Overview'}
            {activeTab === 'admins' && 'Access Control'}
            {activeTab === 'settings' && 'Global Configurations'}
            {activeTab === 'database' && 'Database Infrastructure'}
          </h1>
          <p className="text-gray-500 font-mono text-sm mt-1">Superuser clearance confirmed. Proceed with caution.</p>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                 <div className="relative z-10">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Server Status</p>
                   <p className="text-2xl font-bold text-gray-900">Optimal</p>
                 </div>
                 <Server className="absolute -bottom-4 -right-4 text-gray-100 group-hover:scale-110 transition-transform" size={100} />
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                 <div className="relative z-10">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Active Admins</p>
                   <p className="text-2xl font-bold text-gray-900">{admins.length}</p>
                 </div>
                 <Users className="absolute -bottom-4 -right-4 text-gray-100 group-hover:scale-110 transition-transform" size={100} />
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                 <div className="relative z-10">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Uptime</p>
                   <p className="text-2xl font-bold text-gray-900">99.98%</p>
                 </div>
                 <Activity className="absolute -bottom-4 -right-4 text-gray-100 group-hover:scale-110 transition-transform" size={100} />
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                 <div className="relative z-10">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Bandwidth</p>
                   <p className="text-2xl font-bold text-gray-900">42GB / mo</p>
                 </div>
                 <Globe className="absolute -bottom-4 -right-4 text-gray-100 group-hover:scale-110 transition-transform" size={100} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
               <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                  <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Key size={18} className="text-red-500" /> Recent Security Events</h3>
                  <div className="space-y-4">
                    {[
                      { event: 'Super Admin Login', ip: '192.168.1.1', time: 'Just now', status: 'Success' },
                      { event: 'Admin User Added', ip: '192.168.1.1', time: '2 hours ago', status: 'Success' },
                      { event: 'Failed Auth Attempt', ip: '10.0.0.45', time: '1 day ago', status: 'Failed' },
                    ].map((log, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                         <div>
                           <p className="font-bold text-sm text-gray-900">{log.event}</p>
                           <p className="text-xs text-gray-500 font-mono mt-1">{log.ip}</p>
                         </div>
                         <div className="text-right">
                           <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${log.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {log.status}
                           </span>
                           <p className="text-xs text-gray-400 mt-1">{log.time}</p>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-xl p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Power size={18} className="text-red-500" /> System Controls</h3>
                    <p className="text-sm text-gray-400 mb-8">Execute core system commands. Actions are immediately applied to the live production server.</p>
                    
                    <div className="space-y-3">
                      <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-3 rounded-lg font-bold text-sm text-left flex justify-between items-center transition">
                        Restart Web Services <ChevronRight size={16} />
                      </button>
                      <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-3 rounded-lg font-bold text-sm text-left flex justify-between items-center transition">
                        Clear Application Cache <ChevronRight size={16} />
                      </button>
                      <button className="w-full bg-red-900/30 hover:bg-red-900/50 border border-red-900/50 text-red-400 px-4 py-3 rounded-lg font-bold text-sm text-left flex justify-between items-center transition">
                        Force Reset Database Connections <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                  <Server size={180} className="absolute -bottom-10 -right-10 text-gray-800 opacity-20 rotate-12" />
               </div>
            </div>
          </div>
        )}

        {activeTab === 'admins' && (
          <div className="space-y-6">
             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-gray-200 flex justify-between py-5 items-center bg-gray-50">
                 <h3 className="font-bold text-gray-900">Registered Administrators</h3>
                 <button onClick={() => setIsProvisioning(!isProvisioning)} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-gray-800 transition">
                   {isProvisioning ? 'Cancel' : '+ Provision Account'}
                 </button>
               </div>
               
               {isProvisioning && (
                 <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!newAdminEmail) return;
                      setAdmins([...admins, { id: Math.random().toString(36).substr(2, 9), email: newAdminEmail, role: newAdminRole, lastLogin: 'Never' }]);
                      setIsProvisioning(false);
                      setGeneratedPassword({ email: newAdminEmail, pass: generatePassword() });
                      setNewAdminEmail('');
                      setNewAdminRole('Admin');
                    }} className="flex flex-col md:flex-row gap-4 items-end">
                       <div className="flex-1">
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                          <input required type="email" value={newAdminEmail} onChange={e => setNewAdminEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 transition-all font-medium" placeholder="admin@example.com" />
                       </div>
                       <div className="flex-1">
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Role</label>
                          <select value={newAdminRole} onChange={e => setNewAdminRole(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 transition-all font-medium">
                            <option>Admin</option>
                            <option>Super Admin</option>
                          </select>
                       </div>
                       <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-green-700 transition h-[42px]">
                         Provision
                       </button>
                    </form>
                 </div>
               )}

               {generatedPassword && (
                 <div className="p-6 bg-green-50 border-b border-green-200 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-green-800 font-bold mb-1">Temporary Password Generated</p>
                      <p className="text-sm text-green-900">Please copy this password for <span className="font-bold">{generatedPassword.email}</span>. It will not be shown again.</p>
                      <div className="mt-3 flex gap-4 items-center">
                         <code className="bg-white px-4 py-2 rounded border border-green-300 font-mono text-lg font-bold shadow-inner text-gray-900 tracking-wider">
                           {generatedPassword.pass}
                         </code>
                         <button onClick={() => {navigator.clipboard.writeText(generatedPassword.pass); alert('Copied to clipboard!');}} className="text-green-700 hover:text-green-900 underline text-sm font-bold">Copy</button>
                      </div>
                    </div>
                    <button onClick={() => setGeneratedPassword(null)} className="text-green-700 hover:text-green-900 px-4 py-2 font-bold text-sm bg-green-200 rounded-lg hover:bg-green-300 transition">Dismiss</button>
                 </div>
               )}

               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-widest text-gray-500 font-bold">
                     <th className="px-6 py-4">Admin Email</th>
                     <th className="px-6 py-4">Role Matrix</th>
                     <th className="px-6 py-4">Last Active</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {admins.map(admin => (
                     <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                       <td className="px-6 py-4 font-medium text-gray-900">{admin.email}</td>
                       <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded text-xs font-bold ${admin.role === 'Super Admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                           {admin.role}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-sm text-gray-500">{admin.lastLogin}</td>
                       <td className="px-6 py-4 text-right">
                         <div className="flex justify-end gap-4 items-center">
                           <button onClick={() => handleResetPassword(admin.email)} className="text-brand-600 hover:text-brand-800 transition font-bold text-sm tracking-wide">Reset Pass</button>
                           <button onClick={() => setAdmins(admins.filter(a => a.id !== admin.id))} className="text-gray-400 hover:text-red-600 transition font-bold text-sm tracking-wide">Revoke</button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
             <h3 className="font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Global Constants</h3>
             
             <div className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Platform Title</label>
                   <input type="text" value={settings.siteTitle} onChange={e => setSettings({...settings, siteTitle: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 transition-all font-medium" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Technical Contact Routing</label>
                   <input type="email" value={settings.contactEmail} onChange={e => setSettings({...settings, contactEmail: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 transition-all font-mono text-sm" />
                </div>
                
                <div className="pt-6 mt-6 border-t border-gray-100">
                   <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-xl">
                      <div>
                        <p className="font-bold text-orange-900">Maintenance Mode</p>
                        <p className="text-sm text-orange-700">Display downtime splash page to all non-admin traffic.</p>
                      </div>
                      <button onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})} className={`relative w-14 h-8 rounded-full transition-colors ${settings.maintenanceMode ? 'bg-orange-500' : 'bg-gray-300'}`}>
                         <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${settings.maintenanceMode ? 'translate-x-6' : ''}`}></span>
                      </button>
                   </div>
                </div>

                <div className="pt-6">
                  <button className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition">Deploy Configuration</button>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'database' && (
          <div className="space-y-6">
             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
               <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Database size={18} className="text-gray-500" /> Database Integrity Summary</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Collections</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">12</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Documents</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">1,248</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Storage Used</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">0.4 MB</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-green-600 uppercase tracking-widest">Health</p>
                    <p className="text-xl font-bold text-green-700 mt-1">Passing</p>
                  </div>
               </div>

               <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900">Backup & Restore Tasks</h4>
                  <div className="flex flex-col md:flex-row gap-4">
                     <button className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-6 rounded-xl font-bold text-sm transition flex flex-col items-center justify-center text-center gap-2">
                       <Database size={24} className="text-gray-400" />
                       Generate Snapshot
                     </button>
                     <button className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-6 rounded-xl font-bold text-sm transition flex flex-col items-center justify-center text-center gap-2">
                       <Activity size={24} className="text-gray-400" />
                       Run Integrity Check
                     </button>
                     <button className="flex-1 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-6 rounded-xl font-bold text-sm text-red-700 transition flex flex-col items-center justify-center text-center gap-2">
                       <Power size={24} className="text-red-400" />
                       Dangerous: Wipe Database
                     </button>
                  </div>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
