import React, { useState } from 'react';
import './PSA.css';
import './SJF.css';
import './FCFS.css';

const PSA = () => {
    const [processes, setProcesses] = useState([]);
    const [processId, setProcessId] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [burstTime, setBurstTime] = useState('');
    const [priority, setPriority] = useState('');
    const [error, setError] = useState('');
    const [ganttChart, setGanttChart] = useState([]);

    const handleAddProcess = () => {
        if (processes.some(p => p.processId === processId)) {
            setError('Process ID must be unique');
            return;
        }

        if (!processId || !arrivalTime || !burstTime || !priority) {
            setError('All fields are required');
            return;
        }

        setError('');

        const newProcess = {
            processId,
            arrivalTime: parseInt(arrivalTime),
            burstTime: parseInt(burstTime),
            priority: parseInt(priority)
        };

        const updatedProcesses = [...processes, newProcess].sort(comp);
        setProcesses(updatedProcesses);
        setProcessId('');
        setArrivalTime('');
        setBurstTime('');
        setPriority('');
    };

    const comp = (a, b) => {
        if (a.arrivalTime === b.arrivalTime) {
            return (a.priority - b.priority); // Sort by priority if arrival time is the same
        }
        return a.arrivalTime - b.arrivalTime; // Sort by arrival time
    };

    const calculateGanttChart = () => {
        let ganttChartData = [];
        let currentTime = 0;

        processes.forEach(process => {
            if (currentTime < process.arrivalTime) {
                currentTime = process.arrivalTime; // Jump to the arrival time
            }
            ganttChartData.push({
                processId: process.processId,
                start: currentTime,
                end: currentTime + process.burstTime
            });
            currentTime += process.burstTime;
        });

        return ganttChartData;
    };

    const handleCalculateGanttChart = () => {
        const chart = calculateGanttChart();
        setGanttChart(chart);
    };

    return (
        <div className="psa-container">
            <h1 className="psa-title">Priority Scheduling Algorithm</h1>
            <p className="psa-description">
                This scheduling algorithm assigns the CPU to the process with the highest priority.
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
                <input
                    type="number"
                    placeholder="Priority"
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
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

            {/* <button onClick={handleCalculateGanttChart}>Calculate Gantt Chart</button> */}
        </div>
    );
};

export default PSA;