import { memo, useState } from 'react';
import { HeartPulseIcon, ActivityIcon, AlertTriangleIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useBlock } from '@/hooks/use-block';

interface PatientDashboardProps {
  patient: {
    name: string;
    heartRate: number;
    activityLevel: string;
    alerts: string[];
  };
}

const PatientDashboard = ({ patient }: PatientDashboardProps) => {
  return (
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{patient.name}'s Dashboard</h2>
        <div className="flex items-center gap-3 mb-3">
          <HeartPulseIcon className="text-red-500" />
          <span className="text-lg">Heart Rate: {patient.heartRate} bpm</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <ActivityIcon className="text-blue-500" />
          <span className="text-lg">Activity Level: {patient.activityLevel}</span>
        </div>
        <div className="mb-3">
          <h3 className="text-lg font-medium mb-2">Alerts:</h3>
          {patient.alerts.length > 0 ? (
              patient.alerts.map((alert, index) => (
                  <div key={index} className="flex items-center gap-2 text-yellow-600">
                    <AlertTriangleIcon />
                    <span>{alert}</span>
                  </div>
              ))
          ) : (
              <span className="text-gray-500">No alerts</span>
          )}
        </div>
      </div>
  );
};

function DocumentTool({ patient }: { patient: PatientDashboardProps['patient'] }) {
  const { setBlock } = useBlock();
  const [showDashboard, setShowDashboard] = useState(false);

  return (
      <div>
        {!showDashboard ? (
            <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                onClick={() => {
                  toast.success('Loading patient dashboard...');
                  setShowDashboard(true);
                }}
            >
              View Patient Dashboard
            </button>
        ) : (
            <PatientDashboard patient={patient} />
        )}
      </div>
  );
}

export const PatientDashboardTool = memo(DocumentTool);
