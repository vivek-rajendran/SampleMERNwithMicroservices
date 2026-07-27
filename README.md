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
**📋 Step-by-Step Implementation Guide**

**Step 1: Version Control with Git**

Forking & Repository Setup: Forked the upstream application repository into a personal GitHub account and initialized working directories.

**Branching Strategy:** Developed the orchestration layer, container configs, and pipeline files under a clean feature branch (feature/orchestration).

**Version Management:** Maintained structured commits and pushed updates seamlessly.

**Step 2: Prepare & Containerize the MERN Application**

**Dockerfiles:** Designed optimized, production-ready Dockerfile configurations for each application tier:

**Frontend:** React production build served efficiently via Nginx.

**Backend Services (helloService & profileService):** Node.js runtime environments.

**Amazon ECR Repositories:** Established private container registries in AWS ECR (ap-south-1 region) to store service images.

**Image Tagging & Push:** Authenticated the Docker daemon with AWS ECR (aws ecr get-login-password), tagged images dynamically with build numbers, and pushed them successfully.

**Step 3: AWS Environment Setup**

**AWS CLI & Configuration:** Configured secure AWS credentials, regions, and access profiles.

**IAM Security Policies:** Provisioned least-privilege IAM roles and access policies for Jenkins, Amazon ECR, and Amazon EKS management.

**Step 4: Continuous Integration (CI) using Jenkins**

**Jenkins Server Deployment:** Provisioned and configured Jenkins on an AWS EC2 instance.

**Plugin Integration:** Installed core pipeline plugins including Docker Pipeline, Kubernetes CLI, and AWS Credentials.

**Declarative Pipeline (Jenkinsfile):** Automated build workflow covering:

**Code Checkout:** Clones the repository from GitHub.

**ECR Login:** Authenticates Jenkins securely with AWS ECR.

**Build & Push:** Compiles and pushes updated multi-service container images.

**Helm Deployment:** Executes cluster upgrades using Helm charts.

**SNS Notifications:** Triggers notification alerts via AWS SNS.

**Webhook Automation:** Configured GitHub Webhooks to trigger automated pipeline runs on pushes.

**Step 5: Kubernetes Orchestration & Helm Deployment (EKS)**

**Cluster Provisioning:** Deployed a managed Amazon EKS cluster (streaming-app-cluster) using eksctl with secure node groups (t3.medium).

**Kubernetes Control:** Configured local kubeconfig (aws eks update-kubeconfig) and verified cluster health (kubectl get nodes).

**Helm Packaging:** Structured application manifests into modular Helm templates (Chart.yaml, values.yaml, and templates for frontend, services, and MongoDB).

**Release Execution:** Deployed the Helm release to EKS and validated running pods and services (kubectl get pods, kubectl get svc).

**Step 6: Monitoring and Logging**

**Amazon CloudWatch:** Configured CloudWatch metrics and resource monitoring for the EKS cluster nodes and control plane.

**Centralized Logging:** Streamlined container stdout/stderr log aggregation from Kubernetes pods into CloudWatch Log Streams.

**Step 7: Documentation & Architecture**

Maintained clean architecture diagrams, configuration records, and detailed technical documentation directly within the repository structure.

**Step 8: Final Validation**

**Endpoint Accessibility:** Verified external LoadBalancer endpoint availability and service routing.

**Browser Testing:** Validated full stack communication between the React frontend, Hello Service, and Profile Service.

**Step 9: Bonus — ChatOps Integration (AWS SNS)**

**SNS Topic Creation:** Created an AWS SNS Topic (mern-deployment-notifications) to broadcast build statuses.

**Endpoint Subscriptions:** Configured subscriptions (Email / HTTPS webhook) to receive alerts.

Pipeline Integration: Added aws sns publish commands inside the Jenkinsfile post-block for instant success/failure status notifications.

**🛠️ Quick Start & Usage**

**Clone the Repository:**

**Bash**
git clone [https://github.com/vivek-rajendran/SampleMERNwithMicroservices.git](https://github.com/vivek-rajendran/SampleMERNwithMicroservices.git)

cd SampleMERNwithMicroservices

**Manual Helm Deployment:**

**Bash**
helm install mern-app ./mern-chart

**Verify Kubernetes Resources:**

**Bash**
kubectl get pods
kubectl get svc
