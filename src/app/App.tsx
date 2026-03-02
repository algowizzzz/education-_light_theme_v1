import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { RouteLogger } from '@/app/components/RouteLogger';

// Phase 0: Portal Selector
import PortalSelector from '@/app/pages/PortalSelector';

// Phase 1: Teacher Interface
import TeacherLogin from '@/app/pages/teacher/TeacherLogin';
import TeacherForgotPassword from '@/app/pages/teacher/TeacherForgotPassword';
import TeacherDashboard from '@/app/pages/teacher/TeacherDashboard';
import TeacherStudents from '@/app/pages/teacher/TeacherStudents';
import StudentProfile from '@/app/pages/teacher/StudentProfile';
import NewIncident from '@/app/pages/teacher/NewIncident';
import NewIncidentStep1 from '@/app/pages/teacher/NewIncidentStep1';
import NewIncidentStep2AI from '@/app/pages/teacher/NewIncidentStep2AI';
import NewIncidentStep3Details from '@/app/pages/teacher/NewIncidentStep3Details';
import NewIncidentStep4Triggers from '@/app/pages/teacher/NewIncidentStep4Triggers';
import NewIncidentStep5Outcome from '@/app/pages/teacher/NewIncidentStep5Outcome';
import IncidentConfirmation from '@/app/pages/teacher/IncidentConfirmation';
import MyIncidents from '@/app/pages/teacher/MyIncidents';
import IncidentDetail from '@/app/pages/teacher/IncidentDetail';
import AISupport from '@/app/pages/teacher/AISupport';
import EscalationForm from '@/app/pages/teacher/EscalationForm';
import EscalationConfirmation from '@/app/pages/teacher/EscalationConfirmation';
import EscalationDetail from '@/app/pages/teacher/EscalationDetail';
import EscalationsList from '@/app/pages/teacher/EscalationsList';
import Notifications from '@/app/pages/teacher/Notifications';
import AccountSettings from '@/app/pages/teacher/AccountSettings';
import TeacherResources from '@/app/pages/teacher/Resources';

// Phase 2: Behavioral Expert Interface
import ExpertLogin from '@/app/pages/expert/ExpertLogin';
import ExpertForgotPassword from '@/app/pages/expert/ExpertForgotPassword';
import ExpertDashboard from '@/app/pages/expert/ExpertDashboard';
import ExpertStudentsList from '@/app/pages/expert/ExpertStudentsList';
import ExpertStudentProfile from '@/app/pages/expert/ExpertStudentProfile';
import CasesList from '@/app/pages/expert/CasesList';
import CaseReview from '@/app/pages/expert/CaseReview';
import CaseAssessment from '@/app/pages/expert/CaseAssessment';
import AssessmentConfirmation from '@/app/pages/expert/AssessmentConfirmation';
import AIAnalysis from '@/app/pages/expert/AIAnalysis';
import ExpertNotifications from '@/app/pages/expert/ExpertNotifications';
import ExpertAccountSettings from '@/app/pages/expert/ExpertAccountSettings';
import AIInsights from '@/app/pages/expert/AIInsights';
import Resources from '@/app/pages/expert/Resources';

// Phase 2E: Expert Profile Update Flow
import { EditStudentProfile } from '@/app/pages/expert/EditStudentProfile';

// Phase 2H: Expert Case Management
import CaseManagement from '@/app/pages/expert/CaseManagement';

