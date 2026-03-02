import { useLocation } from 'react-router-dom';
import { SuccessScreen } from '@/app/components/SuccessScreen';

export default function ParentCreatedSuccess() {
  const location = useLocation();
  const { parentId, parentName, email, activationCode } = location.state || {
    parentId: 'P-2026-XXXX',
    parentName: 'New Parent',
    email: 'parent@example.com',
    activationCode: 'XXXX-XXXX-XXXX',
  };

  return (
    <SuccessScreen
      title="Parent Account Created Successfully"
      message={`${parentName}'s account has been created. An activation email has been sent.`}
      details={[
        { label: 'Parent ID', value: parentId },
        { label: 'Email', value: email },
        { label: 'Activation Code', value: activationCode },
        { label: 'Status', value: 'Pending Activation' },
      ]}
      primaryAction={{
        label: 'View Parent Account',
        to: `/admin/parents/${parentId}`,
      }}
      secondaryAction={{
        label: 'Back to Parent Management',
        to: '/admin/parents',
      }}
    />
  );
}
