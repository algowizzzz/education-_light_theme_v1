import { useLocation } from 'react-router-dom';
import { SuccessScreen } from '@/app/components/SuccessScreen';

export default function ExpertCreatedSuccess() {
  const location = useLocation();
  const { expertId, expertName, email } = location.state || {
    expertId: 'BE-2026-XXXX',
    expertName: 'New Expert',
    email: 'expert@lincolnelementary.edu',
  };

  return (
    <SuccessScreen
      title="Behavioral Expert Account Created Successfully"
      message={`${expertName}'s account has been created and a welcome email has been sent.`}
      details={[
        { label: 'Expert ID', value: expertId },
        { label: 'Email', value: email },
        { label: 'Status', value: 'Active' },
        { label: 'Current Caseload', value: '0 students' },
      ]}
      primaryAction={{
        label: 'View Expert Account',
        to: `/admin/experts/${expertId}`,
      }}
      secondaryAction={{
        label: 'Back to Expert Management',
        to: '/admin/experts',
      }}
    />
  );
}
