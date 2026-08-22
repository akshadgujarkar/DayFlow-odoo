import React, { useEffect, useState, useRef } from 'react';
import { getTodayStatus, checkIn, checkOut } from '../../api/attendanceApi';
import { useAuth } from '../../context/AuthContext';

export function Systray() {
  const { user } = useAuth();
  const [status, setStatus] = useState('loading'); // 'loading', 'not_checked_in', 'checked_in', 'checked_out'
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const timerRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    
    const fetchStatus = async () => {
      try {
        const res = await getTodayStatus();
        setStatus(res.status);
        if (res.status === 'checked_in' && res.record.check_in_time) {
          // Immediately calculate once
          updateDuration(new Date(res.record.check_in_time));
          startTimer(new Date(res.record.check_in_time));
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };
    fetchStatus();

    return () => clearInterval(timerRef.current);
  }, [user]);

  const updateDuration = (checkInDate) => {
    const now = new Date();
    const diff = now - checkInDate;
    const hrs = Math.floor(diff / 3600000).toString().padStart(2, '0');
    const mins = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    const secs = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
    setDuration(`${hrs}:${mins}:${secs}`);
  };

  const startTimer = (checkInDate) => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      updateDuration(checkInDate);
    }, 1000);
  };

  const handleAction = async () => {
    setLoading(true);
    try {
      if (status === 'not_checked_in') {
        const res = await checkIn();
        setStatus('checked_in');
        updateDuration(new Date(res.record.check_in_time));
        startTimer(new Date(res.record.check_in_time));
      } else if (status === 'checked_in') {
        await checkOut();
        setStatus('checked_out');
        clearInterval(timerRef.current);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error?.message || 'Action failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user || status === 'loading' || status === 'error') {
    return (
      <div className="h-10 bg-accent text-card w-full flex items-center justify-center font-serif text-sm">
        {status === 'loading' ? 'Loading attendance status...' : 'Attendance module unavailable'}
      </div>
    );
  }

  let buttonText = 'Check In';
  let bannerMessage = 'Good morning! Remember to check in to start your day.';
  if (status === 'checked_in') {
    buttonText = 'Check Out';
    bannerMessage = `You are currently clocked in. Duration: ${duration}`;
  } else if (status === 'checked_out') {
    buttonText = 'Checked Out';
    bannerMessage = 'You have checked out for the day. Have a great evening!';
  }

  return (
    <div className="h-10 bg-accent text-card w-full flex items-center justify-between px-6 font-sans text-sm z-50">
      <div className="flex items-center gap-4">
        <span className="font-semibold font-serif tracking-widest small-caps opacity-90">ATTENDANCE</span>
        <span className="hidden sm:inline-block opacity-90">{bannerMessage}</span>
      </div>
      
      <button 
        onClick={handleAction}
        disabled={loading || status === 'checked_out'}
        className={`
          px-4 py-1 rounded-full font-medium text-xs transition-colors shadow-sm
          ${status === 'not_checked_in' ? 'bg-card text-accent hover:bg-muted' : ''}
          ${status === 'checked_in' ? 'bg-red-500 text-white hover:bg-red-600' : ''}
          ${status === 'checked_out' ? 'bg-transparent text-card opacity-70 cursor-not-allowed border border-card/30' : ''}
        `}
      >
        {loading ? 'Processing...' : buttonText}
      </button>
    </div>
  );
}
