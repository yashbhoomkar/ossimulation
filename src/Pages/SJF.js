import React, { useState } from 'react';
import './SJF.css';
import ToggleComponent from '../components/ToggleComponent';

const SJF = () => {
    const [processes, setProcesses] = useState([]);
    const [processId, setProcessId] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [burstTime, setBurstTime] = useState('');
    const [error, setError] = useState('');
    const [isPreemptive, setIsPreemptive] = useState(false); // State for toggle

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
            return a.arrivalTime - b.arrivalTime || a.burstTime - b.burstTime || a.processId - b.processId;
        });

        setProcesses(updatedProcesses);
        setProcessId('');
        setArrivalTime('');
        setBurstTime('');
    };

    const calculateGanttChart = () => {
        let ganttChart = [];
        let currentTime = 0;

        if (isPreemptive) {
            // Implement logic for preemptive SJF
            const remainingTimes = processes.map(p => p.burstTime);
            const complete = new Array(processes.length).fill(false);
            let completedProcesses = 0;

            while (completedProcesses < processes.length) {
                let idx = -1;
                let minTime = Infinity;

                for (let i = 0; i < processes.length; i++) {
                    if (processes[i].arrivalTime <= currentTime && !complete[i] && remainingTimes[i] < minTime) {
                        minTime = remainingTimes[i];
                        idx = i;
                    }
                }

                if (idx !== -1) {
                    ganttChart.push({
                        processId: processes[idx].processId,
                        start: currentTime,
                        end: currentTime + 1
                    });
                    remainingTimes[idx]--;
                    currentTime++;

                    if (remainingTimes[idx] === 0) {
                        complete[idx] = true;
                        completedProcesses++;
                    }
                } else {
                    currentTime++;
                }
            }
        } else {
            // Implement logic for non-preemptive SJF
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
        }

        // Merge consecutive entries with the same process ID
        const mergedGanttChart = [];
        ganttChart.forEach(entry => {
            if (mergedGanttChart.length > 0 &&
                mergedGanttChart[mergedGanttChart.length - 1].processId === entry.processId) {
                // If the current entry is the same as the last one, merge the time intervals
                mergedGanttChart[mergedGanttChart.length - 1].end = entry.end;
            } else {
                mergedGanttChart.push({ ...entry });
            }
        });

        return mergedGanttChart;
    };

    const handleToggle = () => {
        setIsPreemptive(!isPreemptive); // Toggle the scheduling type
    };

    return (
        <div className="sjf-container">
            <h1 className="sjf-title">Shortest Job First (SJF) Scheduling</h1>
            <p className="sjf-description">
                SJF is a CPU scheduling algorithm where the process with the smallest burst time is executed first.
            </p>

            <ToggleComponent />

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

            {error && <p className="error-message">{error}</p>}


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

export default SJF;