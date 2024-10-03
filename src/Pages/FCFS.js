import React, { useState } from 'react';
import './FCFS.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FCFS = () => {
    const [processes, setProcesses] = useState([]);
    const [processId, setProcessId] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [burstTime, setBurstTime] = useState('');
    const [error, setError] = useState('');

    const handleAddProcess = () => {
        if (processes.some(p => p.processId === processId)) {
            setError('Process ID must be unique');
            return;
        }

        if (!processId || !arrivalTime || !burstTime) {
            setError('All fields are required');
            return;
        }

        setError('');

        const newProcess = { processId, arrivalTime: parseInt(arrivalTime), burstTime: parseInt(burstTime) };
        const updatedProcesses = [...processes, newProcess].sort((a, b) => {
            return a.arrivalTime - b.arrivalTime || a.processId - b.processId;
        });

        setProcesses(updatedProcesses);
        setProcessId('');
        setArrivalTime('');
        setBurstTime('');
    };

    const calculateGanttChart = () => {
        let ganttChart = [];
        let currentTime = 0;

        processes.forEach(process => {
            if (currentTime < process.arrivalTime) {
                currentTime = process.arrivalTime;
            }
            ganttChart.push({
                processId: process.processId,
                start: currentTime,
                end: currentTime + process.burstTime
            });
            currentTime += process.burstTime;
        });

        return ganttChart;
    };

    return (
        <div className="fcfs-container">
            <h1 className="fcfs-title text-center">First-Come, First-Served (FCFS) Scheduling</h1>
            <p className="fcfs-description text-center">
                FCFS is a CPU scheduling algorithm where the process that arrives first gets executed first.
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
                    <button className="btn btn-primary" onClick={handleAddProcess}>Add Process</button>
                </div>
            </div>
            
            {error && <p className="error-message text-danger text-center mt-3">{error}</p>}
            
            <table className="fcfs-table table table-bordered table-striped mt-4">
                <thead>
                    <tr>
                        <th>Process ID</th>
                        <th>Arrival Time</th>
                        <th>Burst Time</th>
                    </tr>
                </thead>
                <tbody>
                    {processes.map((process, index) => (
                        <tr key={index}>
                            <td>{process.processId}</td>
                            <td>{process.arrivalTime}</td>
                            <td>{process.burstTime}</td>
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

export default FCFS;