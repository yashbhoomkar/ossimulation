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
            <h1 className="fcfs-title">First-Come, First-Served (FCFS) Scheduling</h1>
            <p className="fcfs-description text-center">
                FCFS is a CPU scheduling algorithm where the process that arrives first gets executed first.
            </p>

            <div className="process-inputs">
                <input
                    type="text"
                    placeholder="Process ID"
                    value={processId}
                    onChange={e => setProcessId(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Arrival Time"
                    value={arrivalTime}
                    onChange={e => setArrivalTime(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Burst Time"
                    value={burstTime}
                    onChange={e => setBurstTime(e.target.value)}
                />
                <button onClick={handleAddProcess}>Add Process</button>
            </div>

            {error && <p className="error-message text-danger text-center mt-3">{error}</p>}



            <div className="sjf-table-container">
                <div className="table-wrapper">
                    <table className="sjf-table">
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
                </div>
            </div>

            <h2 className="mt-5">Gantt Chart</h2>
            <div className="gantt-chart1">
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
                <div className="gantt-processes1">
                    {calculateGanttChart().map((entry, index) => (
                        <div key={index} className="gantt-entry1">
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