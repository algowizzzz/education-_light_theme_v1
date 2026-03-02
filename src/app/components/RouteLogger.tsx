import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Map of routes to human-readable screen names
const routeNames: Record<string, string> = {
  '/': 'Portal Selector',
  
  // Teacher Portal
  '/teacher/login': 'Teacher Login',
  '/teacher/forgot-password': 'Teacher Forgot Password',
  '/teacher/dashboard': 'Teacher Dashboard',
  '/teacher/students': 'Teacher Students List',
  '/teacher/incidents/new': 'New Incident',
  '/teacher/incidents/new/step1': 'New Incident - Step 1',
  '/teacher/incidents/new/step2': 'New Incident - Step 2',
  '/teacher/incidents/new/step3': 'New Incident - Step 3',
  '/teacher/incidents/new/step4': 'New Incident - Step 4',
  '/teacher/incidents/new/confirmation': 'Incident Confirmation',
  '/teacher/incidents': 'My Incidents',
  '/teacher/escalations': 'Escalations List',
  '/teacher/notifications': 'Teacher Notifications',
  '/teacher/account': 'Teacher Account Settings',
  '/teacher/resources': 'Teacher Resources',
  
  // Expert Portal
  '/expert/login': 'Expert Login',
  '/expert/forgot-password': 'Expert Forgot Password',
  '/expert/dashboard': 'Expert Dashboard',
  '/expert/students': 'Expert Students List',
  '/expert/cases': 'Cases List',
  '/expert/notifications': 'Expert Notifications',
  '/expert/account': 'Expert Account Settings',
  '/expert/ai-insights': 'AI Insights',
  '/expert/resources': 'Expert Resources',
  '/expert/case-management': 'Case Management',
  
  // Parent Portal
  '/parent/login': 'Parent Login',
  '/parent/forgot-password': 'Parent Forgot Password',
  '/parent/dashboard': 'Parent Dashboard',
  '/parent/children': 'Children List',
  '/parent/notifications': 'Parent Notifications',
  '/parent/account': 'Parent Account Settings',
  '/parent/messages': 'Parent Messages',
  '/parent/incident-history': 'Incident History',
  '/parent/no-incidents': 'No Incidents State',
  '/parent/no-expert-assigned': 'No Expert Assigned',
  
  // Admin Portal
  '/admin/login': 'Admin Login',
  '/admin/forgot-password': 'Admin Forgot Password',
  '/admin/dashboard': 'Admin Dashboard',
  '/admin/students': 'Student Management',
  '/admin/teachers': 'Teacher Management',
  '/admin/teachers/new': 'Add Teacher',
  '/admin/experts': 'Expert Management',
  '/admin/experts/new': 'Add Expert',
  '/admin/parents': 'Parent Management',
  '/admin/parents/new': 'Add Parent',
  '/admin/students/new': 'Add Student',
  '/admin/settings': 'System Settings',
  '/admin/reports': 'Reports',
  '/admin/audit-logs': 'Audit Logs',
  '/admin/active-users': 'Active Users',
  '/admin/account': 'Admin Account Settings',
  '/admin/students/success': 'Student Created Success',
  '/admin/teachers/success': 'Teacher Created Success',
  '/admin/parents/success': 'Parent Created Success',
  '/admin/experts/success': 'Expert Created Success',
};

export function RouteLogger() {
  const location = useLocation();

  useEffect(() => {
    // Get the base path without params
    const basePath = location.pathname;
    
    // Try to find exact match first
    let screenName = routeNames[basePath];
    
    // If no exact match, try to match patterns
    if (!screenName) {
      if (basePath.match(/^\/teacher\/students\/[\w-]+$/)) {
        screenName = 'Student Profile (Teacher)';
      } else if (basePath.match(/^\/teacher\/students\/[\w-]+\/ai-support$/)) {
        screenName = 'AI Support';
      } else if (basePath.match(/^\/teacher\/incidents\/[\w-]+$/)) {
        screenName = 'Incident Detail (Teacher)';
      } else if (basePath.match(/^\/teacher\/incidents\/[\w-]+\/escalate$/)) {
        screenName = 'Escalation Form';
      } else if (basePath.match(/^\/teacher\/escalations\/[\w-]+$/)) {
        screenName = 'Escalation Detail';
      } else if (basePath.match(/^\/teacher\/escalations\/[\w-]+\/confirmation$/)) {
        screenName = 'Escalation Confirmation';
      } else if (basePath.match(/^\/expert\/students\/[\w-]+$/)) {
        screenName = 'Expert Student Profile';
      } else if (basePath.match(/^\/expert\/students\/[\w-]+\/ai-analysis$/)) {
        screenName = 'AI Analysis';
      } else if (basePath.match(/^\/expert\/edit-student-profile\/[\w-]+$/)) {
        screenName = 'Edit Student Profile';
      } else if (basePath.match(/^\/expert\/cases\/[\w-]+$/)) {
        screenName = 'Case Review';
      } else if (basePath.match(/^\/expert\/cases\/[\w-]+\/assess$/)) {
        screenName = 'Case Assessment';
      } else if (basePath.match(/^\/expert\/cases\/confirmation$/)) {
        screenName = 'Assessment Confirmation';
      } else if (basePath.match(/^\/expert\/messages\/[\w-]+$/)) {
        screenName = 'Message Conversation (Expert)';
      } else if (basePath.match(/^\/parent\/children\/[\w-]+$/)) {
        screenName = 'Child Profile';
      } else if (basePath.match(/^\/parent\/children\/[\w-]+\/incidents\/[\w-]+$/)) {
        screenName = 'Incident Detail (Parent)';
      } else if (basePath.match(/^\/parent\/messages\/[\w-]+$/)) {
        screenName = 'Message Conversation (Parent)';
      } else if (basePath.match(/^\/parent\/incident-with-expert-notes\/[\w-]+$/)) {
        screenName = 'Incident With Expert Notes';
      } else if (basePath.match(/^\/admin\/teachers\/edit\/[\w-]+$/)) {
        screenName = 'Edit Teacher';
      } else if (basePath.match(/^\/admin\/students\/edit\/[\w-]+$/)) {
        screenName = 'Edit Student';
      } else if (basePath.match(/^\/admin\/view-student\/[\w-]+$/)) {
        screenName = 'View Student';
      } else if (basePath.match(/^\/admin\/edit-expert\/[\w-]+$/)) {
        screenName = 'Edit Expert';
      } else if (basePath.match(/^\/admin\/edit-parent\/[\w-]+$/)) {
        screenName = 'Edit Parent';
      } else if (basePath.match(/^\/admin\/teachers\/[\w-]+\/students$/)) {
        screenName = 'Assign Students to Teacher';
      } else if (basePath.match(/^\/admin\/teachers\/[\w-]+\/view$/)) {
        screenName = 'View Teacher Account';
      } else if (basePath.match(/^\/admin\/experts\/[\w-]+\/caseload$/)) {
        screenName = 'View Expert Caseload';
      } else if (basePath.match(/^\/admin\/experts\/[\w-]+\/view$/)) {
        screenName = 'View Expert Account';
      } else if (basePath.match(/^\/admin\/parents\/[\w-]+\/link$/)) {
        screenName = 'Link Parent to Student';
      } else if (basePath.match(/^\/admin\/parents\/[\w-]+\/view$/)) {
        screenName = 'View Parent Account';
      } else {
        screenName = basePath;
      }
    }
    
    console.log(`🔵 Current Screen: ${screenName}`);
  }, [location]);

  return null;
}