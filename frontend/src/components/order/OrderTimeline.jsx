import React from 'react';
import { ORDER_STATUS_STEPS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import { HiCheck, HiXMark } from 'react-icons/hi2';

export const OrderTimeline = ({ orderStatus = 'Pending', timeline = [] }) => {
  const isCancelled = orderStatus === 'Cancelled';

  const currentStepIndex = ORDER_STATUS_STEPS.indexOf(orderStatus);

  if (isCancelled) {
    return (
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800">
        <div className="flex items-center space-x-2 font-bold">
          <HiXMark className="h-5 w-5 text-rose-600" />
          <span>This order has been cancelled.</span>
        </div>
        {timeline.length > 0 && (
          <p className="text-xs text-rose-600 mt-1">
            Cancelled on {formatDate(timeline[timeline.length - 1]?.timestamp)}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      {/* Desktop Horizontal Stepper */}
      <div className="hidden sm:flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 -z-0" />
        {/* Active progress line */}
        <div
          className="absolute top-4 left-6 h-1 bg-indigo-600 transition-all duration-500 -z-0"
          style={{
            width: `${Math.max(0, (currentStepIndex / (ORDER_STATUS_STEPS.length - 1)) * 100)}%`,
          }}
        />

        {ORDER_STATUS_STEPS.map((step, idx) => {
          const isDone = idx <= currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isDone
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                } ${isCurrent ? 'ring-4 ring-indigo-100 scale-110' : ''}`}
              >
                {isDone ? <HiCheck className="h-4 w-4 stroke-[3]" /> : idx + 1}
              </div>
              <span
                className={`mt-2 text-[11px] font-bold text-center max-w-[80px] ${
                  isDone ? 'text-indigo-900' : 'text-slate-400'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Stepper */}
      <div className="sm:hidden space-y-4">
        {ORDER_STATUS_STEPS.map((step, idx) => {
          const isDone = idx <= currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const matchingTimeline = timeline.find((t) => t.status === step);

          return (
            <div key={step} className="flex items-start space-x-3">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                  isDone
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                } ${isCurrent ? 'ring-2 ring-indigo-200' : ''}`}
              >
                {isDone ? <HiCheck className="h-3.5 w-3.5" /> : idx + 1}
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step}
                </p>
                {matchingTimeline && (
                  <p className="text-[10px] text-slate-500">
                    {formatDate(matchingTimeline.timestamp)}
                    {matchingTimeline.note ? ` — ${matchingTimeline.note}` : ''}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
