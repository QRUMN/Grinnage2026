import * as React from 'react';
import { 
  CreditCard, Download, PlusCircle, Clock, DollarSign,
  ChevronDown, ChevronRight, ArrowUpRight, ArrowDownRight, CheckCircle, Printer
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

interface Transaction {
  id: string;
  description: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  method: string;
  invoiceUrl?: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  name: string;
  last4: string;
  expiry?: string;
  isDefault: boolean;
}

const Payments: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'history' | 'methods'>('history');
  const [dateRange, setDateRange] = React.useState('all');
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = React.useState(false);
  
  // Mock data for transactions
  const transactions: Transaction[] = [
    {
      id: 'INV-2025-06-01',
      description: 'Quarterly Service Plan',
      date: new Date(2025, 5, 1),
      amount: 120.00,
      status: 'paid',
      method: 'Visa •••• 4242',
      invoiceUrl: '#'
    },
    {
      id: 'INV-2025-03-01',
      description: 'Quarterly Service Plan',
      date: new Date(2025, 2, 1),
      amount: 120.00,
      status: 'paid',
      method: 'Visa •••• 4242',
      invoiceUrl: '#'
    },
    {
      id: 'INV-2025-01-15',
      description: 'Emergency Treatment - Wasp Nest',
      date: new Date(2025, 0, 15),
      amount: 75.00,
      status: 'paid',
      method: 'Visa •••• 4242',
      invoiceUrl: '#'
    },
    {
      id: 'INV-2024-12-01',
      description: 'Quarterly Service Plan',
      date: new Date(2024, 11, 1),
      amount: 120.00,
      status: 'paid',
      method: 'Bank Account •••• 5678',
      invoiceUrl: '#'
    },
    {
      id: 'INV-2024-09-01',
      description: 'Quarterly Service Plan',
      date: new Date(2024, 8, 1),
      amount: 120.00,
      status: 'paid',
      method: 'Bank Account •••• 5678',
      invoiceUrl: '#'
    }
  ];
  
  // Mock data for payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'pm_1',
      type: 'card',
      name: 'Visa Credit Card',
      last4: '4242',
      expiry: '06/26',
      isDefault: true
    },
    {
      id: 'pm_2',
      type: 'bank',
      name: 'Chase Checking Account',
      last4: '5678',
      isDefault: false
    }
  ];
  
  // Upcoming payment (next in the sequence)
  const upcomingPayment = {
    description: 'Quarterly Service Plan',
    date: new Date(2025, 8, 1),
    amount: 120.00
  };
  
  // Format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Get status color
  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'paid': return 'bg-green-500/10 text-green-500';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500';
      case 'failed': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };
  
  // Filter transactions based on date range
  const filteredTransactions = transactions.filter(transaction => {
    if (dateRange === 'all') return true;
    
    const now = new Date();
    const transactionDate = transaction.date;
    
    if (dateRange === '30days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      return transactionDate >= thirtyDaysAgo;
    }
    
    if (dateRange === '6months') {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      return transactionDate >= sixMonthsAgo;
    }
    
    if (dateRange === '1year') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      return transactionDate >= oneYearAgo;
    }
    
    return true;
  });
  
  // Calculate totals
  const totalPaid = filteredTransactions
    .filter(t => t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Payments</h2>
          <p className="text-gray-400 mt-1">Manage your payment information and history</p>
        </div>
        <div>
          <Button 
            variant="primary" 
            size="md"
            onClick={() => setIsAddPaymentModalOpen(true)}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>
      
      {/* Upcoming Payment Alert */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Upcoming Payment</h3>
              <p className="text-gray-300">
                {upcomingPayment.description} • {formatCurrency(upcomingPayment.amount)} • Due on {formatDate(upcomingPayment.date)}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
              <CreditCard className="w-4 h-4 mr-2" />
              Update Payment
            </Button>
            <Button variant="primary" size="sm">
              <DollarSign className="w-4 h-4 mr-2" />
              Pay Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Paid (This Period)</p>
              <h3 className="text-2xl font-bold text-white mt-1">{formatCurrency(totalPaid)}</h3>
            </div>
            <div className="p-2 bg-green-500/20 rounded-full">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs text-green-400 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              All payments successful
            </span>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-400">Active Service Plan</p>
              <h3 className="text-2xl font-bold text-white mt-1">Quarterly</h3>
            </div>
            <div className="p-2 bg-[#56e39f]/20 rounded-full">
              <CheckCircle className="h-5 w-5 text-[#56e39f]" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs text-[#56e39f] flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              Auto-renews on {formatDate(upcomingPayment.date)}
            </span>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-400">Default Payment Method</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {paymentMethods.find(pm => pm.isDefault)?.name || 'None'}
              </h3>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-full">
              <CreditCard className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs text-gray-400">
              Ending in {paymentMethods.find(pm => pm.isDefault)?.last4 || ''}
            </span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-white/10">
        <div className="flex space-x-6">
          <button
            className={`py-2 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'history'
                ? 'border-[#56e39f] text-[#56e39f]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('history')}
          >
            Payment History
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'methods'
                ? 'border-[#56e39f] text-[#56e39f]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('methods')}
          >
            Payment Methods
          </button>
        </div>
      </div>
      
      {activeTab === 'history' && (
        <div>
          {/* Filter Controls */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Transaction History</h3>
            <div className="flex items-center">
              <select
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#56e39f]/50"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="all" className="bg-[#111827]">All Time</option>
                <option value="30days" className="bg-[#111827]">Last 30 Days</option>
                <option value="6months" className="bg-[#111827]">Last 6 Months</option>
                <option value="1year" className="bg-[#111827]">Last Year</option>
              </select>
            </div>
          </div>
          
          {/* Transactions Table */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Description</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Method</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 px-4 text-white">{transaction.description}</td>
                      <td className="py-3 px-4 text-gray-300">{formatDate(transaction.date)}</td>
                      <td className="py-3 px-4 text-white">{formatCurrency(transaction.amount)}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{transaction.method}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" className="text-[#56e39f] hover:bg-[#56e39f]/10 p-1 h-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-[#56e39f] hover:bg-[#56e39f]/10 p-1 h-8">
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No transactions found for the selected time period.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'methods' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Your Payment Methods</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/10 text-white hover:bg-white/5"
              onClick={() => setIsAddPaymentModalOpen(true)}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${method.type === 'card' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-semibold text-white">{method.name}</h4>
                        {method.isDefault && (
                          <Badge className="ml-2 bg-[#56e39f]/10 text-[#56e39f]">Default</Badge>
                        )}
                      </div>
                      <p className="text-gray-400 mt-1">
                        {method.type === 'card' 
                          ? `•••• •••• •••• ${method.last4} ${method.expiry ? `• Expires ${method.expiry}` : ''}`
                          : `•••• •••• •••• ${method.last4}`
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!method.isDefault && (
                      <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                        Set as Default
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10 p-1 h-8">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {paymentMethods.length === 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-medium text-white mb-2">No payment methods</h4>
                <p className="text-gray-400 mb-4">
                  You haven't added any payment methods yet.
                </p>
                <Button 
                  variant="primary" 
                  size="md"
                  onClick={() => setIsAddPaymentModalOpen(true)}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Add Payment Method Modal */}
      {isAddPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a2234] border border-white/10 rounded-xl w-full max-w-md max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-[#1a2234] z-10 p-5 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Add Payment Method</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white p-1 h-auto"
                onClick={() => setIsAddPaymentModalOpen(false)}
              >
                ✕
              </Button>
            </div>
            
            <div className="p-5">
              <div className="flex space-x-4 mb-6">
                <button className="flex-1 flex flex-col items-center p-4 bg-white/5 border border-[#56e39f]/30 rounded-lg">
                  <CreditCard className="h-6 w-6 text-[#56e39f] mb-2" />
                  <span className="text-white font-medium">Credit Card</span>
                </button>
                <button className="flex-1 flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-lg hover:border-[#56e39f]/30">
                  <DollarSign className="h-6 w-6 text-gray-400 mb-2" />
                  <span className="text-white font-medium">Bank Account</span>
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Card Number</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Expiration Date</label>
                    <input 
                      type="text" 
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Security Code</label>
                    <input 
                      type="text" 
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
                      placeholder="CVC"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Cardholder Name</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
                    placeholder="Name as it appears on card"
                  />
                </div>
                
                <div className="flex items-center mt-4">
                  <input 
                    type="checkbox" 
                    id="makeDefault" 
                    className="rounded border-white/30 bg-white/5 text-[#56e39f] focus:ring-[#56e39f]"
                  />
                  <label htmlFor="makeDefault" className="ml-2 text-white">
                    Make this my default payment method
                  </label>
                </div>
              </form>
              
              <div className="flex justify-end mt-6 pt-4 border-t border-white/10">
                <Button 
                  variant="outline" 
                  size="md" 
                  className="border-white/10 text-white hover:bg-white/5 mr-3"
                  onClick={() => setIsAddPaymentModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="md">
                  Save Payment Method
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
