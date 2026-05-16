import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [services, setServices] = useState([]);

  const [logs, setLogs] = useState([]);

  const fetchStatus = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5001/status"
      );

      setServices(response.data.services);

      setLogs(response.data.logs);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchStatus();

    const interval = setInterval(() => {

      fetchStatus();

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        🤖 Self-Healing Monitoring Dashboard
      </h1>

      <h2>📊 Service Health</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >

        {services.map((service, index) => (

          <div
            key={index}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
              border:
                service.status === "healthy"
                  ? "2px solid #22c55e"
                  : "2px solid #ef4444",
            }}
          >

            <h3>{service.service}</h3>

            <p>
              Status:
              {" "}
              <strong>
                {service.status}
              </strong>
            </p>

          </div>
        ))}
      </div>

      <h2>🚨 Centralized Logs</h2>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          maxHeight: "400px",
          overflowY: "scroll",
          marginBottom: "40px",
        }}
      >

        {logs
          .slice()
          .reverse()
          .map((log, index) => (

            <div
              key={index}
              style={{
                borderBottom:
                  "1px solid #334155",
                padding: "10px 0",
              }}
            >

              <p>
                <strong>
                  {log.service}
                </strong>
              </p>

              <p>{log.event}</p>

              <small>
                {new Date(
                  log.timestamp
                ).toLocaleString()}
              </small>

            </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "40px",
        }}
      >

        <h2>
          📈 Live Infrastructure Analytics
        </h2>

        <iframe
          src="http://localhost:3006/public-dashboards/91eab9c5fe7f4d2b811e80b9b7299316"
          width="100%"
          height="900px"
          frameBorder="0"
          title="Grafana Dashboard"
          style={{
            borderRadius: "12px",
            background: "white",
          }}
        ></iframe>

      </div>

    </div>
  );
}

export default App;