import React, { useState } from 'react';
import './RR.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RR = () => {
    const [processes, setProcesses] = useState([]);
    const [processId, setProcessId] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [burstTime, setBurstTime] = useState('');
    const [quantum, setQuantum] = useState('');
    const [error, setError] = useState('');

    const handleAddProcess = () => {
        if (processes.some(p => p.processId === processId)) {
            setError('Process ID must be unique');
            return;
        }

        if (!processId || !arrivalTime || !burstTime || !quantum) {
            setError('All fields are required');
            return;
        }

        setError('');
        const newProcess = { processId, arrivalTime: parseInt(arrivalTime), burstTime: parseInt(burstTime), remainingTime: parseInt(burstTime) };
        const updatedProcesses = [...processes, newProcess].sort((a, b) => a.arrivalTime - b.arrivalTime);

        setProcesses(updatedProcesses);
        setProcessId('');
        setArrivalTime('');
        setBurstTime('');
    };

    const calculateGanttChart = () => {
        let ganttChart = [];
        let currentTime = 0;
        let remProcesses = [...processes];
        let quantumValue = parseInt(quantum);

        while (remProcesses.some(p => p.remainingTime > 0)) {
            remProcesses.forEach((process, index) => {
                if (process.remainingTime > 0) {
                    if (process.remainingTime > quantumValue) {
                        ganttChart.push({
                            processId: process.processId,
                            start: currentTime,
                            end: currentTime + quantumValue
                        });
                        currentTime += quantumValue;
                        remProcesses[index].remainingTime -= quantumValue;
                    } else {
                        ganttChart.push({
                            processId: process.processId,
                            start: currentTime,
                            end: currentTime + process.remainingTime
                        });
                        currentTime += process.remainingTime;
                        remProcesses[index].remainingTime = 0;
                    }
                }
            });
        }

        return ganttChart;
    };

    return (
        <div className="rr-container">
            <h1 className="rr-title text-center">Round Robin (RR) Scheduling</h1>
            <p className="rr-description text-center">
                RR is a CPU scheduling algorithm where each process is assigned a fixed time slot (quantum) in a cyclic order.
            </p>
            
            <div className="process-inputs row">
                <div className="col-md-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Process ID" 
                        value={processId} 
                        onChange={e => setProcessId(e.target.value)} 
                    />
                </div>
                <div className="col-md-3">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Arrival Time" 
                        value={arrivalTime} 
                        onChange={e => setArrivalTime(e.target.value)} 
                    />
                </div>
                <div className="col-md-3">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Burst Time" 
                        value={burstTime} 
                        onChange={e => setBurstTime(e.target.value)} 
                    />
                </div>
                <div className="col-md-3">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Quantum" 
                        value={quantum} 
                        onChange={e => setQuantum(e.target.value)} 
                    />
                </div>
            </div>
            
            {error && <p className="error-message text-danger text-center mt-3">{error}</p>}
            
            <table className="rr-table table table-bordered table-striped mt-4">
                <thead>
                    <tr>
                        <th>Process ID</th>
                        <th>Arrival Time</th>
                        <th>Burst Time</th>
                        <th>Remaining Time</th>
                    </tr>
                </thead>
                <tbody>
                    {processes.map((process, index) => (
                        <tr key={index}>
                            <td>{process.processId}</td>
                            <td>{process.arrivalTime}</td>
                            <td>{process.burstTime}</td>
                            <td>{process.remainingTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="mt-5">Gantt Chart</h2>
            <div className="gantt-chart">
                <div className="gantt-header">
                    <span>Time (seconds):</span>
                    {calculateGanttChart().map((entry, index) => (
                        <span key={index} className="gantt-time">{entry.start}</span>
                    ))}
                    {processes.length > 0 && (
                        <span className="gantt-time">
                            {calculateGanttChart()[calculateGanttChart().length - 1].end}
                        </span>
                    )}
                </div>
                <div className="gantt-header">
                    <span>Process Execution:</span>
                </div>
                <div className="gantt-processes">
                    {calculateGanttChart().map((entry, index) => (
                        <div key={index} className="gantt-entry">
                            <span>Process {entry.processId}: </span>
                            <span>{entry.start} - {entry.end}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RR;