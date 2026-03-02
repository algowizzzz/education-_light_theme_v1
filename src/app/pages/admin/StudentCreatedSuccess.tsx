import { useLocation } from 'react-router-dom';
import { SuccessScreen } from '@/app/components/SuccessScreen';

export default function StudentCreatedSuccess() {
  const location = useLocation();
  const { studentId, studentName } = location.state || {
    studentId: 'S-2026-XXXX',
    studentName: 'New Student',
  };

  return (
    <SuccessScreen
      title="Student Account Created Successfully"
      message={`${studentName} has been added to the system and is now active.`}
      details={[
        { label: 'Student ID', value: studentId },
        { label: 'Status', value: 'Active' },
      ]}
      primaryAction={{
        label: 'View Student Profile',
        to: `/admin/students/${studentId}`,
      }}
      secondaryAction={{
        label: 'Back to Student Management',
        to: '/admin/students',
      }}
    />
  );
}
