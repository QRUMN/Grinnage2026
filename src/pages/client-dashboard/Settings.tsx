import * as React from 'react';
import { 
  User, Bell, Lock, Home, CreditCard, HelpCircle,
  Globe, Moon, Sun, Check, ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('account');
  const [darkMode, setDarkMode] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsNotifications, setSmsNotifications] = React.useState(true);
  const [appointmentReminders, setAppointmentReminders] = React.useState(true);
  const [issueUpdates, setIssueUpdates] = React.useState(true);
  const [paymentReminders, setPaymentReminders] = React.useState(true);
  const [promotions, setPromotions] = React.useState(false);

  // Tabs content
  const tabs = [
    { id: 'account', label: 'Account', icon: <User className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Lock className="w-5 h-5" /> },
    { id: 'address', label: 'Address', icon: <Home className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle className="w-5 h-5" /> }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white">Settings</h2>
        <p className="text-gray-400 mt-1">Manage your account preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-[#56e39f]/10 text-[#56e39f]' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                  <ChevronRight className={`ml-auto h-5 w-5 ${activeTab === tab.id ? 'text-[#56e39f]' : 'text-gray-500'}`} />
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="md:col-span-3">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
                
                <div className="space-y-6">
                  {/* Profile Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">Profile Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">First Name</label>
                        <input 
                          type="text" 
                          value="John"
                          className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                        <input 
                          type="text" 
                          value="Doe"
                          className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          value="john.doe@example.com"
                          className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          value="(555) 123-4567"
                          className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Preferences */}
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <h4 className="text-lg font-medium text-white">Preferences</h4>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Theme</p>
                        <p className="text-sm text-gray-400">Choose your preferred display mode</p>
                      </div>
                      <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
                        <button 
                          onClick={() => setDarkMode(false)}
                          className={`flex items-center px-3 py-1.5 rounded ${!darkMode ? 'bg-white/10 text-white' : 'text-gray-400'}`}
                        >
                          <Sun className="w-4 h-4 mr-2" />
                          Light
                        </button>
                        <button 
                          onClick={() => setDarkMode(true)}
                          className={`flex items-center px-3 py-1.5 rounded ${darkMode ? 'bg-white/10 text-white' : 'text-gray-400'}`}
                        >
                          <Moon className="w-4 h-4 mr-2" />
                          Dark
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Language</p>
                        <p className="text-sm text-gray-400">Select your preferred language</p>
                      </div>
                      <select className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#56e39f]/50">
                        <option value="en" className="bg-[#111827]">English (US)</option>
                        <option value="es" className="bg-[#111827]">Español</option>
                        <option value="fr" className="bg-[#111827]">Français</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                  <Button variant="primary" size="md">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
            
            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Notification Settings</h3>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">Communication Preferences</h4>
                    
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <div>
                        <p className="text-white">Email Notifications</p>
                        <p className="text-sm text-gray-400">Receive updates via email</p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input 
                          type="checkbox" 
                          id="emailToggle" 
                          className="opacity-0 w-0 h-0"
                          checked={emailNotifications}
                          onChange={() => setEmailNotifications(!emailNotifications)} 
                        />
                        <label 
                          htmlFor="emailToggle" 
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${emailNotifications ? 'bg-[#56e39f]' : 'bg-white/10'}`}
                        >
                          <span 
                            className={`absolute h-4 w-4 left-1 bottom-1 bg-white rounded-full transition-all duration-300 ${emailNotifications ? 'transform translate-x-6' : ''}`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <div>
                        <p className="text-white">SMS Notifications</p>
                        <p className="text-sm text-gray-400">Receive updates via text message</p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input 
                          type="checkbox" 
                          id="smsToggle" 
                          className="opacity-0 w-0 h-0"
                          checked={smsNotifications}
                          onChange={() => setSmsNotifications(!smsNotifications)} 
                        />
                        <label 
                          htmlFor="smsToggle" 
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${smsNotifications ? 'bg-[#56e39f]' : 'bg-white/10'}`}
                        >
                          <span 
                            className={`absolute h-4 w-4 left-1 bottom-1 bg-white rounded-full transition-all duration-300 ${smsNotifications ? 'transform translate-x-6' : ''}`}
                          ></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">Notification Types</h4>
                    
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <div>
                        <p className="text-white">Appointment Reminders</p>
                        <p className="text-sm text-gray-400">Reminders for upcoming service appointments</p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input 
                          type="checkbox" 
                          id="appointmentToggle" 
                          className="opacity-0 w-0 h-0"
                          checked={appointmentReminders}
                          onChange={() => setAppointmentReminders(!appointmentReminders)} 
                        />
                        <label 
                          htmlFor="appointmentToggle" 
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${appointmentReminders ? 'bg-[#56e39f]' : 'bg-white/10'}`}
                        >
                          <span 
                            className={`absolute h-4 w-4 left-1 bottom-1 bg-white rounded-full transition-all duration-300 ${appointmentReminders ? 'transform translate-x-6' : ''}`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <div>
                        <p className="text-white">Issue Updates</p>
                        <p className="text-sm text-gray-400">Updates on your reported pest issues</p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input 
                          type="checkbox" 
                          id="issueToggle" 
                          className="opacity-0 w-0 h-0"
                          checked={issueUpdates}
                          onChange={() => setIssueUpdates(!issueUpdates)} 
                        />
                        <label 
                          htmlFor="issueToggle" 
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${issueUpdates ? 'bg-[#56e39f]' : 'bg-white/10'}`}
                        >
                          <span 
                            className={`absolute h-4 w-4 left-1 bottom-1 bg-white rounded-full transition-all duration-300 ${issueUpdates ? 'transform translate-x-6' : ''}`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <div>
                        <p className="text-white">Payment Reminders</p>
                        <p className="text-sm text-gray-400">Reminders about upcoming payments</p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input 
                          type="checkbox" 
                          id="paymentToggle" 
                          className="opacity-0 w-0 h-0"
                          checked={paymentReminders}
                          onChange={() => setPaymentReminders(!paymentReminders)} 
                        />
                        <label 
                          htmlFor="paymentToggle" 
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${paymentReminders ? 'bg-[#56e39f]' : 'bg-white/10'}`}
                        >
                          <span 
                            className={`absolute h-4 w-4 left-1 bottom-1 bg-white rounded-full transition-all duration-300 ${paymentReminders ? 'transform translate-x-6' : ''}`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <div>
                        <p className="text-white">Promotions & Updates</p>
                        <p className="text-sm text-gray-400">Marketing emails and special offers</p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input 
                          type="checkbox" 
                          id="promotionsToggle" 
                          className="opacity-0 w-0 h-0"
                          checked={promotions}
                          onChange={() => setPromotions(!promotions)} 
                        />
                        <label 
                          htmlFor="promotionsToggle" 
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${promotions ? 'bg-[#56e39f]' : 'bg-white/10'}`}
                        >
                          <span 
                            className={`absolute h-4 w-4 left-1 bottom-1 bg-white rounded-full transition-all duration-300 ${promotions ? 'transform translate-x-6' : ''}`}
                          ></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                  <Button variant="primary" size="md">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
            
            {/* Other tabs would be implemented similarly */}
            {activeTab !== 'account' && activeTab !== 'notifications' && (
              <div className="text-center py-8">
                <h3 className="text-xl font-bold text-white mb-2">{tabs.find(tab => tab.id === activeTab)?.label}</h3>
                <p className="text-gray-400">This section is under development</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