// Phase 3: Parent Portal
import ParentLogin from '@/app/pages/parent/ParentLogin';
import ParentForgotPassword from '@/app/pages/parent/ParentForgotPassword';
import ParentDashboard from '@/app/pages/parent/ParentDashboard';
import ChildProfile from '@/app/pages/parent/ChildProfile';
import ChildProfileNew from '@/app/pages/parent/ChildProfileNew';
import ChildIncidentsList from '@/app/pages/parent/ChildIncidentsList';
import ChildIncidentDetail from '@/app/pages/parent/ChildIncidentDetail';
import ChildCasesList from '@/app/pages/parent/ChildCasesList';
import ChildCaseDetail from '@/app/pages/parent/ChildCaseDetail';
import ParentIncidentDetail from '@/app/pages/parent/IncidentDetail';
import ParentNotifications from '@/app/pages/parent/Notifications';
import ParentAccountSettings from '@/app/pages/parent/AccountSettings';
import ChildrenList from '@/app/pages/parent/ChildrenList';
import IncidentHistory from '@/app/pages/parent/IncidentHistory';
import { NoIncidentsState } from '@/app/pages/parent/NoIncidentsState';
import { NoExpertAssigned } from '@/app/pages/parent/NoExpertAssigned';
import { IncidentWithExpertNotes } from '@/app/pages/parent/IncidentWithExpertNotes';

// Phase 4: School Admin
import AdminLogin from '@/app/pages/admin/AdminLogin';
import AdminForgotPassword from '@/app/pages/admin/AdminForgotPassword';
import AdminDashboard from '@/app/pages/admin/AdminDashboard';
import StudentManagement from '@/app/pages/admin/StudentManagement';
import TeacherManagement from '@/app/pages/admin/TeacherManagement';
import AddTeacher from '@/app/pages/admin/AddTeacher';
import EditTeacher from '@/app/pages/admin/EditTeacher';
import ExpertManagement from '@/app/pages/admin/ExpertManagement';
import AddExpert from '@/app/pages/admin/AddExpert';
import EditExpert from '@/app/pages/admin/EditExpert';
import ParentManagement from '@/app/pages/admin/ParentManagement';
import AddParent from '@/app/pages/admin/AddParent';
import EditParent from '@/app/pages/admin/EditParent';
import AddStudent from '@/app/pages/admin/AddStudent';
import EditStudent from '@/app/pages/admin/EditStudent';
import ViewStudent from '@/app/pages/admin/ViewStudent';
// Removed: SystemSettings, Reports, AuditLogs - these exceed proposal scope
// Proposal states: "This interface does not control system rules, permissions, reports, or analytics."

// Phase 4G: Admin System Maintenance
import { ActiveUsers } from '@/app/pages/admin/ActiveUsers';
import { AdminAccountSettings } from '@/app/pages/admin/AdminAccountSettings';

// Phase 4: Additional Admin CRUD Screens
import AssignStudentsToTeacher from '@/app/pages/admin/AssignStudentsToTeacher';
import ViewTeacherAccount from '@/app/pages/admin/ViewTeacherAccount';
import ViewExpertCaseload from '@/app/pages/admin/ViewExpertCaseload';
import ViewExpertAccount from '@/app/pages/admin/ViewExpertAccount';
import LinkParentToStudent from '@/app/pages/admin/LinkParentToStudent';
import ViewParentAccount from '@/app/pages/admin/ViewParentAccount';
import AssignStudentToTeacher from '@/app/pages/admin/AssignStudentToTeacher';
import AssignStudentToExpert from '@/app/pages/admin/AssignStudentToExpert';
import AssignParentToStudent from '@/app/pages/admin/AssignParentToStudent';
import AssignmentSummary from '@/app/pages/admin/AssignmentSummary';

// Bulk Operations
import BulkImportStudents from '@/app/pages/admin/BulkImportStudents';
import BulkImportTeachers from '@/app/pages/admin/BulkImportTeachers';
import BulkAssignStudentsToTeacher from '@/app/pages/admin/BulkAssignStudentsToTeacher';
import BulkAssignStudentsToExpert from '@/app/pages/admin/BulkAssignStudentsToExpert';
import BulkLinkParentsToStudents from '@/app/pages/admin/BulkLinkParentsToStudents';

