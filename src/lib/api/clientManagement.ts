import { supabase } from '../supabase';

export interface ClientData {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    preferredContact: 'email' | 'phone' | 'text';
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    propertyType: 'residential' | 'commercial';
    propertySize: string;
    accessInstructions?: string;
  };
  businessInfo: {
    status: 'active' | 'inactive' | 'pending' | 'suspended';
    clientType: 'residential' | 'commercial';
    joinDate: string;
    source: 'referral' | 'website' | 'advertising' | 'repeat' | 'other';
    lifetime_value: number;
    risk_level: 'low' | 'medium' | 'high';
  };
  subscription: {
    isActive: boolean;
    plan: string;
    frequency: 'monthly' | 'quarterly' | 'annual' | 'one-time';
    nextService: string;
    lastService?: string;
    autoRenewal: boolean;
    monthlyValue: number;
  };
  serviceHistory: any[];
  notes: any[];
  documents: any[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export const clientManagementApi = {
  // Fetch all clients with their related data
  getAllClients: async (): Promise<ClientData[]> => {
    try {
      // Fetch users with client roles and their related data
      const { data: clientUsers, error: clientError } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role,
          auth_users:user_id (
            id,
            email,
            created_at
          )
        `)
        .in('role', ['residential', 'commercial']);

      if (clientError) throw clientError;

      // Fetch profiles data
      const userIds = clientUsers?.map(cu => cu.user_id) || [];
      
      const [profilesResult, addressesResult, clientsResult, statusResult] = await Promise.all([
        // Profiles
        supabase
          .from('profiles')
          .select('*')
          .in('id', userIds),
        
        // Addresses
        supabase
          .from('addresses')
          .select('*')
          .in('user_id', userIds),
        
        // Clients table
        supabase
          .from('clients')
          .select('*')
          .in('user_id', userIds),
          
        // User status
        supabase
          .from('user_status')
          .select('*')
          .in('user_id', userIds)
      ]);

      if (profilesResult.error) throw profilesResult.error;
      if (addressesResult.error) throw addressesResult.error;

      // Map the data to our ClientData structure
      const clients: ClientData[] = clientUsers?.map(clientUser => {
        const profile = profilesResult.data?.find(p => p.id === clientUser.user_id);
        const address = addressesResult.data?.find(a => a.user_id === clientUser.user_id);
        const clientRecord = clientsResult.data?.find(c => c.user_id === clientUser.user_id);
        const userStatus = statusResult.data?.find(s => s.user_id === clientUser.user_id);
        const authUser = clientUser.auth_users as any;

        // Parse full name
        const nameParts = (profile?.full_name || '').split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        return {
          id: clientUser.user_id,
          personalInfo: {
            firstName,
            lastName,
            email: authUser?.email || '',
            phone: profile?.phone || '',
            preferredContact: 'email' as const
          },
          address: {
            street: address?.street_address || clientRecord?.address || '',
            city: address?.city || clientRecord?.city || '',
            state: address?.state || clientRecord?.state || '',
            zipCode: address?.zip_code || clientRecord?.zip_code || '',
            propertyType: (clientUser.role === 'commercial' ? 'commercial' : 'residential') as const,
            propertySize: clientRecord?.property_size || 'Unknown'
          },
          businessInfo: {
            status: (userStatus?.status || 'pending') as any,
            clientType: clientUser.role as any,
            joinDate: authUser?.created_at || new Date().toISOString(),
            source: 'website' as const,
            lifetime_value: 0, // Would need to calculate from payments
            risk_level: 'low' as const
          },
          subscription: {
            isActive: false,
            plan: 'No active plan',
            frequency: 'one-time' as const,
            nextService: '',
            autoRenewal: false,
            monthlyValue: 0
          },
          serviceHistory: [],
          notes: [],
          documents: []
        };
      }) || [];

      return clients;
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  },

  // Add a new client
  addClient: async (clientData: Partial<ClientData>) => {
    // Implementation for adding a new client
    // This would involve creating auth user, profile, address, etc.
  },

  // Update client
  updateClient: async (clientId: string, updates: Partial<ClientData>) => {
    // Implementation for updating client data
  }
};
