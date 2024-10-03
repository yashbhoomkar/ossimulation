import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
    const cards = [
        {
            title: "First Come First Serve",
            description: "FCFS is the simplest scheduling algorithm that operates on a first-come, first-served basis. Processes are executed in the order they arrive in the ready queue, which can lead to longer wait times for shorter processes. Despite its simplicity, it can result in inefficiencies, particularly when longer processes dominate.",
            link: "/fcfs"
        },
        {
            title: "Shortest Job First",
            description: "SJF scheduling prioritizes processes with the shortest execution time, aiming to minimize overall waiting time. It can be preemptive or non-preemptive; a running process can be interrupted if a new process arrives with a shorter burst time. While efficient, it risks starvation for longer processes, leading to potential delays.",
            link: "/sjf"
        },
        {
            title: "Priority Scheduling Algorithm",
            description: "Priority Scheduling assigns a priority to each process, allowing the scheduler to execute the highest-priority processes first. This can be preemptive or non-preemptive. While it effectively handles critical tasks promptly, it may lead to starvation for lower-priority processes, necessitating careful priority management.",
            link: "/PSA"
        },
        {
            title: "Round Robin",
            description: "Round Robin scheduling is a preemptive algorithm that assigns a fixed time slice (quantum) to each process in the ready queue. Processes are executed in a circular order, ensuring fairness. The performance heavily depends on the choice of time quantum, as too short can cause high context switching overhead, while too long may increase waiting times.",
            link: "/rr"
        }
    ];

    return (
        <div className="container-fluid py-4 home">
            <h1 className="text-center text-light">OS Process Scheduling</h1>
            <p className="text-center text-light mb-4">
                Process scheduling is a key function of an operating system that determines the order in which processes are executed. 
                Effective scheduling is crucial for optimizing CPU utilization and improving overall system performance. 
                Various algorithms, such as FCFS, SJF, Priority Scheduling, and Round Robin, are used to manage process execution efficiently.
            </p>
            <div className="row no-gutters">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col mb-4">
                            <a href={cards[0].link} className="card h-100 text-decoration-none custom-card">
                                <h2 className="card-title custom-title">{cards[0].title}</h2>
                                <p className="card-description">{cards[0].description}</p>
                            </a>
                        </div>
                        <div className="col mb-4">
                            <a href={cards[1].link} className="card h-100 text-decoration-none custom-card">
                                <h2 className="card-title custom-title">{cards[1].title}</h2>
                                <p className="card-description">{cards[1].description}</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col mb-4">
                            <a href={cards[2].link} className="card h-100 text-decoration-none custom-card">
                                <h2 className="card-title custom-title">{cards[2].title}</h2>
                                <p className="card-description">{cards[2].description}</p>
                            </a>
                        </div>
                        <div className="col mb-4">
                            <a href={cards[3].link} className="card h-100 text-decoration-none custom-card">
                                <h2 className="card-title custom-title">{cards[3].title}</h2>
                                <p className="card-description">{cards[3].description}</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Home;