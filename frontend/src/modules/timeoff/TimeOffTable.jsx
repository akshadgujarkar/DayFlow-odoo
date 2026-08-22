import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function TimeOffTable({ requests, isAdmin, onApprove, onReject }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [adminComment, setAdminComment] = useState('');

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const handleAction = (status) => {
    if (status === 'Approved') onApprove(selectedRequest.id, adminComment);
    if (status === 'Rejected') onReject(selectedRequest.id, adminComment);
    setSelectedRequest(null);
    setAdminComment('');
  };

  return (
    <Card className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border">
        <thead>
          <tr>
            {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Employee</th>}
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Days</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Remarks</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Admin Comment</th>
            {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>}
          </tr>
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {requests.length === 0 ? (
            <tr>
              <td colSpan={isAdmin ? 8 : 6} className="px-6 py-12 text-center text-muted-foreground">
                No leave requests found.
              </td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req.id}>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-foreground">{req.Employee?.first_name} {req.Employee?.last_name}</div>
                    <div className="text-xs text-muted-foreground">{req.Employee?.department}</div>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{req.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {new Date(req.start_date).toLocaleDateString()} - {new Date(req.end_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{req.allocation_days}</td>
                <td className="px-6 py-4 text-sm text-foreground max-w-xs truncate" title={req.remarks}>{req.remarks || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate" title={req.admin_comment}>{req.admin_comment || '-'}</td>
                
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {req.status === 'Pending' && (
                      <Button variant="ghost" className="text-accent" onClick={() => setSelectedRequest(req)}>Review</Button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card elevated className="w-full max-w-md">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Review Leave Request</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Employee</p>
                <p className="text-foreground">{selectedRequest.Employee?.first_name} {selectedRequest.Employee?.last_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Details</p>
                <p className="text-foreground">{selectedRequest.type} ({selectedRequest.allocation_days} days)</p>
                <p className="text-sm text-muted-foreground">{selectedRequest.start_date} to {selectedRequest.end_date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Employee Remarks</p>
                <p className="text-foreground p-2 bg-muted rounded-md">{selectedRequest.remarks || 'No remarks provided.'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Admin Comment (Optional)</label>
                <textarea 
                  className="w-full min-h-[80px] rounded-md border border-border bg-transparent p-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  placeholder="Reason for approval/rejection..."
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setSelectedRequest(null)}>Cancel</Button>
                <Button type="button" className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700" onClick={() => handleAction('Rejected')}>Reject</Button>
                <Button type="button" className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700" onClick={() => handleAction('Approved')}>Approve</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
}
