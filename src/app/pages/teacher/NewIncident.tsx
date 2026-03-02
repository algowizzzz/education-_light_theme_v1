import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewIncident() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to step 1 when this route is accessed
    navigate('/teacher/incidents/new/step1', { replace: true });
  }, [navigate]);

  return null;
}
