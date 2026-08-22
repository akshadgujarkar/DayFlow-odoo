import React, { useEffect, useState } from 'react';
import { getMyAttendance } from '../../api/attendanceApi';
import { Card } from '../../components/ui/Card';
import { SectionLabel } from '../../components/ui/SectionLabel';

export function AttendanceModule() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyAttendance();
        setRecords(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatTime = (isoString) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return '-';
    return new Date(isoDate).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2 leading-tight">
          My Attendance
        </h1>
        <p className="text-lg text-muted-foreground">
          View your check-in and check-out history
        </p>
      </div>

      <div>
        <SectionLabel>Attendance Log</SectionLabel>
        
        {loading ? (
          <div className="py-20 text-center font-serif text-muted-foreground animate-pulse text-xl">
            Loading records...
          </div>
        ) : (
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted border-b border-border text-muted-foreground small-caps">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Check In</th>
                    <th className="px-6 py-4 font-medium">Check Out</th>
                    <th className="px-6 py-4 font-medium text-right">Work Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {records.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-muted-foreground font-serif">
                        No attendance records found. Start your day by clicking Check In above!
                      </td>
                    </tr>
                  ) : (
                    records.map((record) => (
                      <tr key={record.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">
                          {formatDate(record.date)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {formatTime(record.check_in_time)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {record.check_out_time ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {formatTime(record.check_out_time)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground italic">Active...</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-accent">
                          {record.work_hours ? `${record.work_hours}h` : '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
