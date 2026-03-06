import { Link } from 'react-router-dom';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, AlertCircle, Phone, Mail } from 'lucide-react';

export function NoExpertAssigned() {
  return (
    <ParentLayout>
      <div className="p-8 max-w-4xl mx-auto">
        <Link
          to="/parent/dashboard"
          className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <Card className="border-border-default p-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-icon-general-soft mb-4">
              <AlertCircle className="w-8 h-8 text-icon-general" />
            </div>
            <h2 className="text-xl text-text-heading font-semibold mb-2">
              No Behavioral Expert Assigned
            </h2>
            <p className="text-text-label mb-8 max-w-md mx-auto">
              Your child does not currently have a behavioral expert assigned. Expert
              assignment typically occurs when specialized behavioral support is needed.
            </p>

            <div className="bg-surface-page rounded-lg p-6 max-w-lg mx-auto text-left mb-8">
              <p className="text-sm text-text-heading font-medium mb-3">
                When is an expert assigned?
              </p>
              <ul className="text-sm text-text-label space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-text-heading font-medium">•</span>
                  <span>
                    When a teacher escalates a case requiring specialized intervention
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-text-heading font-medium">•</span>
                  <span>
                    When behavioral patterns need expert assessment and support plans
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-text-heading font-medium">•</span>
                  <span>
                    When ongoing monitoring and parent communication is recommended
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-t border-border-default pt-6">
              <p className="text-sm text-text-heading font-medium mb-4">
                Need to discuss behavioral support?
              </p>
              <div className="grid gap-4 max-w-md mx-auto">
                <Card className="border-border-default p-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-text-label mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-heading mb-1">
                        Contact School Office
                      </p>
                      <p className="text-sm text-text-label">
                        (555) 123-4567
                      </p>
                      <p className="text-xs text-text-body mt-1">
                        Monday - Friday, 8:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="border-border-default p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-text-label mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-heading mb-1">
                        Email School Administrator
                      </p>
                      <p className="text-sm text-text-label">
                        admin@lincolnelementary.edu
                      </p>
                      <p className="text-xs text-text-body mt-1">
                        Responses within 1-2 business days
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="mt-8">
              <Link to="/parent/dashboard">
                <Button className="bg-brand hover:bg-brand-dark text-white shadow-sm">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <div className="mt-6 p-4 bg-surface-page rounded-lg">
          <p className="text-sm text-text-label">
            <span className="font-medium text-text-heading">Note:</span> For classroom-specific
            questions or general updates about your child, please contact your child's
            teacher directly. Behavioral experts are assigned specifically for specialized
            behavioral support needs.
          </p>
        </div>
      </div>
    </ParentLayout>
  );
}
