# MERN Stack Microservices CI/CD Pipeline with AWS EKS, Jenkins, and Helm

A production-grade, end-to-end DevOps pipeline demonstrating containerization, automated continuous integration (CI), continuous deployment (CD), orchestration, and monitoring for a MERN stack application with microservices architecture.

---

## 🏗️ System Architecture & Workflow

1. **Version Control (Git & GitHub):** Source code is maintained in a structured repository with dedicated branches (`feature/orchestration`).
2. **Containerization (Docker):** Separate Dockerfiles are engineered for the Frontend (Nginx/React) and Backend microservices (`helloService`, `profileService`).
3. **Artifact Registry (AWS ECR):** Secure, versioned repositories storing immutable container images tagged by Jenkins build numbers.
4. **CI/CD Automation (Jenkins):** Hosted on an AWS EC2 instance, polling/triggering via GitHub SCM hooks to automate build, test, ECR authentication, push, and Helm deployment stages.
5. **Orchestration (Amazon EKS & Helm):** Deployed onto a managed Kubernetes cluster (`streaming-app-cluster`) using Helm charts for declarative packaging and lifecycle management.
6. **Observability & Logging (CloudWatch & Kubernetes Logs):** Container logs and cluster metrics centralized and inspected via `kubectl` and AWS CloudWatch control-plane logs.

---

## 🚀 Repository Structure

```text
SampleMERNwithMicroservices/
├── backend/
│   ├── helloService/          # Node.js Hello Service (Port 3001)
│   └── profileService/        # Node.js Profile Service & MongoDB (Port 3002)
├── frontend/                  # React & Nginx Frontend Application
├── mern-chart/                # Helm Chart for Kubernetes Deployment
│   ├── templates/             # K8s Deployments, Services, and Ingress manifests
│   └── Chart.yaml             # Helm Chart definition
└── Jenkinsfile                # Declarative Jenkins CI/CD pipeline script
```