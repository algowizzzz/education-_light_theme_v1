import { useLocation } from 'react-router-dom';
import { SuccessScreen } from '@/app/components/SuccessScreen';

export default function TeacherCreatedSuccess() {
  const location = useLocation();
  const { teacherId, teacherName, email } = location.state || {
    teacherId: 'T-2026-XXXX',
    teacherName: 'New Teacher',
    email: 'teacher@lincolnelementary.edu',
  };

  const details = [
    { label: 'Email', value: email },
    { label: 'Status', value: 'Active' },
  ];

  return (
    <SuccessScreen
      title="Teacher Account Created Successfully"
      message={`${teacherName}'s account has been created and a welcome email has been sent.`}
      details={details}
      primaryAction={{
        label: 'View Teacher Account',
        to: `/admin/teachers/${teacherId}`,
      }}
      secondaryAction={{
        label: 'Back to Teacher Management',
        to: '/admin/teachers',
      }}
    />
  );
}