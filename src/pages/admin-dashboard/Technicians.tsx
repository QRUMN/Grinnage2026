import * as React from 'react';
import { Mail, Phone, Award, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

const Technicians: React.FC = () => {
  // Keith's profile data
  const technicianProfile = {
    id: 1,
    name: 'Keith Grinnage',
    email: 'keith@grinnage.com',
    phone: '(555) 123-4567',
    position: 'Lead Technician & Owner',
    specialty: ['Pest Control', 'Termite Treatment', 'Mosquito Control'],
    status: 'active',
    joinDate: new Date(2020, 0, 15),
    completedJobs: 568,
    rating: 4.9,
    certifications: ['Licensed Pest Control Operator', 'Termite Specialist', 'EPA Certified'],
    serviceAreas: ['San Francisco', 'Oakland', 'Berkeley', 'San Jose', 'Sunnyvale'],
    bio: 'Keith Grinnage has over 15 years of experience in pest control and management. As the founder of GRINNAGE Pest Solutions, he personally oversees all operations to ensure the highest quality of service.'
  };

  return (
    <div className="w-full space-y-4 md:space-y-6 pb-6">
      {/* Header card with basic info */}
      <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-4 md:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <div className="h-16 w-16 md:h-20 md:w-20 bg-gray-700 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-medium">
              {technicianProfile.name.split(' ').map(name => name[0]).join('')}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-white">{technicianProfile.name}</h2>
              <p className="text-[#56e39f] text-sm md:text-base">{technicianProfile.position}</p>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`h-4 w-4 md:h-5 md:w-5 ${i < Math.floor(technicianProfile.rating) ? 'text-yellow-400' : 'text-gray-600'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-200 text-sm font-medium">{technicianProfile.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          
          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {technicianProfile.specialty.map((spec, idx) => (
              <Badge 
                key={idx} 
                className="bg-[#56e39f]/10 text-[#56e39f] border-[#56e39f]/20 text-xs py-1"
              >
                {spec}
              </Badge>
            ))}
          </div>
          
          {/* Contact details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
              <span className="text-gray-200 text-sm truncate">{technicianProfile.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
              <span className="text-gray-200 text-sm">{technicianProfile.phone}</span>
            </div>
          </div>
          
          {/* Jobs counter */}
          <div className="flex items-center mt-1">
            <Award className="h-4 w-4 text-[#56e39f] mr-2 flex-shrink-0" />
            <span className="text-gray-300 text-sm">{technicianProfile.completedJobs} jobs completed</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-4 md:p-6">
        <h3 className="text-base md:text-lg font-medium text-white mb-2 md:mb-4">About</h3>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">{technicianProfile.bio}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Certifications */}
        <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-4 md:p-6">
          <h3 className="text-base md:text-lg font-medium text-white mb-2 md:mb-4">Certifications</h3>
          <ul className="space-y-2 md:space-y-3">
            {technicianProfile.certifications.map((cert, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#56e39f] mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm md:text-base">{cert}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-4 md:p-6">
          <h3 className="text-base md:text-lg font-medium text-white mb-2 md:mb-4">Service Areas</h3>
          <div className="flex flex-wrap gap-2">
            {technicianProfile.serviceAreas.map((area, idx) => (
              <div key={idx} className="flex items-center bg-gray-700/50 rounded-lg px-2 py-1.5 md:px-3 md:py-2">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 text-[#56e39f] mr-1.5 md:mr-2 flex-shrink-0" />
                <span className="text-gray-300 text-xs md:text-sm">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule button - this would normally link to scheduling system */}
      <div className="flex justify-center mt-4 md:mt-6">
        <Button className="bg-[#56e39f] hover:bg-[#3ec787] text-gray-900 font-medium w-full sm:w-auto py-2 h-auto">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule with Keith
        </Button>
      </div>
    </div>
  );
};

export default Technicians;