// Success Screens
import StudentCreatedSuccess from '@/app/pages/admin/StudentCreatedSuccess';
import TeacherCreatedSuccess from '@/app/pages/admin/TeacherCreatedSuccess';
import ParentCreatedSuccess from '@/app/pages/admin/ParentCreatedSuccess';
import ExpertCreatedSuccess from '@/app/pages/admin/ExpertCreatedSuccess';

export default function App() {
  return (
    <BrowserRouter>
      <RouteLogger />
      <div className="min-h-screen">
        <Routes>
          {/* Phase 0: Portal Selector */}
          <Route path="/" element={<PortalSelector />} />

          {/* Phase 1: Teacher Interface */}
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacher/forgot-password" element={<TeacherForgotPassword />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/students" element={<TeacherStudents />} />
          <Route path="/teacher/students/:id" element={<StudentProfile />} />
          <Route path="/teacher/students/:id/ai-support" element={<AISupport />} />
          <Route path="/teacher/incidents/new" element={<NewIncident />} />
          <Route path="/teacher/incidents/new/step1" element={<NewIncidentStep1 />} />
          <Route path="/teacher/incidents/new/step2" element={<NewIncidentStep2AI />} />
          <Route path="/teacher/incidents/new/step3" element={<NewIncidentStep3Details />} />
          <Route path="/teacher/incidents/new/step4" element={<NewIncidentStep4Triggers />} />
          <Route path="/teacher/incidents/new/step5" element={<NewIncidentStep5Outcome />} />
          <Route path="/teacher/incidents/new/confirmation" element={<IncidentConfirmation />} />
          <Route path="/teacher/incidents" element={<MyIncidents />} />
          <Route path="/teacher/incidents/:id" element={<IncidentDetail />} />
          <Route path="/teacher/incidents/:incidentId/escalate" element={<EscalationForm />} />
          <Route path="/teacher/escalations" element={<EscalationsList />} />
          <Route path="/teacher/escalations/:id" element={<EscalationDetail />} />
          <Route path="/teacher/escalations/:id/confirmation" element={<EscalationConfirmation />} />
          <Route path="/teacher/notifications" element={<Notifications />} />
          <Route path="/teacher/account" element={<AccountSettings />} />
          <Route path="/teacher/resources" element={<TeacherResources />} />

          {/* Phase 2: Behavioral Expert Interface */}
          <Route path="/expert/login" element={<ExpertLogin />} />
          <Route path="/expert/forgot-password" element={<ExpertForgotPassword />} />
          <Route path="/expert/dashboard" element={<ExpertDashboard />} />
          <Route path="/expert/students" element={<ExpertStudentsList />} />
          <Route path="/expert/students/:id" element={<ExpertStudentProfile />} />
          <Route path="/expert/students/:id/ai-analysis" element={<AIAnalysis />} />
          <Route path="/expert/cases" element={<CasesList />} />
          <Route path="/expert/cases/:id" element={<CaseReview />} />
          <Route path="/expert/cases/:id/assess" element={<CaseAssessment />} />
          <Route path="/expert/cases/confirmation" element={<AssessmentConfirmation />} />
          <Route path="/expert/notifications" element={<ExpertNotifications />} />
          <Route path="/expert/account" element={<ExpertAccountSettings />} />
          <Route path="/expert/ai-insights" element={<AIInsights />} />
          <Route path="/expert/resources" element={<Resources />} />

          {/* Phase 2E: Expert Profile Update Flow */}
          <Route path="/expert/edit-student-profile/:id" element={<EditStudentProfile />} />

          {/* Phase 2H: Expert Case Management */}
          <Route path="/expert/case-management" element={<CaseManagement />} />

          {/* Phase 3: Parent Portal */}
          <Route path="/parent/login" element={<ParentLogin />} />
          <Route path="/parent/forgot-password" element={<ParentForgotPassword />} />
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/parent/children/:id" element={<ChildProfileNew />} />
          <Route path="/parent/children/:id/incidents" element={<ChildIncidentsList />} />
          <Route path="/parent/children/:id/incidents/:incidentId" element={<ChildIncidentDetail />} />
          <Route path="/parent/children/:id/cases" element={<ChildCasesList />} />
          <Route path="/parent/children/:id/cases/:caseId" element={<ChildCaseDetail />} />
          <Route path="/parent/notifications" element={<ParentNotifications />} />
          <Route path="/parent/account" element={<ParentAccountSettings />} />
          <Route path="/parent/children" element={<ChildrenList />} />
          <Route path="/parent/incident-history" element={<IncidentHistory />} />
          <Route path="/parent/no-incidents" element={<NoIncidentsState />} />
          <Route path="/parent/no-expert-assigned" element={<NoExpertAssigned />} />
          <Route path="/parent/incident-with-expert-notes/:id" element={<IncidentWithExpertNotes />} />

          {/* Phase 4: School Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<StudentManagement />} />
          <Route path="/admin/teachers" element={<TeacherManagement />} />
          <Route path="/admin/teachers/new" element={<AddTeacher />} />
          <Route path="/admin/teachers/edit/:id" element={<EditTeacher />} />
          <Route path="/admin/experts" element={<ExpertManagement />} />
          <Route path="/admin/experts/new" element={<AddExpert />} />
          <Route path="/admin/parents" element={<ParentManagement />} />
          <Route path="/admin/parents/new" element={<AddParent />} />
          <Route path="/admin/students/new" element={<AddStudent />} />
          <Route path="/admin/students/edit/:id" element={<EditStudent />} />
          {/* Removed: /admin/settings, /admin/reports, /admin/audit-logs - exceed proposal scope */}
          <Route path="/admin/view-student/:id" element={<ViewStudent />} />
          <Route path="/admin/students/:id/assign-teacher" element={<AssignStudentToTeacher />} />
          <Route path="/admin/students/:id/assign-expert" element={<AssignStudentToExpert />} />
          <Route path="/admin/students/:id/assign-parent" element={<AssignParentToStudent />} />
          <Route path="/admin/assignments" element={<AssignmentSummary />} />

          {/* Bulk Operations */}
          <Route path="/admin/students/bulk-import" element={<BulkImportStudents />} />
          <Route path="/admin/teachers/bulk-import" element={<BulkImportTeachers />} />
          <Route path="/admin/students/bulk-assign-teacher" element={<BulkAssignStudentsToTeacher />} />
          <Route path="/admin/students/bulk-assign-expert" element={<BulkAssignStudentsToExpert />} />
          <Route path="/admin/parents/bulk-link" element={<BulkLinkParentsToStudents />} />

          <Route path="/admin/edit-expert/:id" element={<EditExpert />} />
          <Route path="/admin/edit-parent/:id" element={<EditParent />} />

          {/* Phase 4G: Admin System Maintenance */}
          <Route path="/admin/active-users" element={<ActiveUsers />} />
          <Route path="/admin/account" element={<AdminAccountSettings />} />

          {/* Phase 4: Additional Admin CRUD Screens */}
          <Route path="/admin/teachers/:id/students" element={<AssignStudentsToTeacher />} />
          <Route path="/admin/teachers/:id/view" element={<ViewTeacherAccount />} />
          <Route path="/admin/experts/:id/caseload" element={<ViewExpertCaseload />} />
          <Route path="/admin/experts/:id/view" element={<ViewExpertAccount />} />
          <Route path="/admin/parents/:id/link" element={<LinkParentToStudent />} />
          <Route path="/admin/parents/:id/view" element={<ViewParentAccount />} />

          {/* Success Screens */}
          <Route path="/admin/students/success" element={<StudentCreatedSuccess />} />
          <Route path="/admin/teachers/success" element={<TeacherCreatedSuccess />} />
          <Route path="/admin/parents/success" element={<ParentCreatedSuccess />} />
          <Route path="/admin/experts/success" element={<ExpertCreatedSuccess />} />

          {/* Redirect unknown routes to portal selector */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}